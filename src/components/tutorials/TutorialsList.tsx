// src/components/tutorials/TutorialsList.tsx

import { getAllPublishedPostsServer } from "@/services/firebase/firestore/post-server";
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
    const tutorials = await getAllPublishedPostsServer({ searchTerm, level, tag, type: "tutorial" });
    
    // Additional filter to ensure only published tutorials are shown
    const publishedTutorials = tutorials.filter(tutorial => tutorial.isPublished === true);

    // Pasar datos al componente cliente
    return (
        <TutorialsListClient
            tutorials={publishedTutorials}
            searchTerm={searchTerm}
            currentPage={currentPage}
            viewMode={viewMode}
            sortBy={sortBy}
        />
    );
}