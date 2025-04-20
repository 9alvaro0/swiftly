import React, { useState } from "react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/components/ui/Modal";
import UserImageHandler from "./UserImageHandler";
import {
    FaEdit,
    FaCamera,
    FaEnvelope,
    FaAt,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaGithub,
    FaGoogle,
    FaApple,
    FaHeart,
    FaEye,
    FaUser,
    FaArrowRight,
} from "react-icons/fa";
import { User } from "@/types/User";
import { formatDate } from "@/utils/dateUtils";

export default function ProfileHeader() {
    const { user, setUser } = useAuthStore();
    const [isEditingField, setIsEditingField] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Función para obtener el icono del proveedor de autenticación
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

        return null;
    };

    const handleOpenModal = (field: string): void => {
        const currentValue = user?.[field as keyof User] || "";
        setEditingValue(currentValue as string);
        setIsEditingField(field);
    };

    const handleCloseModal = (): void => {
        setIsEditingField(null);
        setImagePreview(null);
    };

    const handleSaveField = (): void => {
        if (isEditingField && user) {
            setUser({ ...user, [isEditingField]: editingValue });
            setIsEditingField(null);
        }
    };

    const handleSaveImage = (): void => {
        if (imagePreview && user) {
            if (isEditingField === "photo") {
                setUser({ ...user, photoURL: imagePreview });
            }
            setIsEditingField(null);
            setImagePreview(null);
        }
    };

    // Componentes para los pies de modal
    const textFieldFooter = (
        <div className="flex gap-3 justify-end w-full">
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveField}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
                Guardar
            </button>
        </div>
    );

    const imageModalFooter = (
        <div className="flex gap-3 justify-end w-full">
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveImage}
                disabled={!imagePreview}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    imagePreview
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                        : "bg-blue-400 text-white cursor-not-allowed"
                } transition-all shadow-md`}
            >
                Guardar {imagePreview && <FaArrowRight size={12} />}
            </button>
        </div>
    );

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all border border-gray-100 dark:border-gray-700">
            {/* Banner con degradado mejorado */}
            <div className="h-48 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 relative overflow-hidden">
                {/* Overlay para darle un efecto de profundidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Patrones decorativos */}
                <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-repeat"></div>
            </div>

            <div className="px-8 pt-2 pb-8 relative">
                {/* Foto de perfil con nuevo diseño */}
                <div className="absolute -top-20 left-8 group">
                    <div className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                        {user?.photoURL ? (
                            <Image
                                src={user.photoURL}
                                alt={user?.name || "Perfil"}
                                fill
                                sizes="(max-width: 144px) 144px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                <FaUser size={64} />
                            </div>
                        )}
                        <button
                            onClick={() => handleOpenModal("photo")}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                            aria-label="Cambiar foto de perfil"
                        >
                            <FaCamera
                                size={24}
                                className="text-white group-hover:scale-110 transition-transform"
                            />
                        </button>
                    </div>
                </div>

                {/* Información del usuario con mejor espaciado */}
                <div className="ml-44 pt-5 flex flex-col sm:flex-row justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                        {/* Nombre de usuario */}
                        <div className="flex items-center gap-2 group">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                                {user?.name || "Nombre de usuario"}
                            </h1>
                            <button
                                onClick={() => handleOpenModal("name")}
                                className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all"
                                aria-label="Editar nombre"
                            >
                                <FaEdit size={16} />
                            </button>
                        </div>

                        {/* Username mejorado */}
                        <div className="flex items-center text-gray-500 dark:text-gray-400 group">
                            <FaAt
                                size={14}
                                className="mr-1.5 flex-shrink-0"
                            />
                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                                {user?.username || "username"}
                            </span>
                            <button
                                onClick={() => handleOpenModal("username")}
                                className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all"
                                aria-label="Editar nombre de usuario"
                            >
                                <FaEdit size={14} />
                            </button>
                        </div>

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-2 opacity-80"></div>

                        {/* Email con ícono y proveedor */}
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <FaEnvelope
                                size={14}
                                className="mr-1.5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                            />
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

                        {/* Ubicación */}
                        <div className="flex items-center text-gray-500 dark:text-gray-400 group">
                            <FaMapMarkerAlt
                                size={14}
                                className="mr-1.5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                            />
                            <span>{user?.location || "Sin ubicación"}</span>
                            <button
                                onClick={() => handleOpenModal("location")}
                                className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all"
                                aria-label="Editar ubicación"
                            >
                                <FaEdit size={14} />
                            </button>
                        </div>

                        {/* Fecha de registro */}
                        {user?.createdAt && (
                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                <FaCalendarAlt
                                    size={14}
                                    className="mr-1.5 flex-shrink-0 text-gray-500 dark:text-gray-400"
                                />
                                <span>Se unió el {formatDate(user.createdAt)}</span>
                            </div>
                        )}
                    </div>

                    {/* Estadísticas del perfil */}
                    <div className="flex flex-wrap gap-4 items-start">
                        <div className="text-center px-5 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm hover:shadow-md transition-all border border-blue-100 dark:border-blue-900/30">
                            <div className="flex items-center justify-center mb-1">
                                <FaHeart
                                    size={16}
                                    className="text-red-500 mr-2"
                                />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user?.stats?.likes?.length || 0}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Likes</div>
                        </div>

                        <div className="text-center px-5 py-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-sm hover:shadow-md transition-all border border-purple-100 dark:border-purple-900/30">
                            <div className="flex items-center justify-center mb-1">
                                <FaEye
                                    size={16}
                                    className="text-purple-500 mr-2"
                                />
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {user?.stats?.viewsCount || 0}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Vistas</div>
                        </div>
                    </div>
                </div>

                {/* Biografía mejorada */}
                <div className="mt-8 p-5 rounded-xl relative border border-gray-100 dark:border-gray-700 shadow-sm group overflow-hidden">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Biografía</h3>
                    <div className="max-h-[200px] overflow-y-auto pr-2">
                        {" "}
                        {/* Contenedor con scroll */}
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed break-words">
                            {user?.bio || "Sin biografía. Haz clic en editar para agregar información sobre ti."}
                        </p>
                    </div>
                    <button
                        onClick={() => handleOpenModal("bio")}
                        className="absolute top-3 right-3 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-blue-500 transition-all p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Editar biografía"
                    >
                        <FaEdit size={16} />
                    </button>
                </div>
            </div>

            {/* Modales para edición */}
            <Modal
                isOpen={
                    isEditingField === "name" ||
                    isEditingField === "username" ||
                    isEditingField === "bio" ||
                    isEditingField === "location" ||
                    isEditingField === "website"
                }
                onClose={handleCloseModal}
                title={`Editar ${
                    isEditingField === "name"
                        ? "Nombre"
                        : isEditingField === "username"
                        ? "Nombre de usuario"
                        : isEditingField === "bio"
                        ? "Biografía"
                        : isEditingField === "location"
                        ? "Ubicación"
                        : isEditingField === "website"
                        ? "Sitio web"
                        : ""
                }`}
                footer={textFieldFooter}
            >
                {isEditingField === "bio" ? (
                    <textarea
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="input-field p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white min-h-[150px] resize-y"
                        placeholder="Escribe algo sobre ti..."
                        autoFocus
                    />
                ) : isEditingField === "website" ? (
                    <input
                        type="url"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="input-field p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white"
                        placeholder="https://tusitio.com"
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="input-field p-4 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white"
                        placeholder={
                            isEditingField === "name"
                                ? "Tu nombre completo"
                                : isEditingField === "username"
                                ? "Tu nombre de usuario"
                                : isEditingField === "location"
                                ? "Tu ubicación"
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
                title={isEditingField === "photo" ? "Cambiar foto de perfil" : "Cambiar imagen de portada"}
                footer={imageModalFooter}
            >
                <div className="flex flex-col items-center space-y-4">
                    <UserImageHandler
                        userId={user?.uid || ""}
                        initialImage={isEditingField === "photo" ? user?.photoURL : ""}
                        onClose={handleCloseModal}
                    />
                </div>
            </Modal>
        </div>
    );
}
