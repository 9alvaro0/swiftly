// src/hooks/useNewsletterSignup.ts

import { subscribe } from "@/services/firebase/firestore/newsletter";
import { validateEmail, validateEmailFormat } from "@/utils/formUtils";
import { useState } from "react";

interface UseNewsletterSignupReturn {
    email: string;
    error: string;
    isLoading: boolean;
    isSuccess: boolean;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useNewsletterSignup(): UseNewsletterSignupReturn {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo electrónico");
            return;
        }

        if (!validateEmailFormat(email)) {
            setError("Por favor, ingresa un correo electrónico válido");
            return;
        }

        try {
            setIsLoading(true);
            await subscribe(email);
            
            // Send welcome email
            const response = await fetch('/api/newsletter/welcome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to send welcome email:', errorData);
                throw new Error('Error al enviar email de bienvenida');
            }
            
            setIsSuccess(true);
            resetForm();
        } catch(error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Hubo un error al suscribirte. Por favor, intenta de nuevo más tarde.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEmail("");
        setError("");
    };

    return {
        email,
        error,
        isLoading,
        isSuccess, // Ahora devolvemos el estado de éxito
        handleEmailChange,
        handleSubmit,
    };
}
