'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icon';
import { PRESS_ARTICLES } from '@/data/constants';

const PressSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="prensa" className="pt-4 pb-8 lg:pt-6 lg:pb-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>Apariciones en Medios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            Reconocimiento{' '}
            <span className="text-primary-blue relative inline-block">
              Mediático
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

          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
            Nuestra experiencia y conocimiento reconocidos por los principales medios de comunicación.
            Compartiendo <strong className="text-gray-900">información valiosa</strong> para la comunidad sobre salud auditiva.
          </p>
        </div>

        {/* Press articles grid */}
        <div className="space-y-6 lg:space-y-8 max-w-5xl mx-auto">
          {PRESS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row h-full">
                {/* Media Image - Full width on mobile, left side on desktop */}
                <div className="w-full lg:w-1/3 flex-shrink-0 relative overflow-hidden rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl bg-white flex items-center justify-center">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={`Imagen de cobertura mediática: ${article.title}`}
                      width={320}
                      height={240}
                      className="w-full h-80 sm:h-80 lg:h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-80 sm:h-80 lg:h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>

                {/* Content - Right side */}
                <div className="lg:w-2/3 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                  {/* Publication badge and status */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2 shadow-sm border border-gray-200">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-600 shadow-md">
                          <span className="text-white font-bold text-xs font-primary">C9</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-900 font-primary">{article.publication}</p>
                          <p className="text-xs text-gray-600 font-secondary">{formatDate(article.date)}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-full p-2 border border-green-200">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckIcon size="sm" className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="bg-blue-50 rounded-xl p-2 border border-blue-100">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        <span className="text-xs text-blue-700 font-secondary font-medium">
                          {article.category === 'health' ? 'Salud Auditiva' :
                           article.category === 'awareness' ? 'Prevención y Concienciación' :
                           'Información Médica'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Article content */}
                  <div className="flex-1 mb-4">
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 font-primary mb-2 leading-tight group-hover:text-blue-700 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 font-secondary leading-relaxed text-sm lg:text-base">
                      {article.description}
                    </p>
                  </div>

                  {/* CTA button */}
                  <div className="pt-3 border-t border-gray-100">
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex w-full sm:w-auto"
                    >
                      <button className="btn-primary w-full sm:w-auto text-xs lg:text-sm flex items-center justify-center space-x-2 group-hover/link:bg-blue-700 transition-all duration-300 px-4 py-2">
                        <span>Ver Artículo Completo</span>
                        <ArrowRightIcon
                          size="sm"
                          className="group-hover/link:translate-x-1 transition-transform duration-300"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Press credibility indicator */}
              <div className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </article>
          ))}
        </div>

        {/* Press credibility section */}
        <div className="mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 rounded-2xl p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2 font-primary text-lg">
                  Expertos Reconocidos en Salud Auditiva
                </h4>
                <p className="text-blue-800 font-secondary leading-relaxed">
                  <strong>Centro Auditus</strong> es consultado regularmente por medios especializados para aportar
                  conocimiento experto en temas de salud auditiva. Nuestro compromiso es educar y concienciar a la
                  comunidad sobre la importancia del <strong>cuidado auditivo preventivo</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Media contact CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 text-sm text-gray-600 font-secondary">
            <div className="flex items-center space-x-2">
              <CheckIcon size="sm" className="text-green-500" />
              <span>Consultas de Medios</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon size="sm" className="text-green-500" />
              <span>Información Especializada</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckIcon size="sm" className="text-green-500" />
              <span>Evidencia Científica</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;