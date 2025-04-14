// src/components/tutorials/TutorialTags.tsx

interface TutorialTagsProps {
    tags: string[];
}

export default function TutorialTags({ tags }: TutorialTagsProps) {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="mb-12">
            <h3 className="text-lg font-semibold mb-3 text-text-primary">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-sm text-text-secondary"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
