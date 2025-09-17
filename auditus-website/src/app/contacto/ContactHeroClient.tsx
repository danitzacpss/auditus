'use client';

import React, { useState } from 'react';
import { PhoneIcon, EmailIcon, ClockIcon, WhatsAppIcon, CalendarIcon, ShieldIcon } from '@/components/ui/Icon';
import { CalendarBookingModal } from '@/components/ui';
import { CONTACT_INFO } from '@/data/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export default function ContactHeroClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Enhanced Hero Section - Similar to Nosotros */}
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
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 px-6 py-3 rounded-full text-sm font-semibold font-secondary shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-green-700">Respuesta Inmediata Garantizada</span>
              <WhatsAppIcon size="sm" className="text-green-600" />
            </div>
          </div>

          {/* Main Hero Content - Centered Layout */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-primary leading-tight max-w-4xl mx-auto">
              Contacta con{' '}
              <span className="text-primary-600 relative inline-block">
                Centro Auditus
                <svg
                  className="absolute -bottom-2 left-0 w-full h-4 text-blue-200"
                  viewBox="0 0 200 16"
                  preserveAspectRatio="none"
                  fill="currentColor"
                >
                  <path d="M0,12 Q100,2 200,12 L200,16 L0,16 Z" />
                </svg>
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 font-secondary leading-relaxed mb-8 max-w-4xl mx-auto">
              Respuesta <strong className="text-gray-900">rápida</strong>, atención profesional y múltiples canales
              para tu comodidad. Estamos aquí para resolver tus dudas y agendar tu cita en <strong className="text-green-600">minutos</strong>.
            </p>

            {/* Contact Credentials */}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm font-secondary mb-8">
              <div className="flex items-center space-x-2">
                <ClockIcon size="sm" className="text-blue-500" />
                <span>Respuesta en &lt; 30 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <WhatsAppIcon size="sm" className="text-green-500" />
                <span>WhatsApp Activo 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon size="sm" className="text-blue-500" />
                <span>Agenda Online Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldIcon size="sm" className="text-red-500" />
                <span>Atención Inmediata Urgencias</span>
              </div>
            </div>

            {/* Enhanced Contact Cards in Hero - 4 Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {/* Phone Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon size="sm" className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-primary">Llamada</h3>
                <p className="text-sm text-gray-600 font-secondary mb-3">Atención inmediata</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Llamar Ahora
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-cyan-100/50 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <EmailIcon size="sm" className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-primary">Email</h3>
                <p className="text-sm text-gray-600 font-secondary mb-3">Consultas formales</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=Consulta Centro Auditus`}
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Enviar Email
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100/50 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <WhatsAppIcon size="sm" className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-primary">WhatsApp</h3>
                <p className="text-sm text-gray-600 font-secondary mb-3">Respuesta rápida</p>
                <a
                  href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me gustaría obtener información sobre sus servicios de audiología')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Escribir Mensaje
                </a>
              </div>

              {/* Calendar Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100/50 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon size="sm" className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-primary">Agendar Online</h3>
                <p className="text-sm text-gray-600 font-secondary mb-3">Disponible 24/7</p>
                {CONTACT_INFO.calendarBooking ? (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-block bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Agendar Cita
                  </button>
                ) : (
                  <span className="inline-block bg-gray-400 text-white text-sm font-medium px-4 py-2 rounded-lg">
                    Próximamente
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Calendar Booking Modal */}
      {CONTACT_INFO.calendarBooking && (
        <CalendarBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          calendarUrl={CONTACT_INFO.calendarBooking}
          serviceName="Consulta General"
        />
      )}
    </>
  );
}