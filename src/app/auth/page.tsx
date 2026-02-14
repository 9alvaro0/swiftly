// src/app/auth/page.tsx

"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import SocialAuth from "@/components/auth/SocialAuth";

export default function AuthPage() {
    const [activePage, setActivePage] = useState<"login" | "register" | "recover">("login");

    const headings: Record<string, string> = {
        login: "Iniciar sesión",
        register: "Crear cuenta",
        recover: "Recuperar contraseña",
    };

    return (
        <div className="p-6 rounded-xl">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">{headings[activePage]}</h1>
            <SocialAuth />
            <AuthForm
                activePage={activePage}
            />
            <AuthFooter
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </div>
    );
}
