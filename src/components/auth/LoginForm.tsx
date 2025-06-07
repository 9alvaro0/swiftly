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

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await loginWithEmailAndPassword(email, password);
            router.push("/");
        } catch (error) {
            handleFirebaseError(error, "Email Login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
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
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

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
                onChange={(e) => setPassword(e.target.value)}
                onIconClick={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center">
                <Checkbox
                    id="remember-me"
                    label="Recordarme"
                    name="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </div>

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
