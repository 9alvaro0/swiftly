import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase/config";

// 1. Servicio básico para suscripciones
export const newsletterService = {
    async subscribe(email: string, metadata = {}): Promise<void> {
        const subscribersRef = collection(db, "newsletterSubscribers");

        await addDoc(subscribersRef, {
            email: email.toLowerCase().trim(),
            createdAt: serverTimestamp(),
            isActive: true,
            metadata: {
                ...metadata,
                source: "website",
            },
        });
    },
};

// Función que usarás en tu hook
export const signup = newsletterService.subscribe;
