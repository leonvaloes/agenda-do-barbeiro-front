'use client'

import Table from "@/components/Table/Table";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/ButtonBack";
import { useRouter } from "next/navigation";
import { BsPlusLg, BsCalendar2CheckFill, BsCheckCircle, BsClock, BsXCircle } from "react-icons/bs";

function page() {
    const URL = "http://localhost:3000";
    const router=useRouter();

    const columns = [
        { field: "nome_cliente", headerName: "Cliente" },
        { field: "nome_servico", headerName: "Serviço" },
        { field: "nome_atendente", headerName: "Atendente" },
        {
            field: "estado",
            headerName: "Status",
            renderCell: ({ row }) => {
                const estado = row.estado?.toLowerCase();

                const cores = {
                    concluído: "text-green-600 font-semibold",
                    cancelado: "text-red-600 font-semibold",
                    confirmação: "text-yellow-500 font-semibold",
                    confirmado: "text-blue-600 font-semibold",
                };

                return (
                    <span className={cores[estado] || "text-gray-500"}>
                        {row.estado}
                    </span>
                );
            }
        }
        ,
        {
            field: "data_hora",
            headerName: "Data",
            renderCell: ({ row }) => {
                const data = new Date(row.data_hora);
                const formatado = data.toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return formatado;
            }
        }
    ];

    const [agendamentos, setAgendamentos] = useState([]);
    const [dadosEmpresa, setDadosEmpresa] = useState(null);
    const [selected, setSelected] = useState(null);

    const fetchGetAgendamentos = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getAgendamentosByEmpresa/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log("teoricamente agendametos",data)
            setAgendamentos(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetEmpresaByIdUser = async (Userid) => {
        try {
            const response = await fetch(`${URL}/empresa/getUser/${Userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDadosEmpresa(data[0]);
            console.log("dados empresa", data[0])
            fetchGetAgendamentos(data[0].id);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const idUser = Cookies.get('id');
        fetchGetEmpresaByIdUser(idUser);
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <Button onClick={() => router.back()} childreen={"Voltar"}></Button>
                <div className="mb-8 flex flex-col lg:flex-row w-full justify-between items-start lg:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                            Agendamentos
                        </h1>
                        <span className="text-gray-600 text-sm sm:text-base">
                            Visualize e gerencie todos os agendamentos da {dadosEmpresa?.nome}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-4 bg-purple-100 rounded-full text-purple-500 mr-3">
                                <BsCalendar2CheckFill className="text-2xl sm:text-3xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total agendamentos</p>
                                <h3 className="text-xl font-bold">{agendamentos.length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-4 bg-green-100 rounded-full text-green-500 mr-3">
                                <BsCheckCircle className="text-2xl sm:text-3xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Concluídos</p>
                                <h3 className="text-xl font-bold">
                                    {agendamentos.filter(agendamento=>agendamento.estado==="concluído").length}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-4 bg-yellow-100 rounded-full text-yellow-600 mr-3">
                                <BsClock className="text-2xl sm:text-3xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pendentes</p>
                                <h3 className="text-xl font-bold">{agendamentos.filter(agendamento=>agendamento.estado==="confirmação").length}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center">
                            <div className="p-4 bg-red-100 rounded-full text-red-500 mr-3">
                                <BsXCircle className="text-2xl sm:text-3xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cancelados</p>
                                <h3 className="text-xl font-bold">{agendamentos.filter(agendamento=>agendamento.estado==="cancelado").length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Table className="" data={agendamentos} columns={columns} setSelectedLine={setSelected} />
                </div>
                
            </div>
        </>
    )
}

export default page;