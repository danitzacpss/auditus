import React from 'react';
import Link from 'next/link';
import { LocationIcon, PhoneIcon, EmailIcon, ClockIcon, WhatsAppIcon } from '@/components/ui/Icon';
import { CONTACT_INFO, NAVIGATION, SITE_CONFIG, BUSINESS_HOURS } from '@/data/constants';
import { getWhatsAppUrl, formatPhoneNumber } from '@/lib/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-primary">Centro Auditus</h3>
                  <p className="text-gray-300 text-sm font-secondary">
                    Cuidado Auditivo Profesional
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 font-secondary max-w-md">
                Centro especializado en diagnóstico y cuidado auditivo profesional en Concepción. 
                Brindamos atención de calidad con tecnología moderna y procedimientos seguros.
              </p>

              {/* Social links - when available */}
              <div className="flex space-x-4">
                {CONTACT_INFO.social?.instagram && (
                  <Link
                    href={`https://instagram.com/${CONTACT_INFO.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </Link>
                )}
                
                {CONTACT_INFO.social?.facebook && (
                  <Link
                    href={`https://facebook.com/${CONTACT_INFO.social.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </Link>
                )}
                
                <Link
                  href={getWhatsAppUrl(CONTACT_INFO.whatsapp, 'Hola, me interesa conocer más sobre sus servicios')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size="sm" />
                </Link>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-primary">Navegación</h4>
              <nav className="space-y-3">
                {NAVIGATION.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors font-secondary block"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-gray-400 hover:text-gray-200 transition-colors font-secondary text-sm block"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-primary">Contacto</h4>
              <div className="space-y-4">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <LocationIcon size="sm" className="text-primary-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300 font-secondary">
                    <p>{CONTACT_INFO.address.street}</p>
                    <p>{CONTACT_INFO.address.office}</p>
                    <p>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.region}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3">
                  <PhoneIcon size="sm" className="text-primary-400 flex-shrink-0" />
                  <Link
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-gray-300 hover:text-white transition-colors font-secondary"
                  >
                    {formatPhoneNumber(CONTACT_INFO.phone)}
                  </Link>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <EmailIcon size="sm" className="text-primary-400 flex-shrink-0" />
                  <Link
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-gray-300 hover:text-white transition-colors font-secondary break-all"
                  >
                    {CONTACT_INFO.email}
                  </Link>
                </div>

                {/* Business hours */}
                <div className="flex items-start space-x-3">
                  <ClockIcon size="sm" className="text-primary-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-300 font-secondary">
                    <p className="font-medium mb-1">Horarios de atención:</p>
                    {BUSINESS_HOURS.structured.map(({ day, open, close }) => (
                      <p key={day} className="text-sm">
                        <span className="inline-block w-20">{day}:</span>
                        {open && close ? `${open} - ${close}` : 'Cerrado'}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-secondary">
                © {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs font-secondary mt-1">
                Desarrollado con tecnología moderna para tu comodidad
              </p>
            </div>

            {/* Legal links */}
            <div className="flex space-x-6 text-sm">
              <Link
                href="/politica-privacidad"
                className="text-gray-400 hover:text-white transition-colors font-secondary"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos-condiciones"
                className="text-gray-400 hover:text-white transition-colors font-secondary"
              >
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>

        {/* Professional registration info */}
        <div className="pb-6">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-gray-300 text-sm font-secondary">
              <strong className="text-white">Valeska Campos Sovino</strong> - Fonoaudióloga
            </p>
            <p className="text-gray-400 text-xs font-secondary mt-1">
              Registro Nacional de Prestadores Individuales • Universidad de Concepción
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;