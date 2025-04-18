// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import FeaturedTutorials from "@/components/home/FeaturedTutorials";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export default function Home() {
    return (
        <div>
            {/* Hero y secciones principales */}
            <div className="space-y-12 mb-16">
                <HeroSection />
                <FeaturedTutorials />
                <LatestBlogPosts />
                <NewsletterSignup />
            </div>
        </div>
    );
}
