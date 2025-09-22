'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryPhoto } from '@/data/galleryPhotos';
import PhotoLightbox from './PhotoLightbox';

interface PhotoCardProps {
  photo: GalleryPhoto;
  index: number;
  className?: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index, className = '' }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenLightbox();
    }
  };

  return (
    <>
      <div
        className={`
          group relative overflow-hidden rounded-3xl bg-gray-100 cursor-pointer
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10
          focus:outline-none focus:ring-4 focus:ring-blue-500/30
          ${className}
        `}
        onClick={handleOpenLightbox}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Ver imagen en tamaño completo: ${photo.title}`}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {/* Image */}
        <Image
          src={photo.medium}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`
            object-cover transition-all duration-500 ease-out
            group-hover:scale-105
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoad={() => setIsLoading(false)}
          priority={index < 4} // Priorizar las primeras 4 imágenes
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 -m-2">
            <h3 className="text-lg font-bold mb-2 text-white drop-shadow-lg font-poppins">
              {photo.title}
            </h3>
            <p className="text-sm text-gray-100 drop-shadow-md font-lato leading-relaxed">
              {photo.description}
            </p>
          </div>
        </div>

        {/* View Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <PhotoLightbox
          photos={[photo]}
          currentPhotoIndex={0}
          isOpen={isLightboxOpen}
          onClose={handleCloseLightbox}
          onNavigate={() => {}}
        />
      )}
    </>
  );
};

export default PhotoCard;