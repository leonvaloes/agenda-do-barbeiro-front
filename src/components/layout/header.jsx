"use client";

import { useState } from "react";
import { BsCalendar3 } from "react-icons/bs";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            <span><BsCalendar3 /></span>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-800">AgendaFácil</h1>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="absolute w-full bg-white shadow-lg rounded-b-lg px-4 py-2">
          <div className="container mx-auto">
            <nav>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-blue-50 rounded">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-blue-50 rounded">
                    Relatórios
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-700 hover:bg-blue-50 rounded">
                    Sair
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

    </header>
  );
}
