// src/hooks/useProfileEditor.ts
import { useState, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/User";
import { deleteUserImageByUrl, generateUserImagePath } from "@/utils/userImageUtils";
import { checkImageExists, deleteImage, uploadImage } from "@/services/firebase/storage/image";
import { extractImagePathFromUrl } from "@/utils/imageUtils";
import { updateUser } from "@/services/firebase/firestore/user";
import { toast } from "sonner";

export function useProfileEditor() {
    const { user, setUser } = useAuthStore();
    const [isEditingField, setIsEditingField] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleOpenModal = (field: string): void => {
        const currentValue = user?.[field as keyof User] || "";
        setEditingValue(currentValue as string);
        setIsEditingField(field);
    };

    const handleCloseModal = (): void => {
        setIsEditingField(null);
        setImagePreview(null);
        setUploadProgress(0);
        setUploadError(null);
    };

    const handleSaveField = async (): Promise<void> => {
        if (isEditingField && user) {
            try {
                // Update local state first
                setUser({ ...user, [isEditingField]: editingValue });
                
                // Persist to Firebase
                await updateUser(user.uid, { [isEditingField]: editingValue });
                
                toast.success(`${isEditingField === 'bio' ? 'Biografía' : 'Campo'} actualizado correctamente`);
                setIsEditingField(null);
            } catch (error) {
                console.error('Error updating user field:', error);
                toast.error('Error al actualizar el perfil');
                // Revert local state on error
                setUser(user);
            }
        }
    };

    const handleSaveImage = async (): Promise<void> => {
        if (imagePreview && user) {
            try {
                if (isEditingField === "photo") {
                    // Update local state first
                    setUser({ ...user, photoURL: imagePreview });
                    
                    // Persist to Firebase
                    await updateUser(user.uid, { photoURL: imagePreview });
                    
                    toast.success('Foto de perfil actualizada correctamente');
                }
                setIsEditingField(null);
                setImagePreview(null);
            } catch (error) {
                console.error('Error updating profile photo:', error);
                toast.error('Error al actualizar la foto de perfil');
                // Revert local state on error
                setUser(user);
            }
        }
    };

    const simulateProgress = useCallback(() => {
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                const next = prev + Math.random() * 15;
                if (next >= 95) {
                    clearInterval(interval);
                    return 95;
                }
                return next;
            });
        }, 200);

        return () => clearInterval(interval);
    }, []);

    const uploadUserImage = async (file: File): Promise<void> => {
        if (!file || !user) return;

        setIsUploading(true);
        setUploadError(null);
        const cleanupProgress = simulateProgress();

        try {
            if (!user.uid) {
                throw new Error("El usuario no tiene un ID válido");
            }
            const fileName = `profile_${user.uid}_${Date.now()}.${file.name.split(".").pop()}`;
            const path = generateUserImagePath(user.uid, fileName);

            if (user.photoURL) {
                await deleteUserImageByUrl(user.photoURL);
            }

            const imageUrl = await uploadImage(file, path);

            setImagePreview(imageUrl);
            setUploadProgress(100);
            
            // Update local state
            setUser({ ...user, photoURL: imageUrl });
            
            // Persist to Firebase
            await updateUser(user.uid, { photoURL: imageUrl });
            
            toast.success('Foto de perfil actualizada correctamente');

            setTimeout(() => {
                handleCloseModal();
            }, 1000);
        } catch (error) {
            console.error("Error al subir imagen:", error);
            setUploadError(error instanceof Error ? error.message : "Error al subir la imagen");
            setUploadProgress(0);
        } finally {
            cleanupProgress();
            setIsUploading(false);
        }
    };

    // Función para eliminar una imagen
    const deleteUserImage = async (url: string): Promise<void> => {
        if (!url || !user) return;

        try {
            const path = extractImagePathFromUrl(url);
            if (!path) {
                throw new Error("No se pudo extraer la ruta de la imagen");
            }

            // Verificar si la imagen existe
            const exists = await checkImageExists(path);

            if (exists) {
                await deleteImage(path);
            }

            // Limpia la previsualización
            setImagePreview(null);

            // Opcional: actualizar directamente el usuario
            // setUser({ ...user, photoURL: "" });
        } catch (error) {
            console.error("Error al eliminar imagen:", error);
            setUploadError(error instanceof Error ? error.message : "Error al eliminar la imagen");
        }
    };

    return {
        user,
        isEditingField,
        editingValue,
        imagePreview,
        uploadProgress,
        isUploading,
        uploadError,
        setEditingValue,
        setImagePreview,
        handleOpenModal,
        handleCloseModal,
        handleSaveField,
        handleSaveImage,
        uploadUserImage,
        deleteUserImage,
    };
}
