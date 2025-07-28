/**
 * Tipos relacionados con etiquetas
 */

export interface Tag {
    id: string;
    name: string;
    description?: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    postCount?: number;
}
