"use client";

import { useState } from "react";
import { toast } from "react-toastify";


export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Validação simples
    if (!email || !password) {
      toast.error("Email e Senha são obrigatórios!", { position: "top-center" });
      return;
    }

    console.log("Login:", { email, password });
    toast.success("Login bem-sucedido!", { position: "top-center" });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center tracking-tight">
        Bem-vindo de volta 👋
      </h1>
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
        className="w-full h-11 bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] rounded-full transition-colors font-medium"
      >
        Entrar
      </button>
      <p className="text-sm text-center text-muted-foreground">
        Não tem conta?{" "}
        <button type="button" onClick={onSwitch} className="underline">
          Cadastre-se
        </button>
      </p>
    </form>
  );
}
