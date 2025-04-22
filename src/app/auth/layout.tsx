// src/components/auth/layout.tsx

import { FaSwift } from "react-icons/fa";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row text-white">
            {/* Panel lateral */}
            <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-900 overflow-hidden">
                {/* Decoración con blur */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-80 h-80 bg-fuchsia-500/20 rounded-full filter blur-3xl" />

                {/* Contenido del panel */}
                <div className="relative z-20 p-12 flex flex-col justify-center items-center h-full w-full text-center">
                    <div className="mb-8 flex items-center gap-4">
                        <FaSwift className="text-white text-5xl" />
                        <h2 className="text-5xl font-extrabold tracking-tight">Swiftly</h2>
                    </div>

                    <p className="text-xl max-w-md font-light opacity-90">
                        Tu plataforma para dominar Swift y SwiftUI de forma eficiente y moderna.
                    </p>

                    <div className="mt-10 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-md">
                        <span className="text-white font-medium text-sm uppercase tracking-wider">
                            Aprende. Codifica. Domina.
                        </span>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative">
                {/* Fondo decorativo móvil */}
                <div className="absolute inset-0 z-0 md:hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl" />
                    <div className="absolute -bottom-10 -left-20 w-64 h-64 bg-fuchsia-500/20 rounded-full filter blur-3xl" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl shadow-purple-500/20">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
