import React from 'react';
import { Button } from '@/components/ui';
import { CalendarIcon, PhoneIcon, WhatsAppIcon, StarIcon, CheckIcon } from '@/components/ui/Icon';
import { CONTACT_INFO, PROFESSIONAL_INFO } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';

const HeroSection: React.FC = () => {
  return (
    <section className="relative hero-gradient overflow-hidden min-h-screen flex items-center">
      {/* Medical background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content - Left side (8 columns) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Professional Badge */}
            <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Fonoaudióloga Profesional • Universidad de Concepción</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-primary leading-tight">
              Centro de{' '}
              <span className="text-primary-blue relative inline-block">
                Audiología
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-4 text-blue-200" 
                  viewBox="0 0 200 16" 
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,12 Q100,2 200,12 L200,16 L0,16 Z" />
                </svg>
              </span>{' '}
              Especializada
            </h1>

            {/* Value Proposition */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 font-secondary leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Diagnóstico auditivo de <strong className="text-gray-900">excelencia</strong> con tecnología moderna, 
              procedimientos seguros y atención personalizada en Concepción.
            </p>

            {/* Professional Credentials */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <CheckIcon size="sm" className="text-green-600" />
                <span className="text-sm font-medium text-gray-700 font-secondary">5+ Años de Experiencia</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <CheckIcon size="sm" className="text-green-600" />
                <span className="text-sm font-medium text-gray-700 font-secondary">Universidad de Concepción</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <CheckIcon size="sm" className="text-green-600" />
                <span className="text-sm font-medium text-gray-700 font-secondary">Atención Personalizada</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="btn-primary flex items-center justify-center space-x-2 text-lg">
                <CalendarIcon size="sm" />
                <span>Ver Servicios</span>
              </button>
              
              <button className="btn-secondary flex items-center justify-center space-x-2 text-lg">
                <WhatsAppIcon size="sm" />
                <span>Agendar Cita</span>
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 inline-block">
              <p className="text-sm text-gray-600 mb-2 font-secondary">¿Necesitas atención inmediata?</p>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors font-medium font-secondary"
                >
                  <PhoneIcon size="sm" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
                <div className="w-px h-4 bg-gray-300"></div>
                <span className="text-sm text-gray-600 font-secondary">Concepción, Chile</span>
              </div>
            </div>
          </div>

          {/* Visual - Right side (5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-lg mx-auto">
              
              {/* Main Professional Card */}
              <div className="professional-card relative">
                
                {/* Professional Photo Placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full rounded-full flex items-center justify-center shadow-lg" style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'}}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-blue">VC</div>
                      <div className="text-xs text-secondary-turquoise mt-1">Fonoaudióloga</div>
                    </div>
                  </div>
                  
                  {/* Verification Badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckIcon size="sm" className="text-white" />
                  </div>
                </div>

                {/* Professional Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 font-primary mb-1">
                    {PROFESSIONAL_INFO.name}
                  </h3>
                  <p className="text-primary-blue font-medium font-secondary mb-2">
                    {PROFESSIONAL_INFO.title}
                  </p>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2 font-secondary">5.0 • Excelencia</span>
                  </div>
                </div>

                {/* Key Specializations */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 bg-primary-blue rounded-full shadow-sm"></div>
                    <span className="text-gray-700 font-secondary">Diagnóstico Audiológico</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 bg-secondary-turquoise rounded-full shadow-sm"></div>
                    <span className="text-gray-700 font-secondary font-medium">Videotoscopía Avanzada</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)'}}></div>
                    <span className="text-gray-700 font-secondary font-medium">Procedimientos Seguros</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 bg-primary-blue text-white rounded-2xl p-4 shadow-lg" style={{background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25)'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-xs">Años</div>
                  <div className="text-xs">Experiencia</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-secondary-turquoise text-white rounded-2xl p-4 shadow-lg" style={{background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.25)'}}>
                <div className="text-center">
                  <div className="text-lg font-bold">UC</div>
                  <div className="text-xs">Universidad</div>
                  <div className="text-xs">Concepción</div>
                </div>
              </div>

            </div>
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
  );
};

export default HeroSection;