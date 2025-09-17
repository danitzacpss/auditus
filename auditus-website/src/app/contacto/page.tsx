import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Card, Button } from '@/components/ui';
import { PhoneIcon, EmailIcon, LocationIcon, ClockIcon, WhatsAppIcon, InstagramIcon, FacebookIcon } from '@/components/ui/Icon';
import ContactForm from '@/components/forms/ContactForm';
import { LocationSection } from '@/components/sections';
import { CONTACT_INFO, SITE_CONFIG, FAQ_DATA, BUSINESS_HOURS } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contacto - Centro Auditus',
  description: 'Contáctanos para agendar tu cita de diagnóstico auditivo en Concepción. Teléfono, WhatsApp y formulario de contacto disponibles.',
  openGraph: {
    title: 'Contacto - Centro Auditus',
    description: 'Contáctanos para agendar tu cita de diagnóstico auditivo en Concepción',
  },
  keywords: [
    'contacto centro auditus',
    'agendar cita',
    'fonoaudióloga Concepción',
    'audiología contacto',
    'whatsapp audiología',
    ...SITE_CONFIG.keywords
  ]
};

function ContactPageContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50/30 to-secondary-50/20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-primary mb-6">
            Contáctanos
          </h1>
          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto">
            Estamos aquí para resolver todas tus dudas y agendar tu cita de manera rápida y sencilla. 
            Elige la forma de contacto que prefieras.
          </p>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* WhatsApp */}
            <Card variant="elevated" hover className="p-6 text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <WhatsAppIcon size="lg" className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-2">
                WhatsApp
              </h3>
              <p className="text-gray-600 font-secondary mb-4">
                Respuesta inmediata
              </p>
              <Button
                variant="outline"
                size="sm"
                href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me gustaría agendar una cita')}
                external
                className="w-full"
              >
                Escribir Mensaje
              </Button>
            </Card>

            {/* Phone */}
            <Card variant="elevated" hover className="p-6 text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <PhoneIcon size="lg" className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-2">
                Teléfono
              </h3>
              <p className="text-gray-600 font-secondary mb-4">
                Llamada directa
              </p>
              <Button
                variant="outline"
                size="sm"
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-full"
              >
                Llamar Ahora
              </Button>
            </Card>

            {/* Email */}
            <Card variant="elevated" hover className="p-6 text-center group">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 transition-colors">
                <EmailIcon size="lg" className="text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-2">
                Email
              </h3>
              <p className="text-gray-600 font-secondary mb-4">
                Respuesta formal
              </p>
              <Button
                variant="outline"
                size="sm"
                href={`mailto:${CONTACT_INFO.email}`}
                className="w-full"
              >
                Enviar Email
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card variant="elevated" className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">
                  Envíanos un Mensaje
                </h2>
                <p className="text-gray-600 font-secondary mb-8">
                  Completa el formulario y nos pondremos en contacto contigo en el menor tiempo posible.
                </p>
                <ContactForm />
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Location & Hours */}
              <Card variant="flat" className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 font-primary mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <LocationIcon size="md" className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-secondary">Dirección</h4>
                      <p className="text-gray-600 font-secondary">
                        {CONTACT_INFO.address.street}, {CONTACT_INFO.address.office}<br />
                        {CONTACT_INFO.address.city}, {CONTACT_INFO.address.region}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <PhoneIcon size="md" className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-secondary">Teléfono</h4>
                      <p className="text-gray-600 font-secondary">
                        <a 
                          href={`tel:${CONTACT_INFO.phone}`}
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {CONTACT_INFO.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <EmailIcon size="md" className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-secondary">Email</h4>
                      <p className="text-gray-600 font-secondary">
                        <a 
                          href={`mailto:${CONTACT_INFO.email}`}
                          className="text-primary-600 hover:text-primary-700 transition-colors"
                        >
                          {CONTACT_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <ClockIcon size="md" className="text-primary-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-secondary">Horarios de Atención</h4>
                      <div className="text-gray-600 font-secondary">
                        {BUSINESS_HOURS.structured.map((day) => (
                          <p key={day.day} className="flex justify-between">
                            <span>{day.day}:</span>
                            <span>
                              {day.open && day.close ? `${day.open} - ${day.close}` : 'Cerrado'}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  {CONTACT_INFO.social && (
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 font-secondary mb-3">Síguenos</h4>
                      <div className="flex space-x-4">
                        {CONTACT_INFO.social.instagram && (
                          <a
                            href={`https://instagram.com/${CONTACT_INFO.social.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-pink-500 transition-colors"
                          >
                            <InstagramIcon size="md" />
                          </a>
                        )}
                        {CONTACT_INFO.social.facebook && (
                          <a
                            href={`https://facebook.com/${CONTACT_INFO.social.facebook.replace(' ', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <FacebookIcon size="md" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card variant="gradient" className="p-6 bg-primary-50 border-primary-200">
                <h3 className="text-lg font-semibold text-primary-900 font-primary mb-3">
                  ¿Necesitas atención urgente?
                </h3>
                <p className="text-primary-800 font-secondary mb-4">
                  Para emergencias auditivas o consultas urgentes, contáctanos inmediatamente por WhatsApp.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  href={getWhatsAppUrl(CONTACT_INFO.whatsapp, '🚨 URGENTE: Necesito atención médica auditiva inmediata')}
                  external
                  className="w-full"
                >
                  Contacto de Emergencia
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600 font-secondary">
              Respuestas a las consultas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FAQ_DATA.slice(0, 4).map((faq, index) => (
              <Card key={index} variant="flat" className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 font-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 font-secondary">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 font-secondary mb-4">
              ¿No encuentras la respuesta que buscas?
            </p>
            <Button
              variant="outline"
              size="md"
              href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, tengo una pregunta que no está en las FAQ')}
              external
            >
              Hacer una Pregunta
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section - Moved from Nosotros page */}
      <LocationSection />
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}