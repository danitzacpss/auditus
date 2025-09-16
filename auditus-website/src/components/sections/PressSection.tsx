'use client';
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui';
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
    <section id="prensa" className="pt-4 pb-16 lg:pt-6 lg:pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="professional-badge inline-flex items-center gap-2 text-sm font-medium font-secondary mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>Apariciones en Medios</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            Reconocimiento{' '}
            <span className="text-primary-600 relative inline-block">
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PRESS_ARTICLES.map((article) => (
            <Card
              key={article.id}
              className="professional-card group relative hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border border-gray-200 hover:border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden"
            >
              <CardContent className="p-8 h-full flex flex-col relative">

                {/* Press source badge */}
                <div className="mb-6 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-600 shadow-lg">
                        <span className="text-white font-bold text-lg font-primary">C9</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 font-primary">{article.publication}</p>
                        <p className="text-xs text-gray-500 font-secondary">{formatDate(article.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon size="sm" className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article content */}
                <div className="mb-6 flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 font-primary mb-4 leading-tight line-clamp-3">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 font-secondary mb-4 leading-relaxed line-clamp-3">
                    {article.description}
                  </p>

                  {/* Category badge */}
                  <div className="bg-gray-50 rounded-2xl p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-secondary font-medium capitalize">
                        {article.category === 'health' ? 'Salud Auditiva' :
                         article.category === 'awareness' ? 'Prevención y Concienciación' :
                         'Información Médica'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA button */}
                <div className="space-y-3">
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link w-full"
                  >
                    <button className="btn-primary w-full text-sm flex items-center justify-center space-x-2 group-hover/link:bg-primary-700 transition-colors">
                      <span>Ver Artículo Completo</span>
                      <ArrowRightIcon
                        size="sm"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </Link>
                </div>

                {/* Press credibility indicator */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
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