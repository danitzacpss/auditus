'use client';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROFESSIONALS } from '@/data/constants';
import { CheckIcon, StarIcon, ArrowRightIcon, PhoneIcon, CalendarIcon } from '@/components/ui/Icon';

interface ProfessionalPageProps {
  params: Promise<{ profesional: string }>;
}

export default async function ProfessionalPage({ params }: ProfessionalPageProps) {
  const { profesional } = await params;
  const professional = PROFESSIONALS.find(p => p.slug === profesional);

  if (!professional) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary-blue transition-colors">
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/nosotros" className="text-gray-500 hover:text-primary-blue transition-colors">
              Nosotros
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{professional.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Sidebar con información básica */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-8">
              
              {/* Foto del profesional */}
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full rounded-full flex items-center justify-center shadow-lg" 
                       style={{background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'}}>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-blue">VC</div>
                      <div className="text-xs text-secondary-turquoise mt-1">Fonoaudióloga</div>
                    </div>
                  </div>
                  
                  {/* Badge de verificación */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckIcon size="sm" className="text-white" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 font-primary mb-2">
                  {professional.name}
                </h1>
                
                <p className="text-primary-blue font-medium font-secondary mb-4">
                  {professional.title}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2 font-secondary">5.0 • Excelencia</span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-primary-blue to-blue-600 rounded-2xl text-white">
                  <div className="text-2xl font-bold">{professional.yearsExperience}+</div>
                  <div className="text-sm">Años Experiencia</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary-turquoise to-cyan-600 rounded-2xl text-white">
                  <div className="text-2xl font-bold">{professional.satisfaction}%</div>
                  <div className="text-sm">Satisfacción</div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button className="btn-primary w-full flex items-center justify-center space-x-2">
                  <CalendarIcon size="sm" />
                  <span>Agendar Cita</span>
                </button>
                
                <button className="btn-secondary w-full flex items-center justify-center space-x-2">
                  <PhoneIcon size="sm" />
                  <span>Llamar Ahora</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-8">
            <div className="space-y-12">
              
              {/* Biografía */}
              <section>
                <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>Conoce a tu Fonoaudióloga</span>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-primary">
                  Profesional especializada en audiología
                </h2>
                
                <p className="text-lg text-gray-600 font-secondary leading-relaxed mb-8">
                  {professional.bio}
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-primary-blue font-medium font-secondary">
                    <strong>Experiencia:</strong> {professional.experience}
                  </p>
                </div>
              </section>

              {/* Formación Académica */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Formación Académica
                </h3>
                
                <div className="space-y-4">
                  {professional.education.map((edu, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-3 h-3 bg-primary-blue rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 font-secondary leading-relaxed">{edu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Credenciales */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Credenciales Profesionales
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {professional.credentials.map((credential, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <div className="flex items-start space-x-3">
                        <CheckIcon size="sm" className="text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 font-secondary leading-relaxed font-medium">
                          {credential}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Especialidades */}
              <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-primary">
                  Especialidades
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {professional.specializations.map((spec, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-secondary-turquoise rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 font-secondary leading-relaxed">
                          {spec}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA Final */}
              <section className="bg-gradient-to-r from-primary-blue to-secondary-turquoise rounded-3xl p-8 lg:p-12 text-white">
                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-primary">
                    ¿Listo para cuidar tu salud auditiva?
                  </h3>
                  
                  <p className="text-blue-100 mb-8 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                    Agenda tu cita con {professional.name.split(' ')[0]} y recibe atención profesional 
                    especializada con tecnología moderna.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-primary-blue hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200">
                      Agendar Cita Ahora
                    </button>
                    
                    <Link href="/servicios">
                      <button className="border-2 border-white text-white hover:bg-white hover:text-primary-blue px-8 py-4 rounded-xl text-lg transition-all duration-200 flex items-center justify-center space-x-2">
                        <span>Ver Servicios</span>
                        <ArrowRightIcon size="sm" />
                      </button>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}