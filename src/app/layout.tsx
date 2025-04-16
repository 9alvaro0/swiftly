import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Swiftly - Tutoriales de Swift y SwiftUI",
    description: "Blog, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <MainLayout>{children}</MainLayout>
                <SpeedInsights />
            </body>
        </html>
    );
}
