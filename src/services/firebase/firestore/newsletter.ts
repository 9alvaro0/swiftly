import { addDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase/config";

export async function subscribe(email: string, metadata = {}): Promise<void> {
    const subscribersRef = collection(db, "newsletterSubscribers");

    // Verificamos si ya existe el correo
    const q = query(subscribersRef, where("email", "==", email.toLowerCase().trim()));
    const querySnapshot = await getDocs(q);

    // Si ya está suscrito, manejamos el error o el estado
    if (!querySnapshot.empty) {
        throw new Error("Este correo ya está suscrito.");
    }

    // Si no está suscrito, lo agregamos
    await addDoc(subscribersRef, {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp(),
        isActive: true,
        metadata: {
            ...metadata,
            source: "website",
        },
    });
}
