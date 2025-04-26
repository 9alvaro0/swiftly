// src/components/tutorials/TutorialsList.tsx

import TutorialCard from "@/components/tutorials/TutorialCard";
import Pagination from "@/components/ui/Pagination";
import { getAllPublishedPosts } from "@/services/firebase/firestore/post";

export default async function TutorialsList({
    searchTerm,
    level,
    currentPage,
}: {
    searchTerm: string;
    level: string;
    currentPage: number;
}) {
    const itemsPerPage = 9;

    const tutorials = await getAllPublishedPosts(searchTerm, level, "tutorial");

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTutorials = tutorials.slice(indexOfFirstItem, indexOfLastItem);

    if (currentTutorials.length === 0) {
        return (
            <div className="text-center py-16 ">
                <p className="text-text-secondary text-lg mb-4">No se encontraron artículos</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tutorials.length)} de {tutorials.length}{" "}
                tutoriales
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTutorials.map((tutorial) => (
                    <TutorialCard
                        key={tutorial.slug}
                        tutorial={tutorial}
                    />
                ))}
            </div>

            {tutorials.length > 0 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={tutorials.length}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            )}
        </>
    );
}
