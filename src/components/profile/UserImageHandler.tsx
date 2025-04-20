"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useImages } from "@/hooks/useImages";
import { deleteUserImageByUrl, generateUserImagePath } from "@/utils/userImageUtils";
import { useAuthStore } from "@/store/authStore";
import { FiUpload, FiCamera, FiTrash2, FiAlertCircle } from "react-icons/fi";

interface UserImageHandlerProps {
    userId: string;
    initialImage?: string;
    onClose?: () => void;
}

const UserImageHandler: React.FC<UserImageHandlerProps> = ({ userId, initialImage = "", onClose }) => {
    const { uploadOrUpdate, loading, error } = useImages();
    const { user, setUser } = useAuthStore();
    const [uploadedImage, setUploadedImage] = useState<string>(initialImage);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Simulate upload progress
    const simulateProgress = useCallback(() => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                const next = prev + Math.random() * 15;
                if (next >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return next;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        const cleanupProgress = simulateProgress();

        try {
            const path = generateUserImagePath(file.name, userId);
            const imageUrl = await uploadOrUpdate(file, path);

            setUploadedImage(imageUrl);
            setUploadProgress(100);

            if (user) {
                setUser({ ...user, photoURL: imageUrl });
            }

            // Reset progress after success
            setTimeout(() => setUploadProgress(0), 500);
        } catch (err) {
            console.error("Error uploading image:", err);
            setUploadProgress(0);
        } finally {
            cleanupProgress();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
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
                handleFileUpload(file);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteImage = async () => {
        if (isDeleting || !uploadedImage) return;

        setIsDeleting(true);
        try {
            const success = await deleteUserImageByUrl(uploadedImage);

            if (success) {
                setUploadedImage("");

                if (user) {
                    setUser({ ...user, photoURL: "" });
                }
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Foto de perfil</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line
                                x1="18"
                                y1="6"
                                x2="6"
                                y2="18"
                            ></line>
                            <line
                                x1="6"
                                y1="6"
                                x2="18"
                                y2="18"
                            ></line>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-4 flex items-start">
                            <FiAlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                            <p className="text-red-600 dark:text-red-400 text-sm">{error.message}</p>
                        </div>
                    )}

                    <div className="flex flex-col items-center space-y-6">
                        {/* Image Preview or Upload Area */}
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
                            {uploadedImage ? (
                                <Image
                                    src={uploadedImage}
                                    alt="Foto de perfil"
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            ) : (
                                <div className="text-center p-4">
                                    <FiUpload className="w-10 h-10 mx-auto text-gray-400" />
                                    <p className="text-sm text-gray-500 mt-2">
                                        Arrastra una imagen o haz clic para subir
                                    </p>
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

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={loading || uploadProgress > 0}
                                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                                    uploadedImage
                                        ? "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                } transition-colors duration-200 disabled:opacity-50`}
                            >
                                {uploadedImage ? (
                                    <>
                                        <FiCamera className="w-4 h-4" />
                                        Cambiar foto
                                    </>
                                ) : (
                                    <>
                                        <FiUpload className="w-4 h-4" />
                                        Subir foto
                                    </>
                                )}
                            </button>

                            {uploadedImage && (
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    disabled={isDeleting}
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 flex items-center gap-2 transition-colors duration-200 disabled:opacity-50"
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                    {isDeleting ? "Eliminando..." : "Eliminar"}
                                </button>
                            )}
                        </div>

                        <p className="text-xs text-gray-500">Formatos permitidos: JPG, PNG, GIF, WEBP</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserImageHandler;
