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
import { format, parseISO } from 'date-fns';
import { Button } from '@mui/material';
import { BsX } from 'react-icons/bs';


export default function page() {

    const router = useRouter();
    const URL = "http://localhost:3000";
    const [atendente, setAtendente] = useState();
    const [hours, setHours] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modal, setModal] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);

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
            const formatada = selectedDate.toISOString().split('T')[0];
            const today = new Date();

            if (formatada < today.toISOString().split('T')[0]) {
                toast.error("Data inválida!", { position: "top-center" });
                return;
            }

            const response = await fetch(`${URL}/atendente/ocuparData/${atendente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: formatada })
            });

            if (response.ok) {
                toast.success("Data ocupada com sucesso!", { position: "top-center" });
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

    const buscarHorarios = async () => {
        const data = selectedDate.toISOString().split('T')[0];

        const response = await fetch(`${URL}/atendente/getHours/${atendente}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar horários');
        }
        const result = await response.json();
        setHours(result);
    }

    const fetchOcuparHoraio = async ()=>{
        try {
            const response = await fetch(`${URL}/atendente/ocuparHoraio/${atendente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data_hora: selectedTime })
            });

            if (response.ok) {
                toast.success("Horário ocupado com sucesso!", { position: "top-center" });
                router.back();
            } else {
                const errorText = await response.text();
                toast.error(`${errorText}`, { position: "top-center" });
            }
        } catch (e) {
            console.error("Erro de conexão com o servidor:", e);
            alert("Erro de conexão com o servidor.");
        }
    }

    useEffect(() => {
        const AtendenteIdUser = Cookies.get('id');
        fetchGetAtendenteByIdUser(AtendenteIdUser);
    }, []);

    useEffect(() => {
        if (!selectedDate) return;

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // zera horas para comparar só a data

        const dataSelecionada = new Date(selectedDate);
        dataSelecionada.setHours(0, 0, 0, 0); // também zera as horas

        if (dataSelecionada < hoje) {
            toast.error("Selecione uma data válida (não pode ser anterior a hoje).", {
                position: "top-center"
            });
            setSelectedDate(null);
        }
        else {
            buscarHorarios();
        }
    }, [selectedDate]);


    return (
        <>
            {!!modal && (
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white border-[1px] border-gray-200 rounded-lg shadow-lg w-[95%] max-w-md max-h-[90%] overflow-auto flex items-start flex-col">
                        <div className="text-white flex flex-row items-center w-full justify-between bg-blue-500 p-[20px]">
                            <h2 className=" text-2xl font-bold text-center ">Ocupar Horário</h2>
                            <i className='text-[30px] cursor-pointer' onClick={()=>setModal(false)}><BsX/></i>
                        </div>

                        <hr className='w-full text-gray-600' />

                        <div className="p-[20px] flex flex-col w-full gap-[10px]">
                            <span className='font-bold text-[22px]'>Você deseja ocupar o seguinte horário?</span>
                            <span className='text-gray-600 '>{selectedTime}</span>
                        </div>
                        <div className="w-full flex justify-end p-[10px]">
                            <Button children="Confirmar" onClick={fetchOcuparHoraio()}>
                                Confirmar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-grow container mx-auto px-4 py-6">
                <ButtonBack childreen={"Voltar"} onClick={() => router.back()} />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Ocupar horário
                </h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Escolha uma data para ocupar um horário
                    </h2>
                </div>
                <button
                    onClick={() => router.push('./daysOff')()}
                    className="cursor-pointer px-6 py-2 bg-blue-600 text-white 
                        rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    Ver horários ocupados
                </button>

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

                <div className="max-w-[700px] flex flex-wrap gap-4 justify-center items-start min-h-[80px]">
                    {hours.filter((item) => {
                        const dateOnly = format(parseISO(item.data_hora), "yyyy-MM-dd");
                        const selectedOnly = format(selectedDate, "yyyy-MM-dd");
                        const isSameDay = dateOnly === selectedOnly;

                        const isFuture = parseISO(item.data_hora) > new Date();

                        return isSameDay && isFuture;
                    }).map((item, i) => {
                        const timeObj = parseISO(item.data_hora);
                        const formattedTime = timeObj.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        });
                        return (
                            <button
                                key={i}
                                onClick={() => {setModal(true); setSelectedTime(formattedTime)}}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border 
                                        min-w-[90px] min-h-[50px] text-center`}
                            >
                                {formattedTime}
                            </button>
                        );
                    })}
                </div>


            </div>
        </>
    )
}