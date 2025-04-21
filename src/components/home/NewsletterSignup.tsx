// src/components/home/NewsletterSignup.tsx
"use client";

import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import Input from "../ui/Input";
import { FiMail } from "react-icons/fi";
import Button from "../ui/Button";

export default function NewsletterSignup() {
    const { email, error, isLoading, handleEmailChange, handleSubmit } = useNewsletterSignup();

    return (
        <section className="p-8 rounded-xl">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-2">¿Quieres recibir nuevos tutoriales?</h2>
                <p className="text-gray-600 mb-6">
                    Suscríbete a nuestro boletín y recibe tutoriales, noticias y recursos sobre Swift y SwiftUI.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-md mx-auto"
                >
                    <div className="flex flex-col space-y-2">
                        <div className="flex gap-2 items-center justify-center">
                            <Input
                                id="email"
                                placeholder="Tu correo electrónico"
                                icon={<FiMail />}
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={isLoading}
                            />
                            <Button
                                variant="primary"
                                size="md"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Suscribiendo..." : "Suscribirse"}
                            </Button>
                        </div>
                        {error && <ErrorMessage message={error} />}
                    </div>
                </form>
            </div>
        </section>
    );
}
