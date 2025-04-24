"use client";

import { Tag } from "@/types/Tag";
import Modal from "@/components/ui/Modal";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

interface DeleteTagDialogProps {
    tagToDelete: Tag | null;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isOpen?: boolean;
}

export default function DeleteTagDialog({
    tagToDelete,
    onClose,
    onConfirm,
    isOpen = !!tagToDelete,
}: DeleteTagDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Eliminar tag"
            footer={
                <>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <span className="flex items-center">
                                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                                Eliminando...
                            </span>
                        ) : (
                            "Eliminar"
                        )}
                    </button>
                </>
            }
        >
            {tagToDelete && (
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-red-100 dark:bg-red-900 p-2 rounded-full">
                        <FaExclamationTriangle className="h-6 w-6 text-red-600 dark:text-red-300" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ¿Estás seguro de que deseas eliminar el tag{" "}
                        <span className="font-medium">#{tagToDelete.name}</span>? Esta acción no se puede deshacer.
                    </p>
                </div>
            )}
        </Modal>
    );
}
