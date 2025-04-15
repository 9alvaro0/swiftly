// src/components/posts/PostContent.tsx

"use client";

import { useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Image from "next/image";

type PostContentProps = {
    content: string;
};

// Memoizamos el componente para evitar renderizados innecesarios
const PostContent = memo(function PostContent({ content }: PostContentProps) {
    // Efecto para aplicar estilos adicionales o comportamientos después de renderizar
    useEffect(() => {
        // Añadir comportamiento para enlaces externos
        const links = document.querySelectorAll('.prose a[href^="http"]');
        links.forEach((link) => {
            if (!(link as HTMLElement).hasAttribute("target")) {
                (link as HTMLElement).setAttribute("target", "_blank");
                (link as HTMLElement).setAttribute("rel", "noopener noreferrer");
            }
        });
    }, [content]);

    return (
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12 prose-headings:text-white prose-p:text-white/80 prose-a:text-blue-400 prose-blockquote:border-blue-500 prose-blockquote:text-white/70 prose-strong:text-white">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1
                            className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-white/10"
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            className="text-2xl font-bold mt-10 mb-4 pb-1 border-b border-white/10"
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            className="text-xl font-bold mt-8 mb-3"
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p
                            className="my-4 leading-relaxed"
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul
                            className="list-disc pl-6 my-4 space-y-2 text-white/80"
                            {...props}
                        />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol
                            className="list-decimal pl-6 my-4 space-y-2 text-white/80"
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li
                            className="mb-2"
                            {...props}
                        />
                    ),
                    a: ({ node, href, ...props }) => (
                        <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                            {...props}
                        />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className="border-l-4 border-blue-500/70 bg-blue-500/5 pl-4 py-1 italic my-6 rounded-r"
                            {...props}
                        />
                    ),
                    code: ({ node, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || "");
                        const inline = props.inline;

                        return !inline && match ? (
                            <div className="rounded-md overflow-hidden my-6">
                                <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 border-b border-gray-700">
                                    {match[1].toUpperCase()}
                                </div>
                                <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: "0 0 0.375rem 0.375rem",
                                    }}
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code
                                className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-blue-300"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    img: ({ node, src, alt, ...props }) => {
                        // Si no hay src, retornar un componente vacío
                        if (!src) return null;

                        return (
                            <div className="relative my-8 rounded-lg overflow-hidden shadow-md">
                                {/* Asumimos que las imágenes son externas aquí */}
                                <img
                                    src={src}
                                    alt={alt || "Imagen del artículo"}
                                    className="w-full h-auto rounded-lg"
                                    loading="lazy"
                                    {...props}
                                />
                            </div>
                        );
                    },
                    // Añadimos estilos para tablas
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto my-8">
                            <table
                                className="min-w-full border border-white/10 rounded-lg"
                                {...props}
                            />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead
                            className="bg-white/5"
                            {...props}
                        />
                    ),
                    th: ({ node, ...props }) => (
                        <th
                            className="px-4 py-3 border-b border-white/10 text-left text-sm font-semibold text-white"
                            {...props}
                        />
                    ),
                    td: ({ node, ...props }) => (
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
