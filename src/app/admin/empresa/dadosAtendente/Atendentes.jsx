'use client'

import React, { useEffect, useState } from 'react';
import { BsFillPencilFill, BsCalendar2EventFill, BsFilePerson, BsXLg } from "react-icons/bs";
import ModalEditarAtendente from './EditAtendentes';
import ModalNovoFunc from './NewAtendente';

function ModalFuncionarios({ empresa_id, funcionarios, onClose, onEdit }) {
    const [modalEditAtendente, setModalEditAtendente] = useState(false);
    const [modalNovoFunc, setModalNovoFunc] = useState(false);
    const [selectedAtendente, setSelectedAtendente] = useState(null);

    return (
        <>
            {modalNovoFunc && (
                <ModalNovoFunc
                    Empresa_id={empresa_id}
                    onClose={() => setModalNovoFunc(false)} />
            )}

            {modalEditAtendente && selectedAtendente !== null && funcionarios[selectedAtendente] && (
                <ModalEditarAtendente
                    funcionario={funcionarios[selectedAtendente]}
                    onChange={() => { funcionarios[selectedAtendente] }}
                    onClose={() => setModalEditAtendente(false)}
                />
            )}

            <div className="inset-0 bg-white bg-opacity-50 flex items-center justify-center flex-col">
                <div className="p-6 rounded-lg shadow-lg w-[90%] max-w-[800px] flex flex-col items-center space-y-6 overflow-y-auto bg-white">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="text-2xl font-bold text-center">Funcionários</h2>
                        <button onClick={onClose} className=" cursor-pointer hover:text-blue-200 transition-colors text-xl">
                            <BsXLg />
                        </button>
                    </div>

                    <hr className="w-full border-gray-600" />

                    <div className="w-full flex justify-end">
                        <button
                            className="text-white px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
                            onClick={() => setModalNovoFunc(true)}
                        >
                            Novo funcionário
                        </button>
                    </div>

                    <h2 className="text-center text-gray-400 mb-4">Selecione o funcionário desejado:</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {funcionarios.map((funcionario, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-lg flex flex-col space-y-4 shadow-md"
                            >
                                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                                    <div className="w-10 h-10 border rounded-full flex items-center justify-center">
                                        <BsFilePerson />
                                    </div>
                                    <div className="flex-1 px-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{funcionario.nome}</h3>
                                        <p className="text-sm text-gray-500">{funcionario.cargo}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">CPF:</span>
                                        <span className="font-medium">{funcionario.cpf}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Telefone:</span>
                                        <span className="font-medium">
                                            {funcionario.telefone ? (
                                                funcionario.telefone
                                            ) : (
                                                <span className="text-gray-400 italic">Telefone não cadastrado</span>
                                            )}
                                        </span>

                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-medium text-blue-500 truncate">{funcionario.email}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                    <button
                                        className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white flex items-center gap-2"
                                        onClick={() => onEdit(i)}
                                    >
                                        <BsCalendar2EventFill />
                                        Expediente
                                    </button>
                                    <button
                                        className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white flex items-center gap-2"
                                        onClick={() => {
                                            setSelectedAtendente(i);
                                            setModalEditAtendente(true);
                                        }}
                                    >
                                        <BsFillPencilFill />
                                        Editar
                                    </button>
                                </div>

                                <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
                                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-sm text-gray-600">Disponível para atendimento</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white mt-6 py-2 rounded-md max-w-[300px] transition"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </>
    );
}

export default ModalFuncionarios;
