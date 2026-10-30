'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldLabel } from '../ui/field';
import { Input } from '@base-ui/react/input';

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Field>
            <FieldLabel htmlFor="tutorName">Nome do tutor</FieldLabel>

            <Input id="tutorName" type="text" {...form.register('tutorName')} />
          </Field>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
