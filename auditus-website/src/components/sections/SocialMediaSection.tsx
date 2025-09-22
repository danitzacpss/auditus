'use client';

import React from 'react';
import { ArrowRightIcon, InstagramIcon, FacebookIcon } from '@/components/ui/Icon';
import { CONTACT_INFO } from '@/data/constants';

const SocialMediaSection: React.FC = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
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
      </div>
    </section>
  );
};

export default SocialMediaSection;