// types/User.ts
export interface User {
    uid: string;
    email: string;
    emailVerified: boolean;
    username: string;
    name: string;
    firstName?: string;
    lastName?: string;
    photoURL?: string;
    bio?: string;
    location?: string;
    phone?: string;
    provider?: string;

    // Fechas importantes
    createdAt: Date;
    updatedAt: Date;
    lastLogin: Date;

    // Permisos y estado
    role: "admin" | "editor" | "author" | "user" | "guest"; // Rol en el sistema
    isActive: boolean; // Si la cuenta está activa
    isBanned: boolean; // Si la cuenta está suspendida

    // Estadísticas
    stats?: {
        likesCount: number;
        viewsCount: number;
    };

    // Social
    socialLinks?: {
        linkedin?: string;
        github?: string;
    };

    // Posts
    likedPosts?: string[];
}
