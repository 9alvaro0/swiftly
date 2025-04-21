import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });
import AuthInitializer from "@/components/auth/AuthInitializer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
    title: "Swiftly - Tutoriales de Swift y SwiftUI",
    description: "Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <AuthInitializer>
                    <MainLayout>{children}</MainLayout>
                    <Toaster
                        position="top-right"
                        richColors
                        expand={false}
                        className="toaster-container"
                    />
                    <SpeedInsights />
                </AuthInitializer>
            </body>
        </html>
    );
}
