'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { BsCalendar2CheckFill, BsFillPeopleFill, BsCardChecklist, BsFillStarFill, BsCaretRightFill, BsCheck, BsCheckCircle } from "react-icons/bs";
import Cookies from 'js-cookie';
import { AppointmentList } from '@/components/appointmentCard/AppointmentList';


function page() {



    // const agendamentos = [
    //     {
    //         nome: 'Zezin',
    //         servico_name: 'Corte de pescoço',
    //         horario_inicio: '12:00',
    //         horario_fim: '14:30',
    //         status: 'confirmado',
    //     },
    //     {
    //         nome: 'Padre Fabio de melo',
    //         servico_name: 'Corta fimose',
    //         horario_inicio: '12:00',
    //         horario_fim: '14:30',
    //         status: 'cancelado',
    //     },
    //     {
    //         nome: 'Pôncio Pilatos',
    //         servico_name: 'Crucificação',
    //         horario_inicio: '03:00',
    //         horario_fim: '06:66',
    //         status: 'confirmado',
    //     },
    //     {
    //         nome: 'Cleitinho do Açougue',
    //         servico_name: 'Depilação no Cu',
    //         horario_inicio: '13:00',
    //         horario_fim: '13:01',
    //         status: 'confirmado',
    //     },
    //     {
    //         nome: 'Jesus',
    //         servico_name: 'Vai Voltar',
    //         horario_inicio: '13:00',
    //         horario_fim: '13:01',
    //         status: 'cancelado',
    //     },
    //     {
    //         nome: 'Toninho do Cemitério',
    //         servico_name: 'Enterro',
    //         horario_inicio: '06:00',
    //         horario_fim: 'N/A',
    //         status: 'concluido',
    //     },
    //     {
    //         nome: 'João Sem Braço',
    //         servico_name: 'Manicure',
    //         horario_inicio: '10:00',
    //         horario_fim: '10:05',
    //         status: 'concluido',
    //     }
    // ];


    const [dadosAtendente, setDadosAtendente] = useState(null);
    const [dadosUserAtendente, setDadosUserAtendente] = useState(null);
    const [agendamentos, setAgendamentos]=useState([]);

    const router = useRouter();
    const URL = "http://localhost:3000";

    const fetchGetAgendamentos = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getAgendamentosByAtendente/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAgendamentos(data);
            console.log("DATA AQUI O: ",data);
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
            fetchGetAgendamentos(data);
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
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Olá, {dadosUserAtendente?.nome}!
                    </h2>
                </section>
                <section className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-500 mr-3">
                                <i className="fas fa-users"><BsCalendar2CheckFill />
                                </i>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Agendamento Hoje</p>
                                <h3 className="text-xl font-bold">123</h3>
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
                </section>
                <div className='mb-8'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Agenda de Hoje
                    </h2>
                    <div className='w-full'>
                        <AppointmentList agendamentos={agendamentos} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default page;