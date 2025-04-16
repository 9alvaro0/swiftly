import React, { useState } from "react";
import { FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import Modal from "@/components/ui/Modal";

interface ContactField {
    key: string;
    label: string;
    icon: React.ElementType;
    placeholder: string;
    type: string;
}

const contactFields: ContactField[] = [
    {
        key: "phone",
        label: "Teléfono",
        icon: FaPhone,
        placeholder: "Número de teléfono",
        type: "tel",
    },
    {
        key: "location",
        label: "Ubicación",
        icon: FaMapMarkerAlt,
        placeholder: "Ciudad, País",
        type: "text",
    },
];

export default function ContactInfoSection() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");
    const { user, setUser } = useAuthStore();

    const handleOpenModal = (fieldKey: string) => {
        const currentValue = user?.[fieldKey as keyof typeof user] || "";
        setEditingValue(currentValue as string);
        setEditingField(fieldKey);
    };

    const handleCloseModal = () => {
        setEditingField(null);
    };

    const handleSaveChanges = () => {
        if (editingField) {
            setUser({ ...user!, [editingField]: editingValue });
            setEditingField(null);
        }
    };

    // Componentes para el pie del modal
    const modalFooter = (
        <>
            <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                Cancelar
            </button>
            <button
                onClick={handleSaveChanges}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
                Guardar
            </button>
        </>
    );

    const getFieldTitle = (fieldKey: string): string => {
        const field = contactFields.find((f) => f.key === fieldKey);
        return field ? field.label : "";
    };

    const getFieldPlaceholder = (fieldKey: string): string => {
        const field = contactFields.find((f) => f.key === fieldKey);
        return field ? field.placeholder : "";
    };

    const getFieldType = (fieldKey: string): string => {
        const field = contactFields.find((f) => f.key === fieldKey);
        return field ? field.type : "text";
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Información de Contacto</h2>
            <div className="grid md:grid-cols-2 gap-4">
                {contactFields.map((field) => {
                    const Icon = field.icon;
                    const currentValue = user?.[field.key as keyof typeof user] || "";

                    return (
                        <div
                            key={field.key}
                            className="flex flex-col items-start space-y-2"
                        >
                            {/* Título */}
                            <div className="flex items-center space-x-2">
                                <Icon
                                    className="text-gray-500"
                                    size={20}
                                />
                                <span className="font-medium text-lg">{field.label}</span>
                            </div>

                            {/* Valor del campo */}
                            <div className="flex items-center w-full space-x-2">
                                <button
                                    onClick={() => handleOpenModal(field.key)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                    aria-label={`Editar ${field.label.toLowerCase()}`}
                                >
                                    <FaEdit size={18} />
                                </button>
                                <p className="text-sm text-gray-700 truncate flex-grow">
                                    {currentValue ? (
                                        <span className="text-gray-800 dark:text-gray-200">
                                            {currentValue as string}
                                        </span>
                                    ) : (
                                        <span className="italic text-gray-500">No especificado</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal usando el componente reutilizable */}
            <Modal
                isOpen={editingField !== null}
                onClose={handleCloseModal}
                title={`Editar ${editingField ? getFieldTitle(editingField) : ""}`}
                footer={modalFooter}
            >
                <input
                    type={editingField ? getFieldType(editingField) : "text"}
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="input-field p-3 w-full rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white"
                    placeholder={editingField ? getFieldPlaceholder(editingField) : ""}
                    autoFocus
                />
            </Modal>
        </div>
    );
}
