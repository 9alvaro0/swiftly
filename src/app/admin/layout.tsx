// src/app/admin/layout.tsx

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";
import { MdDashboard, MdEmail } from "react-icons/md";
import { FaBook, FaUsers } from "react-icons/fa";
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
            shortName: "Home",
            href: "/admin",
            icon: MdDashboard,
            exact: true,
        },
        {
            name: "Publicaciones",
            shortName: "Posts",
            href: "/admin/posts",
            icon: FaBook,
        },
        {
            name: "Tags",
            shortName: "Tags",
            href: "/admin/tags",
            icon: AiFillTags,
            disabled: false,
        },
        {
            name: "Usuarios",
            shortName: "Users",
            href: "/admin/users",
            icon: FaUsers,
            disabled: false,
        },
        {
            name: "Newsletter",
            shortName: "News",
            href: "/admin/newsletter",
            icon: MdEmail,
            disabled: false,
        },
    ];

    // Desktop sidebar navigation
    const DesktopNavContent = () => (
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
    );

    // Mobile tabs navigation
    const MobileNavTabs = () => (
        <div className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700">
            <div className="flex justify-center overflow-x-auto scrollbar-hide">
                {navItems.map((item) => {
                    const active = item.exact ? pathname === item.href : isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.disabled ? "#" : item.href}
                            className={`flex flex-col items-center gap-1 px-4 py-3 flex-1 min-w-0 relative
                            transition-all duration-200 border-b-2 ${
                                active
                                    ? "border-blue-400 text-blue-400"
                                    : item.disabled
                                    ? "border-transparent text-white/40 cursor-default"
                                    : "border-transparent text-white/70 hover:text-white hover:border-white/20"
                            }`}
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
                            <span className="text-xs font-medium whitespace-nowrap">
                                {item.shortName}
                            </span>
                            {item.disabled && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <ProtectedRoute adminOnly>
            <div className="min-h-screen flex flex-col">
                {/* Header responsive */}
                <header className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-md">
                    <div className="px-4 py-4">
                        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    </div>
                </header>

                {/* Mobile Navigation Tabs */}
                <div className="md:hidden">
                    <MobileNavTabs />
                </div>

                <div className="flex flex-1">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700">
                        <nav className="p-4">
                            <DesktopNavContent />
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto">
                        <div className="p-4 md:p-6">{children}</div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
