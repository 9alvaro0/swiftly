import { useState, useEffect } from "react";
import { incrementPostViews } from "@/services/firebase/firestore/post";

/**
 * Hook para gestionar y actualizar las vistas de un post
 * @param postId ID del post
 * @param initialViews Número inicial de vistas (opcional)
 * @returns Un objeto con el número de vistas y el estado de carga
 */
export function usePostViews(postId: string, initialViews: number = 0) {
    const [views, setViews] = useState<number>(initialViews);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const registerView = async () => {
            if (!postId) return;

            const viewedPosts = JSON.parse(sessionStorage.getItem("viewedPosts") || "[]");

            if (viewedPosts.includes(postId)) {
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const result = await incrementPostViews(postId);
                setViews(result.views);

                sessionStorage.setItem("viewedPosts", JSON.stringify([...viewedPosts, postId]));

                console.log("Vista registrada:", result.views);
            } catch (err) {
                console.error("Error al registrar vista:", err);
                setError("No se pudo registrar la vista");
            } finally {
                setLoading(false);
            }
        };

        registerView();
    }, [postId]);

    return { views, loading, error };
}
