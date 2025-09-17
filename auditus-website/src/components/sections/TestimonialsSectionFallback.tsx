'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StarIcon, CheckIcon } from '@/components/ui/Icon';
import { GoogleReviewCard } from '@/components/testimonials';
import { ReviewsModal } from '@/components/reviews';
import { TESTIMONIALS } from '@/data/constants';
import { EnhancedTestimonial } from '@/types/google-reviews';

const TestimonialsSectionFallback: React.FC = () => {
  const { t } = useTranslation('testimonials');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert manual testimonials to enhanced format
  const manualReviews: EnhancedTestimonial[] = TESTIMONIALS.map((testimonial) => ({
    ...testimonial,
    source: 'manual' as const,
    verified: testimonial.verified || true
  }));

  // Show only first 3 reviews in the section
  const displayedReviews = manualReviews.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-6">
            <CheckIcon size="sm" />
            <span>{t('verifiedTestimonials')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight">
            {t('title')}
            <span className="text-primary-600 relative inline-block ml-3">
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary-200"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
              </svg>
            </span>
          </h2>

          <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
            {t('subtitle', { centerName: t('centerName') })}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayedReviews.map((review) => (
            <GoogleReviewCard
              key={review.id}
              review={review}
              showSource={false}
              showTranslationToggle={false}
            />
          ))}
        </div>

        {/* Ver todas las reseñas button */}
        {manualReviews.length > 3 && (
          <div className="text-center mb-16">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-semibold font-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t('reviewsModal.viewAllReviews')}</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {manualReviews.length}
              </span>
            </button>
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

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={manualReviews}
        title={t('reviewsModal.title')}
        showSearch={true}
        showRatingFilter={true}
        showPagination={true}
        itemsPerPage={9}
      />
    </section>
  );
};

export default TestimonialsSectionFallback;