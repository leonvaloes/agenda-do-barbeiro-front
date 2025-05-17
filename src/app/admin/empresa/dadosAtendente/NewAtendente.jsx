'use client'

import React, { useState } from 'react';
import { BsFillSdCardFill, BsXLg, BsClock, BsArrowLeft, BsHourglassSplit, BsSave } from "react-icons/bs";
import { toast } from "react-toastify";

export default function NewAtendente({ Empresa_id, onClose }) {
    const URL = "http://localhost:3000";

    const [modalExpediente, setModalExpediente] = useState(false);
    const [modalNew, setModalNew] = useState(true);

    const [expediente, setExpediente] = useState([
        { dia: 'Domingo', dia_semana: 1, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Segunda', dia_semana: 2, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Terça', dia_semana: 3, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Quarta', dia_semana: 4, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Quinta', dia_semana: 5, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Sexta', dia_semana: 6, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Sábado', dia_semana: 7, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' }
    ]);

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

    const handleExpedienteChange = (index, field, value) => {
        const updated = [...expediente];
        updated[index][field] = value;
        setExpediente(updated);
    };

    const fetchExpediente = async (id) => {
        console.log("Dados enviados no expediente:", JSON.stringify(expediente));

        try {
            const response = await fetch(`${URL}/atendente/expediente/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expediente)
            });
            if (response.ok) {
                window.location.reload();
            }

        } catch (e) {
            console.log(e);
        }
    }

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
            const response = await fetch(`${URL}/atendente`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("DATA AQUI CARALHO: ", data);
                fetchExpediente(data.id);
            } else {
                toast.error("Erro ao cadastrar atendente!", { position: "top-center" });
            }

        } catch (error) {
            console.error(error);
            toast.error("Erro na requisição!", { position: "top-center" });
        }
    };


    return (
        <>

            {modalExpediente && (
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden transform transition-all">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Expediente Semanal</h2>
                                <p className="text-blue-100 text-sm">Defina os horários de trabalho do atendente</p>
                                <p className="text-white ">Tente escolher horários exatos</p>
                            </div>
                            <button onClick={() => setModalExpediente(false)} className="text-white hover:text-blue-200 transition-colors">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            {expediente.map((dia, index) => (
                                <div key={dia.dia_semana} className="day-card border border-gray-200 p-4 rounded-lg bg-white hover:shadow-md transition-all">
                                    <span className="block text-center font-semibold text-blue-600 mb-3 text-lg">
                                        {dia.dia}
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        {/* Entrada */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Entrada</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={dia.entrada}
                                                    onChange={(e) => handleExpedienteChange(index, 'entrada', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Intervalo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Intervalo</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={dia.intervalo}
                                                    onChange={(e) => handleExpedienteChange(index, 'intervalo', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Tempo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tempo (min)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={dia.tempo}
                                                    onChange={(e) => handleExpedienteChange(index, 'tempo', e.target.value)}
                                                    placeholder="30"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        {/* Saída */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Saída</label>
                                            <div className="relative">
                                                <input
                                                    type="time"
                                                    value={dia.saida}
                                                    onChange={(e) => handleExpedienteChange(index, 'saida', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setModalExpediente(false);
                                    setModalNew(true);
                                }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                            >
                                <BsArrowLeft className="mr-2" /> Voltar
                            </button>
                            <button
                                onClick={fetchNovoFunc}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <BsSave className="mr-2" /> Salvar Atendente
                            </button>
                        </div>
                    </div>

                </div>



            )}

            {modalNew && (
                <>
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
                                        onClick={() => {
                                            setModalExpediente(true);
                                            setModalNew(false);
                                        }}
                                    >
                                        <BsFillSdCardFill className="mr-2" /> Avançar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </>
    );
}
