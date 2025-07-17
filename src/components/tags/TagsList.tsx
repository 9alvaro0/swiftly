// src/components/tags/TagsList.tsx

import { getAllTags } from "@/services/firebase/firestore/tags";
import { BsEmojiFrown } from "react-icons/bs";
import Link from "next/link";
import { tagToSlug } from "@/utils/tagUtils";

export default async function TagsList({ searchTerm }: { searchTerm: string }) {
    const tags = await getAllTags(searchTerm);

    const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="rounded-2xl shadow-lg transition-all">
            {filteredTags.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {filteredTags.length} tag{filteredTags.length !== 1 ? "s" : ""} encontrados
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredTags.map((tag) => (
                            <Link
                                key={tag.id}
                                href={`/tags/${tagToSlug(tag.name)}`}
                                className="group"
                            >
                                <div className="bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200/50 dark:border-blue-700 rounded-xl p-4 h-full hover:shadow-md hover:-translate-y-1 transition-all flex items-center justify-center text-center">
                                    <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        #{tag.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-16 flex flex-col items-center space-y-4">
                    <BsEmojiFrown className="w-14 h-14 text-gray-400 dark:text-gray-600" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No se encontraron tags</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        No hay tags que coincidan con tu búsqueda.
                    </p>
                </div>
            )}
        </div>
    );
}
