// src/components/auth/LoginForm.tsx

"use client";

import { loginWithEmailAndPassword } from "@/services/firebase/auth/auth";
import { handleFirebaseError } from "@/services/firebase/errors";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import Input from "../ui/Input";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import Checkbox from "../ui/Checkbox";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

    const validate = (): boolean => {
        const errors: { email?: string; password?: string } = {};

        if (!email.trim()) {
            errors.email = "El email es obligatorio.";
        } else if (!EMAIL_REGEX.test(email)) {
            errors.email = "Introduce un email válido.";
        }

        if (!password) {
            errors.password = "La contraseña es obligatoria.";
        } else if (password.length < 6) {
            errors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        setIsLoading(true);

        try {
            await loginWithEmailAndPassword(email, password);
            router.push("/");
        } catch (err) {
            const msg = handleFirebaseError(err, "Email Login");
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const clearFieldError = (field: "email" | "password") => {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
        setError(null);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
        >
            <div>
                <Input
                    id="email"
                    label="Email"
                    placeholder="tu@email.com"
                    icon={<FiMail />}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        clearFieldError("email");
                    }}
                />
                {fieldErrors.email && (
                    <p className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>
                )}
            </div>

            <div>
                <Input
                    id="password"
                    label="Contraseña"
                    placeholder="••••••••"
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        clearFieldError("password");
                    }}
                    onIconClick={() => setShowPassword(!showPassword)}
                />
                {fieldErrors.password && (
                    <p className="text-red-400 text-sm mt-1">{fieldErrors.password}</p>
                )}
            </div>

            <div className="flex items-center">
                <Checkbox
                    id="remember-me"
                    label="Recordarme"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Spinner />
                        Iniciando sesión...
                    </div>
                ) : (
                    "Iniciar sesión"
                )}
            </button>
        </form>
    );
}
