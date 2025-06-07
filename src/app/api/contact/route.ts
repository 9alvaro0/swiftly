import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

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

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    // Formatea la fecha actual para el correo
    const currentDate = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    // Sanitiza el mensaje para evitar inyección HTML
    const sanitizeHtml = (text: string) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/\n/g, "<br>");
    };

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: process.env.MY_EMAIL,
        subject: `Nuevo mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px;">
                <!-- Encabezado -->
                <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Nuevo Mensaje de Contacto</h1>
                </div>
                
                <!-- Contenido -->
                <div style="padding: 30px;">
                    <div style="background-color: #f0f4f8; border-left: 4px solid #6366f1; padding: 15px; margin-bottom: 25px; border-radius: 0 4px 4px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 16px;">Tienes un nuevo mensaje del formulario de contacto de tu sitio web.</p>
                    </div>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600; width: 120px;">Nombre:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${sanitizeHtml(name)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: 600;">Email:</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                                <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; font-weight: 600; vertical-align: top;">Mensaje:</td>
                            <td style="padding: 12px 0;"></td>
                        </tr>
                    </table>
                    
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin-bottom: 25px; line-height: 1.6; font-size: 15px;">
                        ${sanitizeHtml(message)}
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="mailto:${email}" style="display: inline-block; background-color: #6366f1; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 16px;">Responder ahora</a>
                    </div>
                </div>
                
                <!-- Pie de página -->
                <div style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">
                    <p style="margin: 0 0 10px 0;">Este mensaje fue enviado el ${currentDate}</p>
                    <p style="margin: 0;">© ${new Date().getFullYear()} Tu Sitio Web. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
        `,
        replyTo: email,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve("Email sent");
                } else {
                    reject(err.message);
                }
            });
        });

        try {
            await sendMailPromise();
            return NextResponse.json({ message: "Email sent" });
        } catch (err) {
            console.error("Error sending email:", err);
            return NextResponse.json({ error: "Error al enviar el email" }, { status: 500 });
        }
    } catch (err) {
        console.error("Validation or request error:", err);
        const errorMessage = err instanceof Error ? err.message : "Error en la solicitud";
        return NextResponse.json({ 
            error: errorMessage 
        }, { status: 400 });
    }
}
