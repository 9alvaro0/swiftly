// AdminPostsPage.tsx
"use client";

import { Suspense } from "react";
import AdminPostsSkeleton from "@/components/admin/posts/skeletons/AdminPostsSkeleton";
import AdminPostsContent from "@/components/admin/posts/AdminPostsContent";

export default function AdminPostsPage() {
    return (
        <Suspense fallback={<AdminPostsSkeleton />}>
            <AdminPostsContent />
        </Suspense>
    );
}