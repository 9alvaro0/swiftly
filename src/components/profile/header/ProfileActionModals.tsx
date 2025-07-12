// src/components/profile/ProfileActionModals.tsx
import React from "react";
import { User } from "@/types/User";
import EditProfileField from "./EditProfileField";
import EditProfileImage from "./EditProfileImage";

interface ProfileActionModalsProps {
    isEditingField: string | null;
    editingValue: string;
    imagePreview: string | null;
    uploadProgress: number;
    isUploading: boolean;
    uploadError: string | null;
    user: User | null;
    onEditValueChange: (value: string) => void;
    onClose: () => void;
    onSaveField: () => Promise<void>;
    onUploadImage: (file: File) => Promise<void>;
}

export default function ProfileActionModals({
    isEditingField,
    editingValue,
    imagePreview,
    uploadProgress,
    isUploading,
    uploadError,
    user,
    onEditValueChange,
    onClose,
    onSaveField,
    onUploadImage,
}: ProfileActionModalsProps) {
    // Componentes para los pies de modal
    const textFieldFooter = (
        <div className="flex gap-3 justify-end w-full">
            <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
                Cancelar
            </button>
            <button
                onClick={() => onSaveField()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
                Guardar
            </button>
        </div>
    );

    return (
        <>
            {/* Modales para edición de campos de texto */}
            <EditProfileField
                isOpen={["name", "username", "bio", "location", "website"].includes(isEditingField || "")}
                fieldName={isEditingField}
                value={editingValue}
                onChange={onEditValueChange}
                onClose={onClose}
                onSave={onSaveField}
                footer={textFieldFooter}
            />

            {/* Modal para cambiar foto */}
            <EditProfileImage
                isOpen={isEditingField === "photo"}
                initialImage={user?.photoURL}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
                uploadError={uploadError}
                imagePreview={imagePreview}
                onClose={onClose}
                onUploadImage={onUploadImage}
            />
        </>
    );
}
