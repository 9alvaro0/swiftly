// components/admin/dashboard/RecentActivity.tsx

"use client";

import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";

export default function RecentActivity() {
    const { posts, isLoading } = usePosts();
    const sorted = [...posts].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    if (isLoading) return <p>Cargando actividad reciente...</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Actividad reciente</h2>
            <ul className="space-y-2">
                {sorted.slice(0, 5).map((t) => (
                    <li
                        key={t.id}
                        className="text-sm text-muted-foreground"
                    >
                        <Link
                            href={`/admin/tutorials/${t.slug}/edit`}
                            className="text-primary hover:underline"
                        >
                            {t.title}
                        </Link>{" "}
                        actualizado el {new Date(t.updatedAt).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}
