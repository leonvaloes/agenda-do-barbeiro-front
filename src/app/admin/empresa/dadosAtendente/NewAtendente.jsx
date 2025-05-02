'use client'

import React, { useState } from 'react';
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";


export default function newAtendente({ onClose }) {

    const [dados, setDados] = useState({
        nome: '',
        cpf: '',
        telefone: '',
        email: '',
        senha: ''
    });

    const fetchNovoFunc = async ()=>{
        try {
            console.log("DADOS: ",dados);
            const response = await fetch(`http://localhost:3000/atendente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(dados)
            });
            const data = await response.json();
            console.log("DATA: ",data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };


    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-50 rounded-xl shadow-2xl max-w-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Criar novo Atendente</h2>
                        <button className="text-white hover:text-blue-200 transition-colors" onClick={onClose}>
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Nome completo
                            </label>
                            <input
                                name="nome"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="José da Silva Santos"
                                value={dados.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                CPF
                            </label>
                            <input
                                name="cpf"
                                type="cpf"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="XXX.XXX.XXX-XX"
                                value={dados.cpf}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Telefone
                            </label>
                            <input
                                name="telefone"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="(99) 99999-9999"
                                value={dados.telefone}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                name="email"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="Exemplo@email.com"
                                value={dados.email}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                name="senha"
                                type="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="Senha"
                                value={dados.senha}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="py-4 flex justify-between border-t border-gray-200">
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center" onClick={onClose} >
                            <BsXLg className="mr-2" /> Cancelar
                        </button>

                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center" 
                            onClick={()=>fetchNovoFunc()}
                        >
                            <BsFillSdCardFill className="mr-2" /> Criar 
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}