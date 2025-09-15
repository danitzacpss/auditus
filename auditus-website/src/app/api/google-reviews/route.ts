import { NextRequest, NextResponse } from 'next/server';
import {
  GooglePlaceResponseSchema,
  EnhancedTestimonial,
  GooglePlaceReview,
} from '@/types/google-reviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get('forceRefresh') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50'); // Default to 50 to get more reviews
    const minRating = parseInt(searchParams.get('minRating') || '1');

    // Check required environment variables
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      console.warn('Google Places API credentials not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'API credentials not configured',
          fallbackToManual: true
        },
        { status: 400 }
      );
    }

    // Build API URL for Google Places API (New)
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=es`;

    // Prepare request headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
    };

    // Make API call - Use GET with field mask
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: url,
        placeId: placeId,
        apiKeyPrefix: apiKey?.substring(0, 10) + '...'
      });

      // Return user-friendly error message
      let errorMessage = 'Error al cargar reseñas de Google';
      if (response.status === 403) {
        errorMessage = 'Permisos de API insuficientes';
      } else if (response.status === 400) {
        errorMessage = 'Place ID inválido';
      } else if (response.status === 429) {
        errorMessage = 'Límite de API excedido';
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          fallbackToManual: true
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response with Zod
    const validatedData = GooglePlaceResponseSchema.parse(data);

    // Transform to enhanced testimonials with pagination
    const testimonials = transformGoogleReviews(validatedData, { page, limit, minRating });

    return NextResponse.json({
      success: true,
      data: testimonials.reviews,
      pagination: {
        page,
        limit,
        total: testimonials.total,
        hasMore: testimonials.hasMore
      },
      cached: false,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('API Route Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        fallbackToManual: true
      },
      { status: 500 }
    );
  }
}

/**
 * Transform Google Place reviews to Enhanced Testimonials with pagination
 */
function transformGoogleReviews(
  placeData: any,
  options: { page: number; limit: number; minRating: number }
): { reviews: EnhancedTestimonial[]; total: number; hasMore: boolean } {
  if (!placeData.reviews) {
    return { reviews: [], total: 0, hasMore: false };
  }

  // Filter reviews
  const filteredReviews = placeData.reviews.filter((review: GooglePlaceReview) => {
    // Filter by minimum rating
    if (review.rating < options.minRating) return false;

    // Filter out reviews without text
    if (!review.text?.text?.trim()) return false;

    return true;
  });

  const total = filteredReviews.length;

  // Calculate pagination
  const startIndex = (options.page - 1) * options.limit;
  const endIndex = startIndex + options.limit;
  const hasMore = endIndex < total;

  // Apply pagination and transform
  const paginatedReviews = filteredReviews
    .slice(startIndex, endIndex)
    .map((review: GooglePlaceReview): EnhancedTestimonial => {
      const reviewId = extractReviewId(review.name);

      return {
        id: `google-${reviewId}`,
        name: review.authorAttribution.displayName,
        content: review.text.text,
        rating: review.rating,
        date: review.publishTime,
        verified: true,
        source: 'google',
        googleReviewId: reviewId,
        authorPhoto: review.authorAttribution.photoUri,
        originalLanguage: review.text.languageCode,
        originalText: review.originalText?.text,
        relativePublishTime: review.relativePublishTimeDescription
      };
    });

  return {
    reviews: paginatedReviews,
    total,
    hasMore
  };
}

/**
 * Extract review ID from Google review name
 */
function extractReviewId(reviewName: string): string {
  // Google review name format: places/[PLACE_ID]/reviews/[REVIEW_ID]
  const parts = reviewName.split('/');
  return parts[parts.length - 1] || `review-${Date.now()}`;
}