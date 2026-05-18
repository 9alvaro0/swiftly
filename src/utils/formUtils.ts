// src/utils/formUtils.ts

// Verifica si el correo electrónico está presente (no vacío)
export const validateEmail = (email: string): boolean => {
    return email.trim() !== ""; // Devuelve true si el email NO está vacío
};

// Verifica si el formato del correo electrónico es válido
export const validateEmailFormat = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
