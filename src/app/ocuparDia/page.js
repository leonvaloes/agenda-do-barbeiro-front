'use client'

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ButtonBack from '@/components/buttons/ButtonBack';
import ptBR from 'date-fns/locale/pt-BR';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';

export default function page() {
    const router = useRouter();
    const URL = "http://localhost:3000";
    const [atendente, setAtendente] = useState();
    const [selectedDate, setSelectedDate] = useState(null);

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
        } catch (e) {
            console.log(e);
        }
    }

    const fetchOcuparData = async () => {
        try {
            const formatada = selectedDate.toISOString().split('T')[0]; // "2025-05-21"
            const response = await fetch(`${URL}/atendente/ocuparData/${atendente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: formatada })
            });
            if (response.ok) {
                toast.success("Data ocupada com sucesso!", {position:"top-center"});
                router.back();
            } else {
                const errorText = await response.text();
                toast.error(`${errorText}`, { position: "top-center" });
            }
        } catch (e) {
            console.error("Erro de conexão com o servidor:", e);
            alert("Erro de conexão com o servidor.");
        }
    };

    useEffect(() => {
        const AtendenteIdUser = Cookies.get('id');
        fetchGetAtendenteByIdUser(AtendenteIdUser);
    }, []);

    return (
        <>
            <div className="flex-grow container mx-auto px-4 py-6">
                <ButtonBack childreen={"Voltar"} onClick={() => router.back()} />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Ocupar dia
                </h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Escolha uma data que não atenderá
                    </h2>
                    <p className="text-gray-600">Será desativada apenas o dia escolhido.</p>
                </div>

                <div className="mt-8 mb-8">
                    <label className="block text-gray-700 font-medium mb-2">
                        Selecione a data:
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <MobileDatePicker
                            label="Selecione uma data"
                            inputFormat="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => fetchOcuparData()}
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white 
                        rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                        Ocupar
                    </button>
                </div>
            </div>
        </>
    )
}