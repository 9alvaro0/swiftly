// src/profile/page.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useState } from "react";
import { FaSignOutAlt, FaKey, FaChild, FaUserCog } from "react-icons/fa";

import ProfileHeader from "@/components/profile/ProfileHeader";
import SocialLinksSection from "@/components/profile/SocialLinksSection";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default function ProfilePage() {
    const { logout } = useAuthStore();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
        toast.info("Sesión cerrada correctamente");
    };

    const handleChangePassword = () => {
        // Aquí iría la lógica para cambiar contraseña
        setShowChangePasswordModal(false);
        toast.success("Contraseña actualizada correctamente");
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
                {/* Header principal del perfil */}
                <ProfileHeader />

                {/* Sección de redes profesionales */}
                <SocialLinksSection />

                {/* Acciones rápidas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {/* Cambiar contraseña */}
                    <button
                        onClick={() => setShowChangePasswordModal(true)}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all border border-gray-100 dark:border-gray-700"
                    >
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-all">
                            <FaKey size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-800 dark:text-gray-200">Cambiar contraseña</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Actualiza tu seguridad</p>
                        </div>
                    </button>

                    {/* Configuración de cuenta */}
                    <button
                        onClick={() => toast.info("Configuración de cuenta")}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all border border-gray-100 dark:border-gray-700"
                    >
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-all">
                            <FaUserCog size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-800 dark:text-gray-200">Configuración</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Preferencias de cuenta</p>
                        </div>
                    </button>

                    {/* Seguridad */}
                    <button
                        onClick={() => toast.info("Seguridad de la cuenta")}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all border border-gray-100 dark:border-gray-700"
                    >
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-all">
                            <FaChild size={20} />
                        </div>
                        <div className="text-left">
                            <div className="font-medium text-gray-800 dark:text-gray-200">Seguridad</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Revisa la actividad</p>
                        </div>
                    </button>
                </div>

                {/* Botón de cierre de sesión separado */}
                <div className="mt-6">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all border border-gray-100 dark:border-gray-700 text-red-600 dark:text-red-400"
                    >
                        <FaSignOutAlt size={18} />
                        <span className="font-medium">Cerrar sesión</span>
                    </button>
                </div>

                {/* Modal de confirmación de logout */}
                <Modal
                    isOpen={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    title="Confirmar cierre de sesión"
                    footer={
                        <div className="flex gap-3 justify-end w-full">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all shadow-md"
                            >
                                Confirmar
                            </button>
                        </div>
                    }
                >
                    <div className="py-4">
                        <p className="text-gray-700 dark:text-gray-300">
                            ¿Estás seguro que deseas cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder
                            a tu cuenta.
                        </p>
                    </div>
                </Modal>

                {/* Modal para cambiar contraseña */}
                <Modal
                    isOpen={showChangePasswordModal}
                    onClose={() => setShowChangePasswordModal(false)}
                    title="Cambiar contraseña"
                    footer={
                        <div className="flex gap-3 justify-end w-full">
                            <button
                                onClick={() => setShowChangePasswordModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
                            >
                                Actualizar
                            </button>
                        </div>
                    }
                >
                    <div className="space-y-4 py-2">
                        <div>
                            <Input
                                id="current-password"
                                label="Contraseña actual"
                                placeholder="Ingresa tu contraseña actual"
                                type="password"
                            />
                        </div>

                        <div>
                            <Input
                                id="new-password"
                                label="Nueva contraseña"
                                placeholder="Ingresa tu nueva contraseña"
                                type="password"
                            />
                        </div>

                        <div>
                            <Input
                                id="confirm-password"
                                label="Confirmar contraseña"
                                placeholder="Confirma tu nueva contraseña"
                                type="password"
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </ProtectedRoute>
    );
}
