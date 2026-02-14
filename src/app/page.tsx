// src/app/page.tsx

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
    title: "aprendeSwift - Tutoriales de Swift y SwiftUI para desarrollo iOS",
    description: "Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva.",
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        url: SITE_URL,
    },
};
import FeaturedTutorials from "@/components/home/FeaturedTutorials";
import LatestPosts from "@/components/home/latestPosts/LatestPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import { Suspense } from "react";
import FeaturedTutorialsSkeleton from "@/components/home/skeletons/FeaturedTutorialsSkeleton";
import LatestPostsSkeleton from "@/components/home/skeletons/LatestPostsSkeleton";

// ISR: revalidate every 5 minutes
export const revalidate = 300;

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'aprendeSwift',
    url: SITE_URL,
    description: 'Publicaciones, guías y tutoriales para aprender Swift y SwiftUI de manera efectiva.',
    publisher: {
        '@type': 'Organization',
        name: 'aprendeSwift',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/logo.png` },
    },
    potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/posts?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
};

export default async function Home() {
    return (
        <div className="mb-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
        </div>
    );
}
