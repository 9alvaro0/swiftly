import { useRef, useState } from "react";
import { Post } from "@/types/Post";
import { createOrUpdatePost } from "@/services/firebase/firestore/post";
import { useAuthStore } from "@/store/authStore";
import { getDefaultPost, preparePostForSave, validatePost } from "@/utils/postUtils";
import { useRouter } from "next/navigation";
import { generateSEO } from "@/services/ai/seo/seoClient";


interface PostFormOptions {
    selectedPost: Post | undefined;
}

export default function usePostForm({ selectedPost }: PostFormOptions) {
    const router = useRouter();
    const { user } = useAuthStore();
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [post, setPost] = useState<Post>(() => {
        const initialPost = selectedPost || getDefaultPost();

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
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const addImageToPost = (imageUrl: string) => {
        if (!post.images?.includes(imageUrl)) {
            setPost((prev) => ({
                ...prev,
                images: [...(prev.images || []), imageUrl],
            }));
        }
    };

    const removeImageFromPost = (imageUrl: string) => {
        setPost((prev) => ({
            ...prev,
            images: (prev.images || []).filter((img) => img !== imageUrl),
            imageUrl: prev.imageUrl === imageUrl ? "" : prev.imageUrl,
            coverImage: prev.coverImage === imageUrl ? "" : prev.coverImage,
        }));
    };

    const setMainImage = (imageUrl: string) => {
        setPost((prev) => ({
            ...prev,
            imageUrl,
            images: prev.images?.includes(imageUrl) ? prev.images : [...(prev.images || []), imageUrl],
        }));
    };

    const setCoverImage = (imageUrl: string) => {
        setPost((prev) => ({
            ...prev,
            coverImage: imageUrl,
            // Asegurarse de que la imagen esté en el array de imágenes
            images: prev.images?.includes(imageUrl) ? prev.images : [...(prev.images || []), imageUrl],
        }));
    };

    const insertImageInContent = (imageUrl: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const cursorPosition = textarea.selectionStart;
            const currentContent = post.content || "";

            const markdownImage = `\n![Imagen de post](${imageUrl})\n`;
            const newContent =
                currentContent.substring(0, cursorPosition) + markdownImage + currentContent.substring(cursorPosition);

            setPost({ ...post, content: newContent });
            addImageToPost(imageUrl);
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

        const validation = validatePost(post);
        if (!validation.isValid) {
            setErrors(validation.errors.reduce((acc, error) => ({ ...acc, [error]: true }), {}));
            return;
        }

        try {
            setIsSubmitting(true);

            const shouldGenerateSEO =
                !post.keywords ||
                post.keywords.length === 0 ||
                !post.metaDescription ||
                post.metaDescription.trim() === "";

            let postWithSEO = { ...post };

            if (shouldGenerateSEO) {
                postWithSEO = await generateSEO(post);
            }

            // Prepara el post para guardar
            const now = new Date();
            const postId = postWithSEO.id || crypto.randomUUID();

            const finalPost: Post = {
                ...postWithSEO,
                id: postId,
                type: postWithSEO.type,
                createdAt: postWithSEO.createdAt || now,
                updatedAt: now,
                isPublished: postWithSEO.isPublished || false,
                tags: postWithSEO.tags || [],
                level: postWithSEO.level,
                author: {
                    id: postWithSEO.author?.id || crypto.randomUUID(),
                    name: postWithSEO.author?.name || "Autor Anónimo",
                    username: postWithSEO.author?.username,
                    avatar: postWithSEO.author?.avatar,
                    bio: postWithSEO.author?.bio,
                    socialLinks: postWithSEO.author?.socialLinks,
                },
                views: postWithSEO.views || 0,
                likedBy: postWithSEO.likedBy || [],
                imageUrl: postWithSEO.imageUrl || "",
                coverImage: postWithSEO.coverImage || "",
                description: postWithSEO.description || "",
                images: postWithSEO.images || [],
            };

            // Prepara y guarda el post
            const preparedPost = preparePostForSave(finalPost);
            await createOrUpdatePost(postId, preparedPost);

            // Navega a la lista de posts
            router.push("/admin/posts");
        } catch (error) {
            console.error("Error al guardar el post:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const insertSnippet = (snippet: string) => {
        if (contentRef.current) {
            const textarea = contentRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const currentContent = post.content || "";

            const newContent = currentContent.substring(0, startPos) + snippet + currentContent.substring(endPos);

            setPost({ ...post, content: newContent });
        }
    };

    return {
        post,
        setPost,
        errors,
        addImageToPost,
        removeImageFromPost,
        setMainImage,
        setCoverImage,
        insertImageInContent,
        isPreviewMode,
        setIsPreviewMode,
        handleChange,
        handleSubmit,
        addTag,
        removeTag,
        insertSnippet,
        contentRef,
        isSubmitting,
    };
}
