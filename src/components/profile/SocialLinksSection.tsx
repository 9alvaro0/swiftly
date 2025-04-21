import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaEdit, FaArrowRight } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import { isValidUrl } from "@/utils/utils";
import Modal from "@/components/ui/Modal";
import Input from "../ui/Input";

// Definir un mapa de iconos sociales
interface SocialIcons {
    [key: string]: React.ComponentType<{ size?: number; className?: string }>;
}

const socialIcons: SocialIcons = {
    linkedin: FaLinkedin,
    github: FaGithub,
};

export default function SocialLinksSection() {
    const [editingLink, setEditingLink] = useState<string>("");
    const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
    const { user, updateSocialLinks } = useAuthStore();

    const handleOpenModal = (platform: string) => {
        const currentValue = user?.socialLinks?.[platform as keyof typeof user.socialLinks] || "";
        setEditingLink(currentValue);
        setEditingPlatform(platform);
    };

    const handleCloseModal = () => {
        setEditingPlatform(null);
    };

    const handleSaveChanges = () => {
        if (!editingPlatform) return;

        if (isValidUrl(editingLink)) {
            updateSocialLinks({ [editingPlatform]: editingLink });
            setEditingPlatform(null);
        } else {
            // Validación de URL
            alert("Por favor ingrese un enlace válido para " + editingPlatform);
        }
    };

    // Componentes para el pie del modal
    const modalFooter = (
        <div className="flex gap-3 justify-end w-full">
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
                Guardar <FaArrowRight size={12} />
            </button>
        </div>
    );

    // Determinar qué plataformas sociales ya están configuradas
    const existingSocialLinks = user?.socialLinks || {};

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all border border-gray-100 dark:border-gray-700 mt-6">
            {/* Encabezado con degradado */}
            <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
                {/* Patrón decorativo sobre el banner */}
                <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-repeat"></div>

                {/* Título superpuesto */}
                <div className="absolute inset-0 flex items-center px-8">
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center">
                        Redes Profesionales
                    </h2>
                </div>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* LinkedIn */}
                    <div className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all border border-gray-100 dark:border-gray-700">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-all">
                            <FaLinkedin size={20} />
                        </div>

                        <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800 dark:text-gray-200">LinkedIn</span>
                                <button
                                    onClick={() => handleOpenModal("linkedin")}
                                    className="p-1.5 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                    aria-label="Editar enlace de LinkedIn"
                                >
                                    <FaEdit size={16} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                {existingSocialLinks.linkedin ? (
                                    <a
                                        href={existingSocialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {existingSocialLinks.linkedin.replace(/^https?:\/\//, "")}
                                    </a>
                                ) : (
                                    <span className="italic text-gray-400 dark:text-gray-500">
                                        Sin perfil de LinkedIn
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all border border-gray-100 dark:border-gray-700">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-all">
                            <FaGithub size={20} />
                        </div>

                        <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800 dark:text-gray-200">GitHub</span>
                                <button
                                    onClick={() => handleOpenModal("github")}
                                    className="p-1.5 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                    aria-label="Editar enlace de GitHub"
                                >
                                    <FaEdit size={16} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                                {existingSocialLinks.github ? (
                                    <a
                                        href={existingSocialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {existingSocialLinks.github.replace(/^https?:\/\//, "")}
                                    </a>
                                ) : (
                                    <span className="italic text-gray-400 dark:text-gray-500">
                                        Sin perfil de GitHub
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para editar red social */}
            <Modal
                isOpen={editingPlatform !== null}
                onClose={handleCloseModal}
                title={`Editar perfil de ${
                    editingPlatform === "linkedin" ? "LinkedIn" : editingPlatform === "github" ? "GitHub" : ""
                }`}
                footer={modalFooter}
            >
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        {editingPlatform && socialIcons[editingPlatform] && (
                            <div
                                className={`p-3 rounded-full ${
                                    editingPlatform === "linkedin"
                                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                }`}
                            >
                                {React.createElement(socialIcons[editingPlatform], { size: 24 })}
                            </div>
                        )}
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                                {editingPlatform === "linkedin"
                                    ? "LinkedIn"
                                    : editingPlatform === "github"
                                    ? "GitHub"
                                    : ""}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {editingPlatform === "linkedin"
                                    ? "Ingresa la URL completa de tu perfil de LinkedIn"
                                    : "Ingresa la URL completa de tu perfil de GitHub"}
                            </p>
                        </div>
                    </div>

                    <Input
                        id="social-link"
                        placeholder={
                            editingPlatform === "linkedin"
                                ? "https://linkedin.com/in/tu-perfil"
                                : "https://github.com/tu-usuario"
                        }
                        type="url"
                        value={editingLink}
                        onChange={(e) => setEditingLink(e.target.value)}
                        autoFocus
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        {editingPlatform === "linkedin"
                            ? "Ejemplo: https://linkedin.com/in/nombre-usuario"
                            : "Ejemplo: https://github.com/nombre-usuario"}
                    </p>
                </div>
            </Modal>
        </div>
    );
}
