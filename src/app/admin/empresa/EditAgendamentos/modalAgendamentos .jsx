// components/ModalAgendamentos.js
'use client';

import { useEffect } from 'react';
import Table from '@/components/Table/Table';

export default function page({ onClose, data }) {
    const columns = [
        { field: "nome_cliente", headerName: "Cliente" },
        { field: "nome_servico", headerName: "Serviço" },
        {
            headerName: "Ações",
            field: "actions",
            renderCell: ({ row }) => (
                <button className="text-blue-600 hover:underline">Remarcar</button>
            ),
        },
    ];

    // Evita scroll do body quando o modal está aberto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-4xl relative">
                <button
                    className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">Ajustar Agendamentos</h2>
                <Table columns={columns} data={data} />
            </div>
        </div>
    );
}
