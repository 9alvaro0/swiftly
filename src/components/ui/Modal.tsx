// src/components/ui/Modal.tsx
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
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
                className={`absolute inset-0 bg-black/30 transition-all duration-300 ${
                    isAnimating ? "backdrop-blur-sm" : "backdrop-blur-none"
                }`}
                onClick={onClose}
            ></div>

            {/* Contenido del modal */}
            <div
                className={`relative bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-200 dark:border-blue-900 max-w-md w-full transition-all duration-300 ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ backdropFilter: "blur(12px)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Cerrar"
                    >
                        <FaTimes size={18} />
                    </button>
                </div>

                {/* Contenido */}
                <div className="mb-6">{children}</div>

                {/* Pie de página / Botones */}
                {footer && <div className="flex justify-end space-x-3">{footer}</div>}
            </div>
        </div>
    );
}
