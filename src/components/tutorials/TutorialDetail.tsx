// src/components/tutorials/TutorialDetail.tsx

import { Post } from "@/types/Post";
import TutorialBreadcrumbs from "./TutorialBreadcrumbs";
import TutorialHeader from "./TutorialHeader";
import TutorialFeaturedImage from "./TutorialFeaturedImage";
import TutorialContent from "./TutorialContent";
import TutorialTags from "./TutorialTags";
import TutorialAuthorBio from "./TutorialAuthorBio";
import RelatedTutorials from "./RelatedTutorials";

interface TutorialDetailProps {
    tutorial: Post;
}

export default function TutorialDetail({ tutorial }: TutorialDetailProps) {
    const relatedTutorials = tutorial.relatedPosts || [];

    return (
        <div className="py-12 px-4 md:px-6 max-w-4xl mx-auto">
            <TutorialBreadcrumbs />
            <TutorialHeader tutorial={tutorial} />
            <TutorialFeaturedImage
                imageUrl={tutorial.imageUrl || ""}
                title={tutorial.title}
            />
            <TutorialContent content={tutorial.content} />
            <TutorialTags tags={tutorial.tags || []} />
            <TutorialAuthorBio author={tutorial.author} />
            {relatedTutorials.length > 0 && <RelatedTutorials tutorials={relatedTutorials} />}
        </div>
    );
}
