// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import FeaturedTutorials from "@/components/home/FeaturedTutorials";
import LatestPosts from "@/components/home/latestPosts/LatestPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { Suspense } from "react";
import FeaturedTutorialsSkeleton from "@/components/home/skeletons/FeaturedTutorialsSkeleton";
import LatestPostsSkeleton from "@/components/home/skeletons/LatestPostsSkeleton";

export default async function Home() {
    return (
        <main className="mb-16">
            <HeroSection />

            <div className="my-8 h-px bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20"></div>

            <Suspense fallback={<FeaturedTutorialsSkeleton />}>
                <FeaturedTutorials />
            </Suspense>

            <div className="my-8 h-px bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20"></div>

            <Suspense fallback={<LatestPostsSkeleton />}>
                <LatestPosts />
            </Suspense>

            <NewsletterSignup />
        </main>
    );
}
