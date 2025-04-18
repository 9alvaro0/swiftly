// firebase/analytics.ts
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { app } from "@/firebase/config";

let analytics: ReturnType<typeof getAnalytics> | undefined;

const checkAnalyticsSupport = async () => {
    if (typeof window !== "undefined" && (await isSupported())) {
        analytics = getAnalytics(app);
    }
};

// Llamada para verificar la compatibilidad con Analytics
checkAnalyticsSupport();

// Función para registrar eventos
export const logUserEvent = (eventName: string, userId: string): void => {
    if (analytics) {
        logEvent(analytics, eventName, { userId });
    } else {
        console.log(`Analytics not supported: Unable to log ${eventName}`);
    }
};

export const logAuthError = (errorCode: string, context?: string): void => {
    if (analytics) {
        logEvent(analytics, "auth_error", {
            errorCode,
            context: context || "unknown",
        });
    } else {
        console.log(`Analytics not supported: auth_error -> ${errorCode} [${context}]`);
    }
};
