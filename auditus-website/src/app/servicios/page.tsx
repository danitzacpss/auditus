import type { Metadata } from 'next';
import { Card, Button, ClockIcon, CheckIcon } from '@/components/ui';
import { SERVICES, SITE_CONFIG } from '@/data/constants';
import { formatCurrency, formatDuration } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Servicios - Centro Auditus',
  description: 'Servicios profesionales de diagnóstico y cuidado auditivo en Concepción: videotoscopía, lavado de oídos y audiometría con tecnología avanzada.',
  openGraph: {
    title: 'Servicios - Centro Auditus',
    description: 'Servicios profesionales de diagnóstico y cuidado auditivo en Concepción',
  },
  keywords: [
    'servicios audiológicos',
    'videotoscopía',
    'lavado de oídos',
    'audiometría',
    'diagnóstico auditivo',
    'fonoaudiología Concepción',
    ...SITE_CONFIG.keywords
  ]
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50/30 to-secondary-50/20">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-primary mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto">
            Ofrecemos servicios especializados en diagnóstico y cuidado auditivo 
            con tecnología de vanguardia y atención profesional personalizada.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Card
                key={service.id}
                variant="elevated"
                hover
                className="h-full flex flex-col group"
              >
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 font-primary group-hover:text-primary-600 transition-colors">
                      {service.name}
                    </h3>
                    {service.price > 0 && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600 font-primary">
                          {formatCurrency(service.price)}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 font-secondary mb-6 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon size="sm" className="text-primary-500" />
                      <span className="font-secondary">
                        Duración: {formatDuration(service.duration)}
                      </span>
                    </div>
                    
                    {service.price > 0 && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-primary-500 font-bold">$</span>
                        <span className="font-secondary">
                          Valor: {formatCurrency(service.price)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-gray-900 font-secondary text-sm">
                      Incluye:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckIcon size="sm" className="text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="font-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="p-6 pt-0 space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    href={`/servicios/${service.slug}`}
                    className="w-full"
                  >
                    Ver Detalles
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="md"
                    href={`/contacto?servicio=${service.slug}`}
                    className="w-full"
                  >
                    Agendar Cita
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-4">
              Información Importante
            </h2>
            <p className="text-lg text-gray-600 font-secondary">
              Conoce nuestras condiciones y recomendaciones para una mejor experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="flat" className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 font-primary mb-4">
                Política de Precios
              </h3>
              <ul className="space-y-2 text-gray-600 font-secondary">
                <li>• Si se realiza lavado de oídos, la videotoscopía está incluida</li>
                <li>• Descuento del 10% para adultos mayores de 65 años</li>
                <li>• Aceptamos múltiples formas de pago</li>
                <li>• Documentación para reembolsos de seguros</li>
              </ul>
            </Card>

            <Card variant="flat" className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 font-primary mb-4">
                Recomendaciones Generales
              </h3>
              <ul className="space-y-2 text-gray-600 font-secondary">
                <li>• Llegar 10 minutos antes de la cita</li>
                <li>• Traer exámenes audiológicos previos si los tiene</li>
                <li>• Informar sobre medicamentos y alergias</li>
                <li>• Usar ropa cómoda</li>
              </ul>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 font-secondary mb-6">
              ¿Tienes dudas sobre nuestros servicios?
            </p>
            <Button
              variant="primary"
              size="lg"
              href="/contacto"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}