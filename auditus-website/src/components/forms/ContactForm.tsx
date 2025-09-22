'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea } from '@/components/ui';
import { CheckIcon, AlertIcon } from '@/components/ui/Icon';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { CONTACT_INFO } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import type { FormState, FormErrors } from '@/types';

interface ContactFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialService = '', onSuccess }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: initialService ? `Consulta sobre ${initialService}` : '',
    message: '',
    preferredContact: 'whatsapp',
    consent: false
  });

  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: undefined,
    success: false
  });

  const [errors, setErrors] = useState<FormErrors<ContactFormData>>({});

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: unknown) {
      const fieldErrors: FormErrors<ContactFormData> = {};
      
      if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
        error.errors.forEach((err: { path: string[]; message: string }) => {
          const field = err.path[0] as keyof ContactFormData;
          fieldErrors[field] = err.message;
        });
      }
      
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState({ isLoading: true, error: undefined, success: false });

    try {
      // Simulate form submission - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, we'll redirect to WhatsApp as a fallback
      const whatsappMessage = `Hola, soy ${formData.name}.

Asunto: ${formData.subject}

${formData.message}

Preferencia de contacto: ${formData.preferredContact === 'email' ? 'Email' : formData.preferredContact === 'phone' ? 'Teléfono' : 'WhatsApp'}
Teléfono: ${formData.phone}
Email: ${formData.email}`;

      window.open(getWhatsAppUrl(CONTACT_INFO.whatsapp, whatsappMessage), '_blank');
      
      setFormState({ isLoading: false, error: undefined, success: true });
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          preferredContact: 'whatsapp',
          consent: false
        });
        setFormState({ isLoading: false, error: undefined, success: false });
        onSuccess?.();
      }, 3000);

    } catch {
      setFormState({ 
        isLoading: false, 
        error: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 
        success: false 
      });
    }
  };

  if (formState.success) {
    return (
      <div className="bg-green-50 dark:bg-green-50 border border-green-200 dark:border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon size="lg" className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-800 font-primary mb-2">
          ¡Mensaje enviado exitosamente!
        </h3>
        <p className="text-green-700 dark:text-green-700 font-secondary">
          Hemos redirigido tu consulta a WhatsApp. Te contactaremos pronto para coordinar tu cita.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formState.error && (
        <div className="bg-red-50 dark:bg-red-50 border border-red-200 dark:border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertIcon size="sm" className="text-red-500 mt-1 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-700 font-secondary text-sm">{formState.error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre completo"
          placeholder="Tu nombre completo"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
          error={errors.name}
          required
          disabled={formState.isLoading}
        />

        <Input
          label="Teléfono"
          type="tel"
          placeholder="+56 9 1234 5678"
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
          error={errors.phone}
          helperText="Formato chileno preferido"
          required
          disabled={formState.isLoading}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
        error={errors.email}
        required
        disabled={formState.isLoading}
      />

      <Input
        label="Asunto"
        placeholder="¿En qué te podemos ayudar?"
        value={formData.subject}
        onChange={(value) => handleInputChange('subject', value)}
        error={errors.subject}
        required
        disabled={formState.isLoading}
      />

      <Textarea
        label="Mensaje"
        placeholder="Cuéntanos más detalles sobre tu consulta..."
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        error={errors.message}
        required
        disabled={formState.isLoading}
        className="min-h-[120px]"
        maxLength={1000}
        showCharCount
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 font-secondary mb-3">
          Preferencia de contacto
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: 'whatsapp', label: 'WhatsApp', description: 'Respuesta rápida' },
            { value: 'phone', label: 'Teléfono', description: 'Llamada directa' },
            { value: 'email', label: 'Email', description: 'Respuesta formal' }
          ].map((option) => (
            <label
              key={option.value}
              className={`
                relative flex items-center p-4 border rounded-lg cursor-pointer transition-all
                ${formData.preferredContact === option.value 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                ${formState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input
                type="radio"
                name="preferredContact"
                value={option.value}
                checked={formData.preferredContact === option.value}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                disabled={formState.isLoading}
                className="sr-only"
              />
              <div className="flex-1 text-center">
                <div className="font-medium text-gray-900 font-secondary text-sm">
                  {option.label}
                </div>
                <div className="text-xs text-gray-500 font-secondary mt-1">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            disabled={formState.isLoading}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600 font-secondary">
            Acepto el tratamiento de mis datos personales para responder a mi consulta, 
            según la <span className="text-primary-600 underline">Política de Privacidad</span>
          </span>
        </label>
      </div>
      {errors.consent && (
        <p className="text-red-600 text-sm font-secondary">{errors.consent}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={formState.isLoading}
        disabled={formState.isLoading}
        className="w-full"
      >
        {formState.isLoading ? 'Enviando...' : 'Enviar Mensaje'}
      </Button>

      <p className="text-center text-sm text-gray-500 font-secondary">
        También puedes contactarnos directamente por{' '}
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="text-primary-600 hover:text-primary-700 transition-colors"
        >
          teléfono
        </a>{' '}
        o{' '}
        <a
          href={getWhatsAppUrl(CONTACT_INFO.whatsapp, '¡Hola! Me gustaría hacer una consulta')}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 transition-colors"
        >
          WhatsApp
        </a>
      </p>
    </form>
  );
};

export default ContactForm;