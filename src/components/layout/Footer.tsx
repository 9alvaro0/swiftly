// src/components/layout/Footer.tsx

import FooterColumn from "./footer/FooterColumn";
import FooterLink from "./footer/FooterLink";
import FooterLinkList from "./footer/FooterLinkList";
import FooterSocialLinks from "./footer/FooterSocialLinks";
import Image from "next/image";

// Enlaces del footer organizados por secciones
const footerLinks = {
    explorar: [
        { title: "Inicio", href: "/" },
        { title: "Publicaciones", href: "/posts" },
        { title: "Tutoriales", href: "/tutorials" },
        { title: "Cursos", href: "/courses" },
        { title: "Contacto", href: "/contact" },
    ],
    categorias: [
        { title: "Swift", href: "/categoria/swift" },
        { title: "SwiftUI", href: "/categoria/swiftui" },
        { title: "Xcode", href: "/categoria/xcode" },
        { title: "Frameworks", href: "/categoria/frameworks" },
    ],
};

const Footer = () => {
    return (
        <footer className="bg-surface border-t border-neutral-200 dark:border-neutral-800">
            {/* Parte superior del footer con el logo y el call-to-action */}
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-neutral-200 dark:border-neutral-800 mb-8">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <Image
                            src="/icons/logo.png"
                            className="rounded-full"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <span className="text-xl font-bold tracking-tight text-primary">Swiftly</span>
                    </div>
                </div>

                {/* Columnas de enlaces del footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FooterColumn title="Sobre Swiftly">
                        <p className="text-secondary mb-4">
                            Tu recurso principal para aprender Swift y SwiftUI. Tutoriales actualizados, ejemplos
                            prácticos y recursos para todos los niveles.
                        </p>
                        <FooterSocialLinks />
                    </FooterColumn>

                    <FooterColumn title="Explorar">
                        <FooterLinkList>
                            {footerLinks.explorar.map((link) => (
                                <li key={link.href}>
                                    <FooterLink href={link.href}>{link.title}</FooterLink>
                                </li>
                            ))}
                        </FooterLinkList>
                    </FooterColumn>

                    <FooterColumn title="Categorías">
                        <FooterLinkList>
                            {footerLinks.categorias.map((link) => (
                                <li key={link.href}>
                                    <FooterLink href={link.href}>{link.title}</FooterLink>
                                </li>
                            ))}
                        </FooterLinkList>
                    </FooterColumn>
                </div>
            </div>

            {/* Parte inferior del footer con copyright y enlaces legales */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 bg-surface-secondary">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-secondary text-sm">
                        © {new Date().getFullYear()} Swiftly. Todos los derechos reservados.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <FooterLink href="/privacidad">Política de privacidad</FooterLink>
                        <FooterLink href="/terminos">Términos de uso</FooterLink>
                        <FooterLink href="/cookies">Cookies</FooterLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
