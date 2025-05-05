"use client";

import { useState } from "react";
import LoginForm from "@/components/form/auth/LoginForm";
import RegisterForm from "@/components/form/auth/RegisterForm";
import FadeSwitch from "@/components/ui/FadeSwitch";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <>
      <div className="min-h-screen grid place-items-center text-foreground p-6 sm:p-12 font-[family-name:var(--font-geist-sans)]">
        <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg border border-black/[.08] dark:border-white/[.145] p-8 space-y-6">
          <FadeSwitch activeKey={mode}>
            {mode === "login" ? (
              <LoginForm onSwitch={() => setMode("register")} />
            ) : (
              <RegisterForm onSwitch={() => setMode("login")} />
            )}
          </FadeSwitch>
        </div>
      </div>

    </>
  );
}
