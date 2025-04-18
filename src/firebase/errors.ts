import { FirebaseError } from "firebase/app";
import { logAuthError } from "./analytics";
import { toast } from "sonner";

export const handleFirebaseError = (error: unknown, context?: string): string => {
    let message = "Error desconocido. Por favor intenta nuevamente.";
    let code = "unknown";
    console.log("Error Context:", context);
    console.log("Error Details:", error);
    if (error instanceof FirebaseError) {
        code = error.code;
        console.log("Firebase Error Code:", code);
        console.log("Firebase Error Message:", error.message);
        switch (error.code) {
            // Errores de autenticación
            case "auth/email-already-in-use":
                message = "Este correo electrónico ya está registrado.";
                break;
            case "auth/weak-password":
                message = "La contraseña debe ser más fuerte.";
                break;
            case "auth/invalid-email":
                message = "El correo electrónico no es válido.";
                break;
            case "auth/missing-email":
                message = "El correo electrónico es obligatorio.";
                break;
            case "auth/user-not-found":
                message = "El correo electrónico no está registrado.";
                break;
            case "auth/wrong-password":
                message = "La contraseña es incorrecta.";
                break;

            // Errores de inicio de sesión social
            case "auth/account-exists-with-different-credential":
                message = "Esta cuenta ya existe con un método de inicio de sesión diferente.";
                break;
            case "auth/popup-blocked":
                message =
                    "La ventana emergente de inicio de sesión fue bloqueada. Por favor, habilite las ventanas emergentes.";
                break;
            case "auth/popup-closed-by-user":
                message = "Inicio de sesión cancelado por el usuario.";
                break;
            case "auth/unauthorized-domain":
                message = "Dominio no autorizado para inicio de sesión.";
                break;
            case "auth/network-request-failed":
                message = "Error de red. Por favor, compruebe su conexión a internet.";
                break;

            // Errores generales de red y autenticación
            case "auth/network-request-failed":
                message = "Error de red. Compruebe su conexión a internet.";
                break;
            case "auth/too-many-requests":
                message = "Demasiados intentos. Por favor, intente de nuevo más tarde.";
                break;

            default:
                message = "Ha ocurrido un error, por favor intenta de nuevo.";
                break;
        }
    }

    // Registrar el error para analytics
    logAuthError(code, context);

    // Mostrar toast de error
    toast.error(message);

    return message;
};
