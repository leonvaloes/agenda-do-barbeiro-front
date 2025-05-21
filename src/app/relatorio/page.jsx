// pages/relatorio.jsx
import { BsCalendar3 } from "react-icons/bs";

export default function page() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
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
                      <input type="date" id="startDate" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
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
                      <input type="date" id="endDate" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-all flex items-center justify-center">
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
            <h1 className="flex gap-[10px] items-center text-bold text-2xl">
              <i className="text-[16px]"><BsCalendar3 /></i>
              Resultados
            </h1>
            <div id="emptyState" className="hidden flex flex-col items-center justify-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-gray-500 text-center max-w-md">Ajuste os filtros de data para visualizar os agendamentos.</p>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
