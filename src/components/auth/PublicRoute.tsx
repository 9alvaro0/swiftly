// src/components/auth/PublicRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface PublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const router = useRouter();
    const { isAuthenticated, user, isLoading } = useAuthStore();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            if (user?.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/profile");
            }
        }
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
    }

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
