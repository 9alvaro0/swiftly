// src/components/post/PostFeaturedImage.tsx

import Image from "next/image";
import { useState } from "react";

interface PostFeaturedImageProps {
    imageUrl: string;
    title: string;
    caption?: string;
}

export default function PostFeaturedImage({ imageUrl, title, caption }: PostFeaturedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!imageUrl) return null;

    return (
        <figure className="mb-10">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                {/* Overlay de gradiente sutil para mejorar legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />

                {/* Indicador de carga */}
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                        <span className="sr-only">Cargando imagen...</span>
                    </div>
                )}

                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1024px"
                    className={`object-cover transition-opacity duration-500 ${
                        isLoading ? "opacity-0" : "opacity-100"
                    }`}
                    priority
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Pie de imagen opcional */}
            {caption && <figcaption className="text-sm text-center text-white/60 mt-2 italic">{caption}</figcaption>}
        </figure>
    );
}
