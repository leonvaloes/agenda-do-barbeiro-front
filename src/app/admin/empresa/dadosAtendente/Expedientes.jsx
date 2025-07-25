'use client'

import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsSave } from "react-icons/bs";
import { toast } from 'react-toastify';

function ModalFuncionarios({ funcionario, onClose }) {

    const URL = "http://localhost:3000";

    const [expediente, setExpediente] = useState([
        { dia: 'Domingo', dia_semana: 1, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Segunda', dia_semana: 2, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Terça', dia_semana: 3, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Quarta', dia_semana: 4, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Quinta', dia_semana: 5, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Sexta', dia_semana: 6, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' },
        { dia: 'Sábado', dia_semana: 7, entrada: '00:00', intervalo: '00:00', tempo: '00:00', saida: '00:00' }
    ]);


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

    const changeExpediente = async () => {
        console.log("ID FUNC: ", funcionario.atendente_id);
        console.log("expediente: ", expediente);
        try {
            const response = await fetch(`${URL}/atendente/atualizarExpediente/${funcionario.atendente_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expediente)
            });

            if (!response.ok)
                throw new Error("Erro ao salvar expediente");
            const result = await response.json();
            toast.success("Expediente salvo com sucesso!", { position: "top-center" });
            onClose(true);
        } catch (error) {
            console.error("Erro ao salvar expediente:", error);
            alert("Erro ao salvar expediente. Verifique os dados.");
        }
    };


    useEffect(() => {
        const fetchExpediente = async () => {
            try {
                const response = await fetch(`${URL}/atendente/getExpediente/${funcionario.atendente_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error("Erro ao buscar expediente");

                const data = await response.json();

                const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];


                const formatado = data.map((item, index) => ({
                    dia: diasSemana[index],
                    dia_semana: index + 1,
                    entrada: item.data_hora_entrada?.substring(0, 5) || '10:00',
                    intervalo: item.data_hora_intervalo?.substring(0, 5) || '00:00',
                    tempo: item.tempo_intervalo?.toString() || '00',
                    saida: item.data_hora_saida?.substring(0, 5) || '00:00'
                }));

                setExpediente(formatado);
                console.log(formatado);
            } catch (error) {
                console.error("Erro:", error);
            }
        };
        console.log(funcionario)
        fetchExpediente();
    }, []);



    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden transform transition-all">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Expediente Semanal</h2>
                                <p className="text-blue-100 text-sm">Defina os horários de trabalho do atendente</p>
                                <p className="text-white ">Tente escolher horários exatos</p>
                            </div>
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
                                            <div className="relative flex gap-2">
                                                <select
                                                    value={dia.entrada.split(":")[0]}
                                                    onChange={(e) => {
                                                        const hora = e.target.value;
                                                        const minutos = dia.entrada.split(":")[0] || "00";
                                                        handleExpedienteChange(index, "entrada", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {[...Array(24)].map((_, i) => {
                                                        const val = (0 + i).toString().padStart(2, "0");
                                                        return <option key={val} value={val}>{val}</option>;
                                                    })}
                                                </select>
                                                <select
                                                    value={dia.entrada?.split(":")[1] || "00"}
                                                    onChange={(e) => {
                                                        const hora = dia.entrada?.split(":")[0] || "00";
                                                        const minutos = e.target.value;
                                                        handleExpedienteChange(index, "entrada", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {["00", "15", "30", "45"].map((m) => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* INTERVALO */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Intervalo</label>
                                            <div className="relative flex gap-2">
                                                <select
                                                    value={dia.intervalo?.split(":")[0] || "00"}
                                                    onChange={(e) => {
                                                        const hora = e.target.value;
                                                        const minutos = dia.intervalo?.split(":")[1] || "00";
                                                        handleExpedienteChange(index, "intervalo", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {[...Array(24)].map((_, i) => {
                                                        const val = (0 + i).toString().padStart(2, "0");
                                                        return <option key={val} value={val}>{val}</option>;
                                                    })}
                                                </select>
                                                <select
                                                    value={dia.intervalo?.split(":")[1] || "00"}
                                                    onChange={(e) => {
                                                        const hora = dia.intervalo?.split(":")[0] || "00";
                                                        const minutos = e.target.value;
                                                        handleExpedienteChange(index, "intervalo", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {["00", "15", "30", "45"].map((m) => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* TEMPO */}
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

                                        {/* SAÍDA */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Saída</label>
                                            <div className="relative flex gap-2">
                                                <select
                                                    value={dia.saida.split(":")[0]}
                                                    onChange={(e) => {
                                                        const hora = e.target.value;
                                                        const minutos = dia.saida.split(":")[1] || "00";
                                                        handleExpedienteChange(index, "saida", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {[...Array(24)].map((_, i) => {
                                                        const val = (0 + i).toString().padStart(2, "0");
                                                        return <option key={val} value={val}>{val}</option>;
                                                    })}
                                                </select>
                                                <select
                                                    value={dia.saida.split(":")[1]}
                                                    onChange={(e) => {
                                                        const hora = dia.saida.split(":")[0] || "08";
                                                        const minutos = e.target.value;
                                                        handleExpedienteChange(index, "saida", `${hora}:${minutos}`);
                                                    }}
                                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                                                >
                                                    {["00", "15", "30", "45"].map((m) => (
                                                        <option key={m} value={m}>{m}</option>
                                                    ))}
                                                </select>
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
                                    onClose(false);
                                }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                            >
                                <BsArrowLeft className="mr-2" /> Voltar
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                                onClick={() => changeExpediente()}
                            >
                                <BsSave className="mr-2" /> Salvar expediente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalFuncionarios;
