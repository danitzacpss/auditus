'use client';

import React from 'react';
import PhotoCarousel from '@/components/gallery/PhotoCarousel';
import { galleryPhotos } from '@/data/galleryPhotos';

const GallerySection: React.FC = () => {

  return (
    <section className="pt-4 pb-16 lg:pt-6 lg:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-blue-700 text-sm font-medium">
              Nuestras Instalaciones
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Galería de{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-blue-600">Instalaciones</span>
              <svg
                className="absolute bottom-0 left-0 w-full h-3 text-blue-200"
                viewBox="0 0 100 12"
                fill="currentColor"
                preserveAspectRatio="none"
              >
                <path d="M0,8 Q25,2 50,8 T100,8 L100,12 L0,12 Z" />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-lato">
            Descubre nuestras modernas instalaciones equipadas con tecnología de última generación
            para brindar el mejor cuidado auditivo en un ambiente profesional y acogedor.
          </p>
        </div>

        {/* Photo Carousel */}
        <PhotoCarousel
          photos={galleryPhotos}
          autoPlay={true}
          interval={6000}
          showArrows={true}
          showDots={true}
          slidesToShow={3}
        />
      </div>
    </section>
  );
};

export default GallerySection;