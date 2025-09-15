'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsRatingFilterProps, RatingChipProps } from '@/types/reviews-modal';
import { StarIcon } from '@/components/ui/Icon';

const RatingChip: React.FC<RatingChipProps> = ({
  rating,
  count,
  isSelected,
  onClick,
  className = '',
}) => {
  const { t } = useTranslation('testimonials');

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-medium font-secondary transition-all duration-200
        border focus:outline-none focus:ring-4 focus:ring-blue-200
        ${isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400 hover:bg-gray-50 shadow-sm'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-pressed={isSelected}
      aria-label={t('modal.filterByRating', { rating, count })}
      type="button"
    >
      {/* Stars */}
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon
            key={i}
            size="sm"
            className={`
              ${isSelected
                ? 'text-yellow-300 fill-current'
                : 'text-yellow-400 fill-current'
              }
            `}
          />
        ))}
      </div>

      {/* Count */}
      <span className="min-w-0 flex-shrink-0">
        ({count})
      </span>
    </button>
  );
};

const ReviewsRatingFilter: React.FC<ReviewsRatingFilterProps> = ({
  selectedRating,
  onRatingChange,
  reviewCounts,
  className = '',
  disabled = false,
}) => {
  const { t } = useTranslation('testimonials');

  const handleRatingClick = (rating: number) => {
    if (disabled) return;
    onRatingChange(selectedRating === rating ? null : rating);
  };

  const handleShowAll = () => {
    if (disabled) return;
    onRatingChange(null);
  };

  const totalReviews = Object.values(reviewCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Filter Label */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 font-primary">
          {t('modal.filterByRating')}
        </h3>

        {/* Show All Button */}
        {selectedRating !== null && (
          <button
            onClick={handleShowAll}
            disabled={disabled}
            className={`
              text-xs text-blue-600 hover:text-blue-700
              font-medium transition-colors underline underline-offset-2
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            type="button"
          >
            {t('modal.showAll')}
          </button>
        )}
      </div>

      {/* Rating Chips */}
      <div className="flex flex-wrap gap-2">
        {/* All Reviews Chip */}
        <button
          onClick={handleShowAll}
          disabled={disabled}
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            text-sm font-medium font-secondary transition-all duration-200
            border focus:outline-none focus:ring-4 focus:ring-primary-200
            ${selectedRating === null
              ? 'bg-primary-600 text-white border-primary-600 shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-pressed={selectedRating === null}
          aria-label={t('modal.showAllReviews', { count: totalReviews })}
          type="button"
        >
          <span>{t('modal.allRatings')}</span>
          <span className="min-w-0 flex-shrink-0">
            ({totalReviews})
          </span>
        </button>

        {/* Individual Rating Chips */}
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = reviewCounts[rating] || 0;

          // Only show ratings that have reviews
          if (count === 0) return null;

          return (
            <RatingChip
              key={rating}
              rating={rating}
              count={count}
              isSelected={selectedRating === rating}
              onClick={() => handleRatingClick(rating)}
              className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
            />
          );
        })}
      </div>

      {/* Active Filter Info */}
      {selectedRating !== null && (
        <div className="text-xs text-gray-600 font-secondary">
          {t('modal.showingRatingFilter', {
            rating: selectedRating,
            count: reviewCounts[selectedRating] || 0,
          })}
        </div>
      )}

      {/* No Results Warning */}
      {selectedRating !== null && (reviewCounts[selectedRating] || 0) === 0 && (
        <div className="text-xs text-amber-600 font-secondary bg-amber-50 px-3 py-2 rounded-lg">
          {t('modal.noReviewsForRating', { rating: selectedRating })}
        </div>
      )}
    </div>
  );
};

export { ReviewsRatingFilter };
export default ReviewsRatingFilter;