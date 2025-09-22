'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryPhoto } from '@/data/galleryPhotos';
import PhotoLightbox from './PhotoLightbox';

interface PhotoCarouselProps {
  photos: GalleryPhoto[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  slidesToShow?: number;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  photos,
  autoPlay = true,
  interval = 4000,
  showArrows = true,
  showDots = true,
  slidesToShow = 3
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Calculate maximum index based on slides to show
  const maxIndex = Math.max(0, photos.length - slidesToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  }, [maxIndex]);

  const goToSlide = useCallback((index: number) => {
    const targetIndex = Math.min(index, maxIndex);
    setCurrentIndex(targetIndex);
  }, [maxIndex]);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    const photoIndex = photos.findIndex(p => p.id === photo.id);
    setSelectedPhotoIndex(photoIndex);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleLightboxNavigate = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, interval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case ' ':
          event.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextSlide, prevSlide]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(autoPlay);

  // Calculate slide width based on slides to show
  const slideWidth = 100 / slidesToShow;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Main carousel container */}
      <div
        className="relative overflow-hidden rounded-3xl bg-gray-100 shadow-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Photos container */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="flex-shrink-0 px-2 first:pl-0 last:pr-0"
              style={{ width: `${slideWidth}%` }}
            >
              <div
                className="relative group cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              >
                {/* Image container with fixed aspect ratio */}
                <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] relative rounded-2xl overflow-hidden">
                  <Image
                    src={photo.medium}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-300 group-hover:scale-105 pointer-events-none"
                    quality={95}
                    priority={index < 3}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Photo info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm lg:text-base font-semibold mb-1 font-poppins !text-white">
                      {photo.title}
                    </h3>
                    <p className="text-xs lg:text-sm text-gray-200 font-lato">
                      {photo.description}
                    </p>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-3 right-3 w-10 h-10 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && maxIndex > 0 && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Imágenes anteriores"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Siguientes imágenes"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Play/Pause button */}
        {autoPlay && (
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Dots navigation */}
      {showDots && maxIndex > 0 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a grupo de imágenes ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Photo counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-500 font-lato">
          Mostrando {Math.min(currentIndex + slidesToShow, photos.length)} de {photos.length} instalaciones
        </span>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <PhotoLightbox
          photos={photos}
          currentPhotoIndex={selectedPhotoIndex}
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          onNavigate={handleLightboxNavigate}
        />
      )}

    </div>
  );
};

export default PhotoCarousel;