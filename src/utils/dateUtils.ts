import { Timestamp } from "firebase/firestore";

/**
 * Formatea una fecha que puede ser string, Date o Firestore Timestamp a formato legible en español
 * @param dateInput - Entrada de fecha (string, Date o Firestore Timestamp)
 * @returns Fecha formateada en formato largo (ej. "21 de abril de 2023")
 * @example
 * // Ejemplo de uso:
 * formatDate("2023-04-21") // => "21 de abril de 2023"
 * formatDate(new Date()) // => Fecha actual formateada
 * formatDate(firestoreTimestamp) // => Fecha de timestamp formateada
 */
export function formatDate(dateInput: string | Date | Timestamp): string {
    let date: Date;

    try {
        if (typeof dateInput === "string") {
            date = new Date(dateInput);
        } else if (dateInput instanceof Date) {
            date = dateInput;
        } else if (dateInput?.toDate instanceof Function) {
            // Para Firestore Timestamp
            date = dateInput.toDate();
        } else {
            throw new Error(`Formato de fecha no soportado: ${typeof dateInput}`);
        }

        if (isNaN(date.getTime())) {
            throw new Error(`Fecha inválida: ${dateInput}`);
        }

        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch (error) {
        console.error("Error al formatear fecha:", error);
        return "Fecha inválida";
    }
}
