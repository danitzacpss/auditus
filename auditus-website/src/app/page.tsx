import type { Metadata } from 'next';
import { HeroSection, ServicesSection, GallerySection, PressSection } from '@/components/sections';
import TestimonialsSectionWithModal from '@/components/sections/TestimonialsSectionWithModal';
import QuickDiagnosis from '@/components/sections/QuickDiagnosis';
import { SITE_CONFIG } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Inicio',
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} - Cuidado Auditivo Profesional en Concepción`,
    description: SITE_CONFIG.description,
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <QuickDiagnosis />
      <TestimonialsSectionWithModal />
      <GallerySection />
      <PressSection />
    </div>
  );
}