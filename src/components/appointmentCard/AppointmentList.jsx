import { AppointmentCard } from './AppointmentCard';

export function AppointmentList({ agendamentos }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {agendamentos.map((agendamento, index) => (
        <AppointmentCard key={index} {...agendamento} />
      ))}
    </div>
  );
}
