import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";
const inter = Inter({ subsets: ["latin"] });
import AuthInitializer from "@/components/auth/AuthInitializer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "aprendeSwift - Tutoriales de Swift y SwiftUI",
    description: "Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva",
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
    other: {
        'msvalidate.01': '', // Add Bing verification if needed
        'google-site-verification': '', // Add Google verification if needed
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                {/* Feed discovery links */}
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="aprendeSwift Blog RSS Feed"
                    href="/feed.xml"
                />
                <link
                    rel="alternate"
                    type="application/atom+xml"
                    title="aprendeSwift Blog Atom Feed"
                    href="/atom.xml"
                />
                <link
                    rel="alternate"
                    type="application/feed+json"
                    title="aprendeSwift Blog JSON Feed"
                    href="/feed.json"
                />
                
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={inter.className}>
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
