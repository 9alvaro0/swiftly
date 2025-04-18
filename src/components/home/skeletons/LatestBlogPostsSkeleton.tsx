import PostGridSkeleton from "@/components/posts/skeletons/PostGridSkeleton";
import SectionHeaderSkeleton from "@/components/ui/skeletons/SectionHeaderSkeleton";

// src/components/home/skeletons/LatestBlogPostsSkeleton.tsx
export default function LatestBlogPostsSkeleton() {
    return (
        <section className="container mx-auto px-4 py-12">
            <SectionHeaderSkeleton />

            <PostGridSkeleton count={6} />
        </section>
    );
}
