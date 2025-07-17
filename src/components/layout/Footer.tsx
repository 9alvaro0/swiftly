// src/components/layout/Footer.tsx

import Link from "next/link";
import Image from "next/image";
import { GithubIcon, TwitterIcon, MailIcon, LinkedinIcon, Code2Icon, BookOpenIcon, PlayCircleIcon } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    const navigationLinks = [
        { name: "Inicio", href: "/" },
        { name: "Publicaciones", href: "/posts" },
        { name: "Tutoriales", href: "/tutorials" },
        { name: "Contacto", href: "/contact" },
    ];

    const socialLinks = [
        { name: "Twitter", href: "https://twitter.com/aprendeswift", icon: TwitterIcon },
        { name: "GitHub", href: "https://github.com/aprendeswift", icon: GithubIcon },
        { name: "LinkedIn", href: "https://linkedin.com/in/aprendeswift", icon: LinkedinIcon },
        { name: "Email", href: "mailto:info@aprendeswift.dev", icon: MailIcon },
    ];

    const features = [
        { name: "Tutoriales Swift", icon: Code2Icon },
        { name: "Guías SwiftUI", icon: BookOpenIcon },
        { name: "Ejemplos Prácticos", icon: PlayCircleIcon },
    ];

    return (
        <footer className="bg-gray-900 border-t border-gray-700">
            {/* Sección principal */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Columna del logo y descripción */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-6">
                            <Image
                                src="/icons/logo.png"
                                className="rounded-full"
                                alt="aprendeSwift Logo"
                                width={48}
                                height={48}
                            />
                            <span className="text-2xl font-bold text-white">aprendeSwift</span>
                        </Link>
                        
                        <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                            Tu plataforma de confianza para dominar Swift y SwiftUI. 
                            Aprende con tutoriales actualizados y ejemplos prácticos.
                        </p>

                        {/* Características destacadas */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex items-center space-x-2 text-gray-400">
                                    <feature.icon size={16} className="text-blue-400" />
                                    <span className="text-sm">{feature.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* Redes sociales */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                >
                                    <social.icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navegación rápida */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Navegación</h3>
                        <ul className="space-y-3">
                            {navigationLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors block py-1"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recursos adicionales */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 text-lg">Recursos</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/tags"
                                    className="text-gray-400 hover:text-white transition-colors block py-1"
                                >
                                    Etiquetas
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/feed.xml"
                                    className="text-gray-400 hover:text-white transition-colors block py-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    RSS Feed
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/site-map"
                                    className="text-gray-400 hover:text-white transition-colors block py-1"
                                >
                                    Sitemap
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sección inferior */}
            <div className="border-t border-gray-700 bg-gray-950">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} aprendeSwift. Todos los derechos reservados.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                                Terms
                            </Link>
                            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
