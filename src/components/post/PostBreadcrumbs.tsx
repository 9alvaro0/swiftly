// src/components/post/PostBreadcrumbs.tsx

import Link from "next/link";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

interface PostBreadcrumbsProps {
    branch: string;
    postTitle?: string;
}

export default function PostBreadcrumbs({ branch, postTitle }: PostBreadcrumbsProps) {
    const getBranchInfo = () => {
        switch (branch.toLowerCase()) {
            case "tutorials":
                return { url: "/tutorials", label: "Tutoriales" };
            case "articles":
                return { url: "/posts", label: "Articulos" };
            default:
                return { url: `/${branch.toLowerCase()}`, label: branch };
        }
    };

    const { url, label } = getBranchInfo();

    return (
        <nav className="flex items-center text-sm mb-8 text-white/80 font-medium">
            <div className="flex items-center space-x-2">
                <Link
                    href="/"
                    className="flex items-center hover:text-blue-400 transition-colors"
                >
                    <Home
                        size={16}
                        className="mr-1"
                    />
                    <span className="hidden sm:inline">Inicio</span>
                </Link>

                <ChevronRight
                    size={14}
                    className="text-white/60"
                />

                <Link
                    href={url}
                    className="hover:text-blue-400 transition-colors"
                >
                    {label}
                </Link>

                {postTitle && (
                    <>
                        <ChevronRight
                            size={14}
                            className="text-white/60"
                        />
                        <span
                            className="text-white font-semibold truncate max-w-[200px]"
                            title={postTitle}
                        >
                            {postTitle}
                        </span>
                    </>
                )}
            </div>

            <div className="ml-auto">
                <Link
                    href={url}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                >
                    <ChevronLeft
                        size={16}
                        className="mr-1 group-hover:-translate-x-1 transition-transform"
                    />
                    <span>Volver a {label}</span>
                </Link>
            </div>
        </nav>
    );
}
