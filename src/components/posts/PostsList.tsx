// src/components/posts/PostsList.tsx

import { getAllPublishedPosts } from "@/services/firebase/firestore/post";
import PostsListClient from "./PostsListClient";
import { ViewMode } from "./ViewToggle";
import { SortOption } from "./SortOptions";

export default async function PostsList({
    searchTerm,
    level,
    tag,
    currentPage,
    viewMode = "grid",
    sortBy = "recent",
}: {
    searchTerm: string;
    level: string;
    tag?: string;
    currentPage: number;
    viewMode?: ViewMode;
    sortBy?: SortOption;
}) {
    // Obtener datos en el servidor
    const posts = await getAllPublishedPosts({ searchTerm, level, tag, type: "article" });

    // Pasar datos al componente cliente
    return (
        <PostsListClient
            posts={posts}
            searchTerm={searchTerm}
            currentPage={currentPage}
            viewMode={viewMode}
            sortBy={sortBy}
        />
    );
}