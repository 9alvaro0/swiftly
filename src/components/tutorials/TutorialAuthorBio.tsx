// src/components/tutorials/TutorialAuthorBio.tsx

import Image from "next/image";
import { Author } from "@/types/Post";

interface TutorialAuthorBioProps {
    author: Author;
}

export default function TutorialAuthorBio({ author }: TutorialAuthorBioProps) {
    if (!author.bio) return null;

    return (
        <div className="mb-12 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
                {author.avatar && (
                    <Image
                        src={author.avatar || "/placeholder.svg"}
                        alt={author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                )}
                <div>
                    <h3 className="text-lg font-bold text-text-primary">Sobre el autor</h3>
                    <p className="text-text-secondary">{author.name}</p>
                </div>
            </div>
            <p className="text-text-secondary">{author.bio}</p>
        </div>
    );
}
