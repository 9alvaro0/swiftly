import Link from "next/link";
import React from "react";

const Header = () => {
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
                    <ul className="flex space-x-6">
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
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
