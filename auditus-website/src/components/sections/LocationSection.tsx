'use client';

import React from 'react';
import {
  LocationIcon,
  ClockIcon,
  PhoneIcon,
  EmailIcon,
  ArrowRightIcon,
  InstagramIcon,
  FacebookIcon
} from '@/components/ui/Icon';
import ContactForm from '@/components/forms/ContactForm';
import { CONTACT_INFO } from '@/data/constants';

export default function LocationSection() {
  const openGoogleMaps = () => {
    if (typeof window !== 'undefined') {
      const url = "https://maps.app.goo.gl/PPzuQeh5kFkF9HHe7";
      window.open(url, '_blank');
    }
  };

  return (
    <section className="pt-8 pb-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Contacto y Ubicación</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-primary leading-tight">
            Contáctanos y{' '}
            <span className="text-primary-blue relative inline-block">
              Visítanos
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
            Completa nuestro formulario o visita nuestra consulta en el centro de Concepción
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 font-primary mb-2">
                  Envíanos un Mensaje
                </h3>
                <p className="text-gray-600 font-secondary">
                  Completa el formulario y nos pondremos en contacto contigo en el menor tiempo posible.
                </p>
              </div>

              <ContactForm />
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

              <div className="space-y-3 text-sm text-gray-600 mb-6">
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
                  <span>Ascensor disponible para personas con movilidad reducida</span>
                </div>
              </div>

              {/* Get Directions Button */}
              <button
                onClick={openGoogleMaps}
                className="w-full bg-primary-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                aria-label="Ver en el mapa en Google Maps"
              >
                <LocationIcon size="sm" className="text-white" />
                <span>Ver en el Mapa</span>
                <ArrowRightIcon size="sm" className="text-white" />
              </button>
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
                  <span className="text-red-600 font-semibold">Urgencias</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium">
                  💡 Recomendamos agendar con anticipación para garantizar disponibilidad
                </p>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PhoneIcon size="md" className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">Contacto Rápido</h3>
                  <p className="text-gray-600 font-secondary text-sm">
                    ¿Tienes dudas sobre cómo llegar? Contáctanos
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Teléfono</span>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-primary-blue font-semibold hover:text-primary-700 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-medium">Email</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-primary-blue font-semibold hover:text-primary-700 transition-colors text-sm"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-blue-800 text-sm font-medium">
                  💡 Respuesta garantizada en menos de 30 minutos
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Social Media Section - Full Width */}
        <div className="mt-12">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-primary mb-2">Síguenos en Nuestras Redes Sociales</h3>
              <p className="text-gray-600 font-secondary text-sm">
                Mantente conectado y conoce más sobre salud auditiva
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
              {CONTACT_INFO.social?.instagram && (
                <a
                  href={`https://instagram.com/${CONTACT_INFO.social.instagram.startsWith('@') ? CONTACT_INFO.social.instagram.slice(1) : CONTACT_INFO.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 flex-1"
                  aria-label={`Síguenos en Instagram: ${CONTACT_INFO.social.instagram}`}
                >
                  <InstagramIcon size="md" className="text-white" />
                  <div className="text-left">
                    <div className="font-bold">Instagram</div>
                    <div className="text-sm opacity-90">{CONTACT_INFO.social.instagram}</div>
                  </div>
                  <ArrowRightIcon size="sm" className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              )}

              {CONTACT_INFO.social?.facebook && (
                <a
                  href={`https://facebook.com/${CONTACT_INFO.social.facebook.replace(' ', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-3 flex-1"
                  aria-label={`Síguenos en Facebook: ${CONTACT_INFO.social.facebook}`}
                >
                  <FacebookIcon size="md" className="text-white" />
                  <div className="text-left">
                    <div className="font-bold">Facebook</div>
                    <div className="text-sm opacity-90">{CONTACT_INFO.social.facebook}</div>
                  </div>
                  <ArrowRightIcon size="sm" className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </a>
              )}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">💡</span>
                </div>
                <div className="text-center">
                  <p className="text-blue-800 font-medium text-sm">
                    <strong>Tips de salud auditiva</strong> y contenido educativo en nuestras redes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 font-primary mb-4">
                Ubicación de la Consulta
              </h3>
              <p className="text-gray-600 font-secondary">
                Haz clic en el mapa para abrir en Google Maps y obtener direcciones
              </p>
            </div>

            {/* Interactive Google Maps */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.123!2d-73.0504123!3d-36.8264456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5e6c0123456%3A0x789abcdef0123456!2sAn%C3%ADbal%20Pinto%20486%2C%20Concepci%C3%B3n%2C%20Regi%C3%B3n%20del%20Biob%C3%ADo%2C%20Chile!5e0!3m2!1ses!2scl!4v1732645890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                  title="Ubicación Centro Auditus"
                ></iframe>
                <div
                  className="absolute inset-0 bg-transparent rounded-2xl cursor-pointer"
                  onClick={openGoogleMaps}
                  aria-label="Abrir en Google Maps"
                ></div>
              </div>
            </div>

            {/* Quick directions button */}
            <div className="text-center mt-6">
              <button
                onClick={openGoogleMaps}
                className="bg-primary-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 inline-flex items-center space-x-2"
                aria-label="Obtener direcciones en Google Maps"
              >
                <LocationIcon size="sm" className="text-white" />
                <span>Ver en Google Maps</span>
                <ArrowRightIcon size="sm" className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}