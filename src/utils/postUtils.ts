import { Post } from "@/types/Post";

/**
 * Genera un objeto Post con valores por defecto
 * @returns Objeto Post con valores iniciales
 */
export const getDefaultPost = (): Post => ({
    // Identificación
    id: crypto.randomUUID(),
    slug: "",

    // Contenido
    title: "",
    description: "",
    content: "",

    // Fechas y estado
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublished: false,

    // Categorización
    tags: [],
    level: "Principiante",
    type: "article",

    // Imágenes
    imageUrl: "",
    images: [],
    coverImage: "",

    // Estadísticas de lectura
    readTime: 0,
    wordCount: 0,

    // Autor
    author: {
        id: "",
        name: "",
        username: "",
        avatar: "",
        bio: "",
        socialLinks: {
            twitter: "",
            github: "",
            linkedin: "",
        },
    },

    // SEO
    keywords: [],
    metaDescription: "",

    // Relaciones
    relatedPosts: [],

    // Interacción
    views: 0,
    likedBy: [],
});

/**
 * Calcula el tiempo de lectura estimado en minutos
 * @param content - Contenido del post
 * @returns Tiempo estimado de lectura (redondeado a minutos enteros)
 */
export const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
};

/**
 * Genera un slug válido para URLs a partir de un título
 * @param title - Título del post
 * @returns Slug normalizado (ej. "mi-titulo-de-post")
 */
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

/**
 * Valida los datos mínimos requeridos para un post
 * @param post - Objeto Post a validar
 * @returns Objeto con { isValid: boolean, errors: string[] }
 */
export const validatePost = (post: Post): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!post.title?.trim()) errors.push("El título es obligatorio");
    if (!post.description?.trim()) errors.push("La descripción es obligatoria");
    if (!post.content?.trim()) errors.push("El contenido es obligatorio");
    if (!post.type) errors.push("El tipo de post es obligatorio");
    if (!post.level) errors.push("El nivel es obligatorio");
    if (!post.imageUrl?.trim()) errors.push("La URL de la imagen es obligatoria");
    if (!post.author?.name?.trim()) errors.push("El autor es obligatorio");

    return {
        isValid: errors.length === 0,
        errors,
    };
};

/**
 * Prepara un post para ser guardado, calculando campos derivados
 * @param post - Objeto Post a preparar
 * @returns Post listo para guardar
 */
export const preparePostForSave = (post: Post): Post => {
    return {
        ...post,
        wordCount: post.content.trim().split(/\s+/).length,
        readTime: calculateReadTime(post.content),
        updatedAt: new Date(),
        slug: post.slug || generateSlug(post.title),
    };
};
