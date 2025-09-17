'use client';

import { useState, useEffect, useCallback } from 'react';
import { GalleryPhoto } from '@/data/galleryPhotos';

interface UsePhotoGalleryProps {
  photos: GalleryPhoto[];
  autoPlay?: boolean;
  interval?: number;
}

interface UsePhotoGalleryReturn {
  currentPhotoIndex: number;
  isLightboxOpen: boolean;
  currentPhoto: GalleryPhoto | null;
  actions: {
    openLightbox: (index: number) => void;
    closeLightbox: () => void;
    nextPhoto: () => void;
    previousPhoto: () => void;
    goToPhoto: (index: number) => void;
  };
}

export const usePhotoGallery = ({
  photos,
  autoPlay = false,
  interval = 5000
}: UsePhotoGalleryProps): UsePhotoGalleryReturn => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const currentPhoto = photos[currentPhotoIndex] || null;

  const openLightbox = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const nextPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex < photos.length - 1 ? prevIndex + 1 : 0
    );
  }, [photos.length]);

  const previousPhoto = useCallback(() => {
    setCurrentPhotoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : photos.length - 1
    );
  }, [photos.length]);

  const goToPhoto = useCallback((index: number) => {
    if (index >= 0 && index < photos.length) {
      setCurrentPhotoIndex(index);
    }
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          nextPhoto();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousPhoto();
          break;
        case 'Escape':
          event.preventDefault();
          closeLightbox();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextPhoto, previousPhoto, closeLightbox]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || !isLightboxOpen) return;

    const timer = setInterval(nextPhoto, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isLightboxOpen, interval, nextPhoto]);

  // Preload adjacent images for better performance
  useEffect(() => {
    if (!isLightboxOpen || !currentPhoto) return;

    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Preload next and previous images
    const nextIndex = currentPhotoIndex < photos.length - 1 ? currentPhotoIndex + 1 : 0;
    const prevIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : photos.length - 1;

    if (photos[nextIndex]) {
      preloadImage(photos[nextIndex].large);
    }
    if (photos[prevIndex]) {
      preloadImage(photos[prevIndex].large);
    }
  }, [currentPhotoIndex, photos, isLightboxOpen, currentPhoto]);

  return {
    currentPhotoIndex,
    isLightboxOpen,
    currentPhoto,
    actions: {
      openLightbox,
      closeLightbox,
      nextPhoto,
      previousPhoto,
      goToPhoto
    }
  };
};

export default usePhotoGallery;