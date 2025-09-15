'use client';

import React from 'react';
import { ReviewsLoadingStateProps } from '@/types/reviews-modal';

const ReviewSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-3xl p-8 animate-pulse">
    {/* Header with source badge */}
    <div className="flex items-start justify-between mb-4">
      <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
    </div>

    {/* Rating stars */}
    <div className="flex items-center space-x-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
      ))}
    </div>

    {/* Review content */}
    <div className="space-y-3 mb-6">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      <div className="h-4 bg-gray-200 rounded w-3/6"></div>
    </div>

    {/* Author info */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center space-x-3">
        {/* Author avatar */}
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>

        {/* Author details */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Verified badge */}
      <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const ReviewsLoadingState: React.FC<ReviewsLoadingStateProps> = ({
  count = 9,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ReviewSkeleton key={index} />
        ))}
      </div>

      {/* Loading indicator */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-3 bg-white rounded-xl px-6 py-4 shadow-lg border">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-gray-700 font-medium font-secondary">
            Cargando reseñas...
          </span>
        </div>
      </div>
    </div>
  );
};

export { ReviewsLoadingState };
export default ReviewsLoadingState;