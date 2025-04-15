"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import Input from "@/components/ui/Input";

// Creamos un componente Textarea similar al Input personalizado
const Textarea = ({
    label,
    error,
    id,
    className = "",
    ...props
}: {
    label: string;
    error?: string;
    id: string;
    className?: string;
    [key: string]: any;
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-primary font-medium mb-2"
            >
                {label}
            </label>
            <textarea
                id={id}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none 
        ${error ? "border-error" : "border-apple-gray-300 dark:border-apple-gray-600"} ${className}`}
                {...props}
            />
            {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>
    );
};

export default function ContactPage() {
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
        setFormState({
            ...formState,
            [id]: value,
        });

        // Limpiar errores al escribir
        if (errors[id as keyof typeof errors]) {
            setErrors({
                ...errors,
                [id]: "",
            });
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulación de envío
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset después de 3 segundos
            setTimeout(() => {
                setIsSubmitted(false);
                setFormState({
                    name: "",
                    email: "",
                    message: "",
                });
            }, 3000);
        }, 1500);
    };

    return (
        <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-semibold text-primary tracking-tight">Contacto</h1>
                    <p className="text-lg text-secondary mx-auto">
                        Estamos aquí para responder tus preguntas. Completa el formulario y nos pondremos en contacto
                        contigo pronto.
                    </p>
                </div>

                <div className="bg-card rounded-lg shadow-apple-md p-8">
                    {!isSubmitted ? (
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-2"
                        >
                            <Input
                                id="name"
                                label="Nombre"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                error={errors.name}
                                className="bg-surface text-primary"
                                required
                            />

                            <Input
                                id="email"
                                label="Correo electrónico"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="tucorreo@ejemplo.com"
                                error={errors.email}
                                className="bg-surface text-primary"
                                required
                            />

                            <Textarea
                                id="message"
                                label="Mensaje"
                                value={formState.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Escribe tu mensaje aquí..."
                                error={errors.message}
                                className="bg-surface text-primary resize-none"
                                required
                            />

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-300 py-3 px-4 flex items-center justify-center font-medium"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            Enviar mensaje <ArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <CheckCircle className="h-16 w-16 text-success mb-6" />
                            <h3 className="text-xl font-medium text-primary mb-2">¡Mensaje enviado!</h3>
                            <p className="text-secondary">
                                Gracias por contactarnos. Te responderemos lo antes posible.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
