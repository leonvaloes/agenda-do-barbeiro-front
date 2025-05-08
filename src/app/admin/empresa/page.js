'use client'

import { useEffect, useState } from 'react';
import ModalFuncionarios from './dadosAtendente/Atendentes';
import { useRouter } from 'next/navigation';

import { BsCalendar2CheckFill, BsFillPeopleFill, BsCardChecklist, BsFillStarFill, BsCaretRightFill } from "react-icons/bs";
import Cookies from 'js-cookie';

function Page() {    

    const router = useRouter();    
    const URL = "http://localhost:3000";
    const [modalFuncionarios, setModalFuncionarios] = useState(false);
    const [dadosUserEmpresa, setDadosUserEmpresa] = useState(null);
    const [servicos, setServicos]=useState([])
    const [funcionarios, setFuncionarios] = useState([]);
    const [principal, setPrincipal] = useState(true);

    const abrirModalFunc = () => {
        setModalFuncionarios(true);
        setPrincipal(false);
    };

    const fetchGetServicos= async (idEmpresa) => {
        try{
            const response = await fetch(`${URL}/empresa/listServ/${idEmpresa}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setServicos(data);
        }catch(e){
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
            console.log("nenhum funcionario");
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
        } catch (e) {
            console.error(e);
        }
    }

    function abrirModalEdit(i) {
        setSelectedAtendente(i);
    };

    useEffect(() => {
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

            {!!principal && (
                <>
                    <main className="flex-grow container mx-auto px-4 py-6">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                Olá, {dadosUserEmpresa?.nome}!
                            </h2>
                            <p className="text-gray-600">Gerencie seus funcionários e serviços de forma simples e eficiente.</p>
                        </section>
                        <section className="grid grid-cols-2 gap-4 mb-8">
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
                                        <h3 className="text-xl font-bold">156</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center">
                                    <div className="p-2 bg-yellow-100 rounded-full text-yellow-500 mr-3">
                                        <i ><BsFillStarFill /></i>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Avaliação</p>
                                        <h3 className="text-xl font-bold">4.8</h3>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mb-8">
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
                            </div>
                        </section>
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Agendamentos Recentes</h3>
                                <a href="#" className="text-blue-500 text-sm">Ver todos</a>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="divide-y divide-gray-100">

                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="bg-white border-t border-gray-200 py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500 text-sm">© 2023 AgendaFácil</p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-500 hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" className="text-gray-500 hover:text-blue-400"><i className="fab fa-twitter"></i></a>
                                    <a href="#" className="text-gray-500 hover:text-pink-500"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
}

export default Page;