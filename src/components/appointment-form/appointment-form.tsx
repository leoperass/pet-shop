'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PawPrint, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'O Telefone é obrigatório'),
  description: z.string().min(4, 'A descrição é obrigatória'),
});

type appointmentFormValues = z.infer<typeof appointmentFormSchema>;

export const AppointmentForm = () => {
  const form = useForm<appointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  });

  const onSubmit = (data: appointmentFormValues) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="brand"
            className="uppercase px-6 py-6 cursor-pointer"
          />
        }
      >
        Novo Agendamento
      </DialogTrigger>

      <DialogContent variant="appointment" overlayVariant="blurred">
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>

          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar um atendimento:
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log('Erros:', errors)
          )}
          className="space-y-6"
        >
          <Field>
            <FieldLabel
              htmlFor="tutorName"
              className="text-label-medium-size text-content-primary"
            >
              Nome do tutor
            </FieldLabel>

            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />

              <Input
                id="tutorName"
                type="text"
                placeholder="Nome do tutor"
                className="pl-10"
                {...form.register('tutorName')}
              />
            </div>

            <FieldError errors={[form.formState.errors.tutorName]} />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="petName"
              className="text-label-medium-size text-content-primary"
            >
              Nome do pet
            </FieldLabel>

            <div className="relative">
              <PawPrint
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />

              <Input
                id="petName"
                type="text"
                placeholder="Nome do pet"
                className="pl-10"
                {...form.register('petName')}
              />
            </div>

            <FieldError errors={[form.formState.errors.petName]} />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-label-medium-size text-content-primary"
            >
              Descrição do serviço
            </FieldLabel>

            <div className="relative">
              <PawPrint
                className="absolute left-3 top-3 transform text-content-brand"
                size={20}
              />

              <Textarea
                id="description"
                placeholder="Banho e tosa"
                className="pl-10"
                {...form.register('description')}
              />
            </div>

            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
