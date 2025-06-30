'use client'

import { useEffect, useState } from 'react';
import ModalFuncionarios from './dadosAtendente/Atendentes';
import ModalAgendamentos from './EditAgendamentos/ModalAgendamentos ';
import { useRouter } from 'next/navigation';
import { BsCalendar2CheckFill, BsFillPeopleFill, BsCardChecklist, BsFillStarFill, BsCaretRightFill, BsPencil, BsTrash2 } from "react-icons/bs";
import Cookies from 'js-cookie';

function Page() {

    const router = useRouter();
    const URL = "http://localhost:3000";
    const [modalFuncionarios, setModalFuncionarios] = useState(false);
    const [dadosUserEmpresa, setDadosUserEmpresa] = useState(null);
    const [servicos, setServicos] = useState([])
    const [funcionarios, setFuncionarios] = useState([]);
    const [principal, setPrincipal] = useState(true);
    const [ajustarAgendamentos, setAjustarAgendamentos] = useState(false);
    const [agendamentos, setAgendamentos] = useState(null);

    const abrirModalFunc = () => {
        setModalFuncionarios(true);
        setPrincipal(false);
    };

    const fetchGetAgendamentos = async (id) => {
        try {
            const response = await fetch(`${URL}/agendamento/getAgendamentosByEmpresa/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAgendamentos(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetServicos = async (idEmpresa) => {
        try {
            const response = await fetch(`${URL}/empresa/listServ/${idEmpresa}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setServicos(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetFuncEmpresa = async (idEmpresa) => {
        try {
            const response = await fetch(`${URL}/empresa/getFunc/${idEmpresa}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setFuncionarios(data);
        } catch (error) {
            console.log("Nenhum funcionario");
        }
    };

    const fetchGetEmpresaByIdUser = async (idUser) => {
        try {
            const response = await fetch(`${URL}/empresa/getUser/${idUser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDadosUserEmpresa(data[0]);
            fetchGetFuncEmpresa(data[0].id);
            fetchGetServicos(data[0].id);
            fetchGetAgendamentos(data[0].id);
        } catch (e) {
            console.error(e);
        }
    }

    function abrirModalEdit(i) {
        setSelectedAtendente(i);
    };

    useEffect(() => {
        const role= Cookies.get('role');
        if(role !== 'EMPRESA'){
            router.push('/auth');
        }
        const idUser = Cookies.get('id');
        fetchGetEmpresaByIdUser(idUser);
    }, []);

    return (
        <>
            {!!modalFuncionarios && (
                <ModalFuncionarios
                    empresa_id={dadosUserEmpresa.id}
                    funcionarios={funcionarios}
                    onClose={() => { setModalFuncionarios(false), setPrincipal(true) }}
                    onEdit={abrirModalEdit}
                />
            )}

            {!!ajustarAgendamentos && (
                <ModalAgendamentos data={agendamentos} onClose={() => setAjustarAgendamentos(false)} />
            )}

            {!!principal && (
                <>
                    <div className="flex-grow container mx-auto px-4 py-6">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                Olá, {dadosUserEmpresa?.nome}!
                            </h2>
                            <p className="text-gray-600">Gerencie seus funcionários e serviços de forma simples e eficiente.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center">
                                    <div className="p-2 bg-blue-100 rounded-full text-blue-500 mr-3">
                                        <i className="fas fa-users"><BsFillPeopleFill />
                                        </i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Funcionários</p>
                                        <h3 className="text-xl font-bold">{funcionarios?.length}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center">
                                    <div className="p-2 bg-green-100 rounded-full text-green-500 mr-3">
                                        <i><BsCardChecklist /></i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Serviços</p>
                                        <h3 className="text-xl font-bold">{servicos?.length}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center">
                                    <div className="p-2 bg-purple-100 rounded-full text-purple-500 mr-3">
                                        <i><BsCalendar2CheckFill />
                                        </i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Agendamentos</p>
                                        <h3 className="text-xl font-bold">{agendamentos?.length}</h3>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Gerenciamento</h3>
                            <div className="space-y-4">
                                <button className="w-full py-4 px-6 rounded-xl text-white font-medium cursor-pointer flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500"
                                    onClick={() => abrirModalFunc()}
                                >
                                    <span>Gerenciar Funcionários</span>
                                    <span><BsCaretRightFill /></span>
                                </button>
                                <button
                                    className="w-full py-4 px-6 rounded-xl cursor-pointer text-white font-medium flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-500"
                                    onClick={() => {
                                        router.push(`/admin/empresa/dadosAtendente/servicos/${dadosUserEmpresa?.id}`);
                                    }}
                                >
                                    <span>Gerenciar Serviços</span>
                                    <span><BsCaretRightFill /></span>
                                </button>
                                <button className="w-full py-4 px-6 rounded-xl cursor-pointer text-white font-medium flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-700 hover:to-yellow-500"
                                    onClick={() => {
                                        setAjustarAgendamentos(true)
                                    }}
                                >
                                    <span>Ajustar Agendamentos</span>
                                    <span><BsCaretRightFill /></span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Agendamentos Recentes</h3>
                                <span onClick={() => router.push('./empresa/TabelaAgendamentos')} className="text-blue-500 text-sm cursor-pointer">Ver todos</span>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="divide-y divide-gray-100">

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Page;