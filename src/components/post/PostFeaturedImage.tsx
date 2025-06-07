// src/components/post/PostFeaturedImage.tsx

import Image from "next/image";
import { useState } from "react";

interface PostFeaturedImageProps {
    image: string;
    title: string;
    caption?: string;
    aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2"; // Opciones de aspect ratio
}

export default function PostFeaturedImage({
    image,
    title,
    caption,
    aspectRatio = "16:9", // Valor predeterminado
}: PostFeaturedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!image) return null;

    // Calcular padding-bottom basado en el aspect ratio seleccionado
    const getAspectRatioPadding = () => {
        switch (aspectRatio) {
            case "1:1":
                return "100%"; // Cuadrado
            case "4:3":
                return "75%"; // Estándar TV antigua
            case "3:2":
                return "66.67%"; // Formato fotográfico común
            case "16:9":
            default:
                return "56.25%"; // Widescreen por defecto
        }
    };

    return (
        <figure className="mb-10">
            <div
                className="relative w-full rounded-lg overflow-hidden shadow-lg"
                style={{ paddingBottom: getAspectRatioPadding() }}
            >
                {/* Overlay de gradiente sutil para mejorar legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />

                {/* Indicador de carga */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                        <span className="sr-only">Cargando imagen...</span>
                    </div>
                )}

                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Pie de imagen opcional */}
            {caption && <figcaption className="text-sm text-center text-white/60 mt-2 italic">{caption}</figcaption>}
        </figure>
    );
}
