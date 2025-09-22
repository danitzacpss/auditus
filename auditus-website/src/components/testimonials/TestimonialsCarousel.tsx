'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { EnhancedTestimonial } from '@/types/google-reviews';
import { StarIcon, CheckIcon } from '@/components/ui/Icon';
import { openGoogleReviews, trackGoogleReviewsClick } from '@/utils/google-reviews';

interface TestimonialsCarouselProps {
  reviews: EnhancedTestimonial[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  onViewAllClick?: () => void;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  reviews,
  autoPlay = true,
  interval = 4000,
  showArrows = true,
  showDots = true,
  className = '',
  onViewAllClick
}) => {
  const { t } = useTranslation('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Always start with autoplay enabled
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  // Auto-play functionality with smooth transitions
  useEffect(() => {
    if (isPlaying && !isPaused && reviews.length > 1) {
      intervalRef.current = setInterval(() => {
        // Only proceed if not currently transitioning
        if (!isTransitioning) {
          setIsTransitioning(true);

          setTimeout(() => {
            setCurrentIndex(prev => {
              const nextIndex = prev + 1;
              if (nextIndex >= reviews.length) {
                return 0;
              }
              return nextIndex;
            });
            setIsTransitioning(false);
          }, 300);
        }
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, reviews.length, interval]);

  // Infinite navigation - always allow navigation
  const canGoNext = true;
  const canGoPrev = true;

  // Navigation functions with simple smooth transitions
  const goToNext = useCallback(() => {
    if (isTransitioning) return; // Prevent rapid clicking

    setIsTransitioning(true);

    // Simple timeout for smooth transition
    setTimeout(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= reviews.length) {
          return 0;
        }
        return nextIndex;
      });
      setIsTransitioning(false);
    }, 300); // Quick but smooth
  }, [reviews.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return; // Prevent rapid clicking

    setIsTransitioning(true);

    // Simple timeout for smooth transition
    setTimeout(() => {
      setCurrentIndex(prev => {
        const prevIndex = prev - 1;
        if (prevIndex < 0) {
          return reviews.length - 1;
        }
        return prevIndex;
      });
      setIsTransitioning(false);
    }, 300); // Quick but smooth
  }, [reviews.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return; // Prevent rapid clicking

    setIsTransitioning(true);

    // Simple timeout for smooth transition
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300); // Quick but smooth
  }, [currentIndex, isTransitioning]);

  // Remove hover functionality - autoplay only controlled by button

  // Touch/Swipe handlers for mobile - only for carousel content
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Ignore touch events on control buttons
    const target = e.target as HTMLElement;
    if (target.closest('.autoplay-controls') || target.closest('.nav-arrow') || target.closest('button')) {
      return;
    }

    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = null;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Ignore touch events on control buttons
    const target = e.target as HTMLElement;
    if (target.closest('.autoplay-controls') || target.closest('.nav-arrow') || target.closest('button')) {
      return;
    }

    const touch = e.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Ignore touch events on control buttons
    const target = e.target as HTMLElement;
    if (target.closest('.autoplay-controls') || target.closest('.nav-arrow') || target.closest('button')) {
      return;
    }

    if (!touchStartRef.current || !touchEndRef.current) return;

    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = touchStartRef.current.y - touchEndRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Only trigger swipe if horizontal movement is greater than vertical
    // and the swipe distance is at least 50px
    if (absDeltaX > absDeltaY && absDeltaX > 50) {
      if (deltaX > 0) {
        // Swipe left - go to next
        goToNext();
      } else if (deltaX < 0) {
        // Swipe right - go to previous
        goToPrev();
      }
    }

    // Reset touch references
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [goToNext, goToPrev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (carouselRef.current?.contains(document.activeElement)) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            goToPrev();
            break;
          case 'ArrowRight':
            event.preventDefault();
            goToNext();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Get author initials
  const getAuthorInitials = (name: string): string => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Format relative time
  const formatRelativeTime = (time: string): string => {
    return time.replace(/hace/, 'hace').replace(/ago/, 'hace');
  };

  // Avatar component with robust error handling for Google images
  const AvatarWithFallback: React.FC<{ review: EnhancedTestimonial }> = ({ review }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const error = e.nativeEvent as ErrorEvent;
      console.log(`Image load failed for ${review.name} (attempt ${retryCount + 1}):`, {
        url: review.authorPhoto,
        error: error.message || 'Unknown error'
      });

      // Don't retry for Google images due to rate limiting
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    // Always show initials for now due to Google's rate limiting
    // This provides a consistent and reliable user experience
    const shouldShowImage = false; // Temporarily disabled due to 429 errors

    return (
      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 via-turquoise-100 to-pink-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-base ring-2 ring-blue-200 ring-opacity-50 group-hover:ring-opacity-100 transition-all duration-300 shadow-md">
        {shouldShowImage && review.authorPhoto && !imageError ? (
          <>
            <img
              src={review.authorPhoto}
              alt={review.name}
              className={`w-full h-full rounded-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        ) : (
          // Always show beautiful initials with enhanced styling
          <div className="text-blue-600 font-bold text-base select-none">
            {getAuthorInitials(review.name)}
          </div>
        )}
      </div>
    );
  };

  // Render review card component
  const renderReviewCard = (review: EnhancedTestimonial, isCenter: boolean) => (
    <div className={`group relative bg-white rounded-2xl p-6 flex flex-col transform transition-all duration-500 border-2 border-transparent shadow-lg animate-fadeInUp ${
      isCenter
        ? 'hover:scale-105 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl scale-100'
        : 'scale-90 pointer-events-none'
    }`} style={{ minHeight: '480px', maxHeight: '480px' }}>
      {/* Elegant border accent */}
      <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-600 via-turquoise-500 to-pink-400 rounded-full transform -translate-y-0.5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-turquoise-50/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Elegant quote marks */}
        <div className="flex justify-center mb-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
          <svg className="w-10 h-10 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
        </div>

        {/* Review Content - Enhanced Typography with fixed height */}
        <div className="flex-1 mb-6 text-center flex items-start justify-center" style={{ minHeight: '160px', maxHeight: '160px' }}>
          <p className="text-gray-700 font-secondary leading-relaxed text-base font-light tracking-wide group-hover:text-gray-800 transition-colors duration-300 line-clamp-6 overflow-hidden">
            {review.content}
          </p>
        </div>

        {/* Star Rating - Centered and Animated */}
        <div className="flex justify-center items-center mb-4 space-x-1" style={{ height: '24px' }}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <StarIcon
              key={i}
              size="sm"
              className="text-yellow-400 fill-current transform transition-transform duration-300 group-hover:scale-110"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Author Section - Redesigned with fixed height */}
        <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300" style={{ minHeight: '160px' }}>
          {/* Avatar with enhanced styling */}
          <div className="relative">
            <AvatarWithFallback review={review} />
            {/* Verification badge */}
            {review.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                <CheckIcon size="sm" className="text-white" />
              </div>
            )}
          </div>

          {/* Author Details - Centered */}
          <div className="text-center">
            <h4 className="font-bold text-gray-900 font-primary text-base group-hover:text-blue-700 transition-colors duration-300 line-clamp-1">
              {review.name}
            </h4>

            {/* Source and Time - Elegant styling */}
            {review.source === 'google' && (
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-2">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-xs font-medium">Google Reviews</span>
                </div>
                {review.relativePublishTime && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs">{formatRelativeTime(review.relativePublishTime)}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{t('loadingStates.noReviews')}</p>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className={`relative w-full ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Carrusel de testimonios"
      tabIndex={0}
    >
      {/* Header Section */}
      <div className="text-center mb-12 lg:mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium font-secondary mb-6">
          <CheckIcon size="sm" />
          <span>{t('verifiedTestimonials')}</span>
        </div>

        {/* Main Title */}
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-primary max-w-4xl mx-auto leading-tight"
          dangerouslySetInnerHTML={{ __html: t('title') }}
        />

        {/* Subtitle */}
        <p className="text-xl text-gray-600 font-secondary max-w-3xl mx-auto leading-relaxed">
          {t('subtitle', { centerName: t('centerName') })}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="testimonials-container relative overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-turquoise-50/20 rounded-3xl p-8 shadow-inner">
        {/* Previous Arrow - Enhanced */}
        {showArrows && reviews.length > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToPrev();
            }}
            disabled={isTransitioning}
            className={`nav-arrow absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none group animate-slideInFromLeft hover:shadow-2xl focus:ring-4 focus:ring-blue-200 ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
            aria-label="Testimonio anterior"
          >
            <svg className="w-6 h-6 transition-colors duration-300 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Arrow - Enhanced */}
        {showArrows && reviews.length > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              goToNext();
            }}
            disabled={isTransitioning}
            className={`nav-arrow absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center focus:outline-none group animate-slideInFromRight hover:shadow-2xl focus:ring-4 focus:ring-blue-200 ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
            aria-label="Siguiente testimonio"
          >
            <svg className="w-6 h-6 transition-colors duration-300 text-blue-600 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Testimonials Container - Centered with side previews */}
        <div className="flex items-center justify-center">
          {/* Previous review preview (semi-transparent) - with infinite wrap */}
          {reviews.length > 1 && (
            <div className="hidden lg:block w-80 opacity-30 scale-75 transform -translate-x-4 transition-all duration-500 ease-out" style={{ height: '480px' }}>
              {renderReviewCard(reviews[currentIndex === 0 ? reviews.length - 1 : currentIndex - 1], false)}
            </div>
          )}

          {/* Current review (center, fully visible) */}
          <div className={`w-full max-w-md mx-4 transform transition-all duration-500 ease-out z-10 ${isTransitioning ? 'opacity-70 scale-98' : 'opacity-100 scale-100'}`} style={{ height: '480px' }}>
            {renderReviewCard(reviews[currentIndex], true)}
          </div>

          {/* Next review preview (semi-transparent) - with infinite wrap */}
          {reviews.length > 1 && (
            <div className="hidden lg:block w-80 opacity-30 scale-75 transform translate-x-4 transition-all duration-500 ease-out" style={{ height: '480px' }}>
              {renderReviewCard(reviews[currentIndex === reviews.length - 1 ? 0 : currentIndex + 1], false)}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Dots - Individual reviews (max 5) */}
      {showDots && reviews.length > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-3">
          {reviews.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`dot-indicator w-4 h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all duration-300 hover:scale-110 active:scale-95 ${
                currentIndex === index
                  ? 'bg-pink-300 shadow-lg shadow-pink-200/50 animate-pulse'
                  : 'bg-gray-300 hover:bg-pink-200'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play Indicator - Enhanced */}
      {reviews.length > 1 && (
        <div className="flex justify-center items-center mt-6">
          <div className="autoplay-controls flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-blue-100">
            <div className={`w-3 h-3 rounded-full shadow-sm transition-all duration-300 ${
              isPlaying && !isPaused
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse'
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}></div>
            <span className="text-sm text-gray-600 font-medium select-none">
              {isPlaying && !isPaused ? 'Reproducción automática activa' : 'Reproducción automática pausada'}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const newPlayingState = !isPlaying;
                setIsPlaying(newPlayingState);
                setIsPaused(false); // Always reset pause state when manually toggling
              }}
              className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label={isPlaying ? 'Pausar reproducción automática' : 'Iniciar reproducción automática'}
            >
              {isPlaying && !isPaused ? (
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Google Reviews Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => window.open('https://www.google.com/maps/place/Lavado+de+O%C3%ADdos+en+Concepci%C3%B3n/@-36.8264923,-73.0495834,1178m/data=!3m1!1e3!4m8!3m7!1s0x9669b59093c8415f:0x88ab2bf5e8e67c79!8m2!3d-36.8264923!4d-73.0495834!9m1!1b1!16s%2Fg%2F11xmk_m632?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D', '_blank', 'noopener,noreferrer')}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t('googleRedirect.button')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Mostrando testimonio {currentIndex + 1} de {reviews.length}
      </div>
    </div>
  );
};

export { TestimonialsCarousel };
export default TestimonialsCarousel;