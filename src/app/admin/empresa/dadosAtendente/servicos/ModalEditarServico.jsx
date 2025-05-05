'use client'

import { useEffect, useState } from "react";
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";



function ModalEditarServico({ servico, onClose }) {
    const [dados, setDados] = useState({ nome: '', descricao: '', valor: '', tempo_medio: '' });
    const URL = 'http://localhost:3000';

    useEffect(() => {
        if (servico) {
            setDados({
                nome: servico.nome || '',
                descricao: servico.descricao || '',
                valor: servico.valor || '',
                tempo_medio: servico.tempo_medio || '',
            });
        }
        document.body.classList.add('overflow-hidden');
        return () => {
            console.log(servico);
            document.body.classList.remove('overflow-hidden');
        };
    }, [servico]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const handleExcluir = async () => {
        const response = await fetch(`${URL}/servicos/${servico.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        onClose();
        window.location.reload();
    };

    const handleSalvar = async () => {
        const response = await fetch(`${URL}/servicos/${servico.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...dados,
                valor: Number(dados.valor),
                tempo_medio: Number(dados.tempo_medio)
            })
        })
        onClose();
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Editar Serviço</h2>
                        <button className="text-white hover:text-blue-200 transition-colors" onClick={onClose}>
                            <BsXLg />
                        </button>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Nome do serviço
                            </label>
                            <input
                                name="nome"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                value={dados.nome}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Descrição</label>
                            <input
                                name="descricao"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                value={dados.descricao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Valor</label>
                            <input
                                name="valor"
                                type="number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                value={dados.valor}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Tempo médio</label>
                            <input
                                name="tempo_medio"
                                type="number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                value={dados.tempo_medio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
                    <button
                        onClick={handleExcluir}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                    >
                        <BsXLg className="mr-2" /> Excluir
                    </button>
                    <button
                        onClick={handleSalvar}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <BsFillSdCardFill className="mr-2" /> Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarServico;
