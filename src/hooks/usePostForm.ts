import { useState } from "react";
import { useRouter } from "next/navigation";
import { Author, Post } from "@/types/Post";
import { updatePost, createPost } from "@/firebase/firestore/post";
import { useAuthStore } from "@/store/authStore";
import { getDefaultPost, preparePostForSave, validatePost } from "@/utils/postUtils";

interface PostFormOptions {
    defaultValues?: Post;
}

export const usePostForm = ({ defaultValues }: PostFormOptions = {}) => {
    const { user } = useAuthStore();
    const router = useRouter();

    const [post, setPost] = useState<Post>(() => {
        const initialPost = defaultValues || getDefaultPost();

        if (initialPost.author.id === "" && user) {
            initialPost.author = {
                id: user.uid,
                name: user.name || "",
                username: user.username || "",
                avatar: user.photoURL || "",
                bio: user.bio || "",
                socialLinks: user.socialLinks ? { ...user.socialLinks } : undefined,
            };
        }

        return initialPost;
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const addImageToPost = (imageUrl: string) => {
        setPost((prev) => ({
            ...prev,
            images: [...(prev.images || []), imageUrl],
        }));

        setUploadedImages((prev) => [...prev, imageUrl]);
    };

    const insertImageInContent = (imageUrl: string) => {
        const markdownImage = `\n![Imagen Post](${imageUrl})\n`;
        setPost((prev) => ({
            ...prev,
            content: (prev.content || "") + markdownImage,
        }));
    };

    const addKeyword = (keyword: string) => {
        if (keyword && !post.keywords?.includes(keyword)) {
            setPost((prev) => ({
                ...prev,
                keywords: [...(prev.keywords || []), keyword],
            }));
        }
    };

    const removeKeyword = (keyword: string) => {
        setPost((prev) => ({
            ...prev,
            keywords: prev.keywords?.filter((k) => k !== keyword) || [],
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setPost((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof Post] as unknown as Record<string, unknown>),
                    [child]: value,
                },
            }));
        } else {
            setPost((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePost(post).isValid) {
            setErrors(validatePost(post).errors.reduce((acc, error) => ({ ...acc, [error]: true }), {}));
            return;
        }

        // Establecer fechas
        const now = new Date();

        // Generar ID si es un post nuevo
        const postId = post.id || crypto.randomUUID();

        // Preparar objeto de post con todos los campos requeridos
        let updatedPost: Post = {
            ...(post as Post),
            id: postId,
            type: post.type,
            createdAt: post.createdAt || now,
            isPublished: post.isPublished || false,
            tags: post.tags || [],
            level: post.level,
            author: {
                id: post.author?.id || crypto.randomUUID(),
                name: post.author?.name || "Autor Anónimo",
                username: post.author?.username,
                avatar: post.author?.avatar,
                bio: post.author?.bio,
                socialLinks: post.author?.socialLinks,
            },
            views: post.views || 0,
            likedBy: post.likedBy || [],
            // Asegurarse de que todos los campos requeridos tengan al menos un valor vacío
            imageUrl: post.imageUrl || "",
            description: post.description || "",
        };

        updatedPost = preparePostForSave(updatedPost);

        try {
            setIsSubmitting(true);
            if (post.id) {
                // Actualizar post existente - solo enviar los campos modificados
                const updatedFields: Partial<
                    Record<
                        keyof Post,
                        | string
                        | number
                        | boolean
                        | Date
                        | string[]
                        | Author
                        | Pick<Post, "id" | "slug" | "title" | "description" | "imageUrl">[]
                        | undefined
                    >
                > = {};

                // Determinar qué campos han cambiado para actualizar solo esos
                Object.keys(updatedPost).forEach((key) => {
                    const typedKey = key as keyof Post;
                    if (JSON.stringify(updatedPost[typedKey]) !== JSON.stringify(post[typedKey])) {
                        updatedFields[typedKey] = updatedPost[typedKey];
                    }
                });

                console.log("Campos actualizados:", updatedFields);
                await updatePost(postId, updatedFields as Partial<Post>);
            } else {
                // Crear nuevo post
                console.log("Creando nuevo post:", updatedPost);
                await createPost(updatedPost);
            }

            // Redireccionar después de guardar
            router.push("/admin/posts");
        } catch (error) {
            console.error("Error al guardar el post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addTag = (tag: string) => {
        if (tag && !post.tags?.includes(tag)) {
            setPost((prev) => ({
                ...prev,
                tags: [...(prev.tags || []), tag],
            }));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setPost((prev) => ({
            ...prev,
            tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
        }));
    };

    return {
        post,
        setPost,
        errors,
        uploadedImages,
        setUploadedImages,
        addImageToPost,
        insertImageInContent,
        isPreviewMode,
        setIsPreviewMode,
        handleChange,
        handleSubmit,
        addTag,
        removeTag,
        addKeyword,
        removeKeyword,
        isSubmitting,
    };
};
