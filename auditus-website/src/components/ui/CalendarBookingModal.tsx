'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icon';
import { cn } from '@/lib/utils';

interface CalendarBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calendarUrl: string;
  serviceName: string;
}

export default function CalendarBookingModal({
  isOpen,
  onClose,
  calendarUrl,
  serviceName
}: CalendarBookingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modal = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          'relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transition-all duration-300 border border-gray-200',
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-primary">
              Reservar Cita - {serviceName}
            </h2>
            <p className="text-gray-600 font-secondary mt-1">
              Selecciona el horario que mejor te convenga
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/80 transition-colors duration-200 group"
            aria-label="Cerrar modal"
          >
            <CloseIcon size="md" className="text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>

        {/* Calendar Content */}
        <div className="relative h-[600px] bg-white">
          {/* Loading State */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-secondary">Cargando calendario...</p>
            </div>
          </div>

          {/* Google Calendar Iframe */}
          <iframe
            src={calendarUrl}
            className="w-full h-full border-0"
            title="Reservar Cita"
            onLoad={(e) => {
              // Hide loading state when iframe loads
              const loadingDiv = e.currentTarget.parentElement?.querySelector('.absolute');
              if (loadingDiv) {
                (loadingDiv as HTMLElement).style.display = 'none';
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-600 font-secondary">
              <p>💡 <strong>Tip:</strong> Si tienes problemas con la reserva, también puedes contactarnos por WhatsApp</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-colors duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}