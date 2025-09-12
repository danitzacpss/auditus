import type { Metadata } from 'next';
import { HeroSection, ServicesSection, TestimonialsSection } from '@/components/sections';
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
      <TestimonialsSection />
    </div>
  );
}