import { type NextRequest, NextResponse } from "next/server";
import { emailService } from '@/services/email/emailService';

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

        // Send welcome email
        const result = await emailService.sendNewsletterWelcome({
            email: email.trim().toLowerCase(),
            name: name || undefined
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