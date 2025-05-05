'use client';

import React, { useState, useEffect } from 'react';
import ModalEditarServico from '../ModalEditarServico';
import ModalNovoServ from './NewService';
import { useParams } from 'next/navigation';
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

function page() {
    const URL = 'http://localhost:3000';
    const { id } = useParams();

    const [modalNovoServ, setModalNovoServ] = useState(false);
    const [modalEditarServ, setModalEditarServ] = useState(false);
    const [selectedServico, setSelectedServico] = useState(null);
    const [servicos, setServicos] = useState([]);

    const getServEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/listServ/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) 
                throw new Error('Erro ao buscar serviços da empresa');
            const data = await response.json();
            console.log(data, id)
            setServicos(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (id) getServEmpresa();
    }, [id]);

    useEffect(() => {
        console.log("modalEditarServ:", modalEditarServ);
        getServEmpresa();
    }, [modalEditarServ]);


    return (
        <>
            {!!modalEditarServ && (
                <ModalEditarServico
                    servico={servicos[selectedServico]}
                    onClose={() => { setModalEditarServ(false) }}
                />
            )}

            {!!modalNovoServ && (
                <ModalNovoServ 
                    onClose={() => setModalNovoServ(false)} 
                />
            )}

            <div className=" inset-0 bg-white bg-opacity-50 flex items-center justify-center flex-col">
                <div className=" p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] flex flex-col items-center space-y-6 overflow-y-auto">
                    <div className="flex w-full justify-between">
                        <h2 className=" text-2xl font-bold text-center">Serviços</h2>
                        <button className=" hover:text-blue-200 transition-colors">
                            <i onClick={() => window.history.back()}><BsXLg /></i>
                        </button>
                    </div>

                    <hr className="w-full border-gray-600" />

                    <div className="w-full flex justify-end">
                        <button className="text-white p-[10px] rounded-[5px] bg-blue-600 cursor-pointer" onClick={() => setModalNovoServ(true)}>Novo serviço</button>
                    </div>
                    <h2 className="text-center text-gray-400 mb-4">Selecione o funcionário desejado:</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {servicos.map((servico, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-l flex flex-col space-y-4 shadow-md"
                            >
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                                    <div className="flex-1 px-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{servico.nome}</h3>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-id-card mr-2"></i>
                                            <span>Descrição:</span>
                                        </div>
                                        <span className="font-medium">{servico.descricao}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-phone mr-2"></i>
                                            <span>Tempo médio:</span>
                                        </div>
                                        <span className="font-medium">{servico.tempo_medio} minutos</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center text-gray-600">
                                            <i className="fas fa-envelope mr-2"></i>
                                            <span>Valor:</span>
                                        </div>
                                        <span className="font-medium text-blue-500 truncate">{servico.valor}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                    <button className="border-[1px] p-[10px] rounded-[10px] text-sm font-medium bg-blue-600 text-white flex items-center justify-between cursor-pointer"
                                        onClick={() => {
                                            setSelectedServico(i);
                                            setModalEditarServ(true);
                                        }}>
                                        <span className='mr-[10px]'><BsFillPencilFill /></span>
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-red-500 text-white mt-6 p-2 rounded-md max-w-[300px] cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        voltar
                    </button>
                </div>
            </div>
        </>
    );
}
export default page;