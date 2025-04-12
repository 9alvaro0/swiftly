"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Card from "@/components/ui/Card";

export interface TutorialCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    date: string;
    imageUrl?: string;
}

const TutorialCard = ({ id, title, description, category, level, date, imageUrl }: TutorialCardProps) => {
    const getCategoryColor = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "swiftui":
                return "bg-primary";
            case "swift":
                return "bg-secondary";
            default:
                return "bg-info";
        }
    };

    // Imágenes por defecto según la categoría desde URLs externas
    const getDefaultImage = (cat: string) => {
        switch (cat.toLowerCase()) {
            case "swiftui":
                return "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96.png";
            case "swift":
                return "https://developer.apple.com/assets/elements/icons/swift/swift-96x96.png";
            default:
                return "https://developer.apple.com/assets/elements/icons/xcode/xcode-96x96.png";
        }
    };

    const imageSource = imageUrl || getDefaultImage(category);

    return (
        <Link
            href={`/tutoriales/${id}`}
            className="block transition-transform duration-300 hover:scale-[1.02]"
        >
            <Card
                elevation="sm"
                className="h-full"
            >
                <div className="h-48 relative overflow-hidden">
                    <Image
                        src={imageSource}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        priority={false}
                        unoptimized={imageSource.startsWith("http")} // Para URLs externas
                    />
                    <div
                        className={`
            absolute top-0 right-0 text-white text-xs font-semibold px-2 py-1 m-2 rounded-sm
            ${getCategoryColor(category)}
          `}
                    >
                        {category}
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-secondary">{level}</span>
                        <span className="text-sm text-secondary">{date}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-primary">{title}</h3>
                    <p className="text-secondary mb-3 line-clamp-2">{description}</p>
                    <span className="text-primary font-medium">Leer tutorial →</span>
                </div>
            </Card>
        </Link>
    );
};

export default TutorialCard;
