'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

import CalendarCarousel from "@/components/calendarCarousel/calendarCarousel";

import {
    FaCut,
    FaCalendarAlt,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaAward,
    FaStar,
    FaSpa,
    FaMale,
    FaFire,
    FaHandSparkles,
} from 'react-icons/fa';

function Page() {
    const URL = "http://localhost:3000";

    const router = useRouter();
    const { nomeFantasia } = useParams();
    const [dadosEmpresa, setDadosEmpresa] = useState(null);
    const [servicos, setServicos] = useState([]);

    const fetchServicosEmpresa = async (id)=>{
        try{
            const response = await fetch(`${URL}/empresa/listServ/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setServicos(data);
        }catch(e){
            console.log(e);
        }
    }

    const fetchDadosEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/empresa/getEmpresaByName/${nomeFantasia}`);
            const data = await response.json();
            setDadosEmpresa(data[0]);
            console.log(data[0]);
            fetchServicosEmpresa(data[0].id);
        } catch (error) {
            console.error("Erro ao buscar dados da empresa:", error);
        }
    }

    const handleAgendar = () => {
        router.push(`/empresa/${nomeFantasia}/agendamento`);
    };

    useEffect(() => {
        fetchDadosEmpresa();
    }, []);

    useEffect(() => {
        console.log("servicos: ",servicos);
    }, [servicos]);

    return (
        <>
            {/* Banner */}
            <div className="flex bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
                <div className=" container mx-auto px-4 py-3 flex justify-between px-4 py-16">
                    <div className="container mx-auto px-4 py-3">
                        <h2 className="text-4xl font-bold mb-4">
                            {dadosEmpresa ? dadosEmpresa.nome_fantasia : 'Carregando...'}
                        </h2>

                        <p className="text-xl mb-6">Profissionais qualificados e os melhores produtos para cuidar da sua beleza</p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#services"
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
                            >
                                <FaCut className="inline mr-2" /> Nossos Serviços
                            </a>
                            <button
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                                onClick={handleAgendar}
                            >
                                <FaCalendarAlt className="inline mr-2" /> Agendar Agora
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Destaques */}
            {/* <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                    <FaAward className="text-blue-500 text-2xl mr-4" />
                    <div>
                        <h3 className="font-bold text-lg mb-2">Profissionais Certificados</h3>
                        <p className="text-gray-600">Treinamento especializado e anos de experiência.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                    <FaStar className="text-blue-500 text-2xl mr-4" />
                    <div>
                        <h3 className="font-bold text-lg mb-2">Avaliação 4.8/5</h3>
                        <p className="text-gray-600">Mais de 200 clientes satisfeitos com nossos serviços.</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md flex items-start">
                    <FaSpa className="text-blue-500 text-2xl mr-4" />
                    <div>
                        <h3 className="font-bold text-lg mb-2">Produtos Premium</h3>
                        <p className="text-gray-600">Utilizamos apenas marcas reconhecidas e de alta qualidade.</p>
                    </div>
                </div>
            </div> */}

            {/* Serviços */}
            <section id="services" className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Oferecemos uma variedade de serviços para cuidar da sua beleza e bem-estar
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicos.map((service, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-center bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition p-6"
                        >
                            <h3 className="font-bold text-xl text-gray-800 mb-2 text-start">{service.nome}</h3>
                            <p className="text-gray-600 mb-4 text-start">{service.descricao}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                <span><i className="far fa-clock mr-1"></i>Tempo médio: {service.tempo_medio}</span>
                                <span className="font-bold text-blue-500">Valor: {service.valor}</span>
                            </div>
                            <button
                                onClick={handleAgendar}
                                className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-full block text-center py-3 rounded-lg font-medium hover:shadow-lg transition"
                            >
                                <FaCalendarAlt className="inline mr-2" /> Agendar
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Page;
