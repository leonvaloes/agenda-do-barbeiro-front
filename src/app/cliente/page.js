'use client'

import React, { useEffect, useState } from 'react';
import { BsCalendar3, BsCalendar2, BsHouseFill } from "react-icons/bs";
import Cookies from 'js-cookie';

export default function page() {
    const URL = "http://localhost:3000"
    const [agendamentos, setAgendamentos] = useState([]);
    const [cliente, setCliente] = useState(null);

    const fetchGetAgendamentosCliente = async (ClienteId) => {
        try {
            const response = await fetch(`${URL}/agendamento/getAgendamentosByCliente/${ClienteId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            setAgendamentos(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getEmpresa = (nomeEmpresa) => {
        window.location.href = `/empresa/${nomeEmpresa}`;
    };
   

    const fetchGetCliente = async (idUser) => {
        try {
            const response = await fetch(`${URL}/cliente/${idUser}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setCliente(data[0]);
            fetchGetAgendamentosCliente(data[0].cliente_id);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const idUser = Cookies.get('id');
        fetchGetCliente(idUser);
    }, []);

    const getStatusClass = (estado) => {
        switch (estado.toLowerCase()) {
            case 'confirmação':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmado':
                return 'bg-blue-100 text-blue-800';
            case 'concluído':
                return 'bg-green-100 text-green-800';
            case 'cancelado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container min-h-screen">
            <div className="p-[30px]">
                <h1 className="flex items-center text-[24px] font-bold">
                    <BsCalendar3 className="mr-[10px]" /> Meus agendamentos
                </h1>
                <span className="text-gray-600">Aqui você vê seus últimos agendamentos</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold">Últimos Agendamentos</h2>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {agendamentos.map((agendamento, index) => (
                    <div key={index} className="p-10 hover:bg-gray-50 transition duration-150 card-hover">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start space-x-4">
                                <div>
                                    <h3 className="font-bold">{agendamento.nome_servico}</h3>
                                    <p className="text-gray-600 text-sm">Com {agendamento.nome_atendente}</p>
                                    <div className="flex items-center mt-1 text-sm text-gray-500">
                                        <BsCalendar2 className="mr-1.5" />
                                        <span>
                                            {new Date(agendamento.data_hora).toLocaleString('pt-BR', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            }).replace(',', ' •')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(agendamento.estado)}`}>
                                    {agendamento.estado}
                                </span>
                                <button onClick={()=>getEmpresa(agendamento.nome_empresa)} className="flex items-center text-blue-600 hover:text-blue-800">
                                    Empresa <BsHouseFill className="ml-[10px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
