import { FirebaseError } from "firebase/app";
import { logAuthEvent } from "./analytics";
import { toast } from "sonner";

type FirebaseErrorHandlerConfig = {
    showToast?: boolean;
    logAnalytics?: boolean;
};

/**
 * Maneja errores de Firebase y devuelve un mensaje amigable
 * @param error - Error a manejar (puede ser de tipo unknown)
 * @param context - Contexto donde ocurrió el error (opcional)
 * @param config - Configuración adicional (opcional)
 * @returns Mensaje de error traducido
 */
export const handleFirebaseError = (
    error: unknown,
    context?: string,
    config: FirebaseErrorHandlerConfig = { showToast: true, logAnalytics: true }
): string => {
    const defaultMessage = "Error desconocido. Por favor intenta nuevamente.";
    let message = defaultMessage;
    let code = "unknown";

    // Extraer información del error si es de Firebase
    if (error instanceof FirebaseError) {
        code = error.code;

        // Mapeo de códigos de error a mensajes amigables
        const errorMessages: Record<string, string> = {
            // Errores de autenticación
            "auth/email-already-in-use": "Este correo electrónico ya está registrado.",
            "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
            "auth/invalid-email": "El correo electrónico no es válido.",
            "auth/missing-email": "El correo electrónico es obligatorio.",
            "auth/user-not-found": "El correo electrónico no está registrado.",
            "auth/wrong-password": "La contraseña es incorrecta.",

            // Errores de inicio de sesión social
            "auth/account-exists-with-different-credential": "Esta cuenta ya existe con otro método de inicio.",
            "auth/popup-blocked": "Por favor, habilita las ventanas emergentes para iniciar sesión.",
            "auth/popup-closed-by-user": "Inicio de sesión cancelado.",
            "auth/unauthorized-domain": "Dominio no autorizado.",
            "auth/network-request-failed": "Error de red. Verifica tu conexión.",
            "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",

            // Errores de Firestore
            "permission-denied": "No tienes permisos para esta acción.",
            "not-found": "El recurso solicitado no existe.",
        };

        message = errorMessages[code] || defaultMessage;
    }

    // Loggear el error si está configurado
    if (config.logAnalytics) {
        logAuthEvent("auth_error", {
            errorCode: code,
            context: context || "unknown",
            errorMessage: message,
        });
    }

    // Mostrar toast si está configurado
    if (config.showToast) {
        toast.error(message);
    }

    return message;
};
