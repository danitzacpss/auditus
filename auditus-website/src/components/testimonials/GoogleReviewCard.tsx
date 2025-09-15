'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui';
import { StarIcon, CheckIcon } from '@/components/ui/Icon';
import { EnhancedTestimonial } from '@/types/google-reviews';

interface GoogleReviewCardProps {
  review: EnhancedTestimonial;
  className?: string;
  showSource?: boolean;
  showTranslationToggle?: boolean;
}

const GoogleReviewCard: React.FC<GoogleReviewCardProps> = ({
  review,
  className = '',
  showSource = true,
  showTranslationToggle = false
}) => {
  const { t } = useTranslation('testimonials');
  // Determine language and content state
  const hasOriginalText = Boolean(review.originalText?.trim());
  const originalLanguage = review.originalLanguage?.toLowerCase();
  const isSpanishOriginal = originalLanguage === 'es' || originalLanguage === 'es-cl' || originalLanguage === 'es-es' || originalLanguage?.includes('es');
  const isEnglishOriginal = originalLanguage === 'en' || originalLanguage === 'en-us' || originalLanguage?.includes('en');

  // Always prioritize Spanish content
  const [showOriginal, setShowOriginal] = useState(isSpanishOriginal);

  // Smart text display logic - prioritize Spanish content
  const displayText = (() => {
    // If we have Spanish original text, always use it
    if (hasOriginalText && isSpanishOriginal) {
      return review.originalText;
    }

    // If main content exists and original is English, prefer main content (likely translated to Spanish)
    if (isEnglishOriginal && review.content) {
      return showOriginal ? review.originalText : review.content;
    }

    // If we have original text in any other language, let user toggle
    if (hasOriginalText && originalLanguage && !isSpanishOriginal) {
      return showOriginal ? review.originalText : review.content;
    }

    // Fallback to main content
    return review.content;
  })();

  // Determine if we need language indicator
  const needsLanguageIndicator = hasOriginalText && !isSpanishOriginal && showOriginal;

  // Format date for display
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return dateString;
    }
  };

  // Get relative time or formatted date
  const getDisplayDate = (): string => {
    if (review.source === 'google' && review.relativePublishTime) {
      return review.relativePublishTime;
    }
    return formatDate(review.date);
  };

  // Get author initials
  const getAuthorInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card
      className={`group relative bg-white hover:bg-gradient-to-br hover:from-white hover:to-primary-50
        border border-gray-200 hover:border-primary-200 shadow-lg hover:shadow-2xl
        transition-all duration-300 hover:-translate-y-1 rounded-3xl overflow-hidden ${className}`}
    >
      <CardContent className="p-8 h-full flex flex-col relative">

        {/* Quote icon */}
        <div className="absolute top-4 right-4 opacity-10">
          <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Source badge */}
        {showSource && review.source === 'google' && (
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium font-secondary mb-4 self-start">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{t('googleReviews.from')}</span>
          </div>
        )}

        {/* Service badge */}
        {review.service && (
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium font-secondary mb-4 self-start">
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            <span>{review.service}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon key={i} size="sm" className="text-yellow-400 fill-current" />
          ))}
          {Array.from({ length: 5 - review.rating }).map((_, i) => (
            <StarIcon key={`empty-${i}`} size="sm" className="text-gray-300" />
          ))}
          <span className="text-sm text-gray-600 ml-2 font-secondary">
            {t('rating', { rating: review.rating })}
          </span>
        </div>

        {/* Review content */}
        <blockquote className="text-gray-700 font-secondary mb-6 leading-relaxed flex-1 relative z-10">
          &ldquo;{displayText}&rdquo;
        </blockquote>

        {/* Language indicator for non-Spanish originals */}
        {needsLanguageIndicator && (
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-2 py-1 rounded text-xs font-medium mb-3 self-start">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.765l-.723 1.447a1 1 0 11-1.79-.895l.99-1.98a.869.869 0 01.02-.037l2.991-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
            </svg>
            <span>{t('googleReviews.originallyIn', { language: review.originalLanguage?.toUpperCase() })}</span>
          </div>
        )}

        {/* Translation toggle - only for non-Spanish content */}
        {showTranslationToggle && hasOriginalText && !isSpanishOriginal && (
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium mb-4 self-start transition-colors underline"
            aria-label={showOriginal ? t('googleReviews.showTranslation') : t('googleReviews.showOriginal')}
          >
            {showOriginal
              ? t('googleReviews.showTranslation')
              : t('googleReviews.showOriginal')
            }
          </button>
        )}

        {/* Author info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {/* Author photo or initials */}
            {review.authorPhoto ? (
              <Image
                src={review.authorPhoto}
                alt={review.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}

            <div className={`w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center ${review.authorPhoto ? 'hidden' : ''}`}>
              <span className="text-primary-700 font-bold text-sm font-primary">
                {getAuthorInitials(review.name)}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 font-primary text-sm">
                {review.name}
              </h4>
              <p className="text-xs text-gray-600 font-secondary">
                {getDisplayDate()}
              </p>
            </div>
          </div>

          {/* Verified badge */}
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
            <CheckIcon size="sm" />
            <span className="text-xs font-medium font-secondary">
              {review.source === 'google' ? t('googleReviews.verifiedByGoogle') : t('verified')}
            </span>
          </div>
        </div>

        {/* Google-specific indicators */}
        {review.source === 'google' && (
          <div className="absolute bottom-2 right-2 opacity-60">
            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleReviewCard;