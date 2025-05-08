'use client'

import React, { useState } from 'react';
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";
import { toast } from "react-toastify";

export default function NewAtendente({ Empresa_id ,onClose }) {

    const [dados, setDados] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        empresa_id: Empresa_id,
        senha: ''
    });

    const [erros, setErros] = useState({
        nome: false,
        cpf: false,
        senha: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
        setErros(prev => ({ ...prev, [name]: false }));
    };

    const fetchNovoFunc = async () => {
        const camposObrigatorios = {
            nome: dados.nome.trim() === '',
            cpf: dados.cpf.trim() === '',
            senha: dados.senha.trim() === ''
        };

        setErros(camposObrigatorios);

        if (camposObrigatorios.nome || camposObrigatorios.cpf || camposObrigatorios.senha) {
            toast.error("Preencha todos os campos obrigatórios!", { position: "top-center" });
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/atendente`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                toast.error("Erro ao cadastrar atendente!", { position: "top-center" });
            }

        } catch (error) {
            console.error(error);
            toast.error("Erro na requisição!", { position: "top-center" });
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-50 rounded-xl shadow-2xl max-w-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Criar novo Atendente</h2>
                        <button className="text-white hover:text-blue-200" onClick={onClose}>
                            <BsXLg size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
                            <input
                                name="nome"
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${erros.nome ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="José da Silva Santos"
                                value={dados.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">CPF</label>
                            <input
                                name="cpf"
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${erros.cpf ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="XXX.XXX.XXX-XX"
                                value={dados.cpf}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                            <input
                                name="telefone"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="(99) 99999-9999"
                                value={dados.telefone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="exemplo@email.com"
                                value={dados.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Senha</label>
                            <input
                                name="senha"
                                type="password"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${erros.senha ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Senha"
                                value={dados.senha}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="py-4 flex justify-between border-t border-gray-200">
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center" onClick={onClose}>
                            <BsXLg className="mr-2" /> Cancelar
                        </button>

                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            onClick={fetchNovoFunc}>
                            <BsFillSdCardFill className="mr-2" /> Criar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
