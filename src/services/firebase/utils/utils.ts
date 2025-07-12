import { Timestamp } from "firebase/firestore";
import { Post } from "@/types/Post";

/**
 * Tipo genérico para objetos con fechas comunes como Date
 */
type WithDates<T> = Omit<T, "createdAt" | "updatedAt" | "lastLogin"> & {
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
};

/**
 * Tipo genérico para objetos con fechas comunes como Timestamp
 */
type WithTimestamps<T> = Omit<T, "createdAt" | "updatedAt" | "lastLogin"> & {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    lastLogin?: Timestamp;
};

/**
 * Convierte fechas Date a Timestamps de Firestore
 * @param data - Objeto con fechas Date
 * @returns Objeto con Timestamps
 */
export const convertDatesToTimestamps = <T>(data: WithDates<T>): WithTimestamps<T> => {
    const result = { ...data } as unknown as WithTimestamps<T>;

    if (data.createdAt) {
        result.createdAt = Timestamp.fromDate(data.createdAt);
    }

    if (data.updatedAt) {
        result.updatedAt = Timestamp.fromDate(data.updatedAt);
    }

    // Solo convertimos lastLogin si existe en el objeto original
    if ("lastLogin" in data && data.lastLogin) {
        result.lastLogin = Timestamp.fromDate(data.lastLogin);
    }

    return result;
};

/**
 * Convierte Timestamps de Firestore a fechas Date
 * @param data - Objeto con Timestamps
 * @returns Objeto con fechas Date
 */
export const convertTimestampsToDates = <T>(data: WithTimestamps<T>): WithDates<T> => {
    const result = { ...data } as unknown as WithDates<T>;

    if (data.createdAt) {
        result.createdAt = data.createdAt.toDate();
    }

    if (data.updatedAt) {
        result.updatedAt = data.updatedAt.toDate();
    }

    // Solo convertimos lastLogin si existe en el objeto original
    if ("lastLogin" in data && data.lastLogin) {
        result.lastLogin = data.lastLogin.toDate();
    }

    return result;
};

/**
 * Serializa datos de Firestore para pasar a Client Components
 * Convierte Timestamps a strings para evitar errores de serialización
 * @param data - Objeto con posibles Timestamps
 * @returns Objeto serializado seguro para Client Components
 */
export const serializeFirestoreData = <T extends Record<string, unknown>>(data: T): T => {
    if (!data) return data;
    
    const serialized = { ...data };
    
    // Función recursiva para manejar objetos anidados
    const serializeValue = (value: unknown): unknown => {
        if (value === null || value === undefined) {
            return value;
        }
        
        // Si es un Timestamp, convertir a Date
        if (value instanceof Timestamp) {
            return value.toDate();
        }
        
        // Si es un objeto que parece un Timestamp serializado
        if (typeof value === 'object' && value !== null && 'seconds' in value && 'nanoseconds' in value) {
            const timestampLike = value as { seconds: number; nanoseconds: number };
            return new Date(timestampLike.seconds * 1000);
        }
        
        // Si es un objeto, serializar recursivamente
        if (typeof value === 'object' && !Array.isArray(value)) {
            const serializedObj: Record<string, unknown> = {};
            for (const [key, val] of Object.entries(value)) {
                serializedObj[key] = serializeValue(val);
            }
            return serializedObj;
        }
        
        // Si es un array, serializar cada elemento
        if (Array.isArray(value)) {
            return value.map(serializeValue);
        }
        
        // Valores primitivos
        return value;
    };
    
    // Serializar todas las propiedades del objeto principal
    for (const [key, value] of Object.entries(serialized)) {
        serialized[key] = serializeValue(value);
    }
    
    return serialized;
};

/**
 * Serializa específicamente un Post para pasar a Client Components
 * @param post - Post con posibles Timestamps
 * @returns Post serializado
 */
export const serializePost = (post: Post): Post => {
    return serializeFirestoreData(post);
};
