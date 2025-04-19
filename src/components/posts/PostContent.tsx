// src/components/posts/PostContent.tsx

"use client";

import { useEffect, memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
                    h1: (props) => (
                        <h1
                            className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-white/10"
                            {...props}
                        />
                    ),
                    h2: (props) => (
                        <h2
                            className="text-2xl font-bold mt-10 mb-4 pb-1 border-b border-white/10"
                            {...props}
                        />
                    ),
                    h3: (props) => (
                        <h3
                            className="text-xl font-bold mt-8 mb-3"
                            {...props}
                        />
                    ),
                    p: (props) => (
                        <p
                            className="my-4 leading-relaxed"
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
                            className="mb-2"
                            {...props}
                        />
                    ),
                    a: ({ href, ...props }) => (
                        <a
                            href={href}
                            className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                            {...props}
                        />
                    ),
                    blockquote: (props) => (
                        <blockquote
                            className="border-l-4 border-blue-500/70 bg-blue-500/5 pl-4 py-1 italic my-6 rounded-r"
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
                            <div className="rounded-md overflow-hidden my-6">
                                <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 border-b border-gray-700">
                                    {match[1].toUpperCase()}
                                </div>
                                <SyntaxHighlighter
                                    language={match[1]}
                                    // @ts-expect-error: TypeScript does not recognize the style property for SyntaxHighlighter
                                    style={vscDarkPlus}
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
                    img: ({ src, alt }) => {
                        if (!src) return null;

                        return (
                            <div className="relative my-8 rounded-lg overflow-hidden shadow-md">
                                <Image
                                    src={src}
                                    alt={alt || "Imagen del artículo"}
                                    className="w-full h-auto rounded-lg"
                                    width={800}
                                    height={600}
                                />
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
