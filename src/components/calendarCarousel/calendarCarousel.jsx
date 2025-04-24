'use client';

import { useState } from 'react';
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

    const [selectedService, setSelectedService] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);

    const today = new Date();
    const start = today > startOfMonth(currentMonth) ? today : startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const mockScheduleData = [
        {
            date: format(addDays(today, 0), 'yyyy-MM-dd'),
            times: ['08:00', '09:00', '10:30', '13:00', '14:00', '15:00', '16:00', '17:00']
        },
        {
            date: format(addDays(today, 1), 'yyyy-MM-dd'),
            times: ['14:00', '15:30']
        },
        {
            date: format(addDays(today, 2), 'yyyy-MM-dd'),
            times: ['09:00', '13:00', '16:00']
        },
        {
            date: format(addDays(today, 3), 'yyyy-MM-dd'),
            times: ['11:00']
        },
        {
            date: format(addDays(today, 4), 'yyyy-MM-dd'),
            times: ['08:30', '12:00', '17:00']
        },
        {
            date: format(addDays(today, 5), 'yyyy-MM-dd'),
            times: ['10:00', '14:00']
        },
        {
            date: format(addDays(today, 6), 'yyyy-MM-dd'),
            times: ['09:30', '11:30', '15:30']
        },
        {
            date: format(addDays(today, 7), 'yyyy-MM-dd'),
            times: ['08:00', '10:00']
        },
        {
            date: format(addDays(today, 8), 'yyyy-MM-dd'),
            times: ['09:00', '13:00']
        },
        {
            date: format(addDays(today, 9), 'yyyy-MM-dd'),
            times: ['07:30', '10:30', '14:30']
        }
    ];

    const servicos = [
        {
            servico: "Corte de cabelo",
            valor: 30.00,
            descricao: "Realizo o corte de cabelo que desejar",
            funcionarios: ["João", "Carlos", "Amanda"],
            tempo: "30 min"
        },
        {
            servico: "Barba",
            valor: 20.00,
            descricao: "Realizo a barba que desejar",
            funcionarios: ["Carlos", "Eduardo"],
            tempo: "15 min"
        },
        {
            servico: "Sobrancelha",
            valor: 15.00,
            descricao: "Realizo a sobrancelha que desejar",
            funcionarios: ["Amanda", "Juliana"],
            tempo: "15 min"
        },
        {
            servico: "Corte de cabelo + Barba",
            valor: 50.00,
            descricao: "Realizo o corte de cabelo e barba que desejar",
            funcionarios: ["João", "Carlos"],
            tempo: "45 min"
        },
        {
            servico: "Corte de cabelo + Sobrancelha",
            valor: 35.00,
            descricao: "Realizo o corte de cabelo e sobrancelha que desejar",
            funcionarios: ["Amanda", "João"],
            tempo: "45 min"
        },
        {
            servico: "Barba + Sobrancelha",
            valor: 25.00,
            descricao: "Realizo a barba e sobrancelha que desejar",
            funcionarios: ["Juliana", "Carlos"],
            tempo: "30 min"
        },
        {
            servico: "Corte de cabelo + Barba + Sobrancelha",
            valor: 60.00,
            descricao: "Realizo o corte de cabelo, barba e sobrancelha que desejar",
            funcionarios: ["João", "Amanda", "Carlos"],
            tempo: "60 min"
        },
        {
            servico: "Corte de cabelo (do saco)",
            valor: 5.00,
            descricao: "Degradê nervoso nos zovo, com direito a lambida",
            funcionarios: ["Marcão", "Zé do Corte"],
            tempo: "15 min"
        },
        {
            servico: "Corte no pulso",
            valor: 990.00,
            descricao: "Muito arriscado eu ser pego, cobro caro",
            funcionarios: ["Anônimo", "Sr. Sombrio"],
            tempo: "15 min"
        }
    ]



    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(day);
    }

    const handleServiceClick = () => {
        if (selectedService === null) {
            toast.error("Escolha um serviço!", { position: "top-center" });
            return;
        }
        setModalService(false);
        setModalAtendente(true);
    }

    const handleAtendente = () => {
        if (selectedBarber === null) {
            toast.error("Escolha um Atendente!", { position: "top-center" });
            return;
        }
        console.log(`Atendente ${servicos[selectedService].funcionarios[selectedBarber]} escolhido`);
        console.log(`Serviço ${servicos[selectedService].servico} escolhido`);
        console.log(`Valor ${servicos[selectedService].valor} escolhido`);
        setModalAtendente(false);
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

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <>

            {!!modalService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full overflow-auto">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Serviços</h2>
                        <hr className='text-gray-600' />
                        <h2 className='text-center text-gray-600'>Selecione o serviço que deseja:</h2>
                        {servicos.map((item, index) => (
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
                                        <span className="p-[5px] w-[200px]">{item.servico}</span>
                                        <span className="p-[5px]">R${item.valor.toFixed(2)}</span>
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

                        {servicos[selectedService].funcionarios.map((atendente, i) => (
                            <div
                                key={i}
                                className={`bg-[#111111] text-white rounded-[5px] p-[20px] m-2 w-full flex justify-center ${selectedBarber === i ? 'bg-blue-600' : ''}`}
                                onClick={() => setSelectedBarber(i)}
                            >
                                <span>{atendente}</span>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => handleAtendente()}></Button>
                </div>
            )}


            {/* Horários da data selecionada */}
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
                                            onClick={() => setSelectedDate(day)}
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

                            <div className="flex flex-wrap gap-3 min-h-[70px] justify-center items-start ">
                                {(
                                    mockScheduleData.find(item =>
                                        item.date === format(selectedDate, 'yyyy-MM-dd')
                                    )?.times || ['Nenhum horário disponível']
                                ).map((time, i) => (
                                    <div
                                        key={i}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer border transition-all duration-200
                                    ${selectedTime === time
                                                ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                                                : 'text-gray-200 border-gray-600 hover:border-gray-400 hover:text-white'
                                            }`}
                                        onClick={() => handleTimeClick(time)}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button onClick={() => handleSelectTime()}> Continuar </Button>
                    </div>
                </div>
            )}



            {/* Resumo do agendamento */}

            <div className='flex justify-center items-center w-full h-full'>
                {servicos[selectedService] && selectedBarber !== null && (
                    <div className="flex items-center justify-center mt-[50px] flex-col">
                        <h2 className="text-white text-2xl font-bold text-center p-[30px]">Atendentes</h2>
                        <hr className=' w-full border-gray-600'/>
                        <h2 className='text-center text-gray-600 mb-[20px]'>Verifique as informações do agendamento</h2>
                        <div className="w-[300px] h-auto bg-[#111111] text-white rounded-[5px] p-[20px] flex flex-col space-y-2">

                            <div className=' p-[5px] flex justify-between'>
                                <span className=''>Atendente:</span>
                                <span>{servicos[selectedService].funcionarios[selectedBarber]}</span>
                            </div>

                            <hr className=' h-[1px] w-full bg-gray-500 border-none my-2' />

                            <div className='p-[5px] flex justify-between'>
                                <span>Serviço :</span>
                                <span className='max-w-[130px] '>{servicos[selectedService].servico}</span>
                            </div>

                            <div className='p-[5px] flex justify-between'>
                                <span>Valor :</span>
                                <span>R$ {servicos[selectedService].valor.toFixed(2)}</span>
                            </div>

                            <div className='p-[5px] flex justify-between'>
                                <span>Tempo médio :</span>
                                <span>{servicos[selectedService].tempo}</span>
                            </div>

                            <div className='p-[5px] flex justify-between'>
                                <span>Data :</span>
                                <span>{format(selectedDate, 'dd/MM/yyyy')}</span>
                            </div>

                            <div className='p-[5px] flex justify-between'>
                                <span>Hora :</span>
                                <span>{selectedTime}</span>

                            </div>


                            <button className='max-h-[35px] bg-blue-600 p-[5px] rounded-[7px]' onClick={() => setModalService(true)}>Editar</button>
                        </div>
                        <button className='bg-blue-600 max-w-[300px] w-full h-[40px] rounded-[5px] mt-[20px]'>Confirmar Agendamento</button>
                    </div>
                )}
            </div>




        </>

    );
}


