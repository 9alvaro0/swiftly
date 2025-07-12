// src/components/tutorials/TutorialsHeader.tsx

"use client";

import { GraduationCap } from "lucide-react";
import ContentHeader from "@/components/shared/ContentHeader";
import { useContentStats } from "@/hooks/useContentStats";

export default function TutorialsHeader() {
    const { totalTutorials, tutorialsReadingHours, loading } = useContentStats();

    return (
        <ContentHeader
            title="Tutoriales Swift & SwiftUI"
            description="Aprende desarrollo de iOS paso a paso con nuestros tutoriales detallados. Desde conceptos básicos hasta técnicas avanzadas, todo explicado de forma clara y práctica."
            icon={<GraduationCap size={24} className="text-purple-400" />}
            badge={{
                text: "Aprendizaje",
                variant: "secondary"
            }}
            stats={loading ? undefined : [
                {
                    label: "Tutoriales",
                    value: totalTutorials
                },
                {
                    label: "Horas",
                    value: `${tutorialsReadingHours}+`
                }
            ]}
        />
    );
}
