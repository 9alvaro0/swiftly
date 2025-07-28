// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
// Removed unused imports

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
    editorOnly?: boolean;
    requiresContentRole?: boolean;
    fallbackPath?: string;
}

export default function ProtectedRoute({ 
    children, 
    adminOnly = false,
    editorOnly = false,
    requiresContentRole = false,
    fallbackPath = "/profile"
}: ProtectedRouteProps) {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAuthStore();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setAuthChecked(true);
            
            if (!isAuthenticated) {
                router.push("/auth");
                return;
            }

            // Check admin permissions
            if (adminOnly && user?.role !== "admin") {
                router.push(fallbackPath);
                return;
            }

            // Check editor permissions
            if (editorOnly && user?.role !== "admin" && user?.role !== "editor") {
                router.push(fallbackPath);
                return;
            }

            // Check content creation permissions
            if (requiresContentRole && !['admin', 'editor', 'author'].includes(user?.role || '')) {
                router.push(fallbackPath);
                return;
            }
        }
    }, [isAuthenticated, isLoading, router, user, adminOnly, editorOnly, requiresContentRole, fallbackPath]);

    // Show minimal loading while checking authentication
    if (isLoading || !authChecked) {
        return null;
    }

    // Check authentication
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Acceso no autorizado</h2>
                    <p className="text-white/60 mb-4">Debes iniciar sesión para acceder a esta página</p>
                    <button
                        onClick={() => router.push("/auth")}
                        className="btn-primary px-6 py-2 rounded-lg"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    // Check admin permissions
    if (adminOnly && user?.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Acceso restringido</h2>
                    <p className="text-white/60 mb-4">No tienes permisos de administrador</p>
                    <button
                        onClick={() => router.push(fallbackPath)}
                        className="btn-secondary px-6 py-2 rounded-lg"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    // Check editor permissions
    if (editorOnly && user?.role !== "admin" && user?.role !== "editor") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Acceso restringido</h2>
                    <p className="text-white/60 mb-4">No tienes permisos de editor</p>
                    <button
                        onClick={() => router.push(fallbackPath)}
                        className="btn-secondary px-6 py-2 rounded-lg"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    // Check content creation permissions
    if (requiresContentRole && !['admin', 'editor', 'author'].includes(user?.role || '')) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-2">Acceso restringido</h2>
                    <p className="text-white/60 mb-4">No tienes permisos para crear contenido</p>
                    <button
                        onClick={() => router.push(fallbackPath)}
                        className="btn-secondary px-6 py-2 rounded-lg"
                    >
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
