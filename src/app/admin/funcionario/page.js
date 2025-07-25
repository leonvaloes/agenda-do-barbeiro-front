'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BsCalendar2CheckFill, BsCheckCircle } from "react-icons/bs";
import Cookies from 'js-cookie';
import { AppointmentList } from '@/components/appointmentCard/AppointmentList';
import ModalAgendamentos from '../empresa/EditAgendamentos/ModalAgendamentos ';

function page() {

    const [dadosAtendente, setDadosAtendente] = useState(null);
    const [dadosUserAtendente, setDadosUserAtendente] = useState(null);

    const [RemarcarAgendamentos, setRemarcarAgendamentos] = useState(null);
    const [modalAgendamentos, setModalAgendamentos] = useState(false);
    const [flag, setFlag] = useState(false);
    const [data, setData] = useState([]);


    const [agendamentosDoDia, setAgendamentosDoDia] = useState([]);
    const [AgendamentosPendentes, setAgendamentosPendentes] = useState([]);
    const [AgendamentosConcluidosDaSemana, setAgendamentosConcluidosDaSemana] = useState([]);

    const router = useRouter();
    const URL = "http://localhost:3000";

    const fetchGetAgendamentosPendentes = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getProximosAgendamentosByAtendente/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAgendamentosPendentes(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetConcluidosSemanal = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getConcluidosSemanal/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setAgendamentosConcluidosDaSemana(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetAgendamentosDoDia = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getAgendamentosDoDiaByAtendente/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAgendamentosDoDia(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetInfoUserByAtendenteId = async (Userid) => {
        try {
            const response = await fetch(`${URL}/atendente/getInfoUserByUserId/${Userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDadosUserAtendente(data[0]);

        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetRemarcarAgendamentos = async (id) => {
        console.log("data-> ", id);
        try {
            const response = await fetch(`${URL}/atendente/getRemarcarAgendamentos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("TESTE AQUI: ", data);
            setRemarcarAgendamentos(data);

            if (data && data.length > 0) {
                setFlag(true);
            } else {
                setFlag(false);
            }

        } catch (e) {
            console.log(e);
        }
    }


    const fetchGetAtendenteByIdUser = async (Userid) => {
        try {
            const response = await fetch(`${URL}/atendente/getIdAtendente/${Userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDadosAtendente(data);
            fetchGetRemarcarAgendamentos(data);
            fetchGetInfoUserByAtendenteId(Userid);
            fetchGetAgendamentosDoDia(data);
            fetchGetAgendamentosPendentes(data);
            fetchGetConcluidosSemanal(data);
        } catch (e) {
            console.log(e);
        }
    }

    const GetDadosSelecionados = (dados) => {
        setData([dados]);
    };

    useEffect(() => {
        console.log('Data atualizada:', data);
    }, [data]);


    useEffect(() => {
        const role = Cookies.get('role');
        if (role !== 'ATENDENTE') {
            router.push('/auth');
        }
        const idUser = Cookies.get('id');
        fetchGetAtendenteByIdUser(idUser);
    }, []);

    return (
        <>
            {!!modalAgendamentos && (
                <ModalAgendamentos data={data} onClose={() => setModalAgendamentos(false)} />
            )}

            {!!flag && (
                <>
                    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md sm:max-w-lg">
                            <h2 className="text-lg font-bold mb-4">Agendamentos a Remarcar</h2>
                            <ul>
                                {RemarcarAgendamentos.map((agendamento) => (
                                    <div
                                        key={agendamento.id}
                                        className="border border-blue-500 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4"
                                    >
                                        <li className="text-sm flex-1">
                                            <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                                            <p><strong>Data e hora:</strong> {new Date(agendamento.data_hora).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                            <p><strong>Serviço:</strong> {agendamento.nome_servico}</p>
                                        </li>

                                        <button onClick={() => { GetDadosSelecionados(agendamento); setFlag(false); setModalAgendamentos(true); }} className="bg-blue-500 w-full sm:w-auto text-white px-4 py-2 rounded-md">
                                            Reagendar
                                        </button>
                                    </div>
                                ))}
                            </ul>
                            <button
                                onClick={() => setFlag(false)}
                                className="bg-red-500 mt-6 w-full text-white px-4 py-2 rounded-md"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className="flex-grow container mx-auto px-4 py-6">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Olá, {dadosUserAtendente?.nome}!
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-500 mr-3">
                                <i className="fas fa-users"><BsCalendar2CheckFill />
                                </i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Agendamento Hoje</p>
                                <h3 className="text-xl font-bold">{agendamentosDoDia.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 rounded-full text-green-500 mr-3">
                                    <i className='fas fa-users'><BsCheckCircle /></i>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Concluídos (Semanal)</p>
                                    <h3 className="text-xl font-bold">{AgendamentosConcluidosDaSemana.length}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mb-8'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Agenda de Hoje
                    </h2>
                    <div className='w-full'>
                        {agendamentosDoDia.length < 1 ? (
                            <p className="text-center text-gray-500 mt-4">Nenhum agendamento no dia de hoje</p>
                        ) : (
                            <AppointmentList agendamentos={agendamentosDoDia} />
                        )}
                    </div>
                </div>

                <div className='mb-8'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Agendamentos Pendentes
                    </h2>
                    <div className="w-full">
                        {AgendamentosPendentes.length > 0 ? (
                            <AppointmentList agendamentos={AgendamentosPendentes} />
                        ) : (
                            <p className="text-center text-gray-500 mt-4">Nenhum agendamento encontrado.</p>
                        )}
                    </div>

                </div>

                <div className='flex w-full justify-between text-center '>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Todos agendamentos</h3>
                    </div>
                    <span onClick={() => router.push('./funcionario/agendamentos')} className='text-sm text-blue-600 cursor-pointer'>Ver mais</span>
                </div>
            </div>
        </>
    )
}

export default page;