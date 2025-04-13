import HeroSection from "@/components/home/HeroSection";
import LatestBlogPosts from "@/components/home/LatestBlogPosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import FeaturedTutorialsSkeleton from "@/components/home/skeletons/FeaturedTutorialsSkeleton";

export default function Loading() {
    return (
        <div className="space-y-12">
            <HeroSection />
            <FeaturedTutorialsSkeleton />
            <LatestBlogPosts />
            <NewsletterSignup />
        </div>
    );
}
