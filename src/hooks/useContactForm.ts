// src/hooks/useContactForm.ts

import { useState } from "react";

export default function useContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));

        if (errors[id as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            email: "",
            message: "",
        };
        let isValid = true;

        if (!formState.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
            isValid = false;
        }

        if (!formState.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = "El correo electrónico no es válido";
            isValid = false;
        }

        if (!formState.message.trim()) {
            newErrors.message = "El mensaje es obligatorio";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (onSuccess?: () => void) => (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            onSuccess?.();
        }, 1500);
    };

    return {
        formState,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handleSubmit,
    };
}
