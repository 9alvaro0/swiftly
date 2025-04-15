import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/Post";

interface PostFormOptions {
    defaultValues?: Partial<Post>;
    onSubmit?: (post: Post) => void;
}

export const usePostForm = ({ defaultValues = {}, onSubmit }: PostFormOptions = {}) => {
    const router = useRouter();

    const [post, setPost] = useState<Partial<Post>>({
        ...defaultValues,
        type: defaultValues.type,
    });

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!post.title?.trim()) newErrors.title = "El título es obligatorio";
        if (!post.description?.trim()) newErrors.description = "La descripción es obligatoria";
        if (!post.content?.trim()) newErrors.content = "El contenido es obligatorio";
        if (!post.imageUrl?.trim()) newErrors.imageUrl = "La URL de la imagen es obligatoria";
        if (!post.category) newErrors.category = "La categoría es obligatoria";
        if (!post.level) newErrors.level = "El nivel es obligatorio";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const now = new Date();

        const postId = post.id || crypto.randomUUID();

        const updatedPost: Post = {
            ...(post as Post),
            id: postId,
            type: post.type || "article",
            createdAt: post.createdAt || now,
            updatedAt: now,
            slug:
                post.slug ||
                post.title
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "") ||
                "",
            readTime: Math.ceil(((post.content?.length || 0) / 1000) * 5),
            isPublished: post.isPublished || false,
            tags: post.tags || [],
            category: post.category || "Swift",
            level: post.level || "Principiante",
            author: {
                id: post.author?.id || crypto.randomUUID(),
                name: post.author?.name || "Autor Anónimo", // Proporciona un valor por defecto
                username: post.author?.username,
                avatar: post.author?.avatar,
                bio: post.author?.bio,
                socialLinks: post.author?.socialLinks,
            },
            views: post.views || 0,
            likes: post.likes || 0,
            draft: post.draft || false,
            featured: post.featured || false,
            language: post.language || "es",
        };

        if (onSubmit) {
            onSubmit(updatedPost);
        } else {
            // Default behavior if no custom submit handler
            const storedPosts = localStorage.getItem("posts");
            let posts = storedPosts ? JSON.parse(storedPosts) : [];

            if (post.id) {
                // Update existing post
                posts = posts.map((p: Post) => (p.id === postId ? updatedPost : p));
            } else {
                // Add new post
                posts.push(updatedPost);
            }

            localStorage.setItem("posts", JSON.stringify(posts));
            router.push("/admin/posts");
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
        validateForm,
    };
};
