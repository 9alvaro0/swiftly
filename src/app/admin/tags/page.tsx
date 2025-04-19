"use client";

import { useState, useEffect, FormEvent } from "react";
import { useTags } from "@/hooks/useTags";
import { Tag } from "@/types/Tag";
import { v4 as uuidv4 } from "uuid";
import Modal from "@/components/ui/Modal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { FaSearch, FaExclamationTriangle } from "react-icons/fa";

export default function AdminTagsPage() {
    const { tags, isLoading, createNewTag, updateTagById, deleteTagById, updateFilters } = useTags();

    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [currentTag, setCurrentTag] = useState<Tag | null>(null);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
    });
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

    // Filtrar tags basados en la búsqueda
    useEffect(() => {
        if (!tags) return;

        const filtered = searchQuery
            ? tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : tags;

        setFilteredTags(filtered);
    }, [tags, searchQuery]);

    // Actualizar la búsqueda
    useEffect(() => {
        updateFilters({ searchTerm: searchQuery });
    }, [searchQuery, updateFilters]);

    // Resetear mensajes
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    // Resetear el formulario
    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
        });
        setFormMode("create");
        setCurrentTag(null);
        setFormError("");
    };

    // Iniciar edición de un tag
    const handleEditTag = (tag: Tag) => {
        setFormData({
            id: tag.id,
            name: tag.name,
        });
        setCurrentTag(tag);
        setFormMode("edit");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Iniciar eliminación de un tag
    const handleDeleteClick = (tag: Tag) => {
        setTagToDelete(tag);
    };

    // Confirmar eliminación
    const confirmDelete = async () => {
        if (!tagToDelete) return;

        try {
            await deleteTagById(tagToDelete.id);
            setSuccessMessage(`Tag "${tagToDelete.name}" eliminado correctamente`);
            setTagToDelete(null);
        } catch (err) {
            setFormError("Error al eliminar el tag");
            console.error(err);
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormError("");
        setIsSubmitting(true);

        try {
            // Validaciones
            if (!formData.name.trim()) {
                setFormError("El nombre del tag es obligatorio");
                setIsSubmitting(false);
                return;
            }

            // Crear o actualizar
            if (formMode === "create") {
                const newTag: Tag = {
                    id: uuidv4(),
                    name: formData.name.trim(),
                };

                await createNewTag(newTag);
                setSuccessMessage(`Tag "${newTag.name}" creado correctamente`);
                resetForm();
            } else if (formMode === "edit" && currentTag) {
                const updatedFields: Partial<Tag> = {
                    name: formData.name.trim(),
                };

                await updateTagById(currentTag.id, updatedFields);
                setSuccessMessage(`Tag "${formData.name}" actualizado correctamente`);
                resetForm();
            }
        } catch (err) {
            setFormError("Error al guardar el tag");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 relative">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar tags..."
                        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Formulario de creación/edición */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        {formMode === "create" ? "Crear nuevo tag" : "Editar tag"}
                    </h2>

                    {formError && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md">
                            {formError}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md">
                            {successMessage}
                        </div>
                    )}

                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Nombre del tag
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                            placeholder="Ingresa el nombre del tag"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                                    Guardando...
                                </span>
                            ) : formMode === "create" ? (
                                "Crear Tag"
                            ) : (
                                "Actualizar Tag"
                            )}
                        </button>

                        {formMode === "edit" && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listado de tags */}
            <h2 className="text-xl font-semibold mb-4">Tags existentes</h2>

            {isLoading ? (
                <div className="text-center py-8">
                    <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-blue-600 mx-auto" />
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando tags...</p>
                </div>
            ) : filteredTags.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    Nombre
                                </th>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredTags.map((tag) => (
                                <tr
                                    key={tag.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
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
                                                onClick={() => handleEditTag(tag)}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                                            >
                                                <BiEditAlt className="mr-1" /> Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(tag)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                                            >
                                                <BiTrash className="mr-1" /> Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8">
                    <FaExclamationTriangle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto" />
                    <p className="mt-2 text-gray-600 dark:text-gray-400">No se encontraron tags</p>
                </div>
            )}

            {/* Modal de confirmación de eliminación usando el componente personalizado */}
            <Modal
                isOpen={!!tagToDelete}
                onClose={() => setTagToDelete(null)}
                title="Eliminar tag"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setTagToDelete(null)}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        >
                            Eliminar
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
        </div>
    );
}
