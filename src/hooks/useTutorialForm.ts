import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tutorial } from "@/types/Tutorial";

interface TutorialFormOptions {
    defaultValues?: Partial<Tutorial>;
    onSubmit?: (tutorial: Tutorial) => void;
}

export const useTutorialForm = ({ defaultValues = {}, onSubmit }: TutorialFormOptions = {}) => {
    const router = useRouter();
    
    const [tutorial, setTutorial] = useState<Partial<Tutorial>>(defaultValues);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const addImageToTutorial = (imageUrl: string) => {
        // Añadir URL a las imágenes del tutorial
        setTutorial(prev => ({
            ...prev,
            images: [...(prev.images || []), imageUrl]
        }));

        // Añadir URL a las imágenes subidas
        setUploadedImages(prev => [...prev, imageUrl]);
    };

    const insertImageInContent = (imageUrl: string) => {
        const markdownImage = `\n![Imagen Tutorial](${imageUrl})\n`;
        setTutorial(prev => ({
            ...prev,
            content: (prev.content || "") + markdownImage
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!tutorial.title?.trim()) newErrors.title = "El título es obligatorio";
        if (!tutorial.description?.trim()) newErrors.description = "La descripción es obligatoria";
        if (!tutorial.content?.trim()) newErrors.content = "El contenido es obligatorio";
        if (!tutorial.imageUrl?.trim()) newErrors.imageUrl = "La URL de la imagen es obligatoria";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setTutorial((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof Partial<Tutorial>] as Record<string, any>),
                    [child]: value,
                },
            }));
        } else {
            setTutorial((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const date = new Date().toISOString();

        const tutorialId = tutorial.id || Date.now().toString();

        const updatedTutorial: Tutorial = {
            ...(tutorial as Tutorial),
            id: tutorialId,
            date,
            slug:
                tutorial.title
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "") || "",
            readTime: Math.ceil(((tutorial.content?.length || 0) / 1000) * 5),
            isPublished: tutorial.isPublished || false,
            tags: tutorial.tags || [],
        };

        if (onSubmit) {
            onSubmit(updatedTutorial);
        } else {
            // Default behavior if no custom submit handler
            const storedTutorials = localStorage.getItem("tutorials");
            let tutorials = storedTutorials ? JSON.parse(storedTutorials) : [];

            if (tutorial.id) {
                // Update existing tutorial
                tutorials = tutorials.map((t: Tutorial) => (t.id === tutorialId ? updatedTutorial : t));
            } else {
                // Add new tutorial
                tutorials.push(updatedTutorial);
            }

            localStorage.setItem("tutorials", JSON.stringify(tutorials));
            router.push("/admin/tutorials");
        }
    };

    const addTag = (tag: string) => {
        if (tag && !tutorial.tags?.includes(tag)) {
            setTutorial((prev) => ({
                ...prev,
                tags: [...(prev.tags || []), tag],
            }));
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTutorial((prev) => ({
            ...prev,
            tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
        }));
    };

    return {
        tutorial,
        setTutorial,
        errors,
        uploadedImages,
        setUploadedImages,
        addImageToTutorial,
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
