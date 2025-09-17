'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { ClockIcon, CheckIcon, ArrowRightIcon, StarIcon, ShieldIcon, GraduationIcon, CalendarIcon } from '@/components/ui/Icon';
import { CalendarBookingModal } from '@/components/ui';
import { SERVICES, PROFESSIONAL_INFO, CONTACT_INFO } from '@/data/constants';
import { formatCurrency, getWhatsAppUrl } from '@/lib/utils';


const serviceImages = {
  'videotoscopia': '/images/services/videotoscopia.png',
  'lavado-oidos': '/images/services/lavado.png',
  'audiometria': '/images/services/audiometria.png',
};

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section with Professional Image */}
      <section className="pt-24 pb-8 lg:pb-12 hero-gradient relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
            <defs>
              <pattern id="medical-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 5 L20 35 M5 20 L35 20" stroke="currentColor" strokeWidth="1" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Professional Badge - Centered */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 px-6 py-3 rounded-full text-sm font-semibold font-secondary shadow-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-blue-700">Servicios Especializados de Audiología</span>
              <ShieldIcon size="sm" className="text-blue-600" />
            </div>
          </div>

          {/* Main Hero Content - Split Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

            {/* Content Column */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-primary leading-tight">
                Cuidado Auditivo{' '}
                <span className="text-primary-600 relative inline-block">
                  Profesional
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                  </svg>
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 font-secondary leading-relaxed mb-8">
                Servicios especializados en diagnóstico y cuidado auditivo con <strong className="text-gray-900">tecnología moderna</strong> y
                atención profesional personalizada en Concepción.
              </p>

              {/* Professional Credentials */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-600 text-sm font-secondary mb-8">
                <div className="flex items-center space-x-2">
                  <GraduationIcon size="sm" className="text-blue-500" />
                  <span>{PROFESSIONAL_INFO.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldIcon size="sm" className="text-green-500" />
                  <span>Fonoaudióloga Certificada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <StarIcon size="sm" className="text-yellow-500" />
                  <span>5+ Años de Experiencia</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {CONTACT_INFO.calendarBooking && (
                  <button
                    onClick={() => {
                      setSelectedService('Evaluación Auditiva Completa');
                      setIsModalOpen(true);
                    }}
                    className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                  >
                    <span>Reservar Evaluación</span>
                    <CalendarIcon size="sm" className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                <Link href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa información sobre sus servicios de audiología')}>
                  <button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2">
                    <span>Consultar por WhatsApp</span>
                    <ArrowRightIcon size="sm" className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Professional Image Column */}
            <div className="order-1 lg:order-2 relative">
              <div className="hero-professional-image p-2">
                <Image
                  src="/images/hero-professional-services.jpg"
                  alt="Profesional de audiología realizando procedimiento con equipamiento moderno y medidas de seguridad, mostrando el uso correcto de EPP y tecnología avanzada"
                  width={600}
                  height={600}
                  className="w-full h-80 lg:h-96 object-cover rounded-2xl"
                  style={{ objectPosition: '50% 30%' }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />

                {/* Technology Overlay */}
                <div className="absolute bottom-4 right-4 professional-overlay trust-indicator rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <ShieldIcon size="sm" className="text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 font-primary">Tecnología Moderna</div>
                      <div className="text-xs text-blue-600 font-secondary">Equipos de Alta Precisión</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional credentials below image on mobile */}
              <div className="lg:hidden mt-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <ShieldIcon size="sm" className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 font-secondary">Equipos Modernos</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <CheckIcon size="sm" className="text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 font-secondary">100% Seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards - Full Width Below */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-600 font-primary mb-2">3</div>
              <div className="text-gray-700 font-secondary">Servicios Especializados</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-600 font-primary mb-2">100%</div>
              <div className="text-gray-700 font-secondary">Procedimientos Seguros</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-xl border border-blue-100/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-cyan-600 font-primary mb-2">24h</div>
              <div className="text-gray-700 font-secondary">Respuesta Promedio</div>
            </div>
          </div>
        </div>

        {/* Professional Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
              Nuestros{' '}
              <span className="text-primary-600 relative inline-block">
                Servicios
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
              Cada servicio incluye evaluación profesional completa y recomendaciones personalizadas para tu salud auditiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {SERVICES.map((service) => {
              const serviceImage = serviceImages[service.id as keyof typeof serviceImages];

              return (
                <Card
                  key={service.id}
                  className="professional-card group relative hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden h-full flex flex-col"
                >
                  <CardContent className="p-8 h-full flex flex-col relative">

                    {/* Service Icon */}
                    <div className="mb-8 relative">
                      <div className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg p-3 bg-white"
                           style={{
                             border: '2px solid #3b82f6'
                           }}>
                        {serviceImage ? (
                          <Image
                            src={serviceImage}
                            alt={`Icono de ${service.name}`}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-primary-blue rounded-lg"></div>
                        )}
                      </div>

                      {/* Professional badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                    </div>

                    {/* Service Header */}
                    <div className="mb-6 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 font-primary">
                          {service.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 font-secondary mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Professional features */}
                      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 font-primary">Incluye:</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700 font-secondary leading-relaxed">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Enhanced Pricing Section */}
                    <div className="space-y-4">
                      <div className="rounded-2xl p-4 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)'}}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-primary-blue font-primary">
                              {service.price > 0 ? formatCurrency(service.price) : 'Consultar'}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 font-secondary">
                              <ClockIcon size="sm" className="text-secondary-turquoise" />
                              <span>Duración: {service.duration} minutos</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-primary-blue font-medium font-secondary">Procedimiento</div>
                            <div className="text-xs text-primary-blue font-medium font-secondary">Profesional</div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced CTA buttons */}
                      <div className="flex flex-col space-y-3">
                        <Link href={`/servicios/${service.slug}`}>
                          <button className="btn-primary w-full text-sm">
                            Ver Información Detallada
                          </button>
                        </Link>

                        {CONTACT_INFO.calendarBooking && (
                          <button
                            onClick={() => {
                              setSelectedService(service.name);
                              setIsModalOpen(true);
                            }}
                            className="btn-secondary w-full text-sm flex items-center justify-center space-x-2"
                          >
                            <span>Reservar Cita</span>
                            <CalendarIcon
                              size="sm"
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Professional indicator */}
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
<section className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-gradient-to-br from-blue-50/50 to-cyan-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Professional Credentials */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-teal-100 border border-green-200 px-6 py-3 rounded-full text-sm font-semibold font-secondary mb-6 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-green-700">Profesional Certificada</span>
              <GraduationIcon size="sm" className="text-green-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
              Atención de{' '}
              <span className="text-primary-600 relative inline-block">
                Excelencia
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
              Profesional especializada con <strong className="text-gray-900">tecnología moderna</strong> y
              compromiso con la excelencia en cada procedimiento.
            </p>
          </div>

          {/* Professional Info Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-blue-100/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationIcon size="lg" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary">{PROFESSIONAL_INFO.name}</h3>
                  <p className="text-blue-600 font-secondary font-medium">{PROFESSIONAL_INFO.title}</p>
                </div>
              </div>
              <div className="space-y-3">
                {PROFESSIONAL_INFO.credentials.slice(0, 3).map((credential, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon size="sm" className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-secondary text-sm">{credential}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-blue-100/50">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShieldIcon size="lg" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary">Tecnología & Seguridad</h3>
                  <p className="text-green-600 font-secondary font-medium">Equipos Modernos</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckIcon size="sm" className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-secondary text-sm">Equipos de última tecnología</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckIcon size="sm" className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-secondary text-sm">Procedimientos seguros y sin dolor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckIcon size="sm" className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-secondary text-sm">Protocolos de higiene estrictos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Strategy */}
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
              Precios{' '}
              <span className="text-primary-600 relative inline-block">
                Transparentes
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
              Política de precios clara y justa con <strong className="text-gray-900">descuentos especiales</strong> para adultos mayores.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">

            {/* Bundled Service Offer */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <CheckIcon size="sm" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-900 font-primary">Oferta Especial</h3>
                  <p className="text-yellow-800 font-secondary">Servicio Combinado</p>
                </div>
              </div>
              <p className="text-yellow-800 font-secondary leading-relaxed mb-4">
                <strong>Lavado de Oídos + Videotoscopía:</strong> Cuando realizas un lavado de oídos,
                la videotoscopía está <strong>incluida sin costo adicional</strong>.
                Solo pagas <strong>{formatCurrency(15000)}</strong> por ambos procedimientos.
              </p>
              <div className="bg-yellow-100 rounded-lg p-3">
                <div className="text-2xl font-bold text-yellow-900 font-primary">
                  Ahorro: {formatCurrency(10000)}
                </div>
                <div className="text-sm text-yellow-700 font-secondary">En servicio combinado</div>
              </div>
            </div>

            {/* Senior Discount */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-400 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <StarIcon size="sm" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-900 font-primary">Descuento Adulto Mayor</h3>
                  <p className="text-purple-800 font-secondary">65+ años</p>
                </div>
              </div>
              <p className="text-purple-800 font-secondary leading-relaxed mb-4">
                <strong>10% de descuento</strong> en todos nuestros servicios para adultos mayores de 65 años.
                Presentar cédula de identidad al momento de la consulta.
              </p>
              <div className="bg-purple-100 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-900 font-primary">
                  10% OFF
                </div>
                <div className="text-sm text-purple-700 font-secondary">Todos los servicios</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="pt-4 pb-16 lg:pt-6 lg:pb-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl"
                 style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #06b6d4 100%)'}}>

              {/* Professional background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <defs>
                    <pattern id="professional-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M10 2 L10 18 M2 10 L18 10" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="10" cy="10" r="1" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#professional-pattern)" />
                </svg>
              </div>

              <div className="relative text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-4"
                       style={{
                         background: 'rgba(255, 255, 255, 0.2)',
                         color: 'white',
                         backdropFilter: 'blur(8px)'
                       }}>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Centro de Audiología Profesional</span>
                  </div>

                  <h3 className="text-2xl lg:text-4xl font-bold mb-4 font-primary">
                    ¿Necesitas una evaluación profesional?
                  </h3>

                  <p className="text-primary-100 mb-8 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                    Agenda tu evaluación profesional hoy mismo. Nuestro equipo especializado está listo para brindarte
                    la mejor atención auditiva en Concepción con <strong className="text-white">tecnología moderna</strong> y
                    procedimientos seguros.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa agendar una evaluación profesional')}>
                    <button className="font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 bg-white text-blue-600 border-none shadow-2xl hover:shadow-3xl hover:-translate-y-1">
                      Agendar Evaluación Profesional
                    </button>
                  </Link>

                  <Link href={`tel:${CONTACT_INFO.phone}`}>
                    <button className="px-8 py-4 rounded-xl text-lg transition-all duration-200 bg-transparent text-white border-2 border-white shadow-lg hover:bg-white hover:text-blue-600 hover:-translate-y-1 hover:shadow-xl">
                      Llamar Directamente
                    </button>
                  </Link>
                </div>

                {/* Professional trust indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-blue-100 text-sm font-secondary">
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>Atención Inmediata</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>Procedimientos Seguros</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>Tecnología Moderna</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>Profesional Certificada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calendarUrl={CONTACT_INFO.calendarBooking}
        serviceName={selectedService || "Evaluación Auditiva"}
      />
    </main>
  );
}