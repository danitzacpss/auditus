'use client';

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewsSearchProps } from '@/types/reviews-modal';

const ReviewsSearch: React.FC<ReviewsSearchProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  disabled = false,
}) => {
  const { t } = useTranslation('testimonials');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const defaultPlaceholder = t('modal.searchReviews');

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors ${
              disabled ? 'text-gray-300' : 'text-gray-500'
            }`}
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          disabled={disabled}
          className={`
            block w-full pl-12 pr-12 py-3 text-base
            bg-white border border-gray-300
            rounded-xl placeholder-gray-500 text-gray-900
            transition-all duration-200 font-secondary
            focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500
            ${disabled
              ? 'cursor-not-allowed opacity-50 bg-gray-50'
              : 'hover:border-gray-400'
            }
          `}
          aria-label={t('modal.searchLabel')}
          aria-describedby="search-description"
        />

        {/* Clear Button */}
        {value.length > 0 && !disabled && (
          <button
            onClick={handleClear}
            className="
              absolute inset-y-0 right-0 pr-4 flex items-center
              text-gray-500 hover:text-gray-700 transition-colors
              focus:outline-none focus:text-gray-700
            "
            aria-label={t('modal.clearSearch')}
            type="button"
          >
            <svg
              className="h-5 w-5"
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
        )}
      </div>

      {/* Search Description */}
      <p id="search-description" className="sr-only">
        {t('modal.searchDescription')}
      </p>

      {/* Search Tips */}
      {value.length === 0 && !disabled && (
        <div className="mt-2 text-xs text-gray-600 font-secondary">
          {t('modal.searchTips')}
        </div>
      )}
    </div>
  );
};

export { ReviewsSearch };
export default ReviewsSearch;