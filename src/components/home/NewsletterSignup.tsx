// src/components/home/NewsletterSignup.tsx

"use client";

import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import Input from "../ui/Input";
import { FiMail } from "react-icons/fi";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

export default function NewsletterSignup() {
    const { email, error, isLoading, isSuccess, handleEmailChange, handleSubmit } = useNewsletterSignup();

    return (
        <section className="p-8 rounded-xl">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-2">¿Quieres recibir nuevos tutoriales?</h2>
                <p className="text-gray-600 mb-6">
                    Suscríbete a nuestro boletín y recibe tutoriales, noticias y recursos sobre Swift y SwiftUI.
                </p>
                {isSuccess ? (
                    <div className="bg-green-500 text-white p-4 rounded-xl">
                        <h3 className="text-xl font-semibold">¡Te has suscrito con éxito!</h3>
                        <p>Gracias por unirte a nuestro boletín. Recibirás novedades pronto.</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md mx-auto"
                    >
                        <div className="flex flex-col space-y-4">
                            <div className="flex gap-4 items-center justify-center">
                                <Input
                                    id="email"
                                    placeholder="Tu correo electrónico"
                                    icon={<FiMail />}
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isLoading}
                                    className="rounded-lg p-3 bg-white text-gray-800"
                                />
                                <Button
                                    variant="primary"
                                    size="md"
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center justify-center"
                                >
                                    {isLoading ? <Spinner /> : "Suscribirse"}
                                </Button>
                            </div>
                            {error && <ErrorMessage message={error} />}
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
