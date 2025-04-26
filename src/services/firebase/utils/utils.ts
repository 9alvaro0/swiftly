import { Timestamp } from "firebase/firestore";

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
