import { PeriodSection } from '@/components/period-section';
import { Appointment as AppointmentPrisma } from '@/generated/prisma/client';
import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointment';

const appointments = [
  {
    id: '1',
    tutorName: 'João',
    petName: 'Rex',
    phone: '1234567890',
    description: 'Consulta',
    scheduleAt: new Date('2026-10-01T10:00:00'),
  },
  {
    id: '2',
    tutorName: 'Maria',
    petName: 'Mimi',
    phone: '1234567890',
    description: 'Banho',
    scheduleAt: new Date('2026-10-01T11:00:00'),
  },
  {
    id: '3',
    tutorName: 'Natalia',
    petName: 'Nina',
    phone: '1234567890',
    description: 'Tosa',
    scheduleAt: new Date('2026-10-01T14:00:00'),
  },
  {
    id: '4',
    tutorName: 'Rosa',
    petName: 'Shakira',
    phone: '123456789',
    description: 'Consulta',
    scheduleAt: new Date('2026-10-01T19:00:00'),
  },
];

const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 13 && hour < 18) return 'afternoon';
  return 'evening';
};

const groupAppointmentByPeriod = (
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] => {
  const transformedAppointments: Appointment[] = appointments?.map((apt) => ({
    ...apt,
    time: apt.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: apt.description,
    period: getPeriod(apt.scheduleAt.getHours()),
  }));

  const morningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );

  const afternoonAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );

  const eveningAppointments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ];
};

export default function Home() {
  const periods = groupAppointmentByPeriod(appointments);

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center md:m-8">
        <div>
          <h1 className="text-title text-content-primary mb-2">Sua agenda</h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>
    </div>
  );
}
