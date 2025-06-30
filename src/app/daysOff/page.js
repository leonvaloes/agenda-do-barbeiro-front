'use client'

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonBack from '@/components/buttons/ButtonBack';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';

export default function page() {

    const router = useRouter();
    const URL = "http://localhost:3000";
    const [atendente, setAtendente] = useState();
    const [daysOff, setDaysOff] = useState([]);


    const getDaysOff = async (atendenteId) => {
        try {
            const response = await fetch(`${URL}/atendente/getDayOff/${atendenteId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setDaysOff(data);

        } catch (e) {
            console.log(e);
        }
    }

    const fetchGetAtendenteByIdUser = async (Userid) => {
        try {
            const response = await fetch(`${URL}/atendente/getIdAtendente/${Userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setAtendente(data);
            getDaysOff(data);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchDesocuparData = async (DataSelect) => {
        console.log(atendente)
        try {
            const data = new Date(DataSelect);
            const dataFormatada = data.toISOString().split('T')[0];

            const response = await fetch(`${URL}/atendente/desocuparData/${atendente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: dataFormatada })
            });

            if (response.ok) {
                toast.success("Data desocupada com sucesso!", { position: "top-center" });
                getDaysOff(atendente);
            } else {
                const errorText = await response.text();
                toast.error(`${errorText}`, { position: "top-center" });
            }

        } catch (e) {
            console.error("Erro de conexão com o servidor:", e);
            toast.error("Erro ao conectar com o servidor.", { position: "top-center" });
        }
    };

    useEffect(() => {
        const AtendenteIdUser = Cookies.get('id');
        fetchGetAtendenteByIdUser(AtendenteIdUser);
    }, []);

    return (
        <>
            <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl overflow-hidden">

                <ButtonBack childreen={"Voltar"} onClick={() => router.back()} />

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Visualizar dias ocupados
                </h1>

                <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">
                            Escolha uma data para remover a falta programada
                        </h2>
                        <p className="text-gray-600">Será ativada apenas a data escolhida.</p>
                    </div>

                    <div className="mt-8 mb-8">

                        <label className="block text-gray-700 font-medium mb-2">
                            Selecione a data:
                        </label>

                        {daysOff.map((DayOff, i) => (
                            <div
                                key={i}
                                className="flex justify-between items-center bg-white rounded-xl shadow-md hover:shadow-lg transition-transform p-4 mb-4"
                            >
                                <span className="font-semibold text-lg text-gray-800">
                                    {new Date(DayOff.data).toLocaleDateString('pt-BR', {
                                        day: 'numeric',
                                        month: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>

                                <button
                                    onClick={() => fetchDesocuparData(DayOff.data)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 cursor-pointer rounded-lg font-medium hover:brightness-110 transition"
                                >
                                    <FaCalendarAlt className="text-white" />
                                    Remover
                                </button>
                            </div>
                        ))}


                    </div>

                </div>

            </div>
        </>
    )
}