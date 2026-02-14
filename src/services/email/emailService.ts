// src/services/email/emailService.ts

import sgMail, { MailDataRequired } from '@sendgrid/mail';

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, unknown>;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
  name?: string;
}

const escapeHtml = (text: string): string =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

class EmailService {
  private fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@aprendeswift.dev';
  private fromName = process.env.SENDGRID_FROM_NAME || 'aprendeSwift';
  private contactEmail = process.env.CONTACT_EMAIL || 'contacto@aprendeswift.dev';

  /**
   * Send a generic email
   */
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; error?: string }> {
    try {
      if (!process.env.SENDGRID_API_KEY) {
        console.warn('SendGrid API key not configured, email not sent');
        return { success: false, error: 'Email service not configured' };
      }

      const msg = {
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        ...emailData
      };

      await sgMail.send(msg as MailDataRequired);
      return { success: true };
      
    } catch (error) {
      console.error('Error sending email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Send contact form notification to admin
   */
  async sendContactFormNotification(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    const emailData: EmailData = {
      to: this.contactEmail,
      subject: `Nuevo mensaje de contacto: ${data.subject}`,
      html: `
        <h2>Nuevo mensaje de contacto desde aprendeSwift</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${escapeHtml(data.message).replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Este mensaje fue enviado desde el formulario de contacto de aprendeSwift.dev
        </p>
      `,
      text: `
        Nuevo mensaje de contacto desde aprendeSwift
        
        Nombre: ${data.name}
        Email: ${data.email}
        Asunto: ${data.subject}
        
        Mensaje:
        ${data.message}
        
        ---
        Este mensaje fue enviado desde el formulario de contacto de aprendeSwift.dev
      `
    };

    return this.sendEmail(emailData);
  }

  /**
   * Send auto-reply to contact form sender
   */
  async sendContactFormAutoReply(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    const emailData: EmailData = {
      to: data.email,
      subject: 'Hemos recibido tu mensaje - aprendeSwift',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #007AFF;">¡Gracias por contactarnos!</h2>
          
          <p>Hola ${escapeHtml(data.name)},</p>

          <p>Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en menos de 24 horas.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Resumen de tu mensaje:</h3>
            <p><strong>Asunto:</strong> ${escapeHtml(data.subject)}</p>
            <p><strong>Mensaje:</strong> ${escapeHtml(data.message)}</p>
          </div>
          
          <p>Mientras tanto, puedes:</p>
          <ul>
            <li>Explorar nuestros <a href="https://aprendeswift.dev/posts" style="color: #007AFF;">últimos artículos</a></li>
            <li>Seguir nuestros <a href="https://aprendeswift.dev/tutorials" style="color: #007AFF;">tutoriales</a></li>
            <li>Unirte a nuestra newsletter para recibir contenido exclusivo</li>
          </ul>
          
          <p>¡Gracias por ser parte de la comunidad aprendeSwift!</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>Saludos,<br>El equipo de aprendeSwift</p>
            <p><a href="https://aprendeswift.dev" style="color: #007AFF;">aprendeswift.dev</a></p>
          </div>
        </div>
      `,
      text: `
        ¡Gracias por contactarnos!
        
        Hola ${data.name},
        
        Hemos recibido tu mensaje y te responderemos lo antes posible, normalmente en menos de 24 horas.
        
        Resumen de tu mensaje:
        Asunto: ${data.subject}
        Mensaje: ${data.message}
        
        Mientras tanto, puedes explorar nuestros artículos y tutoriales en aprendeswift.dev
        
        ¡Gracias por ser parte de la comunidad aprendeSwift!
        
        Saludos,
        El equipo de aprendeSwift
        https://aprendeswift.dev
      `
    };

    return this.sendEmail(emailData);
  }

  /**
   * Send welcome email for newsletter signup
   */
  async sendNewsletterWelcome(data: NewsletterData): Promise<{ success: boolean; error?: string }> {
    const name = data.name || 'Desarrollador';
    
    const emailData: EmailData = {
      to: data.email,
      subject: '¡Bienvenido a la newsletter de aprendeSwift! 🚀',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #007AFF 0%, #0056b3 100%); color: white;">
            <h1 style="margin: 0; font-size: 32px;">¡Bienvenido a aprendeSwift! 🎉</h1>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 18px;">¡Hola ${escapeHtml(name)}!</p>
            
            <p>Te damos la bienvenida a la newsletter de <strong>aprendeSwift</strong>, donde cada semana compartimos:</p>
            
            <ul style="line-height: 1.8;">
              <li>📱 <strong>Tutoriales prácticos</strong> de desarrollo iOS</li>
              <li>💡 <strong>Tips y trucos</strong> para mejorar tu código Swift</li>
              <li>🆕 <strong>Novedades</strong> del ecosistema Apple</li>
              <li>🔧 <strong>Herramientas</strong> que te harán más productivo</li>
              <li>📚 <strong>Recursos exclusivos</strong> para suscriptores</li>
            </ul>
            
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 30px 0; border-left: 4px solid #007AFF;">
              <h3 style="margin-top: 0; color: #007AFF;">¿Qué puedes hacer ahora?</h3>
              <p style="margin-bottom: 0;">Explora nuestro contenido más popular y comienza tu viaje en el desarrollo iOS:</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://aprendeswift.dev/posts" 
                 style="display: inline-block; background: #007AFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Explorar Artículos
              </a>
            </div>
            
            <p>¡Gracias por unirte a nuestra comunidad de desarrolladores iOS!</p>
            
            <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #eee;">
              <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
                Si tienes alguna pregunta o sugerencia, no dudes en responder a este email.
              </p>
              <p style="color: #666; font-size: 14px; margin-bottom: 0;">
                ¡Feliz coding! 🚀<br>
                El equipo de aprendeSwift
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        ¡Bienvenido a aprendeSwift! 🎉
        
        ¡Hola ${name}!
        
        Te damos la bienvenida a la newsletter de aprendeSwift, donde cada semana compartimos:
        
        • Tutoriales prácticos de desarrollo iOS
        • Tips y trucos para mejorar tu código Swift  
        • Novedades del ecosistema Apple
        • Herramientas que te harán más productivo
        • Recursos exclusivos para suscriptores
        
        Explora nuestro contenido en: https://aprendeswift.dev/posts
        
        ¡Gracias por unirte a nuestra comunidad de desarrolladores iOS!
        
        ¡Feliz coding! 🚀
        El equipo de aprendeSwift
        https://aprendeswift.dev
      `
    };

    return this.sendEmail(emailData);
  }

  /**
   * Send notification about new post to subscribers (for future use)
   */
  async sendNewPostNotification(
    subscribers: string[], 
    postTitle: string, 
    postUrl: string, 
    postExcerpt: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const emails = subscribers.map(email => ({
        to: email,
        from: {
          email: this.fromEmail,
          name: this.fromName
        },
        subject: `Nuevo artículo: ${postTitle}`,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h2 style="color: #007AFF;">Nuevo artículo en aprendeSwift</h2>
            <h3>${escapeHtml(postTitle)}</h3>
            <p>${escapeHtml(postExcerpt)}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${postUrl}" 
                 style="display: inline-block; background: #007AFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px;">
                Leer Artículo
              </a>
            </div>
            <p style="color: #666; font-size: 12px;">
              Has recibido este email porque estás suscrito a la newsletter de aprendeSwift.
            </p>
          </div>
        `
      }));

      await sgMail.send(emails);
      return { success: true };
      
    } catch (error) {
      console.error('Error sending newsletter:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export const emailService = new EmailService();