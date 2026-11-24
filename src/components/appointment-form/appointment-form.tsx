'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller } from 'react-hook-form';
import { format, startOfToday } from 'date-fns';

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
import {
  CalendarIcon,
  ChevronDownIcon,
  PawPrint,
  Phone,
  User,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { IMaskInput } from 'react-imask';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from 'cn';

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'O nome do tutor é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(11, 'O Telefone é obrigatório'),
  description: z.string().min(4, 'A descrição é obrigatória'),
  scheduleAt: z
    .date({
      error: 'A data é obrigatória',
    })
    .min(startOfToday(), {
      message: 'A data não pode ser no passado',
    }),
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
      scheduleAt: undefined,
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
              htmlFor="phone"
              className="text-label-medium-size text-content-primary"
            >
              Telefone
            </FieldLabel>

            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                size={20}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <IMaskInput
                    id="phone"
                    name={field.name}
                    placeholder="(99) 99999-9999"
                    mask="(00) 00000-0000"
                    value={field.value ?? ''}
                    onAccept={field.onChange}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    className="pl-10 flex h-12 border w-full rounded-md border-border-primary bg-background-tertiary px-3 py-3 text-sm text-content-primary placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                  />
                )}
              />
            </div>

            <FieldError errors={[form.formState.errors.phone]} />
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

          <Field>
            <FieldLabel htmlFor="scheduleAt">Data</FieldLabel>

            <Controller
              name="scheduleAt"
              control={form.control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        id="scheduleAt"
                        variant="outline"
                        type="button"
                        className={cn(
                          'w-full h-12 justify-between px-3 py-3 text-sm font-normal rounded-md',
                          'bg-background-tertiary border border-border-primary text-content-primary',
                          'hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary',
                          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-border-brand focus-visible:ring-offset-0',
                          !field.value && 'text-content-secondary'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            className="text-content-brand"
                            size={20}
                          />

                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span className="text-content-secondary">
                              Selecione uma data
                            </span>
                          )}
                        </div>
                        <ChevronDownIcon className="opacity-50 h-4 w-4" />
                      </Button>
                    }
                  />

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < startOfToday()}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />

            <FieldError errors={[form.formState.errors.scheduleAt]} />
          </Field>

          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
