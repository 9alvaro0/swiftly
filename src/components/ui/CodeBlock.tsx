// src/components/ui/CodeBlock.tsx

"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps {
    language: string;
    children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

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
                    title="Copiar código"
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
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                PreTag="div"
                customStyle={{
                    margin: 0,
                    borderRadius: "0 0 0.375rem 0.375rem",
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
}