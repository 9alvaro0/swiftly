// src/app/site-map/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { Map, FileText, Tag, Home, BookOpen } from "lucide-react";

import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Mapa del sitio - aprendeSwift",
    description: "Explora todas las páginas y contenido disponible en aprendeSwift. Encuentra artículos, tutoriales y recursos.",
    alternates: { canonical: `${SITE_URL}/site-map` },
    openGraph: {
        title: "Mapa del sitio - aprendeSwift",
        description: "Explora todas las páginas y contenido disponible en aprendeSwift. Encuentra artículos, tutoriales y recursos.",
        url: `${SITE_URL}/site-map`,
    },
    twitter: {
        title: "Mapa del sitio - aprendeSwift",
        description: "Explora todas las páginas y contenido disponible en aprendeSwift. Encuentra artículos, tutoriales y recursos.",
    },
};

export default function SitemapPage() {
    const siteStructure = [
        {
            title: "Páginas principales",
            icon: Home,
            links: [
                { name: "Inicio", href: "/", description: "Bienvenido a aprendeSwift" },
                { name: "Artículos", href: "/posts", description: "Todos los artículos y publicaciones" },
                { name: "Tutoriales", href: "/tutorials", description: "Guías de aprendizaje paso a paso" },
                { name: "Etiquetas", href: "/tags", description: "Explora contenido por temas" },
                { name: "Contacto", href: "/contact", description: "Ponte en contacto con nosotros" },
            ],
        },
        {
            title: "Recursos",
            icon: BookOpen,
            links: [
                { name: "Newsletter", href: "/newsletter", description: "Suscríbete a nuestra newsletter" },
                { name: "RSS Feed", href: "/feed.xml", description: "Feed RSS para actualizaciones", external: true },
                { name: "Atom Feed", href: "/atom.xml", description: "Feed en formato Atom", external: true },
                { name: "JSON Feed", href: "/feed.json", description: "Feed en formato JSON", external: true },
            ],
        },
        {
            title: "Legal",
            icon: FileText,
            links: [
                { name: "Política de privacidad", href: "/privacy", description: "Cómo gestionamos tus datos" },
                { name: "Términos y condiciones", href: "/terms", description: "Términos de uso del servicio" },
                { name: "Política de cookies", href: "/cookies", description: "Información sobre cookies" },
            ],
        },
    ];

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-600/20 rounded-full">
                            <Map className="w-12 h-12 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Mapa del sitio
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explora todas las páginas y contenido disponible en aprendeSwift.
                        Encuentra artículos, tutoriales y recursos para acelerar tu aprendizaje.
                    </p>
                </div>

                {/* Site Structure */}
                <div className="space-y-12">
                    {siteStructure.map((section, index) => (
                        <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-600/20 rounded-lg">
                                    <section.icon className="w-6 h-6 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-semibold text-white">
                                    {section.title}
                                </h2>
                            </div>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                {section.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="group">
                                        {link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200"
                                            >
                                                <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {link.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="flex items-start gap-3 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-200"
                                            >
                                                <FileText className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                        {link.name}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {link.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Tag className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-white">
                            Contenido dinámico
                        </h2>
                    </div>
                    <div className="text-gray-300 space-y-4">
                        <p>
                            Además de las páginas listadas arriba, aprendeSwift incluye contenido dinámico
                            que crece con el tiempo:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Artículos individuales accesibles en <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/posts/[slug]</code></li>
                            <li>Páginas de tutoriales accesibles en <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/tutorials/[slug]</code></li>
                            <li>Páginas de etiquetas accesibles en <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">/tags/[slug]</code></li>
                        </ul>
                        <p className="text-sm text-gray-400 mt-6">
                            Este mapa del sitio se actualiza automáticamente cuando se publica nuevo contenido.
                            Para una versión legible por máquinas, visita nuestro{" "}
                            <a
                                href="/sitemap.xml"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                sitemap XML
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}