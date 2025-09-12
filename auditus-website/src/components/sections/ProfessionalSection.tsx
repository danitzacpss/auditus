import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
import { CheckIcon, StarIcon, EarIcon, StethoscopeIcon, ArrowRightIcon } from '@/components/ui/Icon';
import { PROFESSIONAL_INFO, PROFESSIONALS } from '@/data/constants';

const ProfessionalSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-800 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-secondary-600 rounded-full"></div>
            <span>Profesional Certificada</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            Conoce a tu{' '}
            <span className="text-secondary-600 relative inline-block">
              Fonoaudióloga
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-secondary-200" 
                viewBox="0 0 100 12" 
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
            Profesional especializada en audiología con sólida formación académica y años de experiencia 
            brindando <strong className="text-gray-900">cuidado auditivo de excelencia</strong> en Concepción.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Professional Photo & Stats */}
          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              
              {/* Main Professional Photo Card */}
              <Card className="relative bg-white shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  
                  {/* Professional Photo */}
                  <div className="relative mb-6">
                    <div className="w-48 h-48 mx-auto relative">
                      {/* Professional photo placeholder with better styling */}
                      <div className="w-full h-full bg-gradient-to-br from-secondary-100 via-secondary-200 to-primary-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-secondary-700 font-primary mb-2">VC</div>
                          <div className="text-sm text-secondary-600 font-secondary">Fonoaudióloga</div>
                          <div className="text-xs text-gray-500 font-secondary">Universidad de Concepción</div>
                        </div>
                      </div>
                      
                      {/* Professional verification badge */}
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                        <CheckIcon size="md" className="text-white" />
                      </div>
                      
                      {/* University badge */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                        <span className="text-white font-bold text-sm">UC</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Rating */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} size="md" className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 font-secondary text-sm">Excelencia en Atención Auditiva</p>
                  </div>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center bg-primary-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-primary-700 font-primary">5+</div>
                      <div className="text-sm text-gray-600 font-secondary">Años Experiencia</div>
                    </div>
                    <div className="text-center bg-secondary-50 rounded-2xl p-4">
                      <div className="text-2xl font-bold text-secondary-700 font-primary">100%</div>
                      <div className="text-sm text-gray-600 font-secondary">Satisfacción</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating credentials */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  <EarIcon size="md" className="text-primary-600" />
                  <div>
                    <div className="font-semibold text-gray-900 font-primary text-sm">Especialista</div>
                    <div className="text-xs text-gray-600 font-secondary">Audiología</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="lg:col-span-7">
            
            {/* Name and title */}
            <div className="mb-8">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 font-primary mb-2">
                {PROFESSIONAL_INFO.name}
              </h3>
              <p className="text-xl text-secondary-600 font-medium font-secondary mb-4">
                {PROFESSIONAL_INFO.title}
              </p>
              <p className="text-gray-600 font-secondary leading-relaxed text-lg">
                {PROFESSIONAL_INFO.bio}
              </p>
            </div>

            {/* Education & Credentials */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4 font-primary">Formación Académica</h4>
              <div className="space-y-3">
                {PROFESSIONAL_INFO.education.map((education, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-secondary leading-relaxed">{education}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Credentials */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4 font-primary">Credenciales Profesionales</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {PROFESSIONAL_INFO.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-primary-50 rounded-2xl p-4 border border-green-200">
                    <CheckIcon size="sm" className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-secondary text-sm leading-relaxed">{credential}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4 font-primary">Especialidades</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {PROFESSIONAL_INFO.specializations.map((specialization, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:border-secondary-200 transition-colors">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <StethoscopeIcon size="sm" className="text-secondary-600" />
                    </div>
                    <span className="text-gray-700 font-secondary leading-relaxed">{specialization}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience highlight */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-6 text-white mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <EarIcon size="lg" className="text-white" />
                </div>
                <div>
                  <h5 className="font-bold text-xl font-primary mb-2">Compromiso con la Excelencia</h5>
                  <p className="text-primary-100 font-secondary leading-relaxed">
                    {PROFESSIONAL_INFO.experience} dedicados al cuidado auditivo profesional, 
                    combinando experiencia clínica con tecnología moderna para ofrecer 
                    el mejor servicio a cada paciente.
                  </p>
                </div>
              </div>
            </div>

            {/* Ver Perfil Completo Button */}
            <div className="text-center lg:text-left">
              <Link href={`/nosotros/${PROFESSIONALS[0].slug}`}>
                <button className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg">
                  <span>Ver Perfil Completo</span>
                  <ArrowRightIcon size="sm" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <CheckIcon size="lg" className="text-primary-600" />
              </div>
              <h6 className="font-bold text-gray-900 font-primary">Certificación Profesional</h6>
              <p className="text-sm text-gray-600 font-secondary">Registro Nacional de Prestadores</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto">
                <div className="text-secondary-600 font-bold text-xl">UC</div>
              </div>
              <h6 className="font-bold text-gray-900 font-primary">Universidad de Concepción</h6>
              <p className="text-sm text-gray-600 font-secondary">Formación Académica de Excelencia</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <StethoscopeIcon size="lg" className="text-green-600" />
              </div>
              <h6 className="font-bold text-gray-900 font-primary">Procedimientos Seguros</h6>
              <p className="text-sm text-gray-600 font-secondary">Protocolos Médicos Estrictos</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size="sm" className="text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <h6 className="font-bold text-gray-900 font-primary">Atención de Calidad</h6>
              <p className="text-sm text-gray-600 font-secondary">Satisfacción Garantizada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSection;