// src/components/post/PostFeaturedImage.tsx

import Image from "next/image";
import { useState } from "react";

interface PostFeaturedImageProps {
    image: string;
    title: string;
    caption?: string;
}

export default function PostFeaturedImage({
    image,
    title,
    caption,
}: PostFeaturedImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    if (!image) return null;

    return (
        <figure className="mb-10">
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                    onLoad={() => setIsLoading(false)}
                />

                {/* Indicador de carga */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-gray-800 animate-pulse flex items-center justify-center">
                        <span className="sr-only">Cargando imagen...</span>
                    </div>
                )}
            </div>

            {/* Pie de imagen opcional */}
            {caption && <figcaption className="text-sm text-center text-white/60 mt-2 italic">{caption}</figcaption>}
        </figure>
    );
}
