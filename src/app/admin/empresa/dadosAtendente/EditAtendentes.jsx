"use client"

import { useState, useEffect } from 'react';
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";

export default function ModalEditarAtendente({ funcionario, onClose, onChange }) {
    const [dados, setDados] = useState({ nome: '', cpf: '', telefone: '', email: '' });

    useEffect(() => {
        if (funcionario) {
            setDados({
                nome: funcionario.nome || '',
                cpf: funcionario.cpf || '',
                telefone: funcionario.telefone || '',
                email: funcionario.email || '',
            });
        }
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [funcionario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const fetchExcluirFuncionario = (id) => {
        try {
            fetch(`http://localhost:3000/atendente/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir funcionário');
                }
                return response.json();
            })
            .then(data => {
                window.location.reload();
                onClose();
            })
        } catch (error) {
            console.error('Erro:', error);
        };
    }

    const fetchAtualizarFuncionario = (id) => {
        console.log(dados);

        fetch(`http://localhost:3000/atendente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...funcionario, ...dados}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar funcionário');
            }
            return response.json();
        })
        .then(data => {
            console.log('Funcionário atualizado:', data);
            onChange(data); 
            window.location.reload();
            onClose();  
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    const handleSalvar = () => {
       fetchAtualizarFuncionario(funcionario.atendente_id);
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Editar Atendente</h2>
                        <button className="text-white hover:text-blue-200 transition-colors cursor-pointer" onClick={onClose}>
                            <BsXLg />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                <i className="fas fa-user mr-2 text-blue-500"></i>Nome completo
                            </label>
                            <input
                                name="nome"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="Digite o nome"
                                value={dados.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                <i className="fas fa-id-card mr-2 text-blue-500"></i>CPF
                            </label>
                            <input
                                name="cpf"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="000.000.000-00"
                                value={dados.cpf}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                <i className="fas fa-phone mr-2 text-blue-500"></i>Telefone
                            </label>
                            <input
                                name="telefone"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="(00) 00000-0000"
                                value={dados.telefone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                <i className="fas fa-envelope mr-2 text-blue-500"></i>E-mail
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="atendente@empresa.com"
                                value={dados.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
                    <button
                        className="cursor-pointer bg-red-500 px-6 py-2 border border-red-300 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                        onClick={() => fetchExcluirFuncionario(funcionario.id)}
                    >
                        <BsXLg className="mr-2" /> Excluir
                    </button>

                    <button
                        onClick={handleSalvar}
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                        <BsFillSdCardFill className="mr-2 " /> Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}
