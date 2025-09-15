'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsEmptyStateProps } from '@/types/reviews-modal';

const ReviewsEmptyState: React.FC<ReviewsEmptyStateProps> = ({
  title,
  message,
  icon,
  action,
  className = '',
}) => {
  const { t } = useTranslation('testimonials');

  const DefaultIcon = () => (
    <svg
      className="w-16 h-16 mx-auto text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="text-center py-12 px-6 max-w-sm mx-auto">
        {/* Icon */}
        <div className="mb-6">
          {icon || <DefaultIcon />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 font-primary">
          {title || t('modal.emptyStateTitle')}
        </h3>

        {/* Message */}
        <p className="text-gray-600 mb-6 font-secondary leading-relaxed">
          {message || t('modal.emptyStateMessage')}
        </p>

        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className="
              inline-flex items-center gap-2 px-6 py-3
              bg-primary-600 hover:bg-primary-700 text-white
              rounded-xl text-sm font-medium font-secondary
              transition-all duration-200 transform hover:-translate-y-0.5
              focus:outline-none focus:ring-4 focus:ring-primary-200
              shadow-md hover:shadow-lg
            "
            type="button"
          >
            {action.label}
          </button>
        )}

        {/* Helpful Tips */}
        <div className="mt-8 space-y-2 text-sm text-gray-500 font-secondary">
          <p>{t('modal.emptyStateTips.searchTips')}</p>
          <p>{t('modal.emptyStateTips.filterTips')}</p>
        </div>
      </div>
    </div>
  );
};

export { ReviewsEmptyState };
export default ReviewsEmptyState;