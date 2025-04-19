import Link from "next/link";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-10 bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold"
                >
                    Mi Proyecto
                </Link>
                <nav>
                    <ul className="flex space-x-6 items-center">
                        <li>
                            <Link
                                href="/"
                                className="hover:text-blue-600"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/acerca"
                                className="hover:text-blue-600"
                            >
                                Acerca de
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contacto"
                                className="hover:text-blue-600"
                            >
                                Contacto
                            </Link>
                        </li>
                        {user && user.role === 'admin' && (
                            <li>
                                <Link
                                    href="/admin"
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                        {user ? (
                            <li>
                                <button
                                    onClick={logout}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    href="/login"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;