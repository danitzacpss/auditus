'use client';

import React from 'react';
import PhotoCard from './PhotoCard';
import { GalleryPhoto } from '@/data/galleryPhotos';

interface PhotoGridProps {
  photos: GalleryPhoto[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          index={index}
          className={`
            ${photo.aspectRatio === '3:4' ? 'aspect-[3/4]' : ''}
            ${photo.aspectRatio === '4:3' ? 'aspect-[4/3]' : ''}
            ${photo.aspectRatio === '16:9' ? 'aspect-[16/9]' : ''}
            ${index % 3 === 1 ? 'md:mt-8' : ''}
            ${index % 4 === 2 ? 'lg:mt-12' : ''}
          `}
        />
      ))}
    </div>
  );
};

export default PhotoGrid;