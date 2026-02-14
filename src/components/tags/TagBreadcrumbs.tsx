"use client";

import React from "react";
import Link from "next/link";
import { Home, ChevronRight, ChevronLeft, Tags } from "lucide-react";

export default function TagBreadcrumbs({ tagName }: { tagName: string | undefined }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: `${typeof window !== "undefined" ? window.location.origin : ""}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tags",
                item: `${typeof window !== "undefined" ? window.location.origin : ""}/tags`,
            },
            ...(tagName
                ? [
                      {
                          "@type": "ListItem",
                          position: 3,
                          name: tagName,
                      },
                  ]
                : []),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="flex items-center text-sm mb-8 text-white/80 font-medium">
                <div className="flex items-center space-x-2">
                    <Link
                        href="/"
                        className="flex items-center hover:text-blue-400 transition-colors"
                    >
                        <Home
                            size={16}
                            className="mr-1"
                        />
                        <span className="hidden sm:inline">Inicio</span>
                    </Link>

                    <ChevronRight
                        size={14}
                        className="text-white/60"
                        aria-hidden="true"
                    />

                    <Link
                        href="/tags"
                        className="hover:text-blue-400 transition-colors flex items-center"
                    >
                        <Tags
                            size={16}
                            className="mr-1"
                        />
                        <span>Tags</span>
                    </Link>

                    <ChevronRight
                        size={14}
                        className="text-white/60"
                        aria-hidden="true"
                    />
                    <span
                        className="text-white font-semibold truncate max-w-[200px]"
                        aria-current="page"
                    >
                        #{tagName}
                    </span>
                </div>

                <div className="ml-auto">
                    <Link
                        href="/tags"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                        <ChevronLeft
                            size={16}
                            className="mr-1 group-hover:-translate-x-1 transition-transform"
                        />
                        <span>Volver a Tags</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}
