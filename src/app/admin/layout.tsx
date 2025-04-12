// src/app/admin/layout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50">
            {/* Barra de navegación del admin */}
            <header className="bg-primary text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Swiftly Admin</h1>
                    <Link
                        href="/"
                        className="hover:underline"
                    >
                        Ver sitio
                    </Link>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-surface border-r">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/admin"
                                    className={`block p-2 rounded ${
                                        isActive("/admin") && pathname === "/admin"
                                            ? "bg-primary text-white"
                                            : "hover:bg-neutral-100"
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/tutorials"
                                    className={`block p-2 rounded ${
                                        isActive("/admin/tutorials") ? "bg-primary text-white" : "hover:bg-neutral-100"
                                    }`}
                                >
                                    Tutoriales
                                </Link>
                            </li>
                            {/* Otras secciones que podrías añadir en el futuro */}
                            <li>
                                <Link
                                    href="/admin/resources"
                                    className="block p-2 hover:bg-neutral-100 rounded text-neutral-400"
                                >
                                    Recursos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/blog"
                                    className="block p-2 hover:bg-neutral-100 rounded text-neutral-400"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/settings"
                                    className="block p-2 hover:bg-neutral-100 rounded text-neutral-400"
                                >
                                    Configuración
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
