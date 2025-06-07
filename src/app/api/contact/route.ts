import { type NextRequest, NextResponse } from "next/server";
import { emailService } from '@/services/email/emailService';

// Validation functions
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const validateInput = (data: unknown) => {
    // Type guard to ensure data is an object
    if (!data || typeof data !== 'object') {
        throw new Error('Datos inválidos');
    }
    
    const typedData = data as Record<string, unknown>;
    
    if (!typedData.name || typeof typedData.name !== 'string' || typedData.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio');
    }
    if (typedData.name.trim().length > 100) {
        throw new Error('El nombre debe tener máximo 100 caracteres');
    }
    
    if (!typedData.email || typeof typedData.email !== 'string' || !validateEmail(typedData.email)) {
        throw new Error('Email inválido');
    }
    if (typedData.email.length > 254) {
        throw new Error('Email demasiado largo');
    }
    
    if (!typedData.message || typeof typedData.message !== 'string' || typedData.message.trim().length === 0) {
        throw new Error('El mensaje es obligatorio');
    }
    if (typedData.message.trim().length > 5000) {
        throw new Error('El mensaje debe tener máximo 5000 caracteres');
    }
    
    // Sanitize inputs
    return {
        name: typedData.name.trim(),
        email: typedData.email.trim().toLowerCase(),
        message: typedData.message.trim()
    };
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, message } = validateInput(body);

        // Send notification to admin
        const adminResult = await emailService.sendContactFormNotification({
            name,
            email,
            subject: `Mensaje de contacto desde aprendeSwift`,
            message
        });

        // Send auto-reply to user
        const userResult = await emailService.sendContactFormAutoReply({
            name,
            email,
            subject: `Mensaje de contacto desde aprendeSwift`,
            message
        });

        // If email service is not configured, still return success
        if (!adminResult.success) {
            console.warn('Failed to send admin notification:', adminResult.error);
        }

        if (!userResult.success) {
            console.warn('Failed to send auto-reply:', userResult.error);
        }

        return NextResponse.json({ 
            message: "Mensaje enviado correctamente. Te responderemos pronto." 
        });

    } catch (err) {
        console.error("Validation or request error:", err);
        const errorMessage = err instanceof Error ? err.message : "Error en la solicitud";
        return NextResponse.json({ 
            error: errorMessage 
        }, { status: 400 });
    }
}