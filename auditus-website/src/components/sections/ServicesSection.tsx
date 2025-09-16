'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, Button } from '@/components/ui';
import { CheckIcon, ArrowRightIcon, ClockIcon, StarIcon } from '@/components/ui/Icon';
import { SERVICES } from '@/data/constants';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { CONTACT_INFO } from '@/data/constants';

const serviceImages = {
  'videotoscopia': '/images/services/videotoscopia.png',
  'lavado-oidos': '/images/services/lavado.png',
  'audiometria': '/images/services/audiometria.png',
};

const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Servicios Especializados de Audiología</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            Cuidado Auditivo{' '}
            <span className="text-primary-blue relative inline-block">
              Integral
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
            Utilizamos <strong className="text-gray-900">tecnología moderna</strong> y procedimientos seguros para brindarte 
            la mejor atención auditiva. Cada servicio incluye evaluación profesional y recomendaciones personalizadas.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service) => {
            const serviceImage = serviceImages[service.id as keyof typeof serviceImages];

            return (
              <Card
                key={service.id}
                className="professional-card group relative hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden"
              >
                <CardContent className="p-8 h-full flex flex-col relative">

                  {/* Service icon with professional styling */}
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

                  {/* Service header */}
                  <div className="mb-6 flex-1">
                    <div className="flex items-center justify-between mb-3">
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

                    {/* Professional features with medical styling */}
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

                  {/* Professional pricing section */}
                  <div className="space-y-4">
                    <div className="rounded-2xl p-4 border border-blue-100" style={{background: 'linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)'}}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-primary-blue font-primary">
                            {service.price > 0 ? formatPrice(service.price) : 'Consultar'}
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

                    {/* Professional CTA buttons */}
                    <div className="flex flex-col space-y-3">
                      <button className="btn-primary w-full text-sm">
                        Agendar Consulta
                      </button>
                      
                      <Link href={`/servicios/${service.slug}`}>
                        <button className="btn-secondary w-full text-sm flex items-center justify-center space-x-2">
                          <span>Información Detallada</span>
                          <ArrowRightIcon 
                            size="sm" 
                            className="group-hover:translate-x-1 transition-transform" 
                          />
                        </button>
                      </Link>
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

        {/* Medical pricing notice with professional styling */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-2xl p-6 mb-16 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-yellow-900 mb-2 font-primary text-lg">
                Política de Precios Profesional
              </h4>
              <p className="text-yellow-800 font-secondary leading-relaxed">
                <strong>Importante:</strong> Si se realiza lavado de oídos, la videotoscopía está incluida en el precio del procedimiento 
                sin costo adicional. Solo se cobra el valor del lavado de oídos (<strong>{formatPrice(15000)}</strong>). 
                Esta política garantiza transparencia y valor para nuestros pacientes.
              </p>
            </div>
          </div>
        </div>

        {/* Professional CTA Section */}
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
                <button className="font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200" 
                        style={{
                          background: 'white',
                          color: '#3b82f6',
                          border: 'none',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(0, 0, 0, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                        }}>
                  Agendar Evaluación Profesional
                </button>
                
                <button className="px-8 py-4 rounded-xl text-lg transition-all duration-200" 
                        style={{
                          background: 'transparent',
                          color: 'white',
                          border: '2px solid white',
                          boxShadow: '0 10px 25px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#3b82f6';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 20px 35px -12px rgba(0, 0, 0, 0.35)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 10px 25px -12px rgba(0, 0, 0, 0.25)';
                        }}>
                  Llamar Directamente
                </button>
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
  );
};

export default ServicesSection;