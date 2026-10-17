import { Appointment } from '@/types/appointment';
import { cn } from 'cn';

type AppointmentCardProps = {
  appointment: Appointment;
  isFirstInSection: boolean;
};

export const AppointmentCard = ({
  appointment,
  isFirstInSection = false,
}: AppointmentCardProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] py-3 items-center',
        !isFirstInSection && 'border-t border-[#353339]'
      )}
    >
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-medium text-content-primary">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-medium text-content-primary">
            {appointment.petName}
          </span>
          <span className="text-paragraph-medium text-content-secondary">
            /
          </span>
          <span className="text-paragraph-medium text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>

        <div className="text-left pr-4 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-4">
          <span className="text-paragraph-medium text-content-secondary">
            {appointment.description}
          </span>
        </div>
      </div>
    </div>
  );
};
