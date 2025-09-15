'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui';

interface ReviewSkeletonProps {
  count?: number;
  className?: string;
}

const ReviewSkeleton: React.FC<ReviewSkeletonProps> = ({ count = 3, className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={`skeleton-${index}`}
          className={`relative bg-white border border-gray-200 shadow-lg rounded-3xl overflow-hidden animate-pulse ${className}`}
        >
          <CardContent className="p-8 h-full flex flex-col">
            {/* Service badge skeleton */}
            <div className="w-24 h-6 bg-gray-200 rounded-full mb-4"></div>

            {/* Rating skeleton */}
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
              <div className="w-8 h-4 bg-gray-200 rounded ml-2"></div>
            </div>

            {/* Content skeleton */}
            <div className="space-y-2 mb-6 flex-1">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Author info skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Verified badge skeleton */}
              <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ReviewSkeleton;