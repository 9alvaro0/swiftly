// src/app/page.tsx

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
    title: "aprendeSwift - Tutoriales de Swift y SwiftUI",
    description: "Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva.",
    alternates: {
        canonical: "https://aprendeswift.dev",
    },
};
import FeaturedTutorials from "@/components/home/FeaturedTutorials";
import LatestPosts from "@/components/home/latestPosts/LatestPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { Suspense } from "react";
import FeaturedTutorialsSkeleton from "@/components/home/skeletons/FeaturedTutorialsSkeleton";
import LatestPostsSkeleton from "@/components/home/skeletons/LatestPostsSkeleton";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

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
