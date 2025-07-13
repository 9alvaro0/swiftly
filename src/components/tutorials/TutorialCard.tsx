import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/Post";
import { LEVEL_COLORS } from "@/constants/post";
import { FiClock } from "react-icons/fi";
import HighlightText from "@/components/ui/HighlightText";

type TutorialCardProps = {
    tutorial: Post;
    searchTerm?: string;
};

export default function TutorialCard({ tutorial, searchTerm = "" }: TutorialCardProps) {
    const levelStyle = LEVEL_COLORS[tutorial.level];

    return (
        <Link
            href={`/tutorials/${tutorial.slug}`}
            className="group block"
        >
            <div className="group rounded-2xl border-[var(--color-card-border)] bg-[var(--color-card)] hover:border-[var(--color-card-border-hover)] hover:bg-[var(--color-card-hover)] border p-4 shadow-md transition hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-full">
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg bg-[var(--color-border)]">
                    <Image
                        src={tutorial.coverImage || ""}
                        alt={tutorial.title}
                        width={316}
                        height={316}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <h2 className="font-bold text-[var(--color-foreground)] text-lg leading-tight mb-2">
                    <HighlightText text={tutorial.title} searchTerm={searchTerm} />
                </h2>
                <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 px-2 py-1 bg-[var(--color-blue-bg)] text-[var(--color-muted)] rounded-full capitalize">
                        <FiClock size={14} className="text-[var(--color-blue-light)]" />
                        {tutorial.readTime} min
                    </span>

                    <span
                        className={`px-2 py-1 rounded-full capitalize bg-[var(--color-blue-bg)] text-[var(--color-muted)] ${levelStyle.badge || ""}`}
                    >
                        {tutorial.level}
                    </span>
                </div>
            </div>
        </Link>
    );
}
