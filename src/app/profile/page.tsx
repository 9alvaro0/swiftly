// src/profile/page.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

import ProfileHeader from "@/components/profile/header/ProfileHeader";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Modal from "@/components/ui/Modal";
import NewsletterSubscription from "@/components/profile/NewsletterSubscription";

export default function ProfilePage() {
    const { logout } = useAuthStore();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = () => {
        logout();
        setShowLogoutModal(false);
        toast.info("Sesión cerrada correctamente");
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
                    {/* Header principal del perfil */}
                    <ProfileHeader />

                    {/* Newsletter Subscription */}
                    <NewsletterSubscription />

                    <div className="mt-6">
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-800 hover:bg-red-900/20 transition-all border border-gray-700 text-red-400 hover:text-red-300"
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
                                    className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogoutConfirm}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all shadow-md"
                                >
                                    Confirmar
                                </button>
                            </div>
                        }
                    >
                        <div className="py-4">
                            <p className="text-gray-300">
                                ¿Estás seguro que deseas cerrar tu sesión? Tendrás que volver a iniciar sesión para acceder
                                a tu cuenta.
                            </p>
                        </div>
                    </Modal>
                </div>
        </ProtectedRoute>
    );
}
