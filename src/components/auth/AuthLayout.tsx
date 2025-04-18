// src/components/auth/AuthLayout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, Apple } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showBackButton?: boolean;
}

export default function AuthLayout({ children, title, subtitle, showBackButton = true }: AuthLayoutProps) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            {/* Panel lateral con gradiente */}
           <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden">
    {/* Elementos decorativos de fondo */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl"></div>

    {/* Contenido del panel */}
    <div className="relative z-20 p-12 flex flex-col justify-center items-center h-full w-full text-white text-center">
        <div className="mb-8 flex items-center justify-center">
            <Apple className="h-12 w-12 mr-4 text-white" />
            <h2 className="text-4xl font-bold">Swiftly</h2>
        </div>

        <p className="text-2xl max-w-md mx-auto font-light">
            Tu plataforma para dominar Swift y SwiftUI de la manera más eficiente
        </p>

        <div className="flex items-center justify-center bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/20 mt-8 mx-auto">
            <span className="text-white/90">Aprende. Codifica. Domina.</span>
        </div>
    </div>
</div>

            {/* Formulario */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 relative">
                {/* Gradiente de fondo para móvil */}
                <div className="absolute inset-0 z-0 block md:hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-20 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
                </div>

                {showBackButton && (
                    <Link
                        href="/"
                        className="absolute top-8 left-8 flex items-center text-white/70 hover:text-white transition-colors group"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>
                )}

                <div className="w-full max-w-md relative z-10">
                    <div className="md:hidden text-center mb-10">
                        <div className="flex justify-center items-center mb-6">
                            <Apple className="h-10 w-10 mr-3 text-white" />
                            <h2 className="text-3xl font-bold text-white">Swiftly</h2>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
                        {subtitle && <p className="text-white/70 max-w-sm mx-auto">{subtitle}</p>}
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
                        {children}
                    </div>

                    <div className="mt-8 text-center text-white/40 text-sm">
                        <p>© {new Date().getFullYear()} Swiftly. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
