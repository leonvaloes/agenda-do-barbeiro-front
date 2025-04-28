'use client'

import { useEffect, useState } from 'react';
import funcionario from '../funcionario/funcionario';


function Page() {

    const [modalFuncionarios, setModalFuncionarios] = useState(false);
    const URL = "http://localhost:3000";

    const [dadosEmpresa, setDadosEmpresa] = useState(null);
    const [funcionarios, setFuncionarios] = useState([]);

    const [modalEditAtendente, setModalEditAtendente] = useState(false);

    const [SelectedAtendente, setSelectedAtendente] = useState(null);


    const abrirModalFunc = () => {
        setModalFuncionarios(true);
        fetchGetFuncEmpresa();
    }

    const fetchGetDadosEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok)
                throw new Error('Erro ao buscar dados da empresa');

            const data = await response.json();
            setDadosEmpresa(data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGetFuncEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/getFunc/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setFuncionarios(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


    const handleUpdateEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosEmpresa)
            });

            if (!response.ok)
                throw new Error('Erro ao atualizar dados da empresa');

            const data = await response.json();
            setDadosEmpresa(data);
        } catch (error) {
            console.error(error);
        }
    };

    function abrirModalEdit(i) {
        setSelectedAtendente(i);
        setModalEditAtendente(true);
    }

    useEffect(() => {
        fetchGetDadosEmpresa();
    }, []);

    return (
        <>
            {!!modalEditAtendente && SelectedAtendente !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-51 flex items-center justify-center flex-col">
                    <div className="bg-[#111111] p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] flex flex-col items-center space-y-6 overflow-y-auto">
                        <h2 className="text-white text-2xl font-bold text-center">Editar Atendente</h2>
                        <hr className="w-full border-gray-600" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <div className="bg-[#222222] p-4 rounded-md flex flex-col space-y-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-400 mb-1">Nome:</label>
                                    <input
                                        type="text"
                                        className="bg-[#333333] text-white p-2 rounded-md"
                                        value={funcionarios[SelectedAtendente]?.nome || ''}
                                        onChange={(e) => {
                                            const novosFuncionarios = [...funcionarios];
                                            novosFuncionarios[SelectedAtendente].nome = e.target.value;
                                            setFuncionarios(novosFuncionarios);
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-400 mb-1">CPF:</label>
                                    <input
                                        type="text"
                                        className="bg-[#333333] text-white p-2 rounded-md"
                                        value={funcionarios[SelectedAtendente]?.cpf || ''}
                                        onChange={(e) => {
                                            const novosFuncionarios = [...funcionarios];
                                            novosFuncionarios[SelectedAtendente].cpf = e.target.value;
                                            setFuncionarios(novosFuncionarios);
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-400 mb-1">Telefone:</label>
                                    <input
                                        type="text"
                                        className="bg-[#333333] text-white p-2 rounded-md"
                                        value={funcionarios[SelectedAtendente]?.telefone || ''}
                                        onChange={(e) => {
                                            const novosFuncionarios = [...funcionarios];
                                            novosFuncionarios[SelectedAtendente].telefone = e.target.value;
                                            setFuncionarios(novosFuncionarios);
                                        }}
                                    />
                                </div>

                                <div className="flex justify-between gap-4 mt-4">
                                    <button className="p-2 rounded-[10px] flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a2 2 0 00-2-2H9a2 2 0 00-2 2m12 0H5" />
                                        </svg>
                                    </button>

                                    <button className=" p-2 rounded-[10px] flex items-center gap-2">
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-red-900 mt-6 p-2 rounded-md max-w-[300px]" onClick={() => setModalEditAtendente(false)}>Fechar</button>
                    </div>
                </div>
            )}


            {!!modalFuncionarios && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-[#111111] p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] flex flex-col items-center space-y-6 overflow-y-auto">
                        <h2 className="text-white text-2xl font-bold text-center">Funcionários</h2>
                        <hr className="w-full border-gray-600" />
                        <h2 className="text-center text-gray-400 mb-4">Selecione o funcionário desejado:</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {funcionarios.map((funcionario, i) => (
                                <div
                                    key={i}
                                    className={`bg-[#222222] p-4 rounded-md cursor-pointer flex flex-col space-y-2`}
                                >
                                    <div className="flex justify-between border-b border-b-gray-500 mb-[20px]">
                                        <span className="p-[15px] rounded-[100%] bg-yellow-600"></span>
                                        <span className="text-white">{funcionario.nome}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400">CPF:</span>
                                        <span className="text-white">{funcionario.cpf}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Telefone:</span>
                                        <span className="text-white"></span>
                                    </div>

                                    <div className="flex justify-between">
                                        <button className="bg-blue-600 p-[10px] rounded-[10px]">Visualizar expediente</button>
                                        <button className="bg-blue-600 p-[10px] rounded-[10px]" onClick={() => abrirModalEdit(i)}>Editar</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="w-full bg-red-900 mt-6 p-2 rounded-md max-w-[300px]"
                            onClick={() => setModalFuncionarios(false)}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}




            <h1>Empresa</h1>
            <button className='bg-blue-600 rounded-[10px] p-[10px]'>Editar dados</button>
            <button className='bg-blue-600 rounded-[10px] p-[10px]' onClick={() => abrirModalFunc()}>Gerenciar funcionario</button>
        </>
    );
}

export default Page;
