// src/hooks/useContactForm.ts

import { validateEmail, validateEmailFormat } from "@/utils/formUtils";
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
    const [submitError, setSubmitError] = useState("");

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

        if (!validateEmail(formState.email)) {
            newErrors.email = "El correo electrónico es obligatorio";
            isValid = false;
        }

        if (!validateEmailFormat(formState.email)) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al enviar el mensaje");
            }

            setIsSubmitted(true);
            setFormState({ name: "", email: "", message: "" });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Error al enviar el mensaje");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formState,
        errors,
        isSubmitting,
        isSubmitted,
        submitError,
        handleChange,
        handleSubmit,
    };
}
