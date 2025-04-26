// firebase/analytics.ts
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { app } from "@/services/firebase/config";

let analytics: ReturnType<typeof getAnalytics>;

/**
 * Inicializa Firebase Analytics si es compatible con el entorno
 */
const initializeAnalytics = async (): Promise<void> => {
    if (typeof window === "undefined") return;

    try {
        const supported = await isSupported();
        if (supported) {
            analytics = getAnalytics(app);
            console.log("Firebase Analytics inicializado");
        }
    } catch (error) {
        console.error("Error inicializando Analytics:", error);
    }
};

// Inicialización automática al cargar el módulo
initializeAnalytics();

// Definimos un tipo para los parámetros de evento permitidos
type AnalyticsEventParams = {
    [key: string]: string | number | boolean | Date | null | undefined;
};

/**
 * Registra un evento personalizado en Analytics
 * @param eventName - Nombre del evento a registrar
 * @param eventParams - Parámetros adicionales del evento
 */
export const logAnalyticsEvent = <T extends AnalyticsEventParams>(eventName: string, eventParams?: T): void => {
    if (!analytics) {
        console.warn(`Analytics no disponible - Evento no registrado: ${eventName}`);
        return;
    }

    try {
        // Convertimos Date a string ISO para asegurar compatibilidad
        const processedParams = eventParams
            ? Object.fromEntries(
                  Object.entries(eventParams).map(([key, value]) => [
                      key,
                      value instanceof Date ? value.toISOString() : value,
                  ])
              )
            : undefined;

        logEvent(analytics, eventName, processedParams);
    } catch (error) {
        console.error(`Error registrando evento ${eventName}:`, error);
    }
};

// Definimos un tipo específico para los eventos de autenticación
type AuthEventParams = {
    userId?: string;
    errorCode?: string;
    method?: string;
    context?: string;
    errorMessage?: string;
    timestamp?: string;
};

/**
 * Registra eventos de autenticación
 * @param eventType - Tipo de evento de auth
 * @param params - Parámetros del evento
 */
export const logAuthEvent = (eventType: "sign_in" | "sign_out" | "auth_error", params: AuthEventParams = {}): void => {
    logAnalyticsEvent(`auth_${eventType}`, {
        ...params,
        timestamp: params.timestamp || new Date().toISOString(),
    });
};
/**
 * Registra errores de la aplicación
 * @param error - Objeto Error o mensaje de error
 * @param context - Contexto donde ocurrió el error
 */
export const logError = (error: unknown, context: string = "unknown"): void => {
    const errorMessage = error instanceof Error ? error.message : String(error);

    logAnalyticsEvent("app_error", {
        error: errorMessage,
        context,
        timestamp: new Date().toISOString(),
    });
};
