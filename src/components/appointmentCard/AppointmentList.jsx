import { useState, useEffect } from 'react';
import { AppointmentCard } from './AppointmentCard';

export function AppointmentList({ agendamentos }) {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [modalAgendamento, setModalAgendamento] = useState(null);

  useEffect(() => {
    setListaAgendamentos(agendamentos);
  }, [agendamentos]);

  const fetchConfirmarAgendamento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/atendente/proxEstado/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Atualiza o estado do item na lista
        setListaAgendamentos((prev) =>
          prev.map((agendamento) =>
            agendamento.id === id
              ? { ...agendamento, estado: proximoEstado(agendamento.estado) }
              : agendamento
          )
        );

        // Atualiza o modal também
        setModalAgendamento((prev) => ({
          ...prev,
          estado: proximoEstado(prev.estado),
        }));
      } else {
        console.error('Erro ao confirmar agendamento');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCancelarAgendamento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/atendente/cancelarAgendamento/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Atualiza o estado do agendamento para 'cancelado'
        setListaAgendamentos((prev) =>
          prev.map((agendamento) =>
            agendamento.id === id
              ? { ...agendamento, estado: 'cancelado' } // Aqui estamos setando diretamente como 'cancelado'
              : agendamento
          )
        );

        // Atualiza o modal também
        setModalAgendamento((prev) => ({
          ...prev,
          estado: 'cancelado', // Também setamos o estado do modal para 'cancelado'
        }));
      } else {
        console.error('Erro ao cancelar agendamento');
      }
    } catch (e) {
      console.log(e);
    }
  };


  const proximoEstado = (estadoAtual) => {
    switch (estadoAtual) {
      case 'confirmação': return 'confirmado';
      case 'confirmado': return 'concluído';
      default: return estadoAtual;
    }
  };

  return (
    <>
      {!!modalAgendamento && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors text-2xl"
              onClick={() => setModalAgendamento(null)}
              aria-label="Fechar"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">
              Detalhes do Agendamento
            </h2>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Cliente:</span>
                <span className="text-gray-900">{modalAgendamento.nome_cliente}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Serviço:</span>
                <span className="text-gray-900">{modalAgendamento.nome_servico}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Data:</span>
                <span className="text-gray-900">{new Date(modalAgendamento.data_hora).toLocaleString('pt-BR')}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Duração:</span>
                <span className="text-gray-900">{modalAgendamento.tempo_medio} minutos</span>
              </div>

              <div className="flex justify-between items-start">
                <span className="font-medium text-gray-600">Status:</span>
                <div className="text-right">
                  <span className="capitalize text-gray-900">{modalAgendamento.estado}</span>

                  {(modalAgendamento.estado === 'confirmação' || modalAgendamento.estado === 'confirmado') && (
                    <div className="mt-4 flex justify-between gap-4">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 p-[10px] text-white text-sm font-medium rounded transition-colors w-full"
                        onClick={() => fetchConfirmarAgendamento(modalAgendamento.id)}
                      >
                        {modalAgendamento.estado === 'confirmação'
                          ? 'Confirmar Agendamento'
                          : 'Concluir Atendimento'}
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-700 p-[10px] text-white text-sm font-medium rounded transition-colors w-full"
                        onClick={() => fetchCancelarAgendamento(modalAgendamento.id)}
                      >
                        Cancelar Agendamento
                      </button>
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {/* Lista */}
      <div className="flex w-full flex-col gap-2">
        {listaAgendamentos.map((agendamento, index) => (
          <AppointmentCard
            key={index}
            {...agendamento}
            onClick={() => setModalAgendamento(agendamento)}
          />
        ))}
      </div>
    </>
  );
}
