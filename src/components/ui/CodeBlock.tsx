// src/components/ui/CodeBlock.tsx

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SyntaxHighlighter = dynamic(
    () => import("react-syntax-highlighter").then((mod) => mod.Prism),
    {
        loading: () => (
            <div className="bg-[#1e1e1e] p-4 rounded-b-md animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
            </div>
        ),
        ssr: false,
    }
);

// Import style lazily too
const stylePromise = import("react-syntax-highlighter/dist/cjs/styles/prism").then(
    (mod) => mod.vscDarkPlus
);

interface CodeBlockProps {
    language: string;
    children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [style, setStyle] = useState<Record<string, React.CSSProperties> | null>(null);

    // Load style on first render
    if (!style) {
        stylePromise.then(setStyle);
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

    return (
        <div className="rounded-md overflow-hidden my-6">
            <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 border-b border-gray-700 flex justify-between items-center">
                <span>{language.toUpperCase()}</span>
                <button
                    onClick={handleCopy}
                    className="hover:text-white transition-colors text-gray-400 flex items-center gap-1"
                    aria-label="Copiar código"
                >
                    {copied ? (
                        <>
                            <svg
                                className="w-4 h-4 text-green-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="text-green-400">Copiado</span>
                        </>
                    ) : (
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                    )}
                </button>
            </div>
            {style ? (
                <SyntaxHighlighter
                    language={language}
                    style={style}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        borderRadius: "0 0 0.375rem 0.375rem",
                    }}
                >
                    {children}
                </SyntaxHighlighter>
            ) : (
                <pre className="bg-[#1e1e1e] p-4 rounded-b-md overflow-x-auto">
                    <code className="text-sm text-gray-300">{children}</code>
                </pre>
            )}
        </div>
    );
}
