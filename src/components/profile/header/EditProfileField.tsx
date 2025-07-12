// src/components/profile/EditProfileField.tsx
import React, { ReactNode } from "react";
import Modal from "@/components/ui/Modal";

interface EditProfileFieldProps {
    isOpen: boolean;
    fieldName: string | null;
    value: string;
    onChange: (value: string) => void;
    onClose: () => void;
    onSave: () => Promise<void>;
    footer: ReactNode;
}

export default function EditProfileField({
    isOpen,
    fieldName,
    value,
    onChange,
    onClose,
    onSave,
    footer,
}: EditProfileFieldProps) {
    const fieldLabels: Record<string, string> = {
        name: "Nombre",
        username: "Nombre de usuario",
        bio: "Biografía",
        location: "Ubicación",
        website: "Sitio web",
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey && fieldName !== "bio") {
            e.preventDefault();
            onSave();
        }
    };

    const getMaxLength = () => {
        switch (fieldName) {
            case "bio":
                return 160;
            case "username":
                return 30;
            case "name":
                return 50;
            case "location":
                return 50;
            case "website":
                return 100;
            default:
                return 100;
        }
    };

    const getPlaceholder = () => {
        switch (fieldName) {
            case "bio":
                return "Escribe una breve biografía...";
            case "username":
                return "nombre_usuario";
            case "name":
                return "Tu nombre";
            case "location":
                return "Ciudad, País";
            case "website":
                return "https://example.com";
            default:
                return "";
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Editar ${fieldLabels[fieldName || ""]}`}
            footer={footer}
        >
            <div className="w-full py-4">
                <div className="mb-1">
                    <label
                        htmlFor={`edit-${fieldName}`}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        {fieldLabels[fieldName || ""]}
                    </label>
                    {fieldName === "bio" && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {value.length}/{getMaxLength()} caracteres
                        </p>
                    )}
                </div>

                {fieldName === "bio" ? (
                    <textarea
                        id={`edit-${fieldName}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={getPlaceholder()}
                        rows={4}
                        maxLength={getMaxLength()}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                ) : (
                    <input
                        id={`edit-${fieldName}`}
                        type={fieldName === "website" ? "url" : "text"}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={getPlaceholder()}
                        maxLength={getMaxLength()}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                )}
            </div>
        </Modal>
    );
}
