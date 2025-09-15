'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon, CheckIcon } from '@/components/ui/Icon';
import { TestimonialsCarousel } from '@/components/testimonials';
import useGoogleReviews from '@/hooks/useGoogleReviews';

const TestimonialsSectionWithModal: React.FC = () => {
  const { t } = useTranslation('testimonials');

  const {
    googleReviews,
    isLoading,
    error,
    actions: { retry, clearCache, fetchReviews }
  } = useGoogleReviews({
    hybridMode: false,
    autoFetch: true,
    sortOptions: { field: 'date', order: 'desc' },
    filters: { minRating: 1 }, // Show all reviews to get the 23 reviews
    config: {
      maxReviews: 50 // Test if Google returns more than 20 reviews
    }
  });

  // Show only first 5 reviews in the carousel
  const displayedReviews = googleReviews.slice(0, 5);



  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Testimonials Carousel */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl h-64 mb-4"></div>
                <div className="bg-gray-200 rounded-full h-4 w-32 mx-auto"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-red-600 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">{t('loadingStates.error')}</h3>
                <p className="text-red-600 mb-4 text-sm">{error}</p>
                <button
                  onClick={retry}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('loadingStates.retry')}
                </button>
              </div>
            </div>
          ) : googleReviews.length > 0 ? (
            <TestimonialsCarousel
              reviews={displayedReviews}
              autoPlay={true}
              interval={4000}
              showArrows={true}
              showDots={true}
              className="mb-16"
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">{t('loadingStates.noReviews')}</p>
            </div>
          )}


          {/* Trust metrics */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">

            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                <defs>
                  <pattern id="trust-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M10 2 L10 18 M2 10 L18 10" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="10" cy="10" r="1" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#trust-pattern)" />
              </svg>
            </div>

            <div className="relative text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-4">
                  <CheckIcon size="sm" />
                  <span>{t('trustMetrics.trustAndSatisfaction')}</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-primary">
                  {t('trustMetrics.title')}
                </h3>

                <p className="text-primary-100 mb-8 font-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                  {t('trustMetrics.subtitle')} {t('trustMetrics.description', { excellence: t('trustMetrics.excellence') })}
                </p>
              </div>

              {/* Trust statistics */}
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold font-primary mb-2">5.0</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size="sm" className="text-yellow-300 fill-current" />
                    ))}
                  </div>
                  <div className="text-primary-100 font-secondary text-sm">{t('trustMetrics.averageRating')}</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold font-primary mb-2">100%</div>
                  <div className="text-primary-100 font-secondary text-sm">{t('trustMetrics.patientSatisfaction')}</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold font-primary mb-2">5+</div>
                  <div className="text-primary-100 font-secondary text-sm">{t('trustMetrics.yearsOfExperience')}</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold font-primary mb-2">✓</div>
                  <div className="text-primary-100 font-secondary text-sm">{t('trustMetrics.certifiedProfessional')}</div>
                </div>
              </div>

              {/* Professional commitment */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="font-bold text-xl font-primary mb-3">{t('trustMetrics.ourCommitment')}</h4>
                <div className="grid md:grid-cols-2 gap-4 text-primary-100 font-secondary">
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>{t('trustMetrics.commitments.personalizedCare')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>{t('trustMetrics.commitments.modernTechnology')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>{t('trustMetrics.commitments.painFreeProcedures')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckIcon size="sm" />
                    <span>{t('trustMetrics.commitments.followUp')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional trust elements */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 font-secondary mb-4">
              {t('cta.question')}
            </p>
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 font-secondary">{t('cta.joinSatisfied')}</span>
              <CheckIcon size="sm" className="text-green-600" />
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default TestimonialsSectionWithModal;