"use client";

import React, { useEffect, useState } from "react";
import { FaTimes, FaRocket, FaSwift } from "react-icons/fa";
import Button from "./Button";

interface SplashWelcomeProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SplashWelcome({ isOpen, onClose }: SplashWelcomeProps) {
    // Este estado controla si el modal está en el DOM
    const [isMounted, setIsMounted] = useState(false);
    // Este estado controla las clases de animación
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen && !isMounted) {
            // Primero montamos el componente
            setIsMounted(true);
            // Programamos la animación para el siguiente ciclo de renderizado
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else if (!isOpen && isMounted) {
            // Primero quitamos las clases de animación
            setIsAnimating(false);
            // Después de la transición, desmontamos el componente
            const timer = setTimeout(() => {
                setIsMounted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMounted]);

    // No renderizamos nada si no está montado
    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
            aria-modal="true"
            role="dialog"
        >
            <div
                className={`absolute inset-0 bg-black/50 transition-all duration-300 ${
                    isAnimating ? "backdrop-blur-sm" : "backdrop-blur-none"
                }`}
                onClick={onClose}
            ></div>

            {/* Contenido del splash */}
            <div
                className={`relative bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-700/90 p-8 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.5)] border border-blue-400/30 max-w-md w-full transition-all duration-300 ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ backdropFilter: "blur(12px)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                    aria-label="Cerrar"
                >
                    <FaTimes size={18} />
                </button>

                {/* Logo y encabezado */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mb-4">
                        <FaSwift className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">¡Bienvenido a Swiftly!</h2>
                    <p className="text-blue-100/80 text-center">
                        Tu plataforma para descubrir y compartir conocimiento sobre Swift y SwiftUI
                    </p>
                </div>

                {/* Características principales */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                        <div className="text-blue-300 mt-0.5">
                            <FaRocket size={18} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Tutoriales Interactivos</h3>
                            <p className="text-sm text-blue-100/70">
                                Aprende con tutoriales paso a paso creados por expertos en desarrollo iOS
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                        <div className="text-blue-300 mt-0.5">
                            <FaRocket size={18} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Comunidad Activa</h3>
                            <p className="text-sm text-blue-100/70">
                                Conecta con otros desarrolladores y comparte tu conocimiento
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                        <div className="text-blue-300 mt-0.5">
                            <FaRocket size={18} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Contenido Actualizado</h3>
                            <p className="text-sm text-blue-100/70">
                                Mantente al día con las últimas novedades de Swift y SwiftUI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col space-y-3">
                    <Button 
                        variant="primary" 
                        size="lg" 
                        fullWidth 
                        onClick={onClose}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 border border-blue-400/30"
                    >
                        Comenzar a explorar
                    </Button>
                    <div className="text-center text-blue-200/60 text-xs">
                        Puedes personalizar tus preferencias en tu perfil más tarde
                    </div>
                </div>
            </div>
        </div>
    );
}
