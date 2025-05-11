'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BsCalendar2CheckFill, BsFillPeopleFill, BsCardChecklist, BsFillStarFill, BsCaretRightFill, BsCheck, BsCheckCircle } from "react-icons/bs";
import Cookies from 'js-cookie';
import { AppointmentList } from '@/components/appointmentCard/AppointmentList';


function page() {

    const [dadosAtendente, setDadosAtendente] = useState(null);
    const [dadosUserAtendente, setDadosUserAtendente] = useState(null);

    const [agendamentosDoDia, setAgendamentosDoDia] = useState([]);
    const [proximosAgendamentos, setProximosAgendamentos] = useState([]);


    const router = useRouter();
    const URL = "http://localhost:3000";

    const fetchGetProximosAgendamentos = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getProximosAgendamentosByAtendente/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            setProximosAgendamentos(data);
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
            fetchGetInfoUserByAtendenteId(Userid);
            fetchGetAgendamentosDoDia(data);
            fetchGetProximosAgendamentos(data);
        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        const idUser = Cookies.get('id');
        fetchGetAtendenteByIdUser(idUser);

    }, []);

    return (
        <>
            <main className="flex-grow container mx-auto px-4 py-6">
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
                                    <h3 className="text-xl font-bold">24</h3>
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
                        Próximos Agendamentos
                    </h2>
                    <div className="w-full">
                        {proximosAgendamentos.length > 0 ? (
                            <AppointmentList agendamentos={proximosAgendamentos} />
                        ) : (
                            <p className="text-center text-gray-500 mt-4">Nenhum agendamento encontrado.</p>
                        )}
                    </div>

                </div>

                <div className='flex w-full justify-between text-center '>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Todos agendamentos</h3>
                    </div>
                    <span onClick={()=>router.push('./funcionario/agendamentos')} className='text-sm text-blue-600 cursor-pointer'>Ver mais</span>
                </div>

            </main>
        </>
    );
}

export default page;