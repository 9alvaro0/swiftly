// src/app/terms/page.tsx

import { Metadata } from "next";
import TermsHeader from "@/components/terms/TermsHeader";
import AcceptanceSection from "@/components/terms/AcceptanceSection";
import ServiceUseSection from "@/components/terms/ServiceUseSection";
import UserContentSection from "@/components/terms/UserContentSection";
import ProhibitedConductSection from "@/components/terms/ProhibitedConductSection";
import IntellectualPropertySection from "@/components/terms/IntellectualPropertySection";
import LiabilitySection from "@/components/terms/LiabilitySection";
import TerminationSection from "@/components/terms/TerminationSection";
import ModificationsSection from "@/components/terms/ModificationsSection";
import TermsContactSection from "@/components/terms/TermsContactSection";
import TermsFooter from "@/components/terms/TermsFooter";

export const metadata: Metadata = {
    title: "Términos y Condiciones - aprendeSwift",
    description: "Conoce los términos y condiciones de uso de aprendeSwift y nuestras políticas de contenido.",
    openGraph: {
        title: "Términos y Condiciones - aprendeSwift",
        description: "Conoce los términos y condiciones de uso de aprendeSwift y nuestras políticas de contenido.",
    },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <TermsHeader />

                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <AcceptanceSection />
                            <ServiceUseSection />
                            <UserContentSection />
                            <ProhibitedConductSection />
                            <IntellectualPropertySection />
                            <LiabilitySection />
                            <TerminationSection />
                            <ModificationsSection />
                            <TermsContactSection />
                            <TermsFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}