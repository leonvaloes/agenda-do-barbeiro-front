'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

import {
    FaCut,
    FaCalendarAlt,
} from 'react-icons/fa';

function Page() {
    const URL = "http://localhost:3000";

    const router = useRouter();
    const { nomeFantasia } = useParams();
    const [dadosEmpresa, setDadosEmpresa] = useState("");
    const [servicos, setServicos] = useState([]);
    
    const fetchServicosEmpresa = async (id) => {
        try {
            const response = await fetch(`${URL}/empresa/listServ/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setServicos(data);
        } catch (e) {
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

    return (
        <>
            {/* Banner */}
            <div className="flex bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
                <div className=" container mx-auto px-4 py-3 flex justify-between px-4 py-16">
                    <div className="container mx-auto px-4 py-3">
                        <h2 className="text-4xl font-bold mb-4">
                            {dadosEmpresa ? dadosEmpresa.nome_fantasia : 'Carregando...'}
                        </h2>

                        <p className="text-xl mb-6">{dadosEmpresa.descricao}</p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#services"
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition"
                            >
                               Nossos Serviços
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

            <div id="location" className="max-w-7xl mx-auto px-4 py-16 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Venha nos visitar em nosso espaço aconchegante no coração da cidade
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="map-container">
                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(`${dadosEmpresa.endereco}, ${dadosEmpresa.cidade}, ${dadosEmpresa.estado}, ${dadosEmpresa.cep}`)}&output=embed`}
                            width="100%"
                            height="600"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />


                    </div>
                    <div className="space-y-6">
                        <div className="info-card bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Endereço</h3>
                                    <p className="text-gray-600">{dadosEmpresa.endereco}</p>
                                    <p className="text-gray-600">{dadosEmpresa.cidade}, {dadosEmpresa.estado}</p>
                                    <p className="text-gray-600">CEP: {dadosEmpresa.cep}</p>
                                </div>
                            </div>
                        </div>

                        <div className="info-card bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-clock text-green-600 text-xl"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Horário de Funcionamento</h3>
                                    <p className="text-gray-600"><span className="font-medium">Segunda a Sexta:</span> 9:00 - 20:00</p>
                                    <p className="text-gray-600"><span className="font-medium">Sábado:</span> 9:00 - 18:00</p>
                                    <p className="text-gray-600"><span className="font-medium">Domingo:</span> Fechado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
