import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mi perfil - aprendeSwift",
    description: "Gestiona tu perfil en aprendeSwift.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return children;
}
