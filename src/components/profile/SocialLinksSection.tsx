// src/components/profile/SocialLinksSection.tsx
import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEdit } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import { isValidUrl } from "@/utils/utils";
import Modal from "@/components/ui/Modal";

const socialIcons = {
    linkedin: FaLinkedin,
    github: FaGithub,
};

export default function SocialLinksSection() {
    const [editingLink, setEditingLink] = useState("");
    const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
    const { user, updateSocialLinks } = useAuthStore();

    const handleOpenModal = (platform: string) => {
        const currentValue = user?.socialLinks?.[platform as keyof typeof socialIcons] || "";
        setEditingLink(currentValue);
        setEditingPlatform(platform);
    };

    const handleCloseModal = () => {
        setEditingPlatform(null);
    };

    const handleSaveChanges = () => {
        if (editingPlatform && isValidUrl(editingLink)) {
            updateSocialLinks({ [editingPlatform]: editingLink });
            setEditingPlatform(null);
        } else {
            alert("Por favor ingrese un enlace válido.");
        }
    };

    // Componentes para el pie del modal
    const modalFooter = (
        <>
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
                Guardar
            </button>
        </>
    );

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Redes Sociales</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(socialIcons).map((platform) => {
                    const Icon = socialIcons[platform as keyof typeof socialIcons];
                    const currentLink = user?.socialLinks?.[platform as keyof typeof user.socialLinks] || "";

                    return (
                        <div
                            key={platform}
                            className="flex flex-col items-start space-y-2"
                        >
                            {/* Título */}
                            <div className="flex items-center space-x-2">
                                <Icon
                                    className="text-gray-500"
                                    size={20}
                                />
                                <span className="font-medium text-lg">
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </span>
                            </div>

                            {/* Enlace */}
                            <div className="flex items-center w-full space-x-2">
                            <button
                                    onClick={() => handleOpenModal(platform)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                    aria-label={`Editar enlace de ${platform}`}
                                >
                                    <FaEdit size={18} />
                                </button>
                                <p className="text-sm text-gray-700 truncate flex-grow">
                                    {currentLink ? (
                                        <a
                                            href={currentLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {currentLink}
                                        </a>
                                    ) : (
                                        <span className="italic text-gray-500">No especificado</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal usando el componente reutilizable */}
            <Modal
                isOpen={editingPlatform !== null}
                onClose={handleCloseModal}
                title={`Editar ${
                    editingPlatform ? editingPlatform.charAt(0).toUpperCase() + editingPlatform.slice(1) : ""
                }`}
                footer={modalFooter}
            >
                <input
                    type="text"
                    value={editingLink}
                    onChange={(e) => setEditingLink(e.target.value)}
                    className="input-field p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white"
                    placeholder={editingPlatform ? `https://${editingPlatform}.com/username` : ""}
                    autoFocus
                />
            </Modal>
        </div>
    );
}
