// src/services/newsletterService.ts
class NewsletterService {
    async signup(email: string): Promise<void> {
        const response = await fetch("/api/newsletter/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Error al suscribirse");
        }

    }
}

export const newsletterService = new NewsletterService();
