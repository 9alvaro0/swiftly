// src/components/tutorials/TutorialsList.tsx

import { getAllPublishedPosts } from "@/services/firebase/firestore/post";
import TutorialsListClient from "./TutorialsListClient";
import { ViewMode } from "@/components/posts/ViewToggle";
import { SortOption } from "@/components/posts/SortOptions";

export default async function TutorialsList({
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
    const tutorials = await getAllPublishedPosts({ searchTerm, level, tag, type: "tutorial" });

    // Pasar datos al componente cliente
    return (
        <TutorialsListClient
            tutorials={tutorials}
            searchTerm={searchTerm}
            currentPage={currentPage}
            viewMode={viewMode}
            sortBy={sortBy}
        />
    );
}