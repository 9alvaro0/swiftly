// src/app/contact/page.tsx

import type { Metadata } from "next";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
    title: "Contacto - aprendeSwift",
    description: "Ponte en contacto con el equipo de aprendeSwift.",
    alternates: {
        canonical: "https://aprendeswift.dev/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="container mx-auto py-4 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
                <ContactHeader />
                <ContactPageClient />
            </div>
        </div>
    );
}
