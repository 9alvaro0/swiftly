/**
 * Interfaz que representa un suscriptor a newsletter en el sistema
 */
export default interface NewsletterSubscriber {
    email: string;
    createdAt: Date;
    isActive: boolean;
    lastEmailSent?: Date;
    metadata?: {
        ip?: string;
        userAgent?: string;
        source?: string;
    };
}
