"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/User";
import { toast } from "sonner";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ContactInfoSection from "@/components/profile/ContactInfoSection";
import SocialLinksSection from "@/components/profile/SocialLinksSection";
import UserStatsSection from "@/components/profile/UserStatsSection";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
    const { user, setUser, logout } = useAuthStore();
    const [localUser] = useState<User | null>(user);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            setUser(localUser);;
            toast.success("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("No se pudo actualizar el perfil");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="container mx-auto max-w-4xl p-6 space-y-6">
                <ProfileHeader
                    isLoading={isLoading}
                    onSave={handleSave}
                />

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <ContactInfoSection/>
                        <SocialLinksSection/>
                    </div>
                    <div>
                        <UserStatsSection />
                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
