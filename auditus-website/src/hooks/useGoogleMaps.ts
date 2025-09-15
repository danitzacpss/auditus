'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapsConfig {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  mapId?: string;
  apiKey: string;
}

interface UseGoogleMapsReturn {
  mapRef: React.RefObject<HTMLDivElement | null>;
  map: google.maps.Map | null;
  isLoading: boolean;
  error: string | null;
  addMarker: (position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions) => google.maps.Marker | null;
}

export function useGoogleMaps(config: GoogleMapsConfig): UseGoogleMapsReturn {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    if (!config.apiKey) {
      setError('Google Maps API key is required');
      setIsLoading(false);
      return;
    }

    if (!mapRef.current) {
      return;
    }

    // Create loader instance
    const googleMapsLoader = new Loader({
      apiKey: config.apiKey,
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });


    // Load Google Maps
    googleMapsLoader
      .load()
      .then((google) => {
        if (!mapRef.current) {
          throw new Error('Map container not found');
        }

        const mapOptions: google.maps.MapOptions = {
          center: config.center,
          zoom: config.zoom || 15,
          mapId: config.mapId,
          // Styling options
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ],
          // UI controls
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: false,
          fullscreenControl: true,
          // Interaction options
          gestureHandling: 'cooperative',
          clickableIcons: true,
        };

        const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
        setMap(mapInstance);
        setError(null);
      })
      .catch((err) => {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key and network connection.');
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Cleanup function
    return () => {
      setMap(null);
    };
  }, [config.apiKey, config.center, config.zoom, config.mapId]);

  // Function to add markers
  const addMarker = useCallback((
    position: google.maps.LatLngLiteral, 
    options?: google.maps.MarkerOptions
  ): google.maps.Marker | null => {
    if (!map) {
      console.warn('Map is not initialized yet');
      return null;
    }

    const marker = new google.maps.Marker({
      position,
      map,
      ...options,
    });

    return marker;
  }, [map]);

  return {
    mapRef,
    map,
    isLoading,
    error,
    addMarker,
  };
}