'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format,parseISO, startOfMonth, endOfMonth, addDays, subMonths, addMonths, isSameDay } from 'date-fns';
import { BsClockHistory, BsX, BsFillPersonFill, BsFillPencilFill, BsClockFill } from "react-icons/bs";
import { ptBR } from 'date-fns/locale';
import { toast } from "react-toastify";
import ConfirmButton from '@/components/button/ConfirmButton';
import Cookies from 'js-cookie';

export default function page() {
    const { nomeFantasia } = useParams();
    const URL = "http://localhost:3000"

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [modalService, setModalService] = useState(true);
    const [modalAtendente, setModalAtendente] = useState(false);
    const [ModalAgenda, setModalAgenda] = useState(false);
    const [modalConcluido, setModalConcluido] = useState(false);
    const [modalCancelado, setModalCancelado] = useState(false);

    const [CardService, setCardService] = useState(false);
    const [CardResum, setCardResum] = useState(false);

    const [selectedService, setSelectedService] = useState(null);
    const [SelectedAtendente, setSelectedAtendente] = useState(null);

    const [Hours, setHours] = useState([]);
    const [dataFormatada, setDataFormatada] = useState();
    const [horaFormatada, setHoraFormatada] = useState();
    const data_hora = `${dataFormatada} ${horaFormatada}`

    const [servicos, setServicos] = useState([]);
    const [atendentes, setAtendentes] = useState([]);
    const [atendenteId, setAtendenteId] = useState();
    const [dadosEmpresa, setDadosEmpresa] = useState(null);
    const [cliente, setCliente] = useState(null);

    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    const today = new Date();
    const start = today > startOfMonth(currentMonth) ? today : startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const days = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        days.push(day);
    }

    async function getCliente(UserId){
        const response= await fetch(`${URL}/cliente/${UserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar cliente');
        }

        const data=await response.json();
        console.log("CLIENTE: ",data[0]);
        setCliente(data[0]);
    }

    async function getAtendente(servicoId) {
        const response = await fetch(`${URL}/atendente/getAtendServ/${servicoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar atendentes');
        }

        const data = await response.json();
        setAtendentes(data);
    }

    async function getServices(Empresaid) {
        const response = await fetch(`${URL}/empresa/listServ/${Empresaid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar serviços');
        }

        const data = await response.json();
        setServicos(data);
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
            throw new Error('Erro ao buscar horários');
        }

        const result = await response.json();
        setHours(result);
        return result;
    }

    const agendar = async () => {
        const data = {
            cliente_id: cliente.cliente_id,
            atendente_id: atendenteId,
            serv_id: servicos[selectedService].id,
            data_hora: data_hora
        };

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
            throw new Error("Horário ja agendado ", errorText);
        }
        setModalConcluido(true);
    }

    const fetchDadosEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/getEmpresaByName/${nomeFantasia}`);
            const data = await response.json();
            setDadosEmpresa(data[0]);
            getServices(data[0].id);
        } catch (error) {
            console.error("Erro ao buscar dados da empresa:", error);
        }
    }

    const editar = () => {
        setCardResum(false);
        setModalService(true);
    }

    async function getIdAtendente(UserId) {
        const response = await fetch(`${URL}/atendente/getIdAtendente/${UserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar id do atendente');
        }
        const result = await response.json();
        setAtendenteId(result);
    }

    const handleService = (index) => {
        setSelectedService(index);
        setCardService(true);
    }

    const confirmService = () => {
        setModalService(false);
        setCardService(false);

        getAtendente(servicos[selectedService].id)
        setModalAtendente(true);
    }

    const handleAtendente = (index) => {
        setSelectedAtendente(index)
        setModalAtendente(false);
        getIdAtendente(atendentes[index][0].id);
        setModalAgenda(true);
    }

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleSelectTime = () => {
        if (selectedTime === null) {
            toast.error("Escolha um horário!", { position: "top-center" });
            return;
        }
        setCardResum(true);
        setModalAgenda(false);
    }

    useEffect(() => {
        const idUser = Cookies.get('id');
        fetchDadosEmpresa();
        getCliente(idUser);
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
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white border-[1px] border-gray-200 rounded-lg shadow-lg w-[95%] max-w-md max-h-[90%] overflow-auto flex items-start flex-col">
                        <div className="text-white flex flex-row items-center w-full justify-between bg-blue-500 p-[20px]">
                            <h2 className=" text-2xl font-bold text-center ">Agendado com sucesso!</h2>
                            <i className='text-[30px] cursor-pointer' onClick={() => setModalConcluido(false)}><BsX /></i>
                        </div>
                        <div className="p-[20px] flex flex-col w-full gap-[10px]">
                            <span className='font-bold text-[22px]'>Seu serviço foi agendado com sucesso</span>
                            <span className='text-gray-600 '>Aguarde o atendente confirmar seu agendamento, te avisaremos quando isso acontecer</span>
                        </div>
                        <div className="w-full flex justify-end p-[10px]">
                            <button
                                className="min-w-[100px] min-h-[40px] max-w-[100px] text-white rounded-[4px] bg-blue-500 cursor-pointer"
                                onClick={() => setModalConcluido(false)}
                            >
                                Ok!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!!modalCancelado && (
                <div className="fixed inset-0 bg-white bg-opacity-50 z-50 flex items-center justify-center flex-col">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full flex items-center flex-col">
                        <h2 className=" text-2xl font-bold text-center p-[30px]">Agendamento NÃO concluido!</h2>
                        <hr className='w-full text-gray-600' />
                        <h2 className='text-center text-gray-600'>Selecione outro horário para o agendamento!</h2>
                        <ConfirmButton onClick={() => setModalCancelado(false)}>Fechar</ConfirmButton>
                    </div>
                </div>
            )}

            {!!CardService && (
                <>
                    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white border-[1px] border-gray-200 rounded-lg shadow-lg w-[95%] max-w-md max-h-[90%] overflow-auto flex items-start flex-col">
                            <div className="text-white flex flex-row items-center w-full justify-between bg-blue-500 p-[20px]">
                                <h2 className=" text-2xl font-bold text-center ">Detalhes do serviço</h2>
                                <i className='text-[30px] cursor-pointer' onClick={() => setCardService(false)}><BsX /></i>
                            </div>
                            <hr className='w-full text-gray-600' />
                            <div className="p-[20px] flex flex-col w-full gap-[10px]">
                                <span className='font-bold text-[22px]'>{servicos[selectedService].nome}</span>
                                <span className='text-gray-600 '>{servicos[selectedService].descricao}</span>
                                <div className="h-full flex justify-between">
                                    <span className='text-gray-600  flex items-center'><i className="mr-[10px]"><BsClockHistory /></i>{servicos[selectedService].tempo_medio} minutos</span>
                                    <span className='text-blue-600  '>R$ {servicos[selectedService].valor}</span>
                                </div>
                            </div>
                            <div className="w-full flex justify-end p-[10px]">
                                <button
                                    className="min-w-[100px] min-h-[40px] max-w-[100px] text-white rounded-[4px] bg-blue-500 cursor-pointer"
                                    onClick={() => confirmService()}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!!modalService && (
                <>
                    <main className="container mx-auto px-4 py-8">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Agende seu serviço</h1>
                            <p className="text-gray-600 max-w-2xl mx-auto">Escolha entre nossos serviços profissionais e agende no horário mais conveniente para você.</p>
                        </div>
                        <div id="servicesList" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {servicos.map((servico, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl shadow-md overflow-hidden cursor-pointer border-[1px] transition-all duration-300 
                                    ${selectedService === index ? 'border-blue-600' : 'border-transparent'}`}
                                    onClick={() => handleService(index)}
                                >
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-800 mb-1">{servico.nome}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{servico.descricao}</p>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 text-sm flex items-center"><i className="mr-[10px]"><BsClockHistory /></i>{servico.tempo_medio}min</span>
                                            <span className="font-bold text-blue-500">R$ {servico.valor}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
            )}

            {!!modalAtendente && selectedService !== null && (
                <main className="container mx-auto px-4 py-8 bg-white">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Escolha o atendente</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Escolha entre nossos profissionais para realizar o atendimento para você.</p>
                    </div>
                    <div id="servicesList" className="grid gap-6 mb-6">
                        {atendentes.map((atendente, index) => (
                            <div key={index} className={`rounded-xl shadow-md overflow-hidden cursor-pointer border-[1px] transition-all duration-300 border-gray-100`}
                                onClick={() => handleAtendente(index)}
                            >
                                <div className="p-5">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-blue-500">
                                            {atendente?.imagem ? (
                                                <img src={atendente.imagem} alt="Atendente" className="w-6 h-6 rounded-full inline-block" />
                                            ) : (
                                                <BsFillPersonFill className="text-[26px]" />
                                            )}
                                        </span>
                                        <span className="font-bold text-lg text-gray-800 mb-1">{atendente[0].nome}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            )}

            {!!ModalAgenda && (
                <div className="container mx-auto px-4 py-8 space-y-8">
                    <div className="w-full flex items-center justify-center flex-col">
                        <span className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">Escolha uma data e um horário</span>
                        <span className="text-gray-600 max-w-2xl mx-auto text-center">Escolha um dia e um horário disponivel que for mais conveniente para você.</span>
                    </div>
                    {/* Header */}
                    <div className="flex items-center justify-center px-4">
                        <button
                            onClick={handlePrevMonth}
                            className="text-xl p-2 rounded-full hover:bg-gray-200 transition"
                        >
                            &#9204;
                        </button>
                        <div className="text-xl font-semibold capitalize text-gray-800">
                            {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
                        </div>
                        <button
                            onClick={handleNextMonth}
                            className="text-xl p-2 rounded-full hover:bg-gray-200 transition"
                        >
                            &#9205;
                        </button>
                    </div>

                    {/* Dias */}
                    <div className="w-full flex items-center justify-center">
                        <div className="max-w-[700px] justify-center overflow-x-auto scrollbar-hide">
                            <div className="flex space-x-3 px-4 w-max">
                                {days.map((day, idx) => {
                                    const isSelected = isSameDay(day, selectedDate);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => getHours(day)}
                                            className={`flex flex-col items-center px-3 py-4 rounded-lg min-w-[65px] transition
                                            ${isSelected
                                                    ? "bg-blue-600 text-white shadow-lg"
                                                    : "bg-white text-gray-700 hover:bg-blue-100"
                                                }`}
                                        >
                                            <span className="text-lg font-semibold">
                                                {format(day, "dd")}
                                            </span>
                                            <span className="text-sm">
                                                {format(day, "EEEEEE", { locale: ptBR })}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Horários */}
                    <div className="w-full px-4 flex flex-col items-center min-h-auto">
                        <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
                            Horários disponíveis para {format(selectedDate, "dd/MM/yyyy")}
                        </h2>
                        <div className="max-w-[700px] flex flex-wrap gap-4 justify-center items-start min-h-[80px]">
                            {Hours.filter((item) => {
                                const dateOnly = format(parseISO(item.data_hora), "yyyy-MM-dd");
                                const selectedOnly = format(selectedDate, "yyyy-MM-dd");
                                return dateOnly === selectedOnly;
                            }).map((item, i) => {
                                const timeObj = parseISO(item.data_hora);
                                const formattedTime = timeObj.toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });
                                const isSelected = selectedTime === item.data_hora;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleTimeClick(item.data_hora)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border 
                        min-w-[90px] min-h-[50px] text-center
                        ${isSelected
                                                ? "bg-blue-600 text-white border-blue-500 shadow-md"
                                                : "bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                            }`}
                                    >
                                        {formattedTime}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {selectedDate && selectedTime && (
                        <div className="flex justify-center mt-6">
                            <ConfirmButton
                                onClick={handleSelectTime}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                Continuar
                            </ConfirmButton>
                        </div>
                    )}
                </div>
            )}

            {/* Resumo do agendamento */}
            {servicos && atendentes && selectedDate && selectedTime && CardResum && (
                <div className='flex justify-center items-center w-full h-full'>
                    {servicos[selectedService] && atendentes !== null && (
                        <div className="flex items-center justify-center mt-[50px] flex-col">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">Resumo do agendamento</h2>
                            <hr className=' w-full border-gray-600' />
                            <h2 className='text-gray-600 max-w-2xl mx-auto text-center mb-[30px]'>Verifique as informações do agendamento</h2>
                            <div className="w-[400px] bg-gray-100 h-auto rounded-[5px] p-[40px] flex flex-col space-y-2">
                                <div className=' p-[5px] flex justify-between'>
                                    <span>
                                        {atendentes[SelectedAtendente]?.imagem ? (
                                            <img src={atendentes[SelectedAtendente].imagem} alt="Atendente" className="w-6 h-6 rounded-full inline-block" />
                                        ) : (
                                            <BsFillPersonFill className="text-[26px]" />
                                        )}
                                    </span>
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
                                <div className="flex flex-row justify-between w-full">
                                    <button className='max-h-[35px] bg-gray-400 text-bold p-[20px] rounded-[7px] cursor-pointer flex justify-between items-center max-w-[110px] font-bold' onClick={() => editar()}> <i className='mr-[10px]'> <BsFillPencilFill /> </i> Editar </button>
                                    <button className='max-h-[35px] bg-blue-600 text-bold p-[20px] rounded-[7px] cursor-pointer flex justify-between items-center max-w-[150px] text-white font-bold' onClick={() => agendar()}> <i className="mr-[10px]"> <BsClockFill /></i>Confirmar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}