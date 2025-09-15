import {
  EnhancedTestimonial,
  GoogleReviewsConfig,
  GoogleReviewsError,
  GoogleReviewsApiResponse,
  CachedReviews,
  CachedReviewsSchema
} from '@/types/google-reviews';

class GoogleReviewsService {
  private config: GoogleReviewsConfig;
  private readonly cacheKey = 'google-reviews-cache';

  constructor(config: GoogleReviewsConfig) {
    this.config = config;
  }

  /**
   * Fetch reviews from Google Places API
   */
  async fetchReviews(
    forceRefresh = false,
    options?: { page?: number; limit?: number; minRating?: number }
  ): Promise<GoogleReviewsApiResponse> {
    // Use config maxReviews if no limit specified
    const defaultOptions = {
      page: 1,
      limit: this.config.maxReviews || 50,
      minRating: this.config.minRating || 1,
      ...options
    };
    try {
      // Check cache first unless forced refresh
      if (!forceRefresh) {
        const cached = await this.getCachedReviews();
        if (cached) {
          return {
            success: true,
            data: cached.reviews,
            cached: true,
            cacheTimestamp: cached.timestamp
          };
        }
      }

      // Fetch from API
      const apiResponse = await this.fetchFromAPI(defaultOptions);

      if (!apiResponse.success || !apiResponse.data) {
        return apiResponse;
      }

      // Cache the results
      await this.cacheReviews(apiResponse.data);

      return apiResponse;
    } catch (error) {
      console.error('Error fetching Google Reviews:', error);

      // Try to return cached reviews as fallback
      const cached = await this.getCachedReviews();
      if (cached) {
        return {
          success: true,
          data: cached.reviews,
          error: 'API error, showing cached reviews',
          cached: true,
          cacheTimestamp: cached.timestamp
        };
      }

      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  /**
   * Fetch reviews from Google Places API via Next.js API route
   */
  private async fetchFromAPI(
    options?: { page?: number; limit?: number; minRating?: number }
  ): Promise<GoogleReviewsApiResponse> {
    const params = new URLSearchParams();

    if (options?.page) params.set('page', options.page.toString());
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.minRating) params.set('minRating', options.minRating.toString());

    const url = `/api/google-reviews${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // If API suggests fallback to manual, return gracefully
      if (errorData.fallbackToManual) {
        return {
          success: false,
          error: errorData.error || 'Error loading Google Reviews',
          data: []
        };
      }

      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the response directly since it's already transformed
    return {
      success: true,
      data: data.data || [],
      pagination: data.pagination,
      cached: data.cached || false,
      cacheTimestamp: data.timestamp
    };
  }


  /**
   * Get cached reviews if they exist and are not expired
   */
  private async getCachedReviews(): Promise<CachedReviews | null> {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const parsedCache = JSON.parse(cached);
      const validatedCache = CachedReviewsSchema.parse(parsedCache);

      // Check if cache is expired
      if (Date.now() > validatedCache.expiresAt) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return validatedCache;
    } catch {
      // Invalid cache, remove it
      localStorage.removeItem(this.cacheKey);
      return null;
    }
  }

  /**
   * Cache reviews in localStorage
   */
  private async cacheReviews(reviews: EnhancedTestimonial[]): Promise<void> {
    try {
      const cache: CachedReviews = {
        reviews,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.config.cacheTTL
      };

      // Validate before caching
      CachedReviewsSchema.parse(cache);

      localStorage.setItem(this.cacheKey, JSON.stringify(cache));
    } catch (error) {
      console.warn('Failed to cache reviews:', error);
    }
  }

  /**
   * Clear cached reviews
   */
  async clearCache(): Promise<void> {
    localStorage.removeItem(this.cacheKey);
  }

  /**
   * Get cache status
   */
  async getCacheStatus(): Promise<{
    exists: boolean;
    timestamp?: number;
    expiresAt?: number;
    reviewsCount?: number
  }> {
    const cached = await this.getCachedReviews();

    if (!cached) {
      return { exists: false };
    }

    return {
      exists: true,
      timestamp: cached.timestamp,
      expiresAt: cached.expiresAt,
      reviewsCount: cached.reviews.length
    };
  }

  /**
   * Convert error to user-friendly message
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('403')) {
        return 'Error de permisos de API. Verifica la configuración.';
      }
      if (error.message.includes('400')) {
        return 'Solicitud inválida. Verifica el Place ID.';
      }
      if (error.message.includes('429')) {
        return 'Límite de API excedido. Intenta más tarde.';
      }
      if (error.message.includes('Network')) {
        return 'Error de conexión. Verifica tu internet.';
      }
    }

    return 'Error al cargar reseñas. Intenta más tarde.';
  }

  /**
   * Create error object with retry information
   */
  private createError(type: GoogleReviewsError['type'], message: string, retryable = true): GoogleReviewsError {
    return {
      type,
      message,
      retryable
    };
  }
}

// Default configuration factory
export function createGoogleReviewsConfig(overrides: Partial<GoogleReviewsConfig> = {}): GoogleReviewsConfig {
  return {
    placeId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '',
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || '',
    cacheTTL: parseInt(process.env.GOOGLE_REVIEWS_CACHE_TTL || '14400000'), // 4 hours
    maxReviews: 10,
    minRating: 4,
    languages: ['es', 'en'],
    ...overrides
  };
}

// Singleton instance
let googleReviewsService: GoogleReviewsService | null = null;

export function getGoogleReviewsService(config?: Partial<GoogleReviewsConfig>): GoogleReviewsService {
  if (!googleReviewsService) {
    const fullConfig = createGoogleReviewsConfig(config);
    googleReviewsService = new GoogleReviewsService(fullConfig);
  }

  return googleReviewsService;
}

export default GoogleReviewsService;