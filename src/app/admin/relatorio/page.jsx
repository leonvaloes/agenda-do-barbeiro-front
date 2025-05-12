// pages/relatorio.jsx
import { BsCalendar3 } from "react-icons/bs";

export default function page() {
  return (
    <>
      <div className="cointainer flex items-center gap-[20px] p-4 text-blue-900">
        <div className="container mx-auto px-4 py-3 flex flex-row px-4 py-16">
          <i className="text-[30px]"><BsCalendar3 /></i>
          <span className="text-2xl font-bold"> Relatório de agendamento</span>
        </div>

        <span>Filtre os agendamentos por período desejado</span>

      </div>
    </>

  );
}
