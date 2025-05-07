import { FaCheckCircle, FaClock, FaTimesCircle, FaCalendarCheck } from 'react-icons/fa';

const statusStyles = {
  concluido: {
    color: 'bg-green-100 text-green-700',
    icon: <FaCheckCircle className="w-4 h-4 mr-1" />
  },
  confirmação: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: <FaClock className="w-4 h-4 mr-1" />
  },
  cancelado: {
    color: 'bg-red-100 text-red-700',
    icon: <FaTimesCircle className="w-4 h-4 mr-1" />
  },
  confirmado: {
    color: 'bg-blue-100 text-blue-700',
    icon: <FaCalendarCheck className="w-4 h-4 mr-1" />
  }
};

export function AppointmentCard({ nome_atendente, nome_servico, data_hora, tempo_medio, estado }) {
  const initials = nome_atendente.slice(0, 2).toUpperCase();
  const statusData = statusStyles[estado] || {};

  const inicio = new Date(data_hora);
  const fim = new Date(inicio.getTime() + tempo_medio * 60000);
  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Avatar + Info */}
        <div className="flex items-center">
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg mr-4 shadow-inner">
            {initials}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{nome_atendente}</h3>
            <p className="text-sm text-gray-500">{nome_servico}</p>
          </div>
        </div>

        {/* Time + Status */}
        <div className="text-right">
          <div className="text-sm text-gray-600 font-medium">
            {formatTime(inicio)} - {formatTime(fim)}
          </div>
          <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusData.color} w-30`}>
            {statusData.icon}
            {estado.charAt(0).toUpperCase() + estado.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
}