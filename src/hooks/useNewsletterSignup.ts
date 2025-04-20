// src/hooks/useNewsletterSignup.ts
import { signup } from "@/firebase/firestore/newsletter";
import { useState } from "react";

interface UseNewsletterSignupReturn {
    email: string;
    error: string;
    isLoading: boolean;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useNewsletterSignup(): UseNewsletterSignupReturn {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validaciones
        if (!email.trim()) {
            setError("Por favor, ingresa un correo electrónico");
            return;
        }

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo electrónico válido");
            return;
        }

        try {
            setIsLoading(true);
            // Llamada al servicio de newsletter
            await signup(email);

            // Resetear formulario
            setEmail("");
            // Mostrar mensaje de éxito (puedes usar un toast o estado)
            alert("¡Gracias por suscribirte!");
        } catch (err) {
            // Manejar error de suscripción
            console.error("Error al suscribirse:", err);
            setError("Hubo un problema al suscribirte. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        error,
        isLoading,
        handleEmailChange,
        handleSubmit,
    };
}
