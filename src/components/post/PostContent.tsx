// src/components/posts/PostContent.tsx

"use client";

import { useEffect, memo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { CodeBlock } from "@/components/ui/CodeBlock";

type PostContentProps = {
    content: string;
};

// Función para convertir texto a slug/id
const slugify = (text: string): string => {
    if (!text) return "";

    return text
        .toLowerCase()
        .normalize("NFD") // Normalizar acentos
        .replace(/[\u0300-\u036f]/g, "") // Quitar diacríticos
        .trim()
        .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
        .replace(/[\s_-]+/g, "-") // Reemplazar espacios con guiones
        .replace(/^-+|-+$/g, ""); // Eliminar guiones iniciales y finales
};

// Componente principal
const PostContent = memo(function PostContent({ content }: PostContentProps) {
    // Referencia para el contenedor del markdown
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentRefCurrent = contentRef.current;
        if (!contentRefCurrent) return;

        // Crear un mapa para facilitar la navegación
        const headingMap = new Map();

        // Recopilar información sobre todos los encabezados
        const headings = contentRefCurrent.querySelectorAll("h1, h2, h3, h4, h5, h6");

        headings.forEach((heading) => {
            const id = heading.id;
            const text = heading.textContent || "";

            // Registrar el encabezado en el mapa
            headingMap.set(id, heading);

            // También mapear el texto normalizado al encabezado
            const normalizedText = slugify(text);
            if (normalizedText && normalizedText !== id) {
                headingMap.set(normalizedText, heading);
            }
        });

        // Función para manejar clics en enlaces
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (!link) return;

            const href = link.getAttribute("href");
            if (!href?.startsWith("#")) return;

            // Prevenir la navegación predeterminada
            e.preventDefault();

            // Obtener el ID del enlace
            const encodedId = href.substring(1);
            const decodedId = decodeURIComponent(encodedId);
            const normalizedId = slugify(decodedId);

            // Intento 1: Búsqueda directa por ID
            let targetHeading = document.getElementById(normalizedId);

            // Intento 2: Usar el mapa de encabezados
            if (!targetHeading && headingMap.has(normalizedId)) {
                targetHeading = headingMap.get(normalizedId);
            }

            // Intento 3: Buscar por texto del enlace
            if (!targetHeading && link.textContent) {
                const linkTextNormalized = slugify(link.textContent);

                // Buscar en el mapa
                if (headingMap.has(linkTextNormalized)) {
                    targetHeading = headingMap.get(linkTextNormalized);
                }
            }

            // Intento 4: Búsqueda en todos los encabezados
            if (!targetHeading) {
                // Buscar encabezado que coincida con el texto del enlace
                for (const heading of headings) {
                    if (slugify(heading.textContent || "") === normalizedId) {
                        targetHeading = heading as HTMLElement;
                        break;
                    }
                }
            }

            // Si encontramos el elemento, hacer scroll
            if (targetHeading) {
                targetHeading.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                // Actualizar la URL
                window.history.pushState(null, "", href);
            }
        };

        // Agregar el listener para los clics
        contentRefCurrent.addEventListener("click", handleLinkClick);

        // Configurar enlaces externos
        const externalLinks = contentRefCurrent.querySelectorAll('a[href^="http"]');
        externalLinks.forEach((link) => {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        });

        // Limpieza al desmontar
        return () => {
            contentRefCurrent?.removeEventListener("click", handleLinkClick);
        };
    }, [content]);

    return (
        <div
            ref={contentRef}
            className="prose prose-lg prose-invert max-w-none mb-12 prose-headings:text-white prose-p:text-white/80 prose-a:text-blue-400 prose-blockquote:border-blue-500 prose-blockquote:text-white/70 prose-strong:text-white prose-li:text-white/80 prose-td:text-white/80 prose-th:text-white"
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkUnwrapImages]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ children, ...props }) => {
                        const id = slugify(children?.toString() || "");
                        return (
                            <h1
                                id={id}
                                className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-white/10 scroll-mt-20 text-white"
                                {...props}
                            >
                                {children}
                            </h1>
                        );
                    },
                    h2: ({ children, ...props }) => {
                        const id = slugify(children?.toString() || "");
                        return (
                            <h2
                                id={id}
                                className="text-2xl font-bold mt-10 mb-4 pb-1 border-b border-white/10 scroll-mt-20 text-white"
                                {...props}
                            >
                                {children}
                            </h2>
                        );
                    },
                    h3: ({ children, ...props }) => {
                        const id = slugify(children?.toString() || "");
                        return (
                            <h3
                                id={id}
                                className="text-xl font-bold mt-8 mb-3 scroll-mt-16 text-white"
                                {...props}
                            >
                                {children}
                            </h3>
                        );
                    },
                    h4: ({ children, ...props }) => {
                        const id = slugify(children?.toString() || "");
                        return (
                            <h4
                                id={id}
                                className="text-lg font-bold mt-6 mb-2 scroll-mt-16 text-white"
                                {...props}
                            >
                                {children}
                            </h4>
                        );
                    },
                    p: (props) => (
                        <p
                            className="my-4 leading-relaxed text-white/80"
                            {...props}
                        />
                    ),
                    ul: (props) => (
                        <ul
                            className="list-disc pl-6 my-4 space-y-2 text-white/80"
                            {...props}
                        />
                    ),
                    ol: (props) => (
                        <ol
                            className="list-decimal pl-6 my-4 space-y-2 text-white/80"
                            {...props}
                        />
                    ),
                    li: (props) => (
                        <li
                            className="mb-2 text-white/80"
                            {...props}
                        />
                    ),
                    a: ({ href, children, ...props }) => (
                        <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                            {...props}
                        >
                            {children}
                        </a>
                    ),
                    blockquote: (props) => (
                        <blockquote
                            className="border-l-4 border-blue-500/70 bg-blue-500/5 pl-4 py-1 italic my-6 rounded-r text-white/70"
                            {...props}
                        />
                    ),
                    code: ({
                        className,
                        children,
                        inline,
                        ...props
                    }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                            <CodeBlock language={match[1]} {...props}>
                                {String(children).replace(/\n$/, "")}
                            </CodeBlock>
                        ) : (
                            <code
                                className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-blue-300"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    img: ({ src, alt }) => {
                        if (!src) return null;
                        
                        // Check if the image is a GIF
                        const isGif = src.toLowerCase().endsWith('.gif');
                    
                        return (
                            <div className="relative my-8 mx-auto w-full max-w-md rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={src}
                                    alt={alt || "Imagen del artículo"}
                                    className="w-auto h-auto max-h-[600px] mx-auto rounded-lg object-contain"
                                    width={600}
                                    height={800}
                                    unoptimized={isGif}
                                />
                                {alt && <div className="text-center mt-2 text-sm text-gray-400 italic">{alt}</div>}
                            </div>
                        );
                    },
                    table: (props) => (
                        <div className="overflow-x-auto my-8">
                            <table
                                className="min-w-full border border-white/10 rounded-lg"
                                {...props}
                            />
                        </div>
                    ),
                    thead: (props) => (
                        <thead
                            className="bg-white/5"
                            {...props}
                        />
                    ),
                    th: (props) => (
                        <th
                            className="px-4 py-3 border-b border-white/10 text-left text-sm font-semibold text-white"
                            {...props}
                        />
                    ),
                    td: (props) => (
                        <td
                            className="px-4 py-3 border-b border-white/10 text-sm text-white/80"
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
});

export default PostContent;
