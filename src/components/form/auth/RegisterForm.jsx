"use client";

import { useState } from "react";
import { toast } from "react-toastify";  // Importando o toast

export default function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Todos os campos são obrigatórios!", { position: "top-center" });
      return;
    }

    console.log("Registro:", { name, email, password });
    toast.success("Cadastro bem-sucedido!", { position: "top-center" });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center tracking-tight">
        Criar conta ✨
      </h1>
      <input
        type="text"
        placeholder="Nome completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full h-11 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full h-11 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full h-11 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
      />
      <button
        type="submit"
        className="w-full h-11 bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] rounded-full transition-colors font-medium cursor-pointer"
      >
        Criar conta
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Já tem uma conta?{" "}
        <button type="button" onClick={onSwitch} className="underline cursor-pointer">
          Entrar
        </button>
      </p>
    </form>
  );
}
