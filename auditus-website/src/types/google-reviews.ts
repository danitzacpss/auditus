import { z } from 'zod';

// Google Places API Response Types
export interface GooglePlaceAuthor {
  displayName: string;
  photoUri?: string;
  uri?: string;
}

export interface GooglePlaceText {
  text: string;
  languageCode: string;
}

export interface GooglePlaceReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: GooglePlaceText;
  originalText?: GooglePlaceText;
  authorAttribution: GooglePlaceAuthor;
  publishTime: string;
}

export interface GooglePlaceResponse {
  reviews?: GooglePlaceReview[];
  rating?: number;
  userRatingCount?: number;
}

// Enhanced Testimonial Types for Hybrid System
export type TestimonialSource = 'manual' | 'google';

export interface EnhancedTestimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
  service?: string;
  verified: boolean;
  source: TestimonialSource;
  // Google-specific fields
  googleReviewId?: string;
  authorPhoto?: string;
  originalLanguage?: string;
  originalText?: string;
  relativePublishTime?: string;
}

// API Response Types
export interface GoogleReviewsPagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface GoogleReviewsApiResponse {
  success: boolean;
  data?: EnhancedTestimonial[];
  pagination?: GoogleReviewsPagination;
  error?: string;
  cached?: boolean;
  cacheTimestamp?: number;
}

// Cache Types
export interface CachedReviews {
  reviews: EnhancedTestimonial[];
  timestamp: number;
  expiresAt: number;
}

// Hook State Types
export interface GoogleReviewsState {
  reviews: EnhancedTestimonial[];
  isLoading: boolean;
  error: string | null;
  isRetrying: boolean;
  lastFetched: number | null;
}

// Zod Schemas for Runtime Validation
export const GooglePlaceAuthorSchema = z.object({
  displayName: z.string(),
  photoUri: z.string().optional(),
  uri: z.string().optional(),
});

export const GooglePlaceTextSchema = z.object({
  text: z.string(),
  languageCode: z.string(),
});

export const GooglePlaceReviewSchema = z.object({
  name: z.string(),
  relativePublishTimeDescription: z.string(),
  rating: z.number().min(1).max(5),
  text: GooglePlaceTextSchema,
  originalText: GooglePlaceTextSchema.optional(),
  authorAttribution: GooglePlaceAuthorSchema,
  publishTime: z.string(),
});

export const GooglePlaceResponseSchema = z.object({
  reviews: z.array(GooglePlaceReviewSchema).optional(),
  rating: z.number().min(1).max(5).optional(),
  userRatingCount: z.number().optional(),
});

export const EnhancedTestimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  content: z.string().min(1),
  rating: z.number().min(1).max(5),
  date: z.string(),
  service: z.string().optional(),
  verified: z.boolean(),
  source: z.enum(['manual', 'google']),
  googleReviewId: z.string().optional(),
  authorPhoto: z.string().url().optional(),
  originalLanguage: z.string().optional(),
  originalText: z.string().optional(),
  relativePublishTime: z.string().optional(),
});

export const CachedReviewsSchema = z.object({
  reviews: z.array(EnhancedTestimonialSchema),
  timestamp: z.number(),
  expiresAt: z.number(),
});

// Service Configuration
export interface GoogleReviewsConfig {
  placeId: string;
  apiKey: string;
  cacheTTL: number;
  maxReviews: number;
  minRating?: number;
  languages?: string[];
}

export const GoogleReviewsConfigSchema = z.object({
  placeId: z.string().min(1),
  apiKey: z.string().min(1),
  cacheTTL: z.number().positive(),
  maxReviews: z.number().positive().max(50), // Increased to test if Google returns more
  minRating: z.number().min(1).max(5).optional(),
  languages: z.array(z.string()).optional(),
});

// Error Types
export type GoogleReviewsErrorType =
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'QUOTA_EXCEEDED'
  | 'INVALID_PLACE_ID'
  | 'CACHE_ERROR'
  | 'UNKNOWN_ERROR';

export interface GoogleReviewsError {
  type: GoogleReviewsErrorType;
  message: string;
  code?: string | number;
  retryable: boolean;
}

// Performance Monitoring
export interface GoogleReviewsMetrics {
  fetchDuration: number;
  cacheHit: boolean;
  reviewsCount: number;
  apiCallsCount: number;
  errorCount: number;
  lastSuccessfulFetch: number | null;
}

// Filter and Sort Options
export interface ReviewFilters {
  minRating?: number;
  maxAge?: number; // days
  languages?: string[];
  verified?: boolean;
  sources?: TestimonialSource[];
}

export interface ReviewSortOptions {
  field: 'rating' | 'date' | 'name';
  order: 'asc' | 'desc';
}