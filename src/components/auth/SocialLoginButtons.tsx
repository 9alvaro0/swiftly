"use client";

import { useState } from "react";
import { loginWithGithub } from "@/firebase/auth/auth";
import { handleFirebaseError } from "@/firebase/errors";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";

export default function SocialLoginButtons() {
    const [loadingProvider, setLoadingProvider] = useState<"github" | "google" | "apple" | null>(null);

    const handleLogin = async (provider: "github" | "google" | "apple", loginFn: () => Promise<void>) => {
        setLoadingProvider(provider);
        try {
            console.log(`Iniciando sesión con ${provider}`);
            await loginFn();
            window.location.href = "/";
        } catch (error) {
            console.error(`Error al iniciar sesión con ${provider}:`, error);
            handleFirebaseError(error, `${provider.charAt(0).toUpperCase() + provider.slice(1)} Login`);
        } finally {
            console.log(`Finalizando sesión con ${provider}`);
            setLoadingProvider(null);
        }
    };

    const renderButton = (
        Icon: React.ElementType,
        text: string,
        provider: "github" | "google" | "apple",
        loginFn: () => Promise<void>
    ) => {
        const isLoading = loadingProvider === provider;

        return (
            <button
                type="button"
                disabled={isLoading}
                className={`
                    flex items-center justify-center w-full py-3 px-4 
                    border border-white/10 rounded-lg text-white 
                    bg-white/5 hover:bg-white/10 transition-colors
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
                onClick={() => handleLogin(provider, loginFn)}
            >
                {isLoading ? (
                    <>
                        <Spinner />
                        Iniciando sesión...
                    </>
                ) : (
                    <>
                        <Icon className="h-5 w-5 mr-2" />
                        {text}
                    </>
                )}
            </button>
        );
    };

    return (
        <div className="space-y-3">
            {renderButton(FaGithub, "Continuar con GitHub", "github", async () => {
                await loginWithGithub();
            })}

            {renderButton(FaGoogle, "Continuar con Google", "google", async () => {
                toast.info("Inicio de sesión con Google próximamente");
                // Implementación real de Google Login
            })}

            {renderButton(FaApple, "Continuar con Apple", "apple", async () => {
                toast.info("Inicio de sesión con Apple próximamente");
                // Implementación real de Apple Login
            })}
        </div>
    );
}
