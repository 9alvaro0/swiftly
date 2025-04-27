// types/User.ts

/**
 * Tipos relacionados con usuarios del sistema
 */

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
    role: "admin" | "editor" | "author" | "user" | "guest";
    isActive: boolean;
    isBanned: boolean;

    // Estadísticas
    stats: UserStats;

    // Social
    socialLinks?: {
        linkedin?: string;
        github?: string;
    };
}

export interface UserStats {
    views: string[];
    likes: string[];
}
