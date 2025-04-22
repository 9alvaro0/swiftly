"use client";

import React from "react";
import Link from "next/link";
import { FaHome, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";

export default function TagBreadcrumbs({ tagName }: { tagName: string | undefined }) {
    return (
        <nav className="flex items-center text-sm mb-8 text-gray-600 dark:text-white/80 font-medium">
            <div className="flex items-center space-x-2">
                <Link
                    href="/"
                    className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <FaHome
                        size={16}
                        className="mr-1"
                    />
                    <span className="hidden sm:inline">Inicio</span>
                </Link>

                <FaChevronRight
                    size={14}
                    className="text-gray-400 dark:text-white/60"
                />

                <Link
                    href="/tags"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                >
                    <AiFillTags
                        size={16}
                        className="mr-1"
                    />
                    <span>Tags</span>
                </Link>

                <FaChevronRight
                    size={14}
                    className="text-gray-400 dark:text-white/60"
                />
                <span
                    className="text-gray-900 dark:text-white font-semibold truncate max-w-[200px]"
                    title={tagName}
                >
                    #{tagName}
                </span>
            </div>

            <div className="ml-auto">
                <Link
                    href="/tags"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors group"
                >
                    <FaChevronLeft
                        size={16}
                        className="mr-1 group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Volver a Tags</span>
                </Link>
            </div>
        </nav>
    );
}
