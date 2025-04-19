// src/components/auth/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push("/login");
            } else if (adminOnly && user?.role !== "admin") {
                router.push("/profile");
            }
        }
    }, [isAuthenticated, isLoading, router, user, adminOnly]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (adminOnly && user?.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}
