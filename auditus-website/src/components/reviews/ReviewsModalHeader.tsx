'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsModalHeaderProps } from '@/types/reviews-modal';

const ReviewsModalHeader: React.FC<ReviewsModalHeaderProps> = ({
  title,
  onClose,
  reviewsCount,
  className = '',
}) => {
  const { t } = useTranslation('testimonials');

  return (
    <div className={`
      flex items-center justify-between p-6 border-b border-gray-200
      bg-gradient-to-r from-blue-100 to-indigo-100
      ${className}
    `}>
      {/* Title and Count */}
      <div className="flex flex-col">
        <h2
          id="reviews-modal-title"
          className="text-2xl sm:text-3xl font-bold text-gray-900 font-primary"
        >
          {title}
        </h2>
        {reviewsCount !== undefined && (
          <p
            id="reviews-modal-description"
            className="text-sm text-gray-700 font-secondary mt-1"
          >
            {t('modal.reviewsCount', { count: reviewsCount })}
          </p>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          flex items-center justify-center w-10 h-10
          bg-white hover:bg-gray-50
          border border-gray-300 hover:border-gray-400
          rounded-xl transition-all duration-200
          focus:outline-none focus:ring-4 focus:ring-blue-200
          group shadow-sm
        "
        aria-label={t('modal.closeModal')}
        type="button"
      >
        {/* X Icon */}
        <svg
          className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export { ReviewsModalHeader };
export default ReviewsModalHeader;