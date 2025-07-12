// src/components/shared/ContentPageLayout.tsx

import { Suspense, ReactNode } from "react";

interface ContentPageLayoutProps {
    header: ReactNode;
    filters: ReactNode;
    children: ReactNode;
    fallback: ReactNode;
    suspenseKey: string;
}

export default function ContentPageLayout({
    header,
    filters,
    children,
    fallback,
    suspenseKey
}: ContentPageLayoutProps) {
    return (
        <div className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                {header}
            </div>

            {/* Barra de controles horizontal */}
            <div className="mb-8">
                {filters}
            </div>

            {/* Contenido principal */}
            <main>
                <Suspense
                    key={suspenseKey}
                    fallback={fallback}
                >
                    {children}
                </Suspense>
            </main>
        </div>
    );
}