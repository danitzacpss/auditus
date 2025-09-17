import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Card, Button } from '@/components/ui';
import { PhoneIcon, EmailIcon, LocationIcon, ClockIcon, WhatsAppIcon, InstagramIcon, FacebookIcon, CalendarIcon, CheckIcon, StarIcon, HeartIcon, ShieldIcon } from '@/components/ui/Icon';
import ContactForm from '@/components/forms/ContactForm';
import { LocationSection } from '@/components/sections';
import { CONTACT_INFO, SITE_CONFIG, FAQ_DATA, BUSINESS_HOURS } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';
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