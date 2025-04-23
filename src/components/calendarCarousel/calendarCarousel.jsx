'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, addDays, subMonths, addMonths, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { daysInWeek } from 'date-fns/constants';

export default function CalendarCarousel() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [expandedIndex, setExpandedIndex] = useState(null);

    const [modalService, setModalService] = useState(true);
    const [selectedService, setSelectedService] = useState(null);


    const today = new Date();
    const start = today > startOfMonth(currentMonth) ? today : startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const mockScheduleData = [
        {
            date: format(addDays(today, 0), 'yyyy-MM-dd'),
            times: ['08:00', '09:00', '10:30', '13:00', '14:00', '15:00']
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
            descricao: "Realizo o corte de cabelo que desejar"
        },
        {
            servico: "Barba",
            valor: 20.00,
            descricao: "Realizo a barba que desejar"
        },
        {
            servico: "Sobrancelha",
            valor: 15.00,
            descricao: "Realizo a sobrancelha que desejar"
        },
        {
            servico: "Corte de cabelo + Barba",
            valor: 50.00,
            descricao: "Realizo o corte de cabelo e barba que desejar"
        },
        {
            servico: "Corte de cabelo + Sobrancelha",
            valor: 35.00,
            descricao: "Realizo o corte de cabelo e sobrancelha que desejar"
        },
        {
            servico: "Barba + Sobrancelha",
            valor: 25.00,
            descricao: "Realizo a barba e sobrancelha que desejar"
        },
        {
            servico: "Corte de cabelo + Barba + Sobrancelha",
            valor: 60.00,
            descricao: "Realizo o corte de cabelo, barba e sobrancelha que desejar"
        },
        {
            servico: "Corte de cabelo (do saco)",
            valor: 5.00,
            descricao: "Degradê nervoso nos zovo, com direito a lambida"
        },
        {
            servico: "Corte no pulso",
            valor: 990.00,
            descricao: "Muito arriscado eu ser pego, cobro caro"
        },
    ]

    const handleTimeClick = (time) => {
        setSelectedTime(time);
        console.log(`Horário selecionado: ${time}`);
    };

    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(day);
    }
    console.log(selectedDate)


    const handleToggle = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <>

            {!!modalService && (

                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-black p-4 rounded-lg shadow-lg w-full h-full overflow-auto">
                        <h2 className="text-white text-2xl font-bold text-center mb-4 p-[30px]">Serviços</h2>
                        {servicos.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center mt-[20px] flex-col cursor-pointer"
                            >
                                <div
                                    className={`w-full bg-[#111111] text-white rounded-[5px] p-[20px] gap-4 
                                    ${selectedService === index ? 'bg-blue-600' : ''}`}  // Adiciona a classe azul quando o serviço for selecionado
                                    onClick={() => setSelectedService(index)}  // Salva o serviço selecionado
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
                    <button className='w-full h-[80px] bg-blue-600' onClick={() => setModalService(false)}>Escolher</button>
                </div>
            )}


            <div className="w-full overflox-x-auto scrollbar-hide max-w-[410px]">

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


                {/* Horários da data selecionada */}
                <div className="mt-4 px-4 text-white">
                    <h2 className="text-md font-semibold mb-2">
                        Horários disponíveis para {format(selectedDate, 'dd/MM/yyyy')}
                    </h2>
                    <div className="flex flex-wrap gap-2 min-h-[80px] just">
                        {(
                            mockScheduleData.find(item =>
                                item.date === format(selectedDate, 'yyyy-MM-dd')
                            )?.times || ['Nenhum horário disponível']
                        ).map((time, i) => (
                            <div
                                key={i}
                                className={`px-3 py-2 rounded-[5px] text-sm cursor-pointer
                    ${selectedTime === time ? 'bg-blue-600 text-white' : 'text-gray-200'}`}
                                onClick={() => handleTimeClick(time)}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selecionar o serviço que deseja agendar */}
                {/* 
            <div className="flex items-center justify-center mt-[50px]">
                <div className="w-[300px] h-auto bg-[#111111] text-white rounded-[5px] p-[20px] flex flex-col">
                    <span className='p-[5px]'>Atendente: </span>

                    <hr className='h-[1px] w-full bg-gray-500 border-none my-2' />

                    <span className='p-[5px]'>Serviço: </span>
                    <span className='p-[5px]'>Descrição: </span>
                    <span className='p-[5px]'>Valor: </span>
                    <span className='p-[5px]'>Tempo médio: </span>

                    <button className='bg-blue-600 w-[100px] h-[30px] rounded-[5px] mt-[20px]'>Agendar</button>
                </div>
            </div> */}

            </div>
        </>

    );
}


