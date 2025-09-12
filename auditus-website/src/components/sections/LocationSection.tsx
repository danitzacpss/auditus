'use client';

import React, { useEffect, useState } from 'react';
import { 
  LocationIcon, 
  ClockIcon, 
  PhoneIcon, 
  EmailIcon,
  ArrowRightIcon
} from '@/components/ui/Icon';
import GoogleMap from '@/components/ui/GoogleMap';

export default function LocationSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Business location coordinates
  const businessLocation = {
    lat: -36.8264923,
    lng: -73.0495834
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openGoogleMaps = () => {
    if (isMounted && typeof window !== 'undefined') {
      const url = "https://maps.app.goo.gl/PPzuQeh5kFkF9HHe7";
      window.open(url, '_blank');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Nuestra Ubicación</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-primary leading-tight">
            Ubicación{' '}
            <span className="text-primary-blue relative inline-block">
              Estratégica
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
          
          <p className="text-xl text-gray-700 font-secondary max-w-3xl mx-auto leading-relaxed">
            En el corazón de Concepción, fácil acceso para tu comodidad y tranquilidad
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Google Maps Embed */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">
                  Encuéntranos Fácilmente
                </h3>
                <p className="text-gray-600 font-secondary text-sm">
                  Haz clic en el mapa para abrir en Google Maps y obtener direcciones
                </p>
              </div>
              
              {/* Interactive Google Maps */}
              <GoogleMap
                center={businessLocation}
                zoom={16}
                className="transition-all duration-300 hover:scale-[1.02]"
                onMapClick={openGoogleMaps}
                showMarker={true}
                markerTitle="Centro Auditus - Lavado de Oídos en Concepción"
                height="300px"
              />
              
              {/* Quick directions button */}
              <button
                onClick={isMounted ? openGoogleMaps : undefined}
                disabled={!isMounted}
                className="w-full mt-4 bg-primary-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                aria-label={isMounted ? "Obtener direcciones en Google Maps" : undefined}
              >
                <LocationIcon size="sm" className="text-white" />
                <span>Obtener Direcciones</span>
                <ArrowRightIcon size="sm" className="text-white" />
              </button>
            </div>
          </div>

          {/* Location Information */}
          <div className="order-1 lg:order-2 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <LocationIcon size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">Dirección</h3>
                  <address className="text-gray-700 font-secondary not-italic leading-relaxed">
                    <strong className="text-primary-blue">Aníbal Pinto 486</strong><br />
                    Oficina 403, Piso 4<br />
                    Concepción, Región del Biobío<br />
                    Chile
                  </address>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Centro de Concepción</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fácil acceso en transporte público</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Estacionamiento disponible</span>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-secondary-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClockIcon size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">Horarios de Atención</h3>
                  <p className="text-gray-600 font-secondary text-sm">
                    Atendemos con cita previa
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-700 font-medium">Lunes - Viernes</span>
                  <span className="text-primary-blue font-semibold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-700 font-medium">Sábados</span>
                  <span className="text-primary-blue font-semibold">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">Domingos</span>
                  <span className="text-gray-500">Cerrado</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium">
                  💡 Recomendamos agendar con anticipación para garantizar disponibilidad
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-primary-blue to-secondary-turquoise rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4 font-primary">Contacto Rápido</h3>
              <p className="text-blue-100 mb-6 font-secondary">
                ¿Tienes dudas sobre cómo llegar? Contáctanos
              </p>
              
              <div className="space-y-4">
                <a 
                  href="tel:+56412345678" 
                  className="flex items-center space-x-3 text-white hover:text-blue-100 transition-colors duration-200"
                  aria-label="Llamar a Centro Auditus"
                >
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <PhoneIcon size="sm" className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">+56 41 234 5678</div>
                    <div className="text-sm text-blue-100">Llamar ahora</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:contacto@centroauditus.cl" 
                  className="flex items-center space-x-3 text-white hover:text-blue-100 transition-colors duration-200"
                  aria-label="Enviar email a Centro Auditus"
                >
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <EmailIcon size="sm" className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">contacto@centroauditus.cl</div>
                    <div className="text-sm text-blue-100">Enviar consulta</div>
                  </div>
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                <a 
                  href="/contacto"
                  className="inline-flex items-center justify-center w-full bg-white text-primary-blue hover:bg-gray-100 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Agendar Cita Online
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Information */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 font-primary mb-6 text-center">
              Cómo Llegar
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* By Public Transport */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🚌</div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-primary mb-3">Transporte Público</h4>
                <ul className="text-gray-600 font-secondary text-sm space-y-1">
                  <li>• Micro: Líneas que pasan por Aníbal Pinto</li>
                  <li>• Metro: Estación Plaza de la Independencia</li>
                  <li>• Colectivos: Línea Centro</li>
                </ul>
              </div>

              {/* By Car */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🚗</div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-primary mb-3">En Automóvil</h4>
                <ul className="text-gray-600 font-secondary text-sm space-y-1">
                  <li>• Estacionamiento disponible</li>
                  <li>• Acceso desde Autopista A-160</li>
                  <li>• Centro de Concepción</li>
                </ul>
              </div>

              {/* Walking */}
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl">🚶‍♂️</div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 font-primary mb-3">Caminando</h4>
                <ul className="text-gray-600 font-secondary text-sm space-y-1">
                  <li>• 5 min desde Plaza de Armas</li>
                  <li>• 10 min desde Universidad de Concepción</li>
                  <li>• Zona peatonal accesible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}