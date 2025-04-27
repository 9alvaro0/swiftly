"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { Upload as UploadIcon, Camera as CameraIcon, AlertCircle as AlertCircleIcon } from "lucide-react";

interface EditProfileImageProps {
    isOpen: boolean;
    initialImage?: string;
    uploadProgress: number;
    isUploading: boolean;
    uploadError: string | null;
    imagePreview: string | null;
    onClose: () => void;
    onUploadImage: (file: File) => Promise<void>;
}

export default function EditProfileImage({
    isOpen,
    initialImage,
    uploadProgress,
    isUploading,
    uploadError,
    imagePreview,
    onClose,
    onUploadImage,
}: EditProfileImageProps) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mostrar imagen actual (preview o inicial)
    const currentImage = imagePreview || initialImage;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUploadImage(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const fileType = file.type;
            if (fileType.match(/^image\/(jpeg|png|gif|webp)$/)) {
                onUploadImage(file);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cambiar foto de perfil"
        >
            <div className="w-full py-4 space-y-6">
                {uploadError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-4 flex items-start">
                        <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                        <p className="text-red-600 dark:text-red-400 text-sm">{uploadError}</p>
                    </div>
                )}

                {/* Image Preview or Upload Area */}
                <div className="flex justify-center">
                    <div
                        className={`relative w-40 h-40 rounded-full border-2 ${
                            isDragging
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                : "border-gray-200 dark:border-gray-700"
                        } overflow-hidden flex items-center justify-center transition-all duration-200`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {currentImage ? (
                            <Image
                                src={currentImage}
                                alt="Foto de perfil"
                                fill
                                className="object-cover"
                                sizes="160px"
                            />
                        ) : (
                            <div className="text-center p-4">
                                <UploadIcon className="h-10 w-10 mx-auto text-gray-400" />
                                <p className="text-sm text-gray-500 mt-2">Arrastra una imagen o haz clic para subir</p>
                            </div>
                        )}

                        {/* Upload progress overlay */}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                <svg
                                    className="w-8 h-8 animate-spin"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <div className="mt-2">{Math.round(uploadProgress)}%</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={triggerFileInput}
                        disabled={isUploading || uploadProgress > 0}
                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                            currentImage
                                ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                        } transition-colors duration-200 disabled:opacity-50`}
                    >
                        {currentImage ? (
                            <>
                                <CameraIcon className="h-4 w-4" />
                                Cambiar foto
                            </>
                        ) : (
                            <>
                                <UploadIcon className="h-4 w-4" />
                                Subir foto
                            </>
                        )}
                    </button>
                </div>

                <p className="text-xs text-center text-gray-500">Formatos permitidos: JPG, PNG, GIF, WEBP</p>
            </div>
        </Modal>
    );
}
