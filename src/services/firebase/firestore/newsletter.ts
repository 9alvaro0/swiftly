import { addDoc, collection, query, where, getDocs, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase/config";

// Validar formato de email
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function subscribe(email: string, metadata = {}): Promise<void> {
    try {
        // Validaciones de entrada
        if (!email || typeof email !== 'string') {
            throw new Error("Email is required and must be a string");
        }
        
        const normalizedEmail = email.toLowerCase().trim();
        
        if (!isValidEmail(normalizedEmail)) {
            throw new Error("Invalid email format");
        }
        
        const subscribersRef = collection(db, "newsletterSubscribers");

        // Verificamos si ya existe el correo
        const q = query(subscribersRef, where("email", "==", normalizedEmail));
        const querySnapshot = await getDocs(q);

        // Si ya está suscrito, manejamos el error o el estado
        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const existingData = existingDoc.data();
            
            // Si el documento existe pero está inactivo, lo reactivamos
            if (existingData.isActive === false) {
                await updateDoc(doc(subscribersRef, existingDoc.id), {
                    isActive: true,
                    reactivatedAt: serverTimestamp(),
                    metadata: {
                        ...existingData.metadata,
                        ...metadata,
                        source: "website",
                        reactivated: true,
                    },
                });
                console.log(`Newsletter subscription reactivated for: ${normalizedEmail}`);
                return;
            }
            
            console.log(`Email already subscribed: ${normalizedEmail}`);
            throw new Error("Este correo ya está suscrito.");
        }

        // Si no está suscrito, lo agregamos
        await addDoc(subscribersRef, {
            email: normalizedEmail,
            createdAt: serverTimestamp(),
            isActive: true,
            metadata: {
                ...metadata,
                source: "website",
            },
        });
        
        console.log(`Newsletter subscription created for: ${normalizedEmail}`);
    } catch (error) {
        console.error(`Error subscribing to newsletter (${email}):`, error);
        
        // Re-throw validation errors as-is
        if (error instanceof Error && (
            error.message.includes("Email is required") ||
            error.message.includes("Invalid email format") ||
            error.message.includes("ya está suscrito")
        )) {
            throw error;
        }
        
        // Wrap other errors
        throw new Error(`Failed to subscribe to newsletter: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Función para desuscribirse del newsletter
export async function unsubscribe(email: string): Promise<void> {
    try {
        if (!email || typeof email !== 'string') {
            throw new Error("Email is required and must be a string");
        }
        
        const normalizedEmail = email.toLowerCase().trim();
        
        if (!isValidEmail(normalizedEmail)) {
            throw new Error("Invalid email format");
        }
        
        const subscribersRef = collection(db, "newsletterSubscribers");
        const q = query(subscribersRef, where("email", "==", normalizedEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Email not found in newsletter subscribers");
        }

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
            isActive: false,
            unsubscribedAt: serverTimestamp(),
        });
        
        console.log(`Newsletter unsubscription processed for: ${normalizedEmail}`);
    } catch (error) {
        console.error(`Error unsubscribing from newsletter (${email}):`, error);
        throw new Error(`Failed to unsubscribe from newsletter: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Función para obtener el estado de suscripción
export async function getSubscriptionStatus(email: string): Promise<{ isSubscribed: boolean; isActive: boolean } | null> {
    try {
        if (!email || typeof email !== 'string') {
            throw new Error("Email is required and must be a string");
        }
        
        const normalizedEmail = email.toLowerCase().trim();
        
        if (!isValidEmail(normalizedEmail)) {
            throw new Error("Invalid email format");
        }
        
        const subscribersRef = collection(db, "newsletterSubscribers");
        const q = query(subscribersRef, where("email", "==", normalizedEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return { isSubscribed: false, isActive: false };
        }

        const docData = querySnapshot.docs[0].data();
        
        // Explicitly handle the isActive field - ensure it's a boolean
        const isActive = Boolean(docData.isActive);
        
        return {
            isSubscribed: true,
            isActive: isActive
        };
    } catch (error) {
        console.error(`Error getting subscription status (${email}):`, error);
        // Return null as fallback
        return null;
    }
}

// Función para alternar el estado de suscripción
export async function toggleSubscriptionStatus(subscriberId: string, currentStatus: boolean): Promise<void> {
    try {
        if (!subscriberId || typeof subscriberId !== 'string') {
            throw new Error("Subscriber ID is required and must be a string");
        }
        
        const subscriberRef = doc(db, "newsletterSubscribers", subscriberId);
        
        await updateDoc(subscriberRef, {
            isActive: !currentStatus,
            updatedAt: serverTimestamp(),
            ...(currentStatus ? { deactivatedAt: serverTimestamp() } : { reactivatedAt: serverTimestamp() })
        });
        
        console.log(`Newsletter subscription status toggled for subscriber: ${subscriberId}`);
    } catch (error) {
        console.error(`Error toggling subscription status (${subscriberId}):`, error);
        throw new Error(`Failed to toggle subscription status: ${error instanceof Error ? error.message : String(error)}`);
    }
}
