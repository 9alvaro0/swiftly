// src/app/privacy/page.tsx

import { Metadata } from "next";
import PrivacyHeader from "@/components/privacy/PrivacyHeader";
import InformationCollectedSection from "@/components/privacy/InformationCollectedSection";
import HowWeUseInfoSection from "@/components/privacy/HowWeUseInfoSection";
import SharingInfoSection from "@/components/privacy/SharingInfoSection";
import UserRightsSection from "@/components/privacy/UserRightsSection";
import PrivacyContactSection from "@/components/privacy/PrivacyContactSection";
import PrivacyFooter from "@/components/privacy/PrivacyFooter";

export const metadata: Metadata = {
    title: "Política de Privacidad - aprendeSwift",
    description: "Conoce cómo protegemos tu información personal y qué datos recopilamos en aprendeSwift.",
    openGraph: {
        title: "Política de Privacidad - aprendeSwift",
        description: "Conoce cómo protegemos tu información personal y qué datos recopilamos en aprendeSwift.",
    },
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <PrivacyHeader />

                <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8">
                    <div className="prose prose-gray max-w-none">
                        <div className="text-gray-300 space-y-8">
                            <InformationCollectedSection />
                            <HowWeUseInfoSection />
                            <SharingInfoSection />                            
                            <UserRightsSection />
                            <PrivacyContactSection />
                            <PrivacyFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}