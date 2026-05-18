// src/components/ui/Modal.tsx
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
    const titleId = useId();
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<Element | null>(null);

    // Este estado controla si el modal está en el DOM
    const [isMounted, setIsMounted] = useState(false);
    // Este estado controla las clases de animación
    const [isAnimating, setIsAnimating] = useState(false);

    // Coordinated mount/animation/unmount lifecycle driven by isOpen prop.
    // The setState calls here are necessary to sequence the 300ms closing animation
    // before unmounting; using derived state would require the parent to handle timing.
    useEffect(() => {
        if (isOpen && !isMounted) {
            previousFocusRef.current = document.activeElement;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsMounted(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else if (!isOpen && isMounted) {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setIsMounted(false);
                if (previousFocusRef.current instanceof HTMLElement) {
                    previousFocusRef.current.focus();
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMounted]);

    // Focus the modal when it mounts
    useEffect(() => {
        if (isMounted && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isMounted]);

    // Escape key handler
    useEffect(() => {
        if (!isMounted) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMounted, onClose]);

    // Focus trap
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key !== "Tab" || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }, []);

    // No renderizamos nada si no está montado
    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
                isAnimating ? "opacity-100" : "opacity-0"
            }`}
        >
            <div
                className={`absolute inset-0 bg-black/30 transition-all duration-300 ${
                    isAnimating ? "backdrop-blur-sm" : "backdrop-blur-none"
                }`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Contenido del modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                className={`relative bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-200 dark:border-blue-900 max-w-md w-full transition-all duration-300 outline-none ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ backdropFilter: "blur(12px)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera */}
                <div className="flex justify-between items-center mb-6">
                    <h3 id={titleId} className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Cerrar"
                    >
                        <X size={18} />
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
