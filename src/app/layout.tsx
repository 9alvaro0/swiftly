import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { SITE_URL } from "@/lib/constants";
const inter = Inter({ subsets: ["latin"] });
import AuthInitializer from "@/components/auth/AuthInitializer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "aprendeSwift - Tutoriales de Swift y SwiftUI",
        template: "%s | aprendeSwift",
    },
    description: "Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva",
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        siteName: 'aprendeSwift',
        images: [{ url: '/icons/logo.png', width: 512, height: 512, alt: 'aprendeSwift' }],
    },
    twitter: {
        card: 'summary_large_image',
    },
    alternates: {
        types: {
            'application/rss+xml': [
                { url: '/feed.xml', title: 'aprendeSwift Blog RSS Feed' },
            ],
            'application/atom+xml': [
                { url: '/atom.xml', title: 'aprendeSwift Blog Atom Feed' },
            ],
            'application/feed+json': [
                { url: '/feed.json', title: 'aprendeSwift Blog JSON Feed' },
            ],
        },
    },
};

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'aprendeSwift',
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.png`,
    sameAs: [
        'https://twitter.com/aprendeswift',
        'https://github.com/aprendeswift',
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
            </head>
            <body className={inter.className}>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none"
                >
                    Ir al contenido principal
                </a>
                <AuthInitializer>
                    <MainLayout>{children}</MainLayout>
                    <Toaster
                        position="top-right"
                        richColors
                        expand={false}
                        className="toaster-container"
                    />
                </AuthInitializer>
            </body>
        </html>
    );
}
