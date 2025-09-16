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
      <section className="pt-8 pb-4 lg:pt-12 lg:pb-6">
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


        </div>
      </section>

    </>
  );
};

export default TestimonialsSectionWithModal;