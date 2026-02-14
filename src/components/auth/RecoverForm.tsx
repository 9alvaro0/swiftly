// src/components/auth/RecoverForm.tsx

"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { handleFirebaseError } from "@/services/firebase/errors";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { Mail } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RecoverForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const validate = (): boolean => {
        if (!email.trim()) {
            setEmailError("El email es obligatorio.");
            return false;
        }
        if (!EMAIL_REGEX.test(email)) {
            setEmailError("Introduce un email válido.");
            return false;
        }
        setEmailError(null);
        return true;
    };

    const handleSubmitRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setIsLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setIsSubmitted(true);
        } catch (err) {
            // Show generic success message even on user-not-found to avoid email enumeration.
            // Only show errors for actual failures (network, rate limit, etc.)
            const firebaseErr = err as { code?: string };
            if (firebaseErr.code === "auth/user-not-found") {
                setIsSubmitted(true);
            } else {
                const msg = handleFirebaseError(err, "Password Recovery");
                setError(msg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!isSubmitted ? (
                <form
                    onSubmit={handleSubmitRecover}
                    className="space-y-6"
                    noValidate
                >
                    <Input
                        id="email"
                        label="Email"
                        placeholder="tu@email.com"
                        icon={<Mail className="h-5 w-5 text-gray-400" />}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        error={emailError || undefined}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                            setError(null);
                        }}
                    />

                    {error && (
                        <div role="alert" className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <Spinner />
                                Enviando...
                            </div>
                        ) : (
                            "Enviar enlace de recuperación"
                        )}
                    </button>
                </form>
            ) : (
                <div className="text-center py-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 mb-4">
                        <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Correo enviado</h3>
                    <p className="text-white/70 mb-4">
                        Si existe una cuenta asociada a {email}, recibirás un correo con instrucciones para restablecer
                        tu contraseña.
                    </p>
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            setError(null);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Probar con otro correo
                    </button>
                </div>
            )}
        </div>
    );
}
