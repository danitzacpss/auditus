/**
 * Utility functions for Google Reviews functionality
 */

// Centro Auditus Google Place ID (you'll need to replace this with the actual Place ID)
const AUDITUS_PLACE_ID = 'ChIJOWBuSyR5ZzYRRslI8qzqQOg'; // This is a placeholder - get the real one

/**
 * Generates the Google Reviews URL for Centro Auditus
 * This will open Google Reviews where users can see all reviews and write new ones
 */
export const getGoogleReviewsUrl = (): string => {
  // Option 1: Direct Google Reviews link using Place ID
  return `https://www.google.com/maps/place/?q=place_id:${AUDITUS_PLACE_ID}&query_place_id=${AUDITUS_PLACE_ID}`;

  // Option 2: Google Search results that show reviews
  // return 'https://www.google.com/search?q=Centro+Auditus+reviews';

  // Option 3: Google Maps search with business name
  // return 'https://www.google.com/maps/search/Centro+Auditus';
};

/**
 * Opens Google Reviews in a new tab/window
 * Includes tracking for analytics
 */
export const openGoogleReviews = (trackingEvent?: () => void): void => {
  // Execute tracking callback if provided
  if (trackingEvent) {
    trackingEvent();
  }

  // Open Google Reviews in new tab
  const url = getGoogleReviewsUrl();
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Gets the Centro Auditus Place ID for API calls
 */
export const getAuditusPlaceId = (): string => {
  return AUDITUS_PLACE_ID;
};

/**
 * Tracks Google Reviews redirect event
 * You can integrate this with your analytics provider (Google Analytics, etc.)
 */
export const trackGoogleReviewsClick = (source: 'carousel' | 'modal' | 'button' = 'button'): void => {
  // Track with console for development
  console.log(`Google Reviews clicked from: ${source}`);

  // TODO: Integrate with your analytics provider
  // Example for Google Analytics:
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', 'google_reviews_click', {
  //     source: source,
  //     business: 'Centro Auditus'
  //   });
  // }

  // Example for custom analytics
  // analytics.track('Google Reviews Clicked', {
  //   source: source,
  //   timestamp: new Date().toISOString()
  // });
};