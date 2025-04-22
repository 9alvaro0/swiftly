// src/components/auth/RecoverForm.tsx

import { useState } from "react";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { FiMail } from "react-icons/fi";

export default function RecoverForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmitRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        setIsLoading(false);
    };

    return (
        <div>
            {!isSubmitted ? (
                <form
                    onSubmit={handleSubmitRecover}
                    className="space-y-6"
                >
                    <Input
                        id="email"
                        label="Email"
                        placeholder="tu@email.com"
                        icon={<FiMail className="h-5 w-5 text-gray-400" />}
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

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
                        <FiMail className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Correo enviado</h3>
                    <p className="text-white/70 mb-4">
                        Si existe una cuenta asociada a {email}, recibirás un correo con instrucciones para restablecer
                        tu contraseña.
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Probar con otro correo
                    </button>
                </div>
            )}
        </div>
    );
}
