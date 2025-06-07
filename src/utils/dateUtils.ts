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

/**
 * Safely converts a Firebase Timestamp or Date to a JavaScript Date
 */
export function toJSDate(dateValue: Date | Timestamp | undefined | null): Date {
    if (!dateValue) {
        return new Date();
    }
    
    if (dateValue instanceof Date) {
        return dateValue;
    }
    
    // Handle Firebase Timestamp
    if (dateValue && typeof dateValue === 'object' && 'toDate' in dateValue) {
        return (dateValue as Timestamp).toDate();
    }
    
    // Fallback
    return new Date();
}

/**
 * Formats a date for RSS feeds (RFC 2822 format)
 */
export function formatRssDate(date: Date | Timestamp | undefined | null): string {
    return toJSDate(date).toUTCString();
}

/**
 * Formats a date for Atom feeds (ISO 8601 format)
 */
export function formatAtomDate(date: Date | Timestamp | undefined | null): string {
    return toJSDate(date).toISOString();
}

/**
 * Gets the more recent of two dates, useful for determining last modified times
 */
export function getLatestDate(date1: Date | Timestamp | undefined | null, date2: Date | Timestamp | undefined | null): Date {
    const jsDate1 = toJSDate(date1);
    const jsDate2 = toJSDate(date2);
    
    return jsDate1 > jsDate2 ? jsDate1 : jsDate2;
}

/**
 * Creates an excerpt from content, removing HTML tags
 */
export function createExcerpt(content: string, maxLength: number = 300): string {
    // Basic HTML tag removal
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
        return textContent;
    }
    
    const truncated = textContent.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > 0) {
        return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
}

/**
 * Escapes XML special characters for safe inclusion in XML documents
 */
export function escapeXml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
