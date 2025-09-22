'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CheckIcon, StarIcon, PhoneIcon, CalendarIcon } from '@/components/ui/Icon';
import { CalendarBookingModal } from '@/components/ui';
import { CONTACT_INFO } from '@/data/constants';
import type { Professional } from '@/types';

interface ProfessionalPageClientProps {
  professional: Professional & {
    id: string;
    slug: string;
    photo?: string;
    yearsExperience: number;
    satisfaction: number;
  };
}

export default function ProfessionalPageClient({ professional }: ProfessionalPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhoneCall = () => {
    if (CONTACT_INFO.phone) {
      window.open(`tel:${CONTACT_INFO.phone}`, '_self');
    }
  };

  return (
    <>
      {/* Sidebar con información básica */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24">

          {/* Foto del profesional */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <Image
                src="/images/valeska-campos-profesional.jpg"
                alt={`${professional.name}, ${professional.title} en Centro Auditus`}
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover shadow-lg border-4 border-white"
                priority
              />

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
            {CONTACT_INFO.calendarBooking ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary w-full flex items-center justify-center space-x-2 hover:transform hover:scale-105 transition-all duration-200"
              >
                <CalendarIcon size="sm" />
                <span>Agendar Cita</span>
              </button>
            ) : (
              <button className="btn-primary w-full flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed">
                <CalendarIcon size="sm" />
                <span>Agendar Cita</span>
              </button>
            )}

            <button
              onClick={handlePhoneCall}
              className="btn-secondary w-full flex items-center justify-center space-x-2 hover:transform hover:scale-105 transition-all duration-200"
            >
              <PhoneIcon size="sm" />
              <span>Llamar Ahora</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Booking Modal */}
      {CONTACT_INFO.calendarBooking && (
        <CalendarBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          calendarUrl={CONTACT_INFO.calendarBooking}
          serviceName={`Consulta con ${professional.name.split(' ')[0]}`}
        />
      )}
    </>
  );
}