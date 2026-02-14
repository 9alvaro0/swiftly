import { type NextRequest, NextResponse } from "next/server";
import { emailService } from '@/services/email/emailService';
import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name } = body;

        // Basic validation
        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Email es requerido' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Verify subscription exists in Firestore and is recent
        const adminDb = await getAdminDb();
        if (!adminDb) {
            console.error('Admin database not initialized');
            return NextResponse.json(
                { error: 'Servicio no disponible' },
                { status: 503 }
            );
        }

        const subscribersSnapshot = await adminDb
            .collection('newsletterSubscribers')
            .where('email', '==', normalizedEmail)
            .where('isActive', '==', true)
            .limit(1)
            .get();

        // Unified error response to prevent email enumeration
        if (subscribersSnapshot.empty) {
            return NextResponse.json(
                { message: 'Procesado' },
                { status: 200 }
            );
        }

        const subscriberData = subscribersSnapshot.docs[0].data();
        const createdAt = subscriberData.createdAt?.toDate?.() || subscriberData.createdAt;

        if (createdAt) {
            const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
            if (new Date(createdAt) < fiveMinutesAgo) {
                // Same response to prevent timing enumeration
                return NextResponse.json(
                    { message: 'Procesado' },
                    { status: 200 }
                );
            }
        }

        // Sanitize name: trim and limit to 100 chars
        const sanitizedName = typeof name === 'string' ? name.trim().slice(0, 100) : undefined;

        // Send welcome email
        const result = await emailService.sendNewsletterWelcome({
            email: normalizedEmail,
            name: sanitizedName || undefined
        });

        if (!result.success) {
            console.error('Failed to send welcome email:', result.error);
            return NextResponse.json(
                { error: 'Error al enviar email de bienvenida' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Email de bienvenida enviado' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error in newsletter welcome:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
