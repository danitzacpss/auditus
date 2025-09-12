'use client';

import React, { useEffect, useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { LocationIcon, ArrowRightIcon } from '@/components/ui/Icon';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  onMapClick?: () => void;
  showMarker?: boolean;
  markerTitle?: string;
  height?: string;
}

export default function GoogleMap({
  center,
  zoom = 15,
  className = '',
  onMapClick,
  showMarker = true,
  markerTitle = 'Centro Auditus - Lavado de Oídos',
  height = '300px'
}: GoogleMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Get API key from environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  const { mapRef, map, isLoading, error, addMarker } = useGoogleMaps({
    center,
    zoom,
    mapId,
    apiKey
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Add marker when map is loaded
  useEffect(() => {
    if (map && showMarker && isMounted) {
      const marker = addMarker(center, {
        title: markerTitle,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#2563eb', // primary-blue
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      });

      // Add click handler to marker
      if (marker && onMapClick) {
        marker.addListener('click', onMapClick);
      }

      return () => {
        marker?.setMap(null);
      };
    }
  }, [map, showMarker, center, markerTitle, addMarker, onMapClick, isMounted]);

  // Handle map container click
  const handleContainerClick = () => {
    if (isMounted && onMapClick) {
      onMapClick();
    }
  };

  // Show error state or fallback to static map
  if (error || !apiKey) {
    return (
      <div 
        className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className}`}
        style={{ height }}
        onClick={onMapClick ? handleContainerClick : undefined}
        role={onMapClick ? 'button' : undefined}
        tabIndex={onMapClick ? 0 : undefined}
        onKeyDown={onMapClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleContainerClick();
          }
        } : undefined}
        aria-label={onMapClick ? 'Abrir ubicación en Google Maps' : undefined}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center p-8 transition-all duration-300 group-hover:scale-105">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LocationIcon size="lg" className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
              {markerTitle}
            </h3>
            <p className="text-gray-600 text-sm mb-2 font-secondary">
              Aníbal Pinto 486, Oficina 403<br />
              Concepción, Chile
            </p>
            {!apiKey && (
              <p className="text-orange-600 text-xs mb-4 font-secondary max-w-xs">
                API de Google Maps no configurada
              </p>
            )}
            {error && (
              <p className="text-red-600 text-xs mb-4 font-secondary max-w-xs">
                {error}
              </p>
            )}
            {onMapClick && (
              <div className="inline-flex items-center space-x-1 text-primary-blue text-sm font-medium">
                <LocationIcon size="sm" className="text-primary-blue" />
                <span>Ver ubicación exacta</span>
                <ArrowRightIcon size="sm" className="text-primary-blue" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div 
        className={`relative rounded-2xl overflow-hidden ${className}`}
        style={{ height }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
              <LocationIcon size="lg" className="text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-primary">
              Cargando mapa...
            </h3>
            <p className="text-gray-600 text-sm font-secondary">
              Preparando tu ubicación
            </p>
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-blue border-t-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden ${className} ${onMapClick ? 'cursor-pointer' : ''}`}
      style={{ height }}
      onClick={onMapClick ? handleContainerClick : undefined}
      role={onMapClick ? 'button' : undefined}
      tabIndex={onMapClick ? 0 : undefined}
      onKeyDown={onMapClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleContainerClick();
        }
      } : undefined}
      aria-label={onMapClick ? 'Abrir ubicación en Google Maps' : undefined}
    >
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ height: '100%' }}
      />
      
      {/* Overlay for click interaction */}
      {onMapClick && (
        <div className="absolute inset-0 bg-transparent hover:bg-blue-500 hover:bg-opacity-5 transition-all duration-200 pointer-events-none" />
      )}
      
      {/* Corner indicator */}
      {onMapClick && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center space-x-2 text-primary-blue text-sm font-medium">
            <LocationIcon size="sm" />
            <span>Clic para abrir</span>
            <ArrowRightIcon size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}