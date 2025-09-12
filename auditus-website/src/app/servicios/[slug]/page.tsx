import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, ClockIcon, CheckIcon, ArrowRightIcon, WhatsAppIcon, PhoneIcon } from '@/components/ui';
import StructuredData from '@/components/seo/StructuredData';
import { SERVICES, SITE_CONFIG, CONTACT_INFO } from '@/data/constants';
import { formatCurrency, formatDuration, getWhatsAppUrl } from '@/lib/utils';
import type { PageProps } from '@/types';

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

  const appointmentMessage = `Hola, me interesa agendar una cita para ${service.name}. ¿Cuándo tienen disponibilidad?`;

  return (
    <>
      <StructuredData type="service" serviceId={service.id} />
      <main className="min-h-screen bg-gradient-to-br from-primary-50/30 to-secondary-50/20">
      {/* Breadcrumb */}
      <section className="pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 font-secondary mb-6">
            <Link href="/" className="hover:text-primary-600 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/servicios" className="hover:text-primary-600 transition-colors">
              Servicios
            </Link>
            <span>/</span>
            <span className="text-gray-900">{service.name}</span>
          </nav>
          
          <Link
            href="/servicios"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors font-secondary text-sm mb-4"
          >
            <ArrowRightIcon size="sm" className="rotate-180" />
            <span>Volver a Servicios</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-primary mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>

          {/* Quick Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <ClockIcon size="sm" className="text-primary-500" />
              <span className="font-secondary text-gray-700">
                Duración: {formatDuration(service.duration)}
              </span>
            </div>
            
            {service.price > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-primary-500 font-bold">$</span>
                <span className="font-secondary text-gray-700">
                  Valor: <span className="font-bold text-primary-600">{formatCurrency(service.price)}</span>
                </span>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              variant="primary"
              size="lg"
              href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
              external
              className="flex items-center space-x-2"
            >
              <WhatsAppIcon size="sm" />
              <span>Agendar por WhatsApp</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center space-x-2"
            >
              <PhoneIcon size="sm" />
              <span>Llamar Directamente</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <Card variant="elevated" className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">
                ¿Qué incluye este servicio?
              </h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckIcon size="sm" className="text-primary-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Preparation */}
            {service.preparation && service.preparation.length > 0 && (
              <Card variant="elevated" className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">
                  Preparación requerida
                </h2>
                <ul className="space-y-3">
                  {service.preparation.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 font-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Aftercare */}
            {service.aftercare && service.aftercare.length > 0 && (
              <Card variant="elevated" className="p-6 lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 font-primary mb-6">
                  Cuidados posteriores
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                  {service.aftercare.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700 font-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      {service.price > 0 && (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-8">
              Información de Precios
            </h2>
            
            <Card variant="gradient" className="p-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 font-primary mb-2">
                  {formatCurrency(service.price)}
                </div>
                <p className="text-gray-600 font-secondary mb-4">
                  Precio del servicio completo
                </p>
                
                {service.id === 'videotoscopia' && (
                  <p className="text-sm text-gray-500 font-secondary">
                    *Incluido sin costo adicional si se realiza lavado de oídos
                  </p>
                )}
              </div>
            </Card>

            <div className="mt-8">
              <p className="text-gray-600 font-secondary mb-4">
                Descuento especial del 10% para adultos mayores de 65 años
              </p>
              <p className="text-sm text-gray-500 font-secondary">
                Aceptamos múltiples formas de pago • Documentación para reembolsos
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-gray-600 font-secondary">
              Resolvemos las dudas más comunes sobre este servicio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service-specific FAQs would go here */}
            <Card variant="flat" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-3">
                ¿Es doloroso el procedimiento?
              </h3>
              <p className="text-gray-600 font-secondary">
                No, todos nuestros procedimientos son completamente indoloros. 
                Utilizamos técnicas profesionales y equipamiento especializado para garantizar tu comodidad.
              </p>
            </Card>

            <Card variant="flat" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-3">
                ¿Cuánto tiempo dura?
              </h3>
              <p className="text-gray-600 font-secondary">
                El {service.name.toLowerCase()} toma aproximadamente {formatDuration(service.duration)}, 
                incluyendo tiempo para explicar los resultados y responder tus preguntas.
              </p>
            </Card>

            <Card variant="flat" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-3">
                ¿Qué debo llevar a la cita?
              </h3>
              <p className="text-gray-600 font-secondary">
                Trae tu documento de identidad y cualquier examen audiológico previo que tengas. 
                Si tienes seguros de salud, trae también esa información.
              </p>
            </Card>

            <Card variant="flat" className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 font-primary mb-3">
                ¿Puedo volver a mis actividades normales?
              </h3>
              <p className="text-gray-600 font-secondary">
                Sí, generalmente puedes retomar tus actividades normales inmediatamente. 
                Te daremos recomendaciones específicas según tu caso.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 font-primary mb-4">
            ¿Listo para agendar tu cita?
          </h2>
          <p className="text-lg text-gray-600 font-secondary mb-8 max-w-2xl mx-auto">
            Nuestro equipo profesional está listo para brindarte la mejor atención. 
            Contáctanos para agendar tu cita en el horario que mejor te convenga.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              variant="primary"
              size="lg"
              href={getWhatsAppUrl(CONTACT_INFO.whatsapp, appointmentMessage)}
              external
              className="flex items-center space-x-2"
            >
              <WhatsAppIcon size="sm" />
              <span>Agendar por WhatsApp</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              href="/contacto"
              className="flex items-center space-x-2"
            >
              <span>Formulario de Contacto</span>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 font-secondary">
              <strong>Horarios de atención:</strong><br />
              {CONTACT_INFO.hours.weekdays}<br />
              {CONTACT_INFO.hours.saturday}
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}