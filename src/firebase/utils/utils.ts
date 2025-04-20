import { Timestamp } from "firebase/firestore";

/**
 * Tipo genérico para objetos con fechas como Date
 */
type WithDates<T> = Omit<T, "createdAt" | "updatedAt"> & {
    createdAt?: Date;
    updatedAt?: Date;
};

/**
 * Tipo genérico para objetos con fechas como Timestamp
 */
type WithTimestamps<T> = Omit<T, "createdAt" | "updatedAt"> & {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
};

/**
 * Convierte fechas Date a Timestamps de Firestore
 * @param data - Objeto con fechas Date
 * @returns Objeto con Timestamps
 */
export const convertDatesToTimestamps = <T>(data: WithDates<T>): WithTimestamps<T> => {
    return {
        ...data,
        createdAt: data.createdAt ? Timestamp.fromDate(data.createdAt) : undefined,
        updatedAt: data.updatedAt ? Timestamp.fromDate(data.updatedAt) : undefined,
    };
};

/**
 * Convierte Timestamps de Firestore a fechas Date
 * @param data - Objeto con Timestamps
 * @returns Objeto con fechas Date
 */
export const convertTimestampsToDates = <T>(data: WithTimestamps<T>): WithDates<T> => {
    return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
    };
};
