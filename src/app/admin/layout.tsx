"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type React from "react";
import {
    DashboardIcon,
    TutorialIcon,
    ResourceIcon,
    BlogIcon,
    SettingsIcon,
    ExternalLinkIcon,
} from "@/components/icons/admin-icons";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + "/");
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: DashboardIcon,
            exact: true,
        },
        {
            name: "Tutoriales",
            href: "/admin/tutorials",
            icon: TutorialIcon,
        },
        {
            name: "Recursos",
            href: "/admin/resources",
            icon: ResourceIcon,
            disabled: true,
        },
        {
            name: "Blog",
            href: "/admin/blog",
            icon: BlogIcon,
            disabled: true,
        },
        {
            name: "Configuración",
            href: "/admin/settings",
            icon: SettingsIcon,
            disabled: true,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="bg-card border-b border-neutral-200 dark:border-neutral-800">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-primary">Swiftly Admin</h1>
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                        <span>Ver sitio</span>
                        <ExternalLinkIcon className="h-4 w-4" />
                    </Link>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-card border-r border-neutral-200 dark:border-neutral-800">
                    <nav className="p-3">
                        <div className="space-y-1">
                            {navItems.map((item) => {
                                const active = item.exact ? pathname === item.href : isActive(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.disabled ? "#" : item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm
                                            transition-colors duration-200
                                            ${
                                                active
                                                    ? "bg-primary/10 text-primary font-medium"
                                                    : item.disabled
                                                    ? "text-neutral-400 cursor-default"
                                                    : "text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            }
                                        `}
                                        onClick={item.disabled ? (e) => e.preventDefault() : undefined}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 ${active ? "text-primary" : "text-neutral-500"}`}
                                        />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 overflow-auto bg-background">{children}</main>
            </div>
        </div>
    );
}
