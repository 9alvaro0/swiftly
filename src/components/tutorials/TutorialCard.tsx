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
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-4 shadow-md transition hover:shadow-lg hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/10 flex flex-col justify-between h-full">
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg bg-white/10">
                    <Image
                        src={tutorial.coverImage || ""}
                        alt={tutorial.title}
                        width={316}
                        height={316}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <h2 className="font-bold text-white text-lg leading-tight mb-2">
                    <HighlightText text={tutorial.title} searchTerm={searchTerm} />
                </h2>
                <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 px-2 py-1 bg-blue-400/20 rounded-full text-white/70 capitalize">
                        <FiClock size={14} className="text-blue-300" />
                        {tutorial.readTime} min
                    </span>

                    <span
                        className={`px-2 py-1 rounded-full capitalize text-white/70 ${levelStyle.badge || "bg-white/10"}`}
                    >
                        {tutorial.level}
                    </span>
                </div>
            </div>
        </Link>
    );
}
