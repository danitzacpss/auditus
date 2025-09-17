import React from 'react';
import Link from 'next/link';
import { LocationIcon, PhoneIcon, EmailIcon, ClockIcon, WhatsAppIcon } from '@/components/ui/Icon';
import { CONTACT_INFO, NAVIGATION, SITE_CONFIG, BUSINESS_HOURS, SERVICES, PROFESSIONAL_INFO } from '@/data/constants';
import { getWhatsAppUrl, formatPhoneNumber } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative text-white overflow-hidden" style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #312e81 50%, #0e7490 75%, #155e75 100%)'}}>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main footer content */}
        <div className="py-6 lg:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

            {/* Company branding section */}
            <div className="lg:col-span-5">
              {/* Logo and brand */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                      <span className="text-white font-bold text-2xl font-primary">A</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold font-primary text-white">
                      Centro Auditus
                    </h2>
                    <p className="text-cyan-300 font-medium font-secondary">
                      Cuidado Auditivo Profesional
                    </p>
                  </div>
                </div>

                <p className="text-gray-200 font-secondary leading-relaxed mb-6 max-w-lg">
                  Centro especializado en diagnóstico y cuidado auditivo profesional en Concepción.
                </p>

                {/* Google Maps */}
                <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-3 border border-blue-400/30">
                  <h4 className="text-sm font-semibold text-white mb-2 font-primary">Nuestra Ubicación</h4>
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.123!2d-73.0504123!3d-36.8264456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5e6c0123456%3A0x789abcdef0123456!2sAn%C3%ADbal%20Pinto%20486%2C%20Concepci%C3%B3n%2C%20Regi%C3%B3n%20del%20Biob%C3%ADo%2C%20Chile!5e0!3m2!1ses!2scl!4v1732645890"
                      width="100%"
                      height="140"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title="Ubicación Centro Auditus"
                    ></iframe>
                    <div className="absolute inset-0 bg-blue-500/10 rounded-lg pointer-events-none"></div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 font-secondary">
                    Aníbal Pinto 486, Oficina 403, Concepción
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <div className="bg-blue-800/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30 h-fit">
                <h3 className="text-lg font-bold font-primary text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Navegación
                </h3>
                <nav className="space-y-3">
                  {NAVIGATION.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-gray-100 hover:text-cyan-300 transition-all duration-200 font-secondary"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-600 group-hover:bg-primary-500 rounded-full mr-3 transition-colors"></span>
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="ml-6 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-center text-gray-200 hover:text-cyan-200 transition-all duration-200 font-secondary text-sm"
                            >
                              <span className="w-1 h-1 bg-gray-500 group-hover:bg-primary-400 rounded-full mr-3 transition-colors"></span>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-blue-800/30 to-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
                <h3 className="text-lg font-bold font-primary text-white mb-6 flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  Información de Contacto
                </h3>
                <div className="space-y-5">

                  {/* Address */}
                  <div className="group flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                      <LocationIcon size="sm" className="text-primary-400" />
                    </div>
                    <div className="text-gray-100 font-secondary">
                      <p className="font-medium text-white">{CONTACT_INFO.address.street}</p>
                      <p className="text-sm text-gray-200">{CONTACT_INFO.address.office}</p>
                      <p className="text-sm text-gray-200">{CONTACT_INFO.address.city}, {CONTACT_INFO.address.region}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <Link
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="flex items-center space-x-4 hover:bg-gray-700/30 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-10 h-10 bg-secondary-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-500/30 transition-colors">
                        <PhoneIcon size="sm" className="text-secondary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white font-secondary">
                          {formatPhoneNumber(CONTACT_INFO.phone)}
                        </p>
                        <p className="text-xs text-gray-300">Llámanos directamente</p>
                      </div>
                    </Link>
                  </div>

                  {/* Email */}
                  <div className="group">
                    <Link
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="flex items-center space-x-4 hover:bg-gray-700/30 rounded-xl p-2 -m-2 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/30 transition-colors">
                        <EmailIcon size="sm" className="text-primary-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white font-secondary break-all">
                          {CONTACT_INFO.email}
                        </p>
                        <p className="text-xs text-gray-300">Envíanos un correo</p>
                      </div>
                    </Link>
                  </div>

                  {/* Business hours */}
                  <div className="group">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-secondary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ClockIcon size="sm" className="text-secondary-400" />
                      </div>
                      <div className="text-gray-100 font-secondary">
                        <p className="font-medium text-white mb-2">Horarios</p>
                        <p className="text-sm text-gray-200">{CONTACT_INFO.hours.weekdays}</p>
                        <p className="text-sm text-gray-200">{CONTACT_INFO.hours.saturday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Section - Valeska */}
            <div className="lg:col-span-12 mt-4 pt-4 border-t border-blue-400/20">
              <div className="bg-gradient-to-br from-blue-800/30 to-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">

                  {/* Professional Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg font-primary">V</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-primary">
                        {PROFESSIONAL_INFO.name}
                      </h3>
                      <p className="text-cyan-300 font-medium font-secondary text-sm">
                        {PROFESSIONAL_INFO.title} • {PROFESSIONAL_INFO.experience}
                      </p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-center space-x-3">
                    <p className="text-gray-200 font-secondary text-sm mr-2">Síguenos:</p>
                    {CONTACT_INFO.social?.instagram && (
                      <Link
                        href={`https://instagram.com/${CONTACT_INFO.social.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-9 h-9 bg-gray-800/80 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label="Síguenos en Instagram"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </Link>
                    )}

                    {CONTACT_INFO.social?.facebook && (
                      <Link
                        href={`https://facebook.com/${CONTACT_INFO.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-9 h-9 bg-gray-800/80 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                        aria-label="Síguenos en Facebook"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </Link>
                    )}

                    <Link
                      href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa conocer más sobre sus servicios')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-9 h-9 bg-gray-800/80 hover:bg-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="Contáctanos por WhatsApp"
                    >
                      <WhatsAppIcon size="sm" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright and Legal - Integrated */}
            <div className="lg:col-span-12 pt-4 border-t border-blue-400/20">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">

                {/* Copyright */}
                <div className="text-center lg:text-left">
                  <p className="text-gray-200 font-secondary text-sm">
                    © {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.
                  </p>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-4 text-sm">
                  <Link
                    href="/politica-privacidad"
                    className="text-gray-200 hover:text-cyan-300 transition-colors font-secondary hover:underline underline-offset-4"
                  >
                    Política de Privacidad
                  </Link>
                  <Link
                    href="/terminos-condiciones"
                    className="text-gray-200 hover:text-cyan-300 transition-colors font-secondary hover:underline underline-offset-4"
                  >
                    Términos y Condiciones
                  </Link>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="text-xs">Hecho en Chile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;