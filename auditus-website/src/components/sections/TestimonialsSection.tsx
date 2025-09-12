import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { StarIcon, CheckIcon } from '@/components/ui/Icon';
import { TESTIMONIALS } from '@/data/constants';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-6">
            <CheckIcon size="sm" />
            <span>Testimonios Verificados</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            Lo que dicen nuestros{' '}
            <span className="text-primary-600 relative inline-block">
              Pacientes
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-primary-200" 
                viewBox="0 0 100 12" 
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
              </svg>
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
            La confianza de nuestros pacientes es nuestro mayor orgullo. Conoce las experiencias 
            de quienes han confiado en <strong className="text-gray-900">Centro Auditus</strong> para su cuidado auditivo.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary-50 border border-gray-200 hover:border-primary-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden"
            >
              <CardContent className="p-8 h-full flex flex-col relative">
                
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Service badge */}
                {testimonial.service && (
                  <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium font-secondary mb-4 self-start">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span>{testimonial.service}</span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2 font-secondary">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Testimonial content */}
                <blockquote className="text-gray-700 font-secondary mb-6 leading-relaxed flex-1 relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Patient info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-sm font-primary">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 font-primary text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-600 font-secondary">
                        {new Date(testimonial.date).toLocaleDateString('es-CL', { 
                          year: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Verified badge */}
                  {testimonial.verified && (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      <CheckIcon size="sm" />
                      <span className="text-xs font-medium font-secondary">Verificado</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
              <defs>
                <pattern id="trust-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M10 2 L10 18 M2 10 L18 10" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#trust-pattern)" />
            </svg>
          </div>

          <div className="relative text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-4">
                <CheckIcon size="sm" />
                <span>Confianza y Satisfacción</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-primary">
                Centro Auditus: Tu Mejor Elección
              </h3>
              
              <p className="text-primary-100 mb-8 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                Nos enorgullece la confianza que nuestros pacientes depositan en nosotros. 
                Cada testimonio refleja nuestro compromiso con la <strong className="text-white">excelencia profesional</strong>.
              </p>
            </div>

            {/* Trust statistics */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold font-primary mb-2">5.0</div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size="sm" className="text-yellow-300 fill-current" />
                  ))}
                </div>
                <div className="text-primary-100 font-secondary text-sm">Calificación Promedio</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold font-primary mb-2">100%</div>
                <div className="text-primary-100 font-secondary text-sm">Satisfacción</div>
                <div className="text-primary-100 font-secondary text-sm">del Paciente</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold font-primary mb-2">5+</div>
                <div className="text-primary-100 font-secondary text-sm">Años de</div>
                <div className="text-primary-100 font-secondary text-sm">Experiencia</div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold font-primary mb-2">✓</div>
                <div className="text-primary-100 font-secondary text-sm">Profesional</div>
                <div className="text-primary-100 font-secondary text-sm">Certificada</div>
              </div>
            </div>

            {/* Professional commitment */}
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-xl font-primary mb-3">Nuestro Compromiso</h4>
              <div className="grid md:grid-cols-2 gap-4 text-primary-100 font-secondary">
                <div className="flex items-center space-x-2">
                  <CheckIcon size="sm" />
                  <span>Atención personalizada y profesional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon size="sm" />
                  <span>Tecnología moderna y segura</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon size="sm" />
                  <span>Procedimientos sin dolor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckIcon size="sm" />
                  <span>Seguimiento post-procedimiento</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional trust elements */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 font-secondary mb-4">
            ¿Quieres ser parte de nuestros testimonios de éxito?
          </p>
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-gray-700 font-secondary">Únete a nuestros pacientes satisfechos</span>
            <CheckIcon size="sm" className="text-green-600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;