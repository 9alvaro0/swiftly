// src/app/admin/tags/TagList.tsx

import TagItem from "@/components/admin/tags/TagItem";
import Pagination from "@/components/ui/Pagination";
import { getAllTags } from "@/firebase/firestore/tags";

interface TagListProps {
    searchTerm: string;
    currentPage: number;
}

export default async function TagListProps({ searchTerm, currentPage }: TagListProps) {
    const TAGS_PER_PAGE = 5;

    const tags = await getAllTags(searchTerm);

    const indexOfLastItem = currentPage * TAGS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - TAGS_PER_PAGE;
    const currentTags = tags.slice(indexOfFirstItem, indexOfLastItem);

    if (currentTags.length === 0) {
        return (
            <div className="text-center py-16 ">
                <p className="text-text-secondary text-lg mb-4">No se encontraron tags</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4 text-text-secondary">
                Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, tags.length)} de {tags.length} tutoriales
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {currentTags.map((tag) => (
                            <TagItem
                                key={tag.id}
                                tag={tag}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {tags.length > 0 && (
                <div className="flex justify-center pt-12">
                    <Pagination
                        totalItems={tags.length}
                        itemsPerPage={TAGS_PER_PAGE}
                    />
                </div>
            )}
        </>
    );
}
