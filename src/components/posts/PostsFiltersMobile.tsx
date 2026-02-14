// src/components/posts/PostsFiltersMobile.tsx

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostLevel } from "@/types/Post";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ViewToggle, { ViewMode } from "@/components/posts/ViewToggle";
import SortOptions, { SortOption } from "@/components/posts/SortOptions";

interface PostsFiltersMobileProps {
    viewMode: ViewMode;
    sortBy: SortOption;
    onViewChange: (mode: ViewMode) => void;
    onSortChange: (sort: SortOption) => void;
}

export default function PostsFiltersMobile({
    viewMode,
    sortBy,
    onViewChange,
    onSortChange,
}: PostsFiltersMobileProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    const levelFilter = searchParams.get("level") || "";
    const tagFilter = searchParams.get("tag") || "";
    const hasActiveFilters = !!(levelFilter || tagFilter);
    const activeFiltersCount = [levelFilter].filter(Boolean).length;

    const handleLevelChange = (level: PostLevel | "") => {
        const params = new URLSearchParams(searchParams);
        if (level) {
            params.set("level", level);
        } else {
            params.delete("level");
        }
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };


    const handleClearFilters = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("level");
        params.delete("tag");
        params.set("page", "1");
        replace(`${pathName}?${params.toString()}`);
    };

    const handleOpen = () => {
        setIsOpen(true);
        setIsOpening(true);
        setTimeout(() => {
            setIsOpening(false);
        }, 50);
    };

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            triggerRef.current?.focus();
        }, 300);
    }, []);

    // Escape key handler & focus drawer on open
    useEffect(() => {
        if (!isOpen || isOpening) return;

        drawerRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
                return;
            }

            // Focus trap
            if (e.key === "Tab" && drawerRef.current) {
                const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isOpening, handleClose]);

    return (
        <>
            {/* Botón de filtros móvil */}
            <div className="lg:hidden flex items-center gap-1">
                <Button
                    ref={triggerRef}
                    variant="outline"
                    size="lg"
                    onClick={handleOpen}
                    className="relative px-3 h-10 shadow-none"
                    aria-label="Abrir filtros"
                    aria-expanded={isOpen}
                >
                    <Filter size={16} />
                    {hasActiveFilters && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>

                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleClearFilters}
                        className="text-red-600 px-3 h-10 shadow-none"
                        aria-label="Limpiar filtros"
                    >
                        <X size={14} />
                    </Button>
                )}
            </div>

            {/* Modal/Drawer de filtros */}
            {isOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Overlay */}
                    <div
                        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                            isClosing ? 'opacity-0' : isOpening ? 'opacity-0' : 'opacity-100'
                        }`}
                        onClick={handleClose}
                        aria-hidden="true"
                    />

                    {/* Drawer desde abajo */}
                    <div
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="filter-title"
                        tabIndex={-1}
                        className={`mobile-filter-drawer absolute bottom-0 left-0 right-0 rounded-t-2xl p-6 min-h-[60vh] max-h-[90vh] overflow-y-auto transition-transform duration-300 ease-out ${
                            isClosing ? 'translate-y-full' : isOpening ? 'translate-y-full' : 'translate-y-0'
                        }`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 id="filter-title" className="text-lg font-semibold">
                                Filtros
                            </h3>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                                aria-label="Cerrar filtros"
                            >
                                <X size={16} className="text-neutral-500" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Filtro de Nivel */}
                            <div>
                                <label htmlFor="level-mobile" className="block text-sm font-medium mb-3">
                                    Nivel de dificultad
                                </label>
                                <Select
                                    id="level-mobile"
                                    label=""
                                    options={[
                                        { value: "", label: "Todos los niveles" },
                                        { value: "Principiante", label: "Principiante" },
                                        { value: "Intermedio", label: "Intermedio" },
                                        { value: "Avanzado", label: "Avanzado" },
                                    ]}
                                    value={levelFilter}
                                    onChange={(e) => handleLevelChange(e.target.value as PostLevel | "")}
                                    className="w-full"
                                />
                            </div>

                            {/* Ordenamiento */}
                            <div>
                                <span className="block text-sm font-medium mb-3">
                                    Ordenar por
                                </span>
                                <SortOptions
                                    sortBy={sortBy}
                                    onSortChange={onSortChange}
                                />
                            </div>

                            {/* Vista */}
                            <div>
                                <span className="block text-sm font-medium mb-3">
                                    Vista
                                </span>
                                <ViewToggle
                                    viewMode={viewMode}
                                    onViewChange={onViewChange}
                                />
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-3 pt-4 border-t border-neutral-200">
                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        onClick={handleClearFilters}
                                        className="flex-1 text-red-600 border-red-600"
                                    >
                                        Limpiar filtros
                                    </Button>
                                )}
                                <Button
                                    onClick={handleClose}
                                    className="flex-1"
                                >
                                    Aplicar filtros
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
