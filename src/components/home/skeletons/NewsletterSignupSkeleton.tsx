// src/components/home/skeletons/NewsletterSignupSkeleton.tsx
export default function NewsletterSignupSkeleton() {
    return (
        <section className="bg-blue-50 dark:bg-neutral-800 p-8 rounded-xl">
            <div className="max-w-2xl mx-auto text-center">
                <div className="h-8 w-3/4 mx-auto bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-4"></div>
                <div className="h-6 w-full max-w-md mx-auto bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse mb-6"></div>
                <div className="max-w-md mx-auto">
                    <div className="flex gap-2">
                        <div className="flex-grow h-10 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                        <div className="w-32 h-10 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}