'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsErrorStateProps } from '@/types/reviews-modal';

const ReviewsErrorState: React.FC<ReviewsErrorStateProps> = ({
  title,
  message,
  onRetry,
  className = '',
}) => {
  const { t } = useTranslation('testimonials');

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="text-red-600 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        {/* Error Title */}
        <h3 className="text-lg font-semibold text-red-800 mb-2 font-primary">
          {title || t('modal.errorTitle')}
        </h3>

        {/* Error Message */}
        <p className="text-red-600 mb-4 text-sm font-secondary leading-relaxed">
          {message}
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              inline-flex items-center gap-2 px-4 py-2
              bg-red-600 hover:bg-red-700 text-white
              rounded-lg text-sm font-medium font-secondary
              transition-colors duration-200
              focus:outline-none focus:ring-4 focus:ring-red-200
            "
            type="button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0V9a8 8 0 1115.356 2m-15.356 0H4"
              />
            </svg>
            {t('modal.retryButton')}
          </button>
        )}

        {/* Additional Help */}
        <div className="mt-4 text-xs text-red-600 font-secondary">
          {t('modal.errorHelpText')}
        </div>
      </div>
    </div>
  );
};

export { ReviewsErrorState };
export default ReviewsErrorState;