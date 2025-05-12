"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm({ onSwitch }) {
  const URL = "http://localhost:3000"

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome || !email || !cpf || !senha) {
      toast.error("Todos os campos são obrigatórios!", { position: "top-center" });
      return;
    }
    try {
      const response = await fetch(`${URL}/cliente`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, cpf, senha }),
      });
      
      if (!response.ok) {
        console.log("Erro pelo lado do servidor!");
      }
      toast.success("Cadastro bem-sucedido!", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 5000);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center tracking-tight">
        Criar conta ✨
      </h1>
      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
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
        type="cpf"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        className="w-full h-11 px-4 rounded-full border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-foreground"
      />
      <input
        type="senha"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
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
