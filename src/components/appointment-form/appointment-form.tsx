'use-client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export const AppointmentForm = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="brand" />}>
        Novo Agendamento
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>

          <DialogDescription>
            Preencha os dados do cliente para realizar um atendimento:
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
