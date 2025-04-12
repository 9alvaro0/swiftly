"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 bg-background shadow-apple-sm backdrop-blur-md bg-opacity-90">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold text-primary"
                >
                    Swiftly
                </Link>

                {/* Menú móvil */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                {/* Navegación desktop */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                href="/"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tutoriales"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Tutoriales
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/recursos"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Recursos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className="text-secondary hover:text-primary transition-colors"
                            >
                                Blog
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Menú móvil expandido */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background shadow-md md:hidden">
                        <nav className="container mx-auto px-4 py-4">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        className="block text-secondary hover:text-primary transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/tutoriales"
                                        className="block text-secondary hover:text-primary transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Tutoriales
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/recursos"
                                        className="block text-secondary hover:text-primary transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Recursos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="block text-secondary hover:text-primary transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
