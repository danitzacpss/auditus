import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LocationSection } from '@/components/sections';
import { SITE_CONFIG } from '@/data/constants';
import ContactHeroClient from './ContactHeroClient';

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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Contact Hero with Client Component */}
      <ContactHeroClient />

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