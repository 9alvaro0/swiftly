"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";
import { LayoutDashboard, BookOpen, FolderKanban, Newspaper, Settings, ExternalLink } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            exact: true,
        },
        {
            name: "Publicaciones",
            href: "/admin/posts",
            icon: BookOpen,
        },
        {
            name: "Recursos",
            href: "/admin/resources",
            icon: FolderKanban,
            disabled: true,
        },
        {
            name: "Blog",
            href: "/admin/blog",
            icon: Newspaper,
            disabled: true,
        },
        {
            name: "Configuración",
            href: "/admin/settings",
            icon: Settings,
            disabled: true,
        },
    ];

    return (
        <ProtectedRoute adminOnly>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className="bg-white/5 backdrop-blur-md border-b border-white/10 shadow-md">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-white flex items-center">
                            <span className="bg-blue-600 text-white p-1 rounded mr-2 text-sm">Admin</span>
                            Swiftly
                        </h1>
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                        >
                            <span>Ver sitio</span>
                            <ExternalLink className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                </header>

                <div className="flex flex-1">
                    {/* Sidebar con efecto glassmorphism */}
                    <aside className="w-64 bg-white/5 backdrop-blur-sm border-r border-white/10">
                        <nav className="p-4">
                            <div className="space-y-2">
                                {navItems.map((item) => {
                                    const active = item.exact ? pathname === item.href : isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.disabled ? "#" : item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                                            transition-all duration-200
                                            ${
                                                active
                                                    ? "bg-blue-600/20 text-white font-medium border border-blue-500/30"
                                                    : item.disabled
                                                    ? "text-white/40 cursor-default"
                                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                            }
                                        `}
                                            onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                                        >
                                            <item.icon
                                                className={`h-5 w-5 ${
                                                    active
                                                        ? "text-blue-400"
                                                        : item.disabled
                                                        ? "text-white/40"
                                                        : "text-white/60"
                                                }`}
                                            />
                                            <span>{item.name}</span>

                                            {item.disabled && (
                                                <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full">
                                                    Pronto
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>                          
                        </nav>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 overflow-auto">
                        {/* Elementos decorativos de fondo */}
                        <div className="fixed inset-0 -z-10 pointer-events-none">
                            <div className="absolute -top-40 -right-20 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
                            <div className="absolute bottom-40 -left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
                        </div>

                        <div className="container mx-auto p-6">{children}</div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
