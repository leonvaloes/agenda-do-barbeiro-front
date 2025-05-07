'use client'

import React, { useEffect, useState } from 'react';
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { useParams } from 'next/navigation';

export default function NewService({ onClose }) {

    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const URL = "http://localhost:3000";
    const { id } = useParams();

    const [dados, setDados] = useState({
        nome: '',
        descricao: '',
        valor: '',
        tempo_medio: '',
        funcionarios: []
    });

    const [erros, setErros] = useState({
        nome: false,
        descricao: false,
        valor: false,
        tempo_medio: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
        setErros(prev => ({ ...prev, [name]: false })); // limpa o erro ao digitar
    };

    const fetchNovoSevice = async () => {
        const camposObrigatorios = {
            nome: dados.nome.trim() === '',
            descricao: dados.descricao.trim() === '',
            valor: dados.valor.trim() === '',
            tempo_medio: dados.tempo_medio.trim() === ''
        };

        setErros(camposObrigatorios);

        if (camposObrigatorios.nome || camposObrigatorios.descricao || camposObrigatorios.valor || camposObrigatorios.tempo_medio) {
            toast.error("Preencha todos os campos obrigatórios!", { position: "top-center" });
            return;
        }
        try {
            const response = await fetch(`${URL}/servicos/CriarEassociar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                window.location.reload();
            } else {
                toast.error("Erro ao cadastrar Serviço!", { position: "top-center" });
            }

        } catch (error) {
            console.error(error);
            toast.error("Erro na requisição!", { position: "top-center" });
        }
    };

    const fetchFuncionarios = async () => {
        try {
            const res = await fetch(`${URL}/empresa/getFunc/${id}`);
            const data = await res.json();
            console.log(data);
            setListaFuncionarios(data);
        } catch (err) {
            console.error('Erro ao buscar funcionários', err);
        }
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-50 rounded-xl shadow-2xl max-w-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Criar novo Serviço</h2>
                        <button className="text-white hover:text-blue-200" onClick={onClose}>
                            <BsXLg size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Serviço</label>
                            <input
                                name="nome"
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${erros.nome ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Nome do serviço"
                                value={dados.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descrição</label>
                            <input
                                name="descricao"
                                type="text"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${erros.descricao ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Descreva o serviço prestado"
                                value={dados.descricao}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Valor</label>
                            <input
                                name="valor"
                                type="number"
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none ${erros.valor ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="R$ 00,00"
                                value={dados.valor}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tempo médio</label>
                            <input
                                name="tempo_medio"
                                type="number"
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none ${erros.tempo_medio ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Tempo médio do serviço prestado"
                                value={dados.tempo_medio}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Funcionários responsáveis</label>

                            <div className="border border-gray-300 rounded-lg p-2 bg-white">
                                {listaFuncionarios.map(func => (
                                    <div
                                        key={func.id}
                                        onClick={() => {
                                            setDados(prev => {
                                                const alreadySelected = prev.funcionarios.includes(func.id);
                                                return {
                                                    ...prev,
                                                    funcionarios: alreadySelected
                                                        ? prev.funcionarios.filter(id => id !== func.id)
                                                        : [...prev.funcionarios, func.id]
                                                };
                                            });
                                        }}
                                        className={`px-4 py-2 my-1 rounded-md cursor-pointer transition-colors ${dados.funcionarios.includes(func.id)
                                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                            : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        {func.nome}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">
                                    {dados.funcionarios.length} {dados.funcionarios.length === 1 ? 'selecionado' : 'selecionados'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setDados(prev => ({ ...prev, funcionarios: [] }))}
                                    className={`text-sm ${dados.funcionarios.length > 0
                                        ? 'text-blue-600 hover:text-blue-800'
                                        : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={dados.funcionarios.length === 0}
                                >
                                    Limpar seleção
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="py-4 flex justify-between border-t border-gray-200">
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center" onClick={onClose}>
                            <BsXLg className="mr-2" /> Cancelar
                        </button>

                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            onClick={fetchNovoSevice}>
                            <BsFillSdCardFill className="mr-2" /> Criar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}