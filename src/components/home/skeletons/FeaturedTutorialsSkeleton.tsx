import TutorialCardSkeleton from "@/components/tutorials/skeletons/TutorialCardSkeleton";
import SectionHeaderSkeleton from "@/components/ui/skeletons/SectionHeaderSkeleton"

export default function FeaturedTutorialsSkeleton() {
    return (
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <SectionHeaderSkeleton/>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <TutorialCardSkeleton/>
                    ))}
                </div>
            </div>
        </section>
    );
}
