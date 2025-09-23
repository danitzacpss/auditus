import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactFormSchema } from '@/lib/validations';

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    const { name, email, phone, subject, message, preferredContact } = validatedData;

    // Send email to your business email
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'centroauditus@gmail.com',
      subject: `Nueva consulta: ${subject}`,
      text: `
Nueva Consulta - Centro Auditus

INFORMACIÓN DEL CLIENTE:
- Nombre: ${name}
- Email: ${email}
- Teléfono: ${phone}
- Preferencia de contacto: ${
        preferredContact === 'email' ? 'Email' :
        preferredContact === 'phone' ? 'Teléfono' : 'WhatsApp'
      }

ASUNTO: ${subject}

MENSAJE:
${message}

---
Este mensaje fue enviado desde el formulario de contacto de centroauditus.cl
Fecha: ${new Date().toLocaleString('es-CL')}
      `,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Confirmación de consulta recibida - Centro Auditus',
      text: `
¡Gracias por contactarnos!

Hola ${name},

Hemos recibido tu consulta sobre: ${subject}

¿QUÉ SIGUE?
• Nuestro equipo revisará tu consulta
• Te contactaremos en las próximas 2 horas
• Te ayudaremos a agendar tu cita

INFORMACIÓN DE CONTACTO:
• Teléfono: +56 9 5202 4377
• Email: centroauditus@gmail.com
• Dirección: Aníbal Pinto 486, Oficina 403, Concepción

Saludos cordiales,
Equipo Centro Auditus

---
Centro Auditus - Cuidado Auditivo Profesional
Este es un email automático, por favor no responder a esta dirección.
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado exitosamente'
    });

  } catch (error) {
    console.error('Error sending email:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}