import React, { useState, useRef } from "react";
import { Edit, Save, Camera, Mail, AtSign } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import { FaGithub, FaGoogle, FaApple } from "react-icons/fa";

interface ProfileHeaderProps {
    isLoading: boolean;
    onSave: () => void;
}

export default function ProfileHeader({ isLoading, onSave }: ProfileHeaderProps) {
    const { user, setUser } = useAuthStore();
    const [isEditingField, setIsEditingField] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Estado para previsualizar la imagen
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const getProviderIcon = () => {
        const provider = user?.provider?.toLowerCase();

        if (provider === "github") {
            return (
                <FaGithub
                    size={18}
                    className="text-gray-800 dark:text-white"
                />
            );
        } else if (provider === "google") {
            return (
                <FaGoogle
                    size={18}
                    className="text-red-500"
                />
            );
        } else if (provider === "apple") {
            return (
                <FaApple
                    size={18}
                    className="text-gray-800 dark:text-white"
                />
            );
        }

        // Si no hay proveedor o no coincide con los conocidos
        return null;
    };

    const handleOpenModal = (field: string) => {
        const currentValue = user?.[field as keyof typeof user] || "";
        setEditingValue(currentValue as string);
        setIsEditingField(field);
    };

    const handleCloseModal = () => {
        setIsEditingField(null);
        setImagePreview(null);
    };

    const handleSaveField = () => {
        if (isEditingField) {
            setUser({ ...user!, [isEditingField]: editingValue });
            setIsEditingField(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Crear una URL para previsualizar la imagen
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Aquí puedes manejar la subida de la imagen - para este ejemplo solo actualizamos la vista previa
            // En una implementación real, subirías el archivo y luego actualizarías la URL en el usuario
        }
    };

    const handleSaveImage = () => {
        if (imagePreview) {
            // En una app real, aquí esperarías a que la imagen se suba al servidor
            // y luego actualizarías el usuario con la nueva URL
            setUser({ ...user!, photoURL: imagePreview });
            setIsEditingField(null);
            setImagePreview(null);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    // Componentes para el pie del modal
    const textFieldFooter = (
        <>
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveField}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
                Guardar
            </button>
        </>
    );

    const imageModalFooter = (
        <>
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveImage}
                disabled={!imagePreview}
                className={`px-4 py-2 rounded-lg ${
                    imagePreview
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-blue-400 text-white cursor-not-allowed"
                } transition-colors shadow-md`}
            >
                Guardar
            </button>
        </>
    );

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {/* Portada/Banner */}
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                {/* Botón para editar el perfil completo */}
                <button
                    onClick={onSave}
                    disabled={isLoading}
                    className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white py-1.5 px-3 rounded-lg shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors flex items-center"
                >
                    <Save
                        className="mr-2"
                        size={16}
                    />
                    Guardar Perfil
                </button>
            </div>

            <div className="px-6 pb-6 relative">
                {/* Imagen de perfil superpuesta */}
                <div className="absolute -top-12 left-6 group">
                    <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden relative">
                        <Image
                            src={user?.photoURL || "/default-avatar.png"}
                            alt={user?.username || "Perfil"}
                            fill
                            sizes="(max-width: 96px) 96px"
                            className="object-cover"
                        />
                        <button
                            onClick={() => handleOpenModal("photo")}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            aria-label="Cambiar foto de perfil"
                        >
                            <Camera
                                size={24}
                                className="text-white"
                            />
                        </button>
                    </div>
                </div>

                {/* Información del usuario - desplazada para dejar espacio a la imagen */}
                <div className="ml-32 pt-3 flex flex-wrap justify-between items-center">
                    <div className="space-y-1">
                        {/* Nombre con botón de edición */}
                        <div className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user?.name || "Nombre de usuario"}
                            </h1>
                            <button
                                onClick={() => handleOpenModal("name")}
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                aria-label="Editar nombre"
                            >
                                <Edit size={16} />
                            </button>
                        </div>

                        {/* Username con ícono */}
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <AtSign size={16} />
                            <span>{user?.username || "username"}</span>
                            <button
                                onClick={() => handleOpenModal("username")}
                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                aria-label="Editar nombre de usuario"
                            >
                                <Edit size={14} />
                            </button>
                        </div>

                        {/* Email con ícono y proveedor */}
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <Mail size={16} />
                            <span>{user?.email || "email@ejemplo.com"}</span>

                            {/* Icono del proveedor */}
                            {user?.provider && (
                                <div
                                    className="ml-2 flex items-center justify-center h-5 w-5 rounded-full bg-gray-100 dark:bg-gray-700"
                                    title={`Cuenta vinculada con ${user.provider}`}
                                >
                                    {getProviderIcon()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Estadísticas del perfil - se podrían agregar como complemento */}
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <div className="text-center">
                            <div className="text-xl font-bold">{user?.stats?.likes || 0}</div>
                            <div className="text-sm text-gray-500">Likes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-bold">{user?.stats?.viewsCount || 0}</div>
                            <div className="text-sm text-gray-500">Vistas</div>
                        </div>
                    </div>
                </div>

                {/* Biografía - Con espacio para más texto */}
                <div className="mt-6 relative group">
                    <p className="text-gray-700 dark:text-gray-300 pr-8">
                        {user?.bio || "Sin biografía. Haz clic en editar para agregar información sobre ti."}
                    </p>
                    <button
                        onClick={() => handleOpenModal("bio")}
                        className="absolute top-0 right-0 text-blue-500 hover:text-blue-700 transition-colors"
                        aria-label="Editar biografía"
                    >
                        <Edit size={16} />
                    </button>
                </div>
            </div>

            {/* Modales para edición */}
            <Modal
                isOpen={isEditingField === "name" || isEditingField === "username" || isEditingField === "bio"}
                onClose={handleCloseModal}
                title={`Editar ${
                    isEditingField === "name"
                        ? "Nombre"
                        : isEditingField === "username"
                        ? "Nombre de usuario"
                        : isEditingField === "bio"
                        ? "Biografía"
                        : ""
                }`}
                footer={textFieldFooter}
            >
                {isEditingField === "bio" ? (
                    <textarea
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="input-field p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white min-h-[100px] resize-y"
                        placeholder="Escribe algo sobre ti..."
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="input-field p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white"
                        placeholder={
                            isEditingField === "name"
                                ? "Tu nombre completo"
                                : isEditingField === "username"
                                ? "Tu nombre de usuario"
                                : ""
                        }
                        autoFocus
                    />
                )}
            </Modal>

            {/* Modal para cambiar foto */}
            <Modal
                isOpen={isEditingField === "photo"}
                onClose={handleCloseModal}
                title="Cambiar foto de perfil"
                footer={imageModalFooter}
            >
                <div className="flex flex-col items-center space-y-4">
                    {/* Previsualización de la imagen */}
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700 relative">
                        <Image
                            src={imagePreview || user?.photoURL || "/default-avatar.png"}
                            alt="Vista previa"
                            fill
                            sizes="(max-width: 128px) 128px"
                            className="object-cover"
                        />
                    </div>

                    {/* Input de archivo oculto */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Botón para seleccionar archivo */}
                    <button
                        onClick={triggerFileInput}
                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                    >
                        <Camera
                            className="mr-2"
                            size={18}
                        />
                        Seleccionar imagen
                    </button>
                </div>
            </Modal>
        </div>
    );
}
