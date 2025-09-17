import type { Metadata } from 'next';
import { HeroSection, ServicesSection, GallerySection, PressSection } from '@/components/sections';
import TestimonialsSectionFallback from '@/components/sections/TestimonialsSectionFallback';
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
      <TestimonialsSectionFallback />
      <GallerySection />
      <PressSection />
    </div>
  );
}