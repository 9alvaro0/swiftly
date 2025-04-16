// src/app/login/page.tsx

"use client";

import AuthDivider from "@/components/auth/AuthDivider";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            // Aquí iría la lógica de autenticación real
            console.log("Iniciando sesión con:", email, password);
            await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulación

            // Redirección post-login
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error en inicio de sesión:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Iniciar sesión"
            subtitle="Accede a tu cuenta para continuar aprendiendo"
        >
            <SocialLoginButtons />

            <AuthDivider text="o continúa con email" />

            <LoginForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />

            <p className="text-center text-white/60 mt-6">
                ¿No tienes una cuenta?{" "}
                <Link
                    href="/register"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                    Regístrate aquí
                </Link>
            </p>
        </AuthLayout>
    );
}
