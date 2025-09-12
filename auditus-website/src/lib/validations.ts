import { z } from 'zod';

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: z
    .string()
    .email('Ingrese un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 caracteres')
    .regex(/^[+]?[\d\s-()]+$/, 'Formato de teléfono inválido'),
  
  subject: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(200, 'El asunto no puede exceder 200 caracteres'),
  
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  
  preferredContact: z
    .enum(['email', 'phone', 'whatsapp'])
    .optional(),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Debe aceptar el tratamiento de datos personales')
});

// Appointment Form Schema
export const appointmentFormSchema = z.object({
  service: z
    .string()
    .min(1, 'Debe seleccionar un servicio'),
  
  date: z
    .string()
    .min(1, 'Debe seleccionar una fecha')
    .refine(date => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, 'La fecha debe ser hoy o posterior'),
  
  time: z
    .string()
    .min(1, 'Debe seleccionar una hora')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido'),
  
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 caracteres')
    .regex(/^[+]?[\d\s-()]+$/, 'Formato de teléfono inválido'),
  
  email: z
    .string()
    .email('Ingrese un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  message: z
    .string()
    .max(500, 'El mensaje no puede exceder 500 caracteres')
    .optional(),
});

// Newsletter Schema
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Ingrese un email válido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  consent: z
    .boolean()
    .refine(val => val === true, 'Debe aceptar recibir comunicaciones')
});

// Chilean phone validation helper
export const validateChileanPhone = (phone: string): boolean => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Chilean mobile numbers: +56 9 XXXX XXXX (start with 9)
  // Chilean landline numbers: +56 XX XXX XXXX (area codes 2, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 55, 57, 58, 61, 63, 64, 65, 67, 71, 72, 73, 75)
  
  if (cleanPhone.startsWith('56')) {
    // International format
    const nationalPart = cleanPhone.substring(2);
    return nationalPart.startsWith('9') && nationalPart.length === 9; // Mobile
  } else if (cleanPhone.startsWith('9') && cleanPhone.length === 9) {
    // National mobile format
    return true;
  } else if (cleanPhone.length === 8 || cleanPhone.length === 9) {
    // Landline format
    return true;
  }
  
  return false;
};

// Custom Chilean phone validation schema
export const chileanPhoneSchema = z
  .string()
  .min(8, 'El teléfono debe tener al menos 8 dígitos')
  .max(15, 'El teléfono no puede exceder 15 caracteres')
  .refine(validateChileanPhone, 'Formato de teléfono chileno inválido');

// Export types
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type AppointmentFormData = z.infer<typeof appointmentFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;