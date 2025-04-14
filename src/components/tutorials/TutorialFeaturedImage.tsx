// src/components/tutorials/TutorialFeaturedImage.tsx

import Image from "next/image";

interface TutorialFeaturedImageProps {
    imageUrl: string;
    title: string;
}

export default function TutorialFeaturedImage({ imageUrl, title }: TutorialFeaturedImageProps) {
    if (!imageUrl) return null;

    return (
        <div className="relative h-64 sm:h-96 rounded-lg overflow-hidden mb-8">
            <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1024px"
                className="object-cover"
                priority
            />
        </div>
    );
}
