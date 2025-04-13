// src/components/tutorials/ImageUploader.tsx
"use client";

import React, { useRef } from "react";
import { uploadImage } from "@/services/imageUploadService";
import Button from "@/components/ui/Button";
import { Upload, Image as ImageIcon, Copy } from "lucide-react";

interface ImageUploaderProps {
    onImageUpload: (imageUrl: string) => void;
    className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, className = "" }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = await uploadImage(file);
            onImageUpload(imageUrl);
        } catch (error) {
            console.error("Error subiendo imagen:", error);
            // Aquí podrías añadir un toast de error
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex items-center ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
            />
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={triggerFileInput}
                className="flex items-center gap-2"
            >
                <Upload className="w-4 h-4" />
                Subir Imagen
            </Button>
        </div>
    );
};

// Componente adicional para mostrar imágenes subidas
export const UploadedImagesList = ({
    images,
    onCopyMarkdown,
}: {
    images: string[];
    onCopyMarkdown: (imageUrl: string) => void;
}) => {
    const copyToClipboard = (imageUrl: string) => {
        const markdownImage = `\n![Imagen Tutorial](${imageUrl})\n`;
        navigator.clipboard.writeText(markdownImage);
        onCopyMarkdown(imageUrl);
    };

    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((imageUrl, index) => (
                <div
                    key={index}
                    className="relative group"
                >
                    <img
                        src={imageUrl}
                        alt={`Tutorial imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                        onClick={() => copyToClipboard(imageUrl)}
                        className="absolute inset-0 bg-black/50 text-white 
                        opacity-0 group-hover:opacity-100 flex items-center 
                        justify-center transition-opacity"
                    >
                        <Copy className="w-6 h-6" />
                    </button>
                </div>
            ))}
        </div>
    );
};
