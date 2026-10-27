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
      </DialogContent>
    </Dialog>
  );
};
