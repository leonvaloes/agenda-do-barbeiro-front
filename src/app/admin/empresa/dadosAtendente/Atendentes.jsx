'use client'

import React, { useState } from 'react';
import { BsFillPencilFill, BsCalendar2EventFill, BsFilePerson, BsXLg } from "react-icons/bs";
import ModalEditarAtendente from './EditAtendentes';

function ModalFuncionarios({ funcionarios, onClose, onEdit }) {
    const [atendentes, setAtendentes] = useState(true);

    const [modalEditAtendente, setModalEditAtendente] = useState(false);
    const [SelectedAtendente, setSelectedAtendente] = useState(null);

    return (
        <>
            {!!modalEditAtendente && SelectedAtendente !== null && (
                <ModalEditarAtendente
                    funcionario={funcionarios[SelectedAtendente]}
                    onClose={() => {
                        setModalEditAtendente(false);
                        setAtendentes(true);
                    }}
                />
            )}

            {!!atendentes && (
                <div className=" inset-0 bg-white bg-opacity-50 flex items-center justify-center flex-col">
                    <div className=" p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] flex flex-col items-center space-y-6 overflow-y-auto">
                        <div className="flex w-full justify-between">
                            <h2 className=" text-2xl font-bold text-center">Funcionários</h2>
                            <button className=" hover:text-blue-200 transition-colors">
                                <i onClick={onClose}><BsXLg /></i>
                            </button>
                        </div>

                        <hr className="w-full border-gray-600" />
                        <h2 className="text-center text-gray-400 mb-4">Selecione o funcionário desejado:</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {funcionarios.map((funcionario, i) => (
                                <div
                                    key={i}
                                    className="bg-white p-6 rounded-lg cursor-pointer flex flex-col space-y-4 shadow-md"
                                >
                                    {/* Header with profile and name */}
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                                        <div className="w-10 h-10 border-[1px] rounded-full flex items-center justify-center">
                                            <i className="fas fa-user"><BsFilePerson />
                                            </i>
                                        </div>
                                        <div className="flex-1 px-4">
                                            <h3 className="text-lg font-semibold text-gray-800">{funcionario.nome}</h3>
                                            <p className="text-sm text-gray-500">{funcionario.cargo}</p>
                                        </div>
                                        <div className="text-yellow-500">
                                            <i className="fas fa-star"></i>
                                        </div>
                                    </div>

                                    {/* Information section */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-id-card mr-2"></i>
                                                <span>CPF:</span>
                                            </div>
                                            <span className="font-medium">{funcionario.cpf}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-phone mr-2"></i>
                                                <span>Telefone:</span>
                                            </div>
                                            <span className="font-medium">{funcionario.telefone}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-envelope mr-2"></i>
                                                <span>Email:</span>
                                            </div>
                                            <span className="font-medium text-blue-500 truncate">{funcionario.email}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-gray-600">
                                                <i className="fas fa-calendar-alt mr-2"></i>
                                                <span>Admissão:</span>
                                            </div>
                                            <span className="font-medium">{funcionario.admissao}</span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                        <button className="border-[1px] p-[10px] rounded-[10px] text-sm font-medium bg-blue-600 text-white flex items-center justify-between" onClick={() => onEdit(i)}>
                                            <i className="mr-[10px]"><BsCalendar2EventFill />
                                            </i>
                                            Expediente
                                        </button>
                                        <button className="border-[1px] p-[10px] rounded-[10px] text-sm font-medium bg-blue-600 text-white flex items-center justify-between"
                                            onClick={() => {
                                                setSelectedAtendente(i);
                                                setModalEditAtendente(true);
                                            }}>
                                            <span className='mr-[10px]'><BsFillPencilFill /></span>
                                            Editar
                                        </button>
                                    </div>

                                    {/* Status indicator */}
                                    <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                        <span className="text-sm text-gray-600">Disponível para atendimento</span>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <button
                            className="w-full bg-red-500 text-white mt-6 p-2 rounded-md max-w-[300px]"
                            onClick={onClose}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )
            }
        </>


    );
}

export default ModalFuncionarios;
