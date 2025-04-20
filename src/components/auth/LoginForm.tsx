// src/components/auth/LoginForm.tsx

"use client";

import { loginWithEmailAndPassword } from "@/firebase/auth/auth";
import { handleFirebaseError } from "@/firebase/errors";
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            loginWithEmailAndPassword(email, password);
            window.location.href = "/";
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
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-1"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                />
            </div>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-white"
                    >
                        Contraseña
                    </label>
                    <Link
                        href="/recovery-password"
                        className="text-sm text-blue-400 hover:text-blue-300"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                />
            </div>

            <div className="flex items-center">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-500 bg-white/5 border-white/20 rounded focus:ring-blue-500"
                />
                <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white/70"
                >
                    Recordarme
                </label>
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
