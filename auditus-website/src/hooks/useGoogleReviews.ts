'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  EnhancedTestimonial,
  GoogleReviewsState,
  GoogleReviewsConfig,
  ReviewFilters,
  ReviewSortOptions
} from '@/types/google-reviews';
import { getGoogleReviewsService } from '@/lib/google-reviews-api';
import { TESTIMONIALS } from '@/data/constants';
import { Testimonial } from '@/types';

export interface UseGoogleReviewsOptions {
  config?: Partial<GoogleReviewsConfig>;
  autoFetch?: boolean;
  hybridMode?: boolean;
  filters?: ReviewFilters;
  sortOptions?: ReviewSortOptions;
  onError?: (error: string) => void;
  onSuccess?: (reviews: EnhancedTestimonial[]) => void;
}

export interface UseGoogleReviewsReturn extends GoogleReviewsState {
  hybridReviews: EnhancedTestimonial[];
  manualReviews: EnhancedTestimonial[];
  googleReviews: EnhancedTestimonial[];
  totalReviews: number;
  cacheStatus: {
    exists: boolean;
    timestamp?: number;
    expiresAt?: number;
    reviewsCount?: number;
  } | null;
  actions: {
    fetchReviews: (forceRefresh?: boolean) => Promise<void>;
    retry: () => Promise<void>;
    clearCache: () => Promise<void>;
    refreshCacheStatus: () => Promise<void>;
  };
}

const useGoogleReviews = (options: UseGoogleReviewsOptions = {}): UseGoogleReviewsReturn => {
  const {
    config,
    autoFetch = true,
    hybridMode = true,
    filters,
    sortOptions = { field: 'date', order: 'desc' },
    onError,
    onSuccess
  } = options;

  // State
  const [state, setState] = useState<GoogleReviewsState>({
    reviews: [],
    isLoading: autoFetch,
    error: null,
    isRetrying: false,
    lastFetched: null
  });

  const [cacheStatus, setCacheStatus] = useState<UseGoogleReviewsReturn['cacheStatus']>(null);

  // Service instance
  const service = useMemo(() => getGoogleReviewsService(config), [config]);

  // Manual testimonials transformed to enhanced format
  const manualReviews = useMemo<EnhancedTestimonial[]>(() => {
    return TESTIMONIALS.map((testimonial: Testimonial): EnhancedTestimonial => ({
      ...testimonial,
      source: 'manual',
      verified: testimonial.verified || true
    }));
  }, []);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let reviews = state.reviews;

    // Apply filters
    if (filters) {
      reviews = reviews.filter(review => {
        if (filters.minRating && review.rating < filters.minRating) return false;
        if (filters.verified !== undefined && review.verified !== filters.verified) return false;
        if (filters.sources && !filters.sources.includes(review.source)) return false;

        if (filters.maxAge) {
          const reviewDate = new Date(review.date);
          const maxDate = new Date();
          maxDate.setDate(maxDate.getDate() - filters.maxAge);
          if (reviewDate < maxDate) return false;
        }

        if (filters.languages && review.originalLanguage) {
          if (!filters.languages.includes(review.originalLanguage)) return false;
        }

        return true;
      });
    }

    // Apply sorting
    reviews.sort((a, b) => {
      let compareValue: number;

      switch (sortOptions.field) {
        case 'rating':
          compareValue = a.rating - b.rating;
          break;
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'date':
        default:
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return sortOptions.order === 'asc' ? compareValue : -compareValue;
    });

    return reviews;
  }, [state.reviews, filters, sortOptions]);

  // Google reviews only
  const googleReviews = useMemo(() => {
    return filteredAndSortedReviews.filter(review => review.source === 'google');
  }, [filteredAndSortedReviews]);

  // Hybrid reviews (manual + Google)
  const hybridReviews = useMemo(() => {
    if (!hybridMode) {
      return filteredAndSortedReviews;
    }

    const combined = [...manualReviews, ...googleReviews];

    // Remove duplicates by content similarity (basic check)
    const unique = combined.filter((review, index, arr) => {
      return !arr.slice(0, index).some(prev =>
        prev.name === review.name &&
        prev.rating === review.rating &&
        Math.abs(new Date(prev.date).getTime() - new Date(review.date).getTime()) < 86400000 // 1 day
      );
    });

    // Sort combined reviews
    return unique.sort((a, b) => {
      let compareValue: number;

      switch (sortOptions.field) {
        case 'rating':
          compareValue = a.rating - b.rating;
          break;
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'date':
        default:
          compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
      }

      return sortOptions.order === 'asc' ? compareValue : -compareValue;
    });
  }, [manualReviews, googleReviews, hybridMode, sortOptions]);

  // Fetch reviews
  const fetchReviews = useCallback(async (forceRefresh = false) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await service.fetchReviews(forceRefresh);

      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          reviews: result.data || [],
          isLoading: false,
          error: null,
          lastFetched: Date.now()
        }));

        onSuccess?.(result.data);
      } else {
        const errorMessage = result.error || 'Failed to fetch reviews';
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage
        }));

        onError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));

      onError?.(errorMessage);
    }
  }, [service, onError, onSuccess]);

  // Retry function
  const retry = useCallback(async () => {
    setState(prev => ({ ...prev, isRetrying: true }));
    await fetchReviews(true);
    setState(prev => ({ ...prev, isRetrying: false }));
  }, [fetchReviews]);

  // Refresh cache status
  const refreshCacheStatus = useCallback(async () => {
    try {
      const status = await service.getCacheStatus();
      setCacheStatus(status);
    } catch (error) {
      console.warn('Failed to get cache status:', error);
      setCacheStatus({ exists: false });
    }
  }, [service]);

  // Clear cache
  const clearCache = useCallback(async () => {
    await service.clearCache();
    await refreshCacheStatus();
  }, [service, refreshCacheStatus]);

  // Auto-fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchReviews();
    }
    refreshCacheStatus();
  }, [autoFetch, fetchReviews, refreshCacheStatus]);

  // Periodic cache status refresh
  useEffect(() => {
    const interval = setInterval(refreshCacheStatus, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [refreshCacheStatus]);

  return {
    // State
    ...state,

    // Computed reviews
    reviews: filteredAndSortedReviews,
    hybridReviews,
    manualReviews,
    googleReviews,
    totalReviews: hybridReviews.length,

    // Cache info
    cacheStatus,

    // Actions
    actions: {
      fetchReviews,
      retry,
      clearCache,
      refreshCacheStatus
    }
  };
};

export default useGoogleReviews;