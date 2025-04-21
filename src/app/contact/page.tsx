"use client";

import React, { useState } from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

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

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
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
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-300 py-3 px-4 flex items-center justify-center font-medium"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <Spinner />
                                            Enviando...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            Enviar mensaje <FiArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <FiCheckCircle className="h-16 w-16 text-success mb-6" />
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
