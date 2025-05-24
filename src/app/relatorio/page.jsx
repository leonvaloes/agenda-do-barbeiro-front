'use client'

import Button from "@/components/buttons/ButtonBack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCalendar3, BsCardChecklist } from "react-icons/bs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function page() {

  const URL = "http://localhost:3000";
  const idUser = Cookies.get('id');

  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();

  const [agendamentos, setAgendamentos] = useState(null);


  const router = useRouter();

  async function handleFiltrar() {
    try {
      if (dataInicio != null && dataFim != null && dataInicio < dataFim) {
        console.log("Data Inicio", dataInicio);
        console.log("Data Fim", dataFim);
        console.log("ID", idUser);

        const response = await fetch(
          `${URL}/agendamento/getRelatorio/${idUser}?dataInicio=${encodeURIComponent(dataInicio)}&dataFim=${encodeURIComponent(dataFim)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAgendamentos(data);
        }
      }
      else {
        toast.error("Periodo inválido !", { position: "top-center" });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => router.back()} childreen={"Voltar"}></Button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 flex items-center">
            Relatório de Agendamentos
          </h1>
          <p className="text-gray-600 mt-2">Filtre os agendamentos por período desejado</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              Filtros de Data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-3">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Inicial
                    </label>

                    <div className="relative">
                      <input type="date" id="startDate" onChange={(e) => setDataInicio(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                  <div className="relative flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data Final
                    </label>
                    <div className="relative">
                      <input type="date" id="endDate" onChange={(e) => setDataFim(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={handleFiltrar} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center">
                Filtrar Agendamentos
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center">
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="p-6">
            <h1 className="flex gap-[10px] items-center text-bold text-2xl mb-8">
              <i className="text-[16px] "><BsCalendar3 /></i>
              Resultados
            </h1>




            {agendamentos === null ? (
              <p className="text-gray-500 col-span-full">Ajuste os filtros de data para visualizar os agendamentos.</p>
            ) : agendamentos.length === 0 ? (
              <p className="text-gray-500 col-span-full">Nenhum agendamento encontrado.</p>
            ) : (
              <>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-500 mr-3">
                        <i><BsCardChecklist /></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Agendamentos</p>
                        <h3 className="text-xl font-bold">{agendamentos?.length ?? 0}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full text-green-500 mr-3">
                        <i><BsCardChecklist /></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Ganho</p>
                        <h3 className="text-xl font-bold">
                          R$ {agendamentos
                            ?.filter(ag => ag.estado === "concluído")
                            .reduce((acc, ag) => acc + Number(ag.valor || 0), 0)
                            .toFixed(2)}

                        </h3>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {agendamentos.map((agendamento, index) => (
                    <div
                      key={index}
                      className={`rounded p-4 shadow-sm bg-white border-l-4 ${agendamento.estado === 'concluído'
                        ? 'border-green-500'
                        : agendamento.estado === 'cancelado'
                          ? 'border-red-500'
                          : agendamento.estado === 'confirmação'
                            ? 'border-yellow-500'
                            : 'border-blue-500'
                        }`}
                    >
                      <p><strong>Estado:</strong> {agendamento.estado}</p>
                      <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                      <p><strong>Valor:</strong> R$ {agendamento.valor}</p>
                      <p><strong>Data/Hora:</strong> {new Date(agendamento.data_hora).toLocaleString()}</p>
                      <p><strong>Atendente:</strong> {agendamento.nome_atendente}</p>
                    </div>
                  ))}
                </div>
              </>
            )}






          </div>
        </div>

      </div>
    </div>
  );
}
