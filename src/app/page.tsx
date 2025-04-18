// src/app/page.tsx

import HeroSection from "@/components/home/HeroSection";
import FeaturedTutorials from "@/components/home/FeaturedTutorials";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import MostViewedPosts from "@/components/posts/MostViewedPosts";

export default function Home() {
    return (
        <div>
            {/* Hero y secciones principales */}
            <div className="space-y-12 mb-16">
                <HeroSection />
                <FeaturedTutorials />
                <LatestBlogPosts />
            </div>
            
            {/* Sección intermedia con Posts más vistos y Newsletter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="md:col-span-2">
                    <MostViewedPosts limit={5} />
                </div>
                <div className="md:col-span-1">
                    <div className="sticky top-24">
                        <NewsletterSignup />
                    </div>
                </div>
            </div>
        </div>
    );
}
