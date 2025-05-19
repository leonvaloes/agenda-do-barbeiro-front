'use client'

import React from "react";

function Table({ data, columns, setSelectedLine }) {
  const isListValid = Array.isArray(data) && data.length > 0;

  return (
    <div className="max-h-[100vh] overflow-x-auto rounded-lg border border-black/[.08] dark:border-white/[.1] shadow-sm">
      <table className="w-full text-sm sm:text-base text-left border-collapse table-auto">
        {isListValid ? (
          <>
            <thead className=" uppercase tracking-wide">
              <tr>
                {columns.map((column) => (
                  <th
                    key={`${column.headerName}_${column.field}`}
                    className="px-4 py-3 font-semibold whitespace-nowrap text-center"
                  >
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => setSelectedLine?.(row)}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={`${col.field}_${rowIndex}`}
                      className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center"
                    >
                      {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="text-center px-4 py-6 text-gray-500 dark:text-gray-400">
                Nenhum dado disponível
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Table;
