"use client";

import { useEffect } from "react";
import { BiErrorCircle } from "react-icons/bi";

export default function PostError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Post detail error:", error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center min-h-[60vh]">
            <div className="bg-red-900/20 border border-red-700 rounded-2xl p-8 max-w-xl shadow-sm">
                <div className="flex justify-center mb-4">
                    <BiErrorCircle className="text-red-400 w-12 h-12" />
                </div>
                <h1 className="text-2xl font-semibold text-red-400">
                    Error al cargar el artículo
                </h1>
                <p className="mt-4 text-gray-300">
                    No se pudo cargar este artículo. Por favor, inténtalo de nuevo.
                </p>
                <button
                    onClick={reset}
                    className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
}
