'use client';

import React, { useEffect, useState } from 'react';
import { GalleryPhoto } from '@/data/galleryPhotos';

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  currentPhotoIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentPhotoIndex,
  isOpen,
  onClose,
  onNavigate
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const currentPhoto = photos[currentPhotoIndex];

  const nextPhoto = () => {
    const nextIndex = currentPhotoIndex < photos.length - 1 ? currentPhotoIndex + 1 : 0;
    onNavigate(nextIndex);
    setIsLoading(true);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : photos.length - 1;
    onNavigate(prevIndex);
    setIsLoading(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextPhoto();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevPhoto();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, currentPhotoIndex, photos.length]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Imagen anterior"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="Siguiente imagen"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Image Container */}
      <div
        className="relative flex items-center justify-center w-[90vw] h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Image */}
        <img
          key={currentPhoto.id} // Force re-render on photo change
          src={currentPhoto.large}
          alt={currentPhoto.alt}
          className={`max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />

        {/* Photo Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white">
          <div className="p-4">
            <h3 className="text-lg font-bold drop-shadow-lg" style={{ color: '#ffffff' }}>{currentPhoto.title}</h3>
            <p className="text-sm drop-shadow-md mt-1" style={{ color: '#f0f0f0' }}>{currentPhoto.description}</p>
          </div>
        </div>
      </div>

      {/* Photo Counter */}
      {photos.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
          {currentPhotoIndex + 1} / {photos.length}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
        <div>Usa ← → para navegar • ESC o click fuera para cerrar</div>
      </div>
    </div>
  );
};

export default PhotoLightbox;