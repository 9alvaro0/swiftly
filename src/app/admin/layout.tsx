// src/app/admin/layout.tsx

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: MdDashboard,
            exact: true,
        },
        {
            name: "Publicaciones",
            href: "/admin/posts",
            icon: FaBook,
        },
        {
            name: "Tags",
            href: "/admin/tags",
            icon: AiFillTags,
            disabled: false,
        },
        {
            name: "Blog",
            href: "/admin/blog",
            icon: FaNewspaper,
            disabled: true,
        },
        {
            name: "Configuración",
            href: "/admin/settings",
            icon: MdOutlineSettings,
            disabled: true,
        },
    ];

    return (
        <ProtectedRoute adminOnly>
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <header className=" backdrop-blur-md border-b border-white/10 shadow-md">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center"></div>
                </header>

                <div className="flex flex-1">
                    {/* Sidebar con efecto glassmorphism */}
                    <aside className="w-64 backdrop-blur-sm border-r border-white/10">
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
