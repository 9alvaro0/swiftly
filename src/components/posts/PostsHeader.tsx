// src/components/posts/PostsHeader.tsx

"use client";

import { BookOpen } from "lucide-react";
import ContentHeader from "@/components/shared/ContentHeader";
import { useContentStats } from "@/hooks/useContentStats";

export default function PostsHeader() {
    const { totalPosts, postsReadingHours, loading } = useContentStats();

    return (
        <ContentHeader
            title="Artículos"
            description="Explora nuestra colección de artículos sobre desarrollo Swift, buenas prácticas y las últimas tendencias en iOS. Encuentra contenido especializado para cada nivel."
            icon={<BookOpen size={24} className="text-blue-400" />}
            badge={{
                text: "Blog",
                variant: "primary"
            }}
            stats={loading ? undefined : [
                {
                    label: "Artículos",
                    value: totalPosts
                },
                {
                    label: "Horas", 
                    value: `${postsReadingHours}+`
                }
            ]}
        />
    );
};

