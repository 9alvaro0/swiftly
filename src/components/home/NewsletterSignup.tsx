// src/components/home/NewsletterSignup.tsx
'use client';

import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

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
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Tu correo electrónico"
                                className={`
                                    flex-grow px-4 py-2 rounded-md border 
                                    focus:outline-none focus:ring-2 
                                    ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}
                                `}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={`
                                    btn-primary 
                                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                                `}
                                disabled={isLoading}
                            >
                                {isLoading ? "Suscribiendo..." : "Suscribirse"}
                            </button>
                        </div>
                        {error && <ErrorMessage message={error} />}
                    </div>
                </form>
            </div>
        </section>
    );
}
