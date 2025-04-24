// src/app/admin/tags/TagItem.tsx

"use client";

import { Tag } from "@/types/Tag";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import DeleteTagDialog from "./DeleteTagDialog";
import { useState } from "react";
import { deleteTag } from "@/firebase/firestore/tags";
import { revalidateTagsPath } from "@/actions/revalidateTagsPath";

interface TagItemProps {
    tag: Tag;
}

export default function TagItem({ tag }: TagItemProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleEdit = () => {
        const params = new URLSearchParams(searchParams);
        params.set("tagId", tag.id);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleDelete = () => {
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        if (!tag) return;
        await deleteTag(tag.id);
        setShowDeleteDialog(false);
        await revalidateTagsPath();
    };

    return (
        <>
            <tr>
                <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-1 rounded mr-2">
                            <span className="font-medium">#{tag.name}</span>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={handleEdit}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                        >
                            <BiEditAlt className="mr-1" /> Editar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                        >
                            <BiTrash className="mr-1" /> Eliminar
                        </button>
                    </div>
                </td>
            </tr>

            <DeleteTagDialog
                tagToDelete={tag}
                onClose={() => { setShowDeleteDialog(false); }}
                onConfirm={confirmDelete}
                isOpen={showDeleteDialog}
            />
        </>
    );
}
