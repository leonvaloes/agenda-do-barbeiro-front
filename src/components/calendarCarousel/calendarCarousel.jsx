'use client';

import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, addDays, subMonths, addMonths, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { daysInWeek } from 'date-fns/constants';

import Button from '../button/button';

import { toast } from "react-toastify";

export default function CalendarCarousel() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [expandedIndex, setExpandedIndex] = useState(null);

    const [modalService, setModalService] = useState(true);
    const [modalAtendente, setModalAtendente] = useState(false);
    const [ModalAgenda, setModalAgenda] = useState(false);
    const [modalConcluido, setModalConcluido] = useState(false);
    const [modalCancelado, setModalCancelado] = useState(false);

    const [selectedService, setSelectedService] = useState(null);
    const [SelectedAtendente, setSelectedAtendente] = useState(null);

    const [Hours, setHours] = useState([]);
    const [dataFormatada, setDataFormatada] = useState();
    const [horaFormatada, setHoraFormatada] = useState();
    const data_hora = `${dataFormatada} ${horaFormatada}`

    const [servicos, setServicos] = useState([]);
    const [atendentes, setAtendentes] = useState([]);
    const [atendenteId, setAtendenteId] = useState();

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const today = new Date();
    const start = today > startOfMonth(currentMonth) ? today : startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(day);
    }
    const URL = "http://localhost:3000"

    async function getAtendente(servicoId) {
        const response = await fetch(`${URL}/atendente/getAtendServ/${servicoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Erro ao buscar atendentes');
        }

        const data = await response.json();
        setAtendentes(data);
        data.forEach(obj => {
            console.log(obj);
        });
        return data;
    }

    async function getServices() {
        const response = await fetch(`${URL}/empresa/listServ/1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Erro ao buscar serviços'); 
        }

        const data = await response.json(); 
        setServicos(data);
        data.forEach(obj => {
            console.log(obj);
        });
        return data;
    }

    async function getHours(data) {
        setSelectedDate(data);
        data = data.toISOString().split('T')[0];

        const response = await fetch(`${URL}/atendente/getHours/${atendenteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Erro no backend:", errorText);
            throw new Error('Erro ao buscar horários');
        }

        const result = await response.json();
        setHours(result);
        console.log("HORARIO DA DATA: ", data, result);
        return result;
    }

    const agendar = async () => {
        const data = {
            cliente_id: 1,
            atendente_id: atendenteId,
            serv_id: servicos[selectedService].id,
            data_hora: data_hora
        };
        console.log(data);
        const response = await fetch(`${URL}/cliente/agendar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            setModalCancelado(true)
            throw new Error("Horário ja agendado ",errorText);
        }
        setModalConcluido(true);
    }

    async function getIdAtendente(UserId) {
        const response = await fetch(`${URL}/atendente/getIdAtendente/${UserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            console.log(response);
            throw new Error('Erro ao buscar id do atendente');
        }
        const result = await response.json();
        setAtendenteId(result.id);
    }

    const handleServiceClick = () => {
        if (selectedService === null) {
            toast.error("Escolha um serviço!", { position: "top-center" });
            return;
        }
        setModalService(false);
        getAtendente(servicos[selectedService].id)
        setModalAtendente(true);
    }

    const handleAtendente = () => {
        if (atendentes === null) {
            toast.error("Escolha um Atendente!", { position: "top-center" });
            return;
        }
        setModalAtendente(false);
        getIdAtendente(atendentes[SelectedAtendente].id);
        setModalAgenda(true);
    }

    const handleToggle = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleSelectTime = () => {
        if (selectedTime === null) {
            toast.error("Escolha um horário!", { position: "top-center" });
            return;
        }
        setModalAgenda(false);
        console.log(`Agendado para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime}`);
    }

    useEffect(() => {
        getServices();
    }, []);

    useEffect(() => {
        const date = new Date();
        getHours(date)
    }, [atendenteId])

    useEffect(() => {
        setDataFormatada(format(selectedDate, 'yyyy-MM-dd'))
    }, [selectedDate]);

    useEffect(() => {
        setHoraFormatada(new Date(selectedTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, [selectedTime]);

    return (
        <>
            {!!modalConcluido && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full flex items-center flex-col">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Agendamento Concluido!</h2>
                        <hr className='w-full text-gray-600' />
                        <h2 className='text-center text-gray-600'>Seu agendamento foi concluido com sucesso!</h2>
                        <Button onClick={() => setModalConcluido(false)}>Fechar</Button>
                    </div>
                </div>
            )}

            {!!modalCancelado && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full flex items-center flex-col">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Agendamento NÃO concluido!</h2>
                        <hr className='w-full text-gray-600' />
                        <h2 className='text-center text-gray-600'>Selecione outro horário para o agendamento!</h2>
                        <Button onClick={() => setModalCancelado(false)}>Fechar</Button>
                    </div>
                </div>
            )}

            {!!modalService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full overflow-auto">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Serviços</h2>
                        <hr className='text-gray-600' />
                        <h2 className='text-center text-gray-600'>Selecione o serviço que deseja:</h2>
                        {servicos?.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center mt-[20px] flex-col cursor-pointer"
                            >
                                <div
                                    className={`w-full bg-[#111111] text-white rounded-[5px] p-[20px] gap-4 
                                    ${selectedService === index ? 'bg-blue-600' : ''}`}
                                    onClick={() => setSelectedService(index)}
                                >
                                    <div className="flex pb-2 flex-row justify-between">
                                        <span className="p-[5px] w-[200px]">{item.nome}</span>
                                        <span className="p-[5px]">R${item.valor}</span>
                                        <span
                                            className="p-[5px] cursor-pointer"
                                            onClick={() => handleToggle(index)}
                                            dangerouslySetInnerHTML={{
                                                __html: expandedIndex === index ? '&#11165;' : '&#11167;'
                                            }}
                                        />
                                    </div>

                                    {expandedIndex === index && (
                                        <div className="mt-2 px-2 text-sm text-gray-300 transition-all duration-300">
                                            <p>{item.descricao}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => handleServiceClick()}>Continuar</Button>
                </div>
            )}

            {!!modalAtendente && selectedService !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full flex items-center flex-col">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Atendentes</h2>
                        <hr className='w-full text-gray-600' />
                        <h2 className='text-center text-gray-600 mb-[20px]'>Selecione o atendente que deseja:</h2>
                        {atendentes.map((atendente, i) => (
                            <div
                                key={i}
                                className={`bg-[#111111] text-white rounded-[5px] p-[20px] m-2 w-full flex justify-center ${SelectedAtendente === i ? 'bg-blue-600' : ''}`}
                                onClick={() => setSelectedAtendente(i)}
                            >
                                <span>{atendente.nome}</span>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => handleAtendente()}></Button>
                </div>
            )}


            {!!ModalAgenda && (
                <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col'>
                    <div className="fixed w-full overflox-x-auto scrollbar-hide max-w-[411px] z-50">

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 text-white overflox-x-auto scrollbar-hide bg-[#111111]">
                            <button onClick={handlePrevMonth} className="text-xl">&#9204;</button>
                            <div className="text-lg">
                                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                            </div>
                            <button onClick={handleNextMonth} className="text-xl">&#9205;</button>
                        </div>

                        {/* Dias */}
                        <div className="w-full overflow-x-auto scrollbar-hide py-[4px] bg-[#111111]">
                            <div className="flex space-x-1 px-4 w-max">
                                {days.map((day, idx) => {
                                    const isSelected = isSameDay(day, selectedDate);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => getHours(day)}
                                            className={`flex flex-col items-center px-1 py-5 rounded-[5px] min-w-[60px] 
                                            ${isSelected ? 'bg-blue-600 text-white' : 'text-gray-200'}`}
                                        >
                                            <span className="text-lg font-bold">{format(day, 'dd')}</span>
                                            <span className="text-sm">{format(day, 'EEEEEE', { locale: ptBR })}</span>

                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 px-4 text-white flex flex-col items-center min-h-[670px]">
                            <h2 className="text-lg font-semibold mb-4 text-center">
                                Horários disponíveis para {format(selectedDate, 'dd/MM/yyyy')}
                            </h2>

                            <div className="flex flex-wrap gap-3 min-h-[70px] justify-center items-start">
                                {
                                    Hours.filter(item =>
                                        format(new Date(item.data_hora), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                                    ).map((item, i) => {
                                        const timeObj = new Date(item.data_hora);
                                        const formattedTime = timeObj.toLocaleTimeString('pt-BR', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        });

                                        return (
                                            <div
                                                key={i}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer border transition-all duration-200
                                                    min-h-[50px] min-w-[80px] flex justify-center items-center
                                                    ${selectedTime === item.data_hora
                                                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                                                        : 'text-gray-200 border-gray-600 hover:border-gray-400 hover:text-white'
                                                    }`}
                                                onClick={() => handleTimeClick(item.data_hora)}
                                            >
                                                {formattedTime}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>

                        <Button onClick={() => handleSelectTime()}> Continuar </Button>
                    </div>
                </div>
            )}

            {/* Resumo do agendamento */}
            {servicos && atendentes && selectedDate && selectedTime && (
                <div className='flex justify-center items-center w-full h-full'>
                    {servicos[selectedService] && atendentes !== null && (
                        <div className="flex items-center justify-center mt-[50px] flex-col">
                            <h2 className="text-white text-2xl font-bold text-center p-[30px]">Atendentes</h2>
                            <hr className=' w-full border-gray-600' />
                            <h2 className='text-center text-gray-600 mb-[20px]'>Verifique as informações do agendamento</h2>
                            <div className="w-[300px] h-auto bg-[#111111] text-white rounded-[5px] p-[20px] flex flex-col space-y-2">

                                <div className=' p-[5px] flex justify-between'>
                                    <span className=''>Atendente:</span>
                                    <span>{atendentes[SelectedAtendente].nome}</span>
                                </div>

                                <hr className=' h-[1px] w-full bg-gray-500 border-none my-2' />

                                <div className='p-[5px] flex justify-between'>
                                    <span>Serviço :</span>
                                    <span className='max-w-[130px] '>{servicos[selectedService].nome}</span>
                                </div>

                                <div className='p-[5px] flex justify-between'>
                                    <span>Valor :</span>
                                    <span>R$ {servicos[selectedService].valor}</span>
                                </div>

                                <div className='p-[5px] flex justify-between'>
                                    <span>Tempo médio :</span>
                                    <span>{servicos[selectedService].tempo_medio} min</span>
                                </div>

                                <div className='p-[5px] flex justify-between'>
                                    <span>Data :</span>
                                    <span>{dataFormatada}</span>
                                </div>

                                <div className='p-[5px] flex justify-between'>
                                    <span>Hora :</span>
                                    <span>
                                        {(horaFormatada)}
                                    </span>
                                </div>

                                <button className='max-h-[35px] bg-blue-600 p-[5px] rounded-[7px]' onClick={() => setModalService(true)}>Editar</button>
                            </div>
                            <button className='bg-blue-600 max-w-[300px] w-full h-[40px] rounded-[5px] mt-[20px]' onClick={() => agendar()}>Confirmar Agendamento</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}