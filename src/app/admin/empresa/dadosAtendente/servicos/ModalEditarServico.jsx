'use client'

import { useEffect, useState } from "react";
import { BsFillSdCardFill, BsXLg } from "react-icons/bs";

function ModalEditarServico({ servico, onClose }) {
    const [dados, setDados] = useState({
        nome: '',
        descricao: '',
        valor: '',
        tempo_medio: '',
        funcionarios: []
    });

    const [FuncServ, setFuncServ] = useState([]);
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const URL = 'http://localhost:3000';

    useEffect(() => {
        if (servico) {
            setDados({
                nome: servico.nome || '',
                descricao: servico.descricao || '',
                valor: servico.valor || '',
                tempo_medio: servico.tempo_medio || '',
                funcionarios: servico.funcionarios || []
            });
        }

        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [servico]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    async function getAtendServ(servicoId) {
        try {
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

            const funcionarios = Array.isArray(data[0]) ? data[0] : data;
            setFuncServ(funcionarios);
            const ids = funcionarios.map(func => func.id);
            setDados(prev => ({ ...prev, funcionarios: ids }));

        } catch (err) {
            console.error("Erro ao buscar atendentes:", err);
        }
    }

    const fetchFuncionarios = async (id) => {
        try {
            const res = await fetch(`${URL}/empresa/getFunc/${id}`);
            const data = await res.json();
            setListaFuncionarios(data);
        } catch (err) {
            console.error('Erro ao buscar funcionários', err);
        }
    };

    const handleExcluir = async () => {
        await fetch(`${URL}/servicos/${servico.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        onClose();
        window.location.reload();
    };

    const getEmpresa = async () => {
        try {
            const response = await fetch(`${URL}/servicos/getEmpresa/${servico.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            fetchFuncionarios(data.id);

        } catch (err) {
            console.error('Erro ao buscar empresa', err);
        }
    }

    const handleSalvar = async () => {
        console.log("Dados para enviar:", dados);  // <-- aqui
        await fetch(`${URL}/servicos/${servico.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...dados,
                valor: Number(dados.valor),
                tempo_medio: Number(dados.tempo_medio)
            })
        });
        onClose();
        window.location.reload();
    };

    useEffect(() => {
        console.log("dados mudou:", dados);
    }, [dados]);

    useEffect(() => {
        getEmpresa();
        getAtendServ(servico.id)
    }, [servico]);

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-6">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">Editar Serviço</h2>
                        <button onClick={onClose} className="text-white hover:text-blue-200 transition-colors">
                            <BsXLg size={20} />
                        </button>
                    </div>
                </div>
                <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Nome do serviço</label>
                            <input
                                name="nome"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                                value={dados.nome}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Descrição</label>
                            <input
                                name="descricao"
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                                value={dados.descricao}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Valor</label>
                            <input
                                name="valor"
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                                value={dados.valor}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tempo médio</label>
                            <input
                                name="tempo_medio"
                                type="number"
                                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                                value={dados.tempo_medio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Funcionários responsáveis</label>
                        <div className="border border-gray-300 rounded-lg p-2 space-y-1 max-h-48 overflow-y-auto">
                            {listaFuncionarios.map(func => (
                                <div
                                    key={func.id}
                                    onClick={() => {
                                        setDados(prev => {
                                            const selected = prev.funcionarios.includes(func.id);
                                            return {
                                                ...prev,
                                                funcionarios: selected
                                                    ? prev.funcionarios.filter(id => id !== func.id)
                                                    : [...prev.funcionarios, func.id]
                                            };
                                        });
                                    }}
                                    className={`px-4 py-2 rounded-md cursor-pointer transition-colors ${dados.funcionarios.includes(func.id)
                                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {func.nome}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-gray-500">
                                {dados.funcionarios.length} {dados.funcionarios.length === 1 ? 'selecionado' : 'selecionados'}
                            </p>
                            <button
                                type="button"
                                onClick={() => setDados(prev => ({ ...prev, funcionarios: [] }))}
                                className={`text-sm ${dados.funcionarios.length > 0
                                    ? 'text-blue-600 hover:text-blue-800'
                                    : 'text-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={dados.funcionarios.length === 0}
                            >
                                Limpar seleção
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <button
                        onClick={handleExcluir}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
                    >
                        <BsXLg className="mr-2" /> Excluir
                    </button>
                    <button
                        onClick={handleSalvar}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <BsFillSdCardFill className="mr-2" /> Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalEditarServico;
