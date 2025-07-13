// src/components/home/NewsletterSignup.tsx

"use client";

import { useNewsletterSignup } from "@/hooks/useNewsletterSignup";
import { useAuthStore } from "@/store/authStore";
import { useUserNewsletter } from "@/hooks/useUserNewsletter";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import Input from "../ui/Input";
import { FiMail, FiCheck } from "react-icons/fi";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Link from "next/link";

export default function NewsletterSignup() {
    const { email, error, isLoading, isSuccess, handleEmailChange, handleSubmit } = useNewsletterSignup();
    const { user } = useAuthStore();
    const { subscriptionStatus, isLoading: isLoadingStatus } = useUserNewsletter();

    // Show loading while checking subscription status for authenticated users
    if (user && isLoadingStatus) {
        return (
            <section className="p-8 rounded-xl">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2">
                        <Spinner />
                        <span className="text-white/70">Verificando estado de suscripción...</span>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="p-8 rounded-xl">
            <div className="max-w-2xl mx-auto text-center">
                {user ? (
                    // User is authenticated
                    subscriptionStatus?.isActive ? (
                        // User is subscribed - no question header needed
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <FiCheck className="h-5 w-5 text-emerald-400" />
                                <h3 className="text-xl font-semibold text-white">¡Ya estás suscrito al newsletter!</h3>
                            </div>
                            <p className="text-white/70 mb-4">
                                Recibirás notificaciones sobre nuevos tutoriales y contenido de Swift/SwiftUI.
                            </p>
                            <Link 
                                href="/profile"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                            >
                                <FiMail className="h-4 w-4" />
                                Gestionar suscripción
                            </Link>
                        </div>
                    ) : (
                        // User is not subscribed - show question
                        <>
                            <h2 className="text-2xl font-bold text-white mb-2">¿Quieres recibir nuevos tutoriales?</h2>
                            <p className="text-white/70 mb-6">
                                Suscríbete a nuestro boletín y recibe tutoriales, noticias y recursos sobre Swift y SwiftUI.
                            </p>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold text-white mb-2">¡Hola {user.name || user.email}!</h3>
                                <p className="text-white/70 mb-4">
                                    Como usuario registrado, puedes gestionar tu suscripción al newsletter desde tu perfil.
                                </p>
                                <Link 
                                    href="/profile"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                                >
                                    <FiMail className="h-4 w-4" />
                                    Ir a mi perfil
                                </Link>
                            </div>
                        </>
                    )
                ) : (
                    // User is not authenticated - show question and form
                    <>
                        <h2 className="text-2xl font-bold text-white mb-2">¿Quieres recibir nuevos tutoriales?</h2>
                        <p className="text-white/70 mb-6">
                            Suscríbete a nuestro boletín y recibe tutoriales, noticias y recursos sobre Swift y SwiftUI.
                        </p>
                        {isSuccess ? (
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <FiCheck className="h-5 w-5 text-emerald-400" />
                                    <h3 className="text-xl font-semibold text-white">¡Te has suscrito con éxito!</h3>
                                </div>
                                <p className="text-white/70">Gracias por unirte a nuestro boletín. Recibirás novedades pronto.</p>
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
                                            className="bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder-white/40"
                                        />
                                        <Button
                                            variant="primary"
                                            size="md"
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                                        >
                                            {isLoading ? <Spinner /> : "Suscribirse"}
                                        </Button>
                                    </div>
                                    {error && <ErrorMessage message={error} />}
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
