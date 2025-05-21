'use client';

import { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import { parseISO, format } from 'date-fns';

const URL = 'http://localhost:3000';

export default function ModalAgendamentos({ onClose, data }) {
    const [remarcarModalOpen, setRemarcarModalOpen] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
    const [novaData, setNovaData] = useState('');
    const [novaHora, setNovaHora] = useState('');
    const [horarios, setHorarios] = useState([]);

    const columns = [
        { field: "nome_cliente", headerName: "Cliente" },
        { field: "nome_servico", headerName: "Serviço" },
        {
            headerName: "Ações",
            field: "actions",
            renderCell: ({ row }) => (
                <button
                    className="text-blue-600 hover:underline transition duration-200"
                    onClick={() => {
                        setAgendamentoSelecionado(row);
                        setNovaData('');
                        setNovaHora('');
                        setHorarios([]);
                        setRemarcarModalOpen(true);
                    }}
                >
                    Remarcar
                </button>
            )
        }
    ];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    async function getHours(data) {
        setNovaData(data);

        let formattedDate;

        if (data instanceof Date) {
            formattedDate = data.toISOString().split('T')[0];
        } else if (typeof data === 'string') {
            formattedDate = data.split('T')[0];
        } else {
            throw new Error('Formato de data inválido');
        }

        const response = await fetch(`${URL}/atendente/getHours/${agendamentoSelecionado.atendente_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: formattedDate })
        });

        if (!response.ok) throw new Error('Erro ao buscar horários');

        const result = await response.json();
        setHorarios(result);
        return result;
    }

    const handleChangeData = async (e) => {
        const novaDataSelecionada = e.target.value;
        setNovaData(novaDataSelecionada);
        setNovaHora('');
        await getHours(novaDataSelecionada);
    };

    const handleChangeHora = (e) => {
        const novoHorario = e.target.value;
        setNovaHora(novoHorario);
    };

    const handleSalvarRemarcacao = async () => {
        const data_hora = `${novaData} ${novaHora}`;
        try {
            const response = await fetch(`${URL}/empresa/reagendamento`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_id: agendamentoSelecionado.item_id,
                    nova_data: data_hora,
                    atendente_id: agendamentoSelecionado.atendente_id,
                    agendamento_id: agendamentoSelecionado.id,
                    servicos: {
                        id: agendamentoSelecionado.servicos_id,
                        tempo_medio: agendamentoSelecionado.tempo_medio,
                        item_id: agendamentoSelecionado.servicos_item_id,
                    }
                })
            })
            if (!response.ok) {
                throw new Error('Erro ao atualizar');
            }
        } catch (error) {
            console.error('Erro ao remarcar agendamento:', error);
        }
        setRemarcarModalOpen(false);
    };

    return (
        <>
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl shadow-xl w-11/12 max-w-4xl relative">
                    <button
                        aria-label="Fechar modal"
                        className="absolute top-3 right-4 text-gray-600 hover:text-red-500 transition cursor-pointer text-2xl font-bold"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Reagendamento</h2>

                    <Table columns={columns} data={data} />
                </div>
            </div>

            {remarcarModalOpen && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-60">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                        <button
                            aria-label="Fechar modal remarcar"
                            className="absolute top-3 right-4 text-gray-600 hover:text-red-500 transition cursor-pointer text-2xl font-bold"
                            onClick={() => setRemarcarModalOpen(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-semibold mb-5 text-gray-800">Remarcar Agendamento</h2>

                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-1">Cliente:</label>
                            <p className="text-gray-900">{agendamentoSelecionado?.nome_cliente}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-1">Serviço:</label>
                            <p className="text-gray-900">{agendamentoSelecionado?.nome_servico}</p>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 font-semibold text-gray-700">Nova Data:</label>
                            <input
                                type="date"
                                value={novaData}
                                onChange={handleChangeData}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-semibold text-gray-700">Nova Hora:</label>
                            <select
                                value={novaHora}
                                onChange={handleChangeHora}
                                disabled={!horarios.length}
                                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition ${horarios.length
                                    ? 'border-gray-300 focus:ring-blue-500'
                                    : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                    }`}
                            >
                                <option value="">Selecione um horário</option>
                                {horarios
                                    .filter((item) => {
                                        const dataHora = parseISO(item.data_hora);
                                        const dataItem = format(dataHora, "yyyy-MM-dd");
                                        const dataSelecionada = format(parseISO(novaData), "yyyy-MM-dd");

                                        const isSameDay = dataItem === dataSelecionada;
                                        const isFuture = dataHora > new Date();

                                        return isSameDay && isFuture;
                                    })
                                    .map((item, i) => {
                                        const dataHora = parseISO(item.data_hora);
                                        const formattedTime = format(dataHora, "HH:mm");

                                        return (
                                            <option key={item.id || i} value={formattedTime}>
                                                {formattedTime}
                                            </option>
                                        );
                                    })}
                            </select>

                        </div>

                        <button
                            className={`w-full text-white px-4 py-3 rounded-md font-semibold transition ${novaData && novaHora
                                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                                : 'bg-blue-400 cursor-not-allowed opacity-70'
                                }`}
                            onClick={handleSalvarRemarcacao}
                            disabled={!novaData || !novaHora}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
