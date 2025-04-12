import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-surface py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-primary">Swiftly</h3>
                        <p className="text-secondary">
                            Tu recurso para aprender Swift y SwiftUI con tutoriales prácticos y actualizados.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">Explorar</h3>
                        <ul className="space-y-2">
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
                            <li>
                                <Link
                                    href="/admin"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">Categorías</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/categoria/swift"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Swift
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/swiftui"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    SwiftUI
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/xcode"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Xcode
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categoria/frameworks"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Frameworks
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-primary">Conectar</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://twitter.com/swiftly"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/swiftly"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@swiftly.dev"
                                    className="text-secondary hover:text-primary transition-colors"
                                >
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-secondary">
                        © {new Date().getFullYear()} Swiftly. Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a
                            href="/privacidad"
                            className="text-secondary hover:text-primary transition-colors"
                        >
                            Política de privacidad
                        </a>
                        <a
                            href="/terminos"
                            className="text-secondary hover:text-primary transition-colors"
                        >
                            Términos de uso
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
