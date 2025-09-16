'use client';
import React, { useState } from 'react';
import { CheckIcon } from '@/components/ui/Icon';
import { CalendarBookingModal } from '@/components/ui';
import { CONTACT_INFO } from '@/data/constants';

const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            {CONTACT_INFO.calendarBooking && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200"
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
            )}

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="px-8 py-4 rounded-xl text-lg transition-all duration-200 inline-block text-center"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                boxShadow: '0 10px 25px -12px rgba(0, 0, 0, 0.25)',
                textDecoration: 'none'
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
            </a>
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

      {/* Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calendarUrl={CONTACT_INFO.calendarBooking}
        serviceName="Evaluación Auditiva"
      />
    </>
  );
};

export default CTASection;