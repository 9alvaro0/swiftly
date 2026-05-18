// src/app/cookies/page.tsx

import { Metadata } from "next";
import CookiesHeader from "@/components/cookies/CookiesHeader";
import WhatWeStoreSection from "@/components/cookies/WhatWeStoreSection";
import StorageTypesSection from "@/components/cookies/StorageTypesSection";
import ThirdPartyServicesSection from "@/components/cookies/ThirdPartyServicesSection";
import UserControlSection from "@/components/cookies/UserControlSection";
import DataRetentionSection from "@/components/cookies/DataRetentionSection";
import PolicyChangesSection from "@/components/cookies/PolicyChangesSection";
import ContactSection from "@/components/cookies/ContactSection";
import CookiesFooter from "@/components/cookies/CookiesFooter";

export const metadata: Metadata = {
    title: "Política de Cookies - aprendeSwift",
    description: "Transparencia sobre nuestro uso de almacenamiento local y tecnologías similares en aprendeSwift.",
    openGraph: {
        title: "Política de Cookies - aprendeSwift",
        description: "Transparencia sobre nuestro uso de almacenamiento local y tecnologías similares en aprendeSwift.",
    },
};

export default function CookiesPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <CookiesHeader />

                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <WhatWeStoreSection />
                            <StorageTypesSection />
                            <ThirdPartyServicesSection />
                            <UserControlSection />
                            <DataRetentionSection />
                            <PolicyChangesSection />
                            <ContactSection />
                            <CookiesFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}