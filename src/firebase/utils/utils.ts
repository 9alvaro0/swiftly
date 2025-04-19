import { Timestamp } from "firebase/firestore";
import { Post } from "@/types/Post";

type PostWithDates = Omit<Post, "createdAt" | "updatedAt" | "publishedAt"> & {
    createdAt?: Date;
    updatedAt?: Date;
    publishedAt?: Date;
};

type PostWithTimestamps = Omit<Post, "createdAt" | "updatedAt" | "publishedAt"> & {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    publishedAt?: Timestamp;
};

export const convertDatesToTimestamps = (data: Partial<PostWithDates>): Partial<PostWithTimestamps> => {
    const { createdAt, updatedAt, publishedAt, ...rest } = data;
    const result: Partial<PostWithTimestamps> = { ...rest };

    if (createdAt instanceof Date) {
        result.createdAt = Timestamp.fromDate(createdAt);
    } else if (createdAt !== undefined) {
        result.createdAt = createdAt as Timestamp;
    }

    if (updatedAt instanceof Date) {
        result.updatedAt = Timestamp.fromDate(updatedAt);
    } else if (updatedAt !== undefined) {
        result.updatedAt = updatedAt as Timestamp;
    }

    if (publishedAt instanceof Date) {
        result.publishedAt = Timestamp.fromDate(publishedAt);
    } else if (publishedAt !== undefined) {
        result.publishedAt = publishedAt as Timestamp;
    }

    return result;
};

export const convertTimestampsToDates = (data: Partial<PostWithTimestamps>): Partial<PostWithDates> => {
    const { createdAt, updatedAt, publishedAt, ...rest } = data;
    const result: Partial<PostWithDates> = { ...rest };

    if (createdAt instanceof Timestamp) {
        result.createdAt = createdAt.toDate();
    }

    if (updatedAt instanceof Timestamp) {
        result.updatedAt = updatedAt.toDate();
    }

    if (publishedAt instanceof Timestamp) {
        result.publishedAt = publishedAt.toDate();
    }

    return result;
};
