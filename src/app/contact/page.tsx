// src/app/contact/page.tsx

"use client";

import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import useContactForm from "@/hooks/useContactForm";

export default function ContactPage() {
    const { formState, errors, isSubmitting, isSubmitted, submitError, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="container mx-auto py-4 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-semibold text-white tracking-tight">Contacto</h1>
                    <p className="text-lg text-gray-300 mx-auto">
                        Estamos aquí para responder tus preguntas. Completa el formulario y nos pondremos en contacto
                        contigo pronto.
                    </p>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8">
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
                                className="bg-gray-800 text-white border-gray-600"
                            />

                            <Input
                                id="email"
                                label="Correo electrónico"
                                value={formState.email}
                                onChange={handleChange}
                                placeholder="tucorreo@ejemplo.com"
                                error={errors.email}
                                className="bg-gray-800 text-white border-gray-600"
                            />

                            <Textarea
                                id="message"
                                label="Mensaje"
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Escribe tu mensaje aquí..."
                                error={errors.message}
                                className="bg-gray-800 text-white border-gray-600 resize-none"
                            />

                            <div className="pt-6">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 py-3 px-4 flex items-center justify-center font-medium"
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
                            <FiCheckCircle className="h-16 w-16 text-green-500 mb-6" />
                            <h3 className="text-xl font-medium text-white mb-2">¡Mensaje enviado!</h3>
                            <p className="text-gray-300">
                                Gracias por contactarnos. Te responderemos lo antes posible.
                            </p>
                        </div>
                    )}

                    {submitError && (
                        <div className="mt-4 text-red-500 text-center">
                            <p>{submitError}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
