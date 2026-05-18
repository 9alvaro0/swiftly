import { type NextRequest, NextResponse } from "next/server";
import { emailService } from '@/services/email/emailService';
import { isValidEmail } from '@/utils/validation';
import { getAdminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

const RATE_LIMIT_MINUTES = 5;

const validateInput = (data: unknown) => {
    if (!data || typeof data !== 'object') {
        throw new Error('Datos invalidos');
    }

    const typedData = data as Record<string, unknown>;

    if (!typedData.name || typeof typedData.name !== 'string' || typedData.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio');
    }
    if (typedData.name.trim().length > 100) {
        throw new Error('El nombre debe tener maximo 100 caracteres');
    }

    if (!typedData.email || typeof typedData.email !== 'string' || !isValidEmail(typedData.email)) {
        throw new Error('Email invalido');
    }

    if (!typedData.message || typeof typedData.message !== 'string' || typedData.message.trim().length === 0) {
        throw new Error('El mensaje es obligatorio');
    }
    if (typedData.message.trim().length > 5000) {
        throw new Error('El mensaje debe tener maximo 5000 caracteres');
    }

    return {
        name: typedData.name.trim(),
        email: typedData.email.trim().toLowerCase(),
        message: typedData.message.trim()
    };
};

/**
 * Check if this email has submitted a contact form in the last N minutes.
 * Uses Firestore as persistent rate limit store (works across serverless instances).
 */
async function isRateLimited(email: string): Promise<boolean> {
    const adminDb = await getAdminDb();
    if (!adminDb) return false; // If admin DB is unavailable, skip rate limiting

    const cutoff = new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000);
    const recentContacts = await adminDb
        .collection('contacts')
        .where('email', '==', email)
        .where('createdAt', '>', cutoff)
        .limit(1)
        .get();

    return !recentContacts.empty;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, message } = validateInput(body);

        // Rate limit: 1 message per email per 5 minutes (Firestore-backed, persistent)
        if (await isRateLimited(email)) {
            return NextResponse.json({
                error: 'Has enviado un mensaje recientemente. Por favor, espera unos minutos.'
            }, { status: 429 });
        }

        // Persist to Firestore FIRST (so messages are never lost even if email fails)
        const adminDb = await getAdminDb();
        if (adminDb) {
            await adminDb.collection('contacts').add({
                name,
                email,
                message,
                createdAt: FieldValue.serverTimestamp(),
                status: 'pending',
            });
        }

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
