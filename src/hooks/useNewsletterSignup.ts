// src/hooks/useNewsletterSignup.ts
import { signup } from "@/services/firebase/firestore/newsletter";
import { validateEmail, validateEmailFormat } from "@/utils/formUtils";
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
            await signup(email);
            resetForm();
        } catch {
            setError("Hubo un problema al suscribirte. Inténtalo de nuevo.");
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
        handleEmailChange,
        handleSubmit,
    };
}
