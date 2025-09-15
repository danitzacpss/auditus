'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsGridProps } from '@/types/reviews-modal';
import { GoogleReviewCard } from '@/components/testimonials';
import { ReviewsLoadingState } from './ReviewsLoadingState';
import { ReviewsErrorState } from './ReviewsErrorState';
import { ReviewsEmptyState } from './ReviewsEmptyState';

const ReviewsGrid: React.FC<ReviewsGridProps> = ({
  reviews,
  isLoading = false,
  error = null,
  emptyStateMessage,
  className = '',
  onReviewClick,
}) => {
  const { t } = useTranslation('testimonials');

  // Loading State
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <ReviewsLoadingState count={9} />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <ReviewsErrorState
          title={t('modal.errorTitle')}
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Empty State
  if (reviews.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <ReviewsEmptyState
          title={t('modal.emptyStateTitle')}
          message={emptyStateMessage || t('modal.emptyStateMessage')}
        />
      </div>
    );
  }

  // Reviews Grid
  return (
    <div className={`w-full ${className}`}>
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`
              ${onReviewClick ? 'cursor-pointer' : ''}
              transition-all duration-200
              ${onReviewClick ? 'hover:scale-[1.02]' : ''}
            `}
            onClick={onReviewClick ? () => onReviewClick(review) : undefined}
            role={onReviewClick ? 'button' : undefined}
            tabIndex={onReviewClick ? 0 : undefined}
            onKeyDown={
              onReviewClick
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onReviewClick(review);
                    }
                  }
                : undefined
            }
            aria-label={
              onReviewClick
                ? t('modal.viewReviewDetail', { name: review.name })
                : undefined
            }
          >
            <GoogleReviewCard
              review={review}
              showSource={true}
              showTranslationToggle={true}
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Grid Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 font-secondary">
          {t('modal.showingReviews', {
            count: reviews.length,
          })}
        </p>
      </div>
    </div>
  );
};

export { ReviewsGrid };
export default ReviewsGrid;