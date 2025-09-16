import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES, SITE_CONFIG } from '@/data/constants';
import type { PageProps } from '@/types';
import ServicePageClient from './ServicePageClient';

interface ServicePageProps extends PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: 'Servicio no encontrado - Centro Auditus',
      description: 'El servicio solicitado no existe.',
    };
  }

  return {
    title: `${service.name} - Centro Auditus`,
    description: service.description,
    openGraph: {
      title: `${service.name} - Centro Auditus`,
      description: service.description,
    },
    keywords: [
      service.name.toLowerCase(),
      'fonoaudiología',
      'diagnóstico auditivo',
      'Concepción',
      ...SITE_CONFIG.keywords
    ]
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServicePageClient service={service} />;
}