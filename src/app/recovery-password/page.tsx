// src/app/recuperar-password/page.tsx
"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { Mail } from "lucide-react";

export default function RecuperarPasswordPage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulación de envío de correo de recuperación
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error al enviar correo de recuperación:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Recuperar contraseña"
            subtitle="Te enviaremos un enlace para restablecer tu contraseña"
        >
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
                {!isSubmitted ? (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-white mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="tu@email.com"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Enviando...
                                </div>
                            ) : (
                                "Enviar enlace de recuperación"
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 mb-4">
                            <Mail className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Correo enviado</h3>
                        <p className="text-white/70 mb-4">
                            Si existe una cuenta asociada a {email}, recibirás un correo con instrucciones para
                            restablecer tu contraseña.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Probar con otro correo
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center">
                <a
                    href="/login"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                    Volver a inicio de sesión
                </a>
            </div>
        </AuthLayout>
    );
}
