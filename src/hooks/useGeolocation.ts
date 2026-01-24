'use client';

// src/hooks/useGeolocation.ts
// Hook para manejar geolocalización en componentes React

import { useState, useEffect, useCallback } from 'react';
import {
  UserLocation,
  GeolocationStatus,
  getUserLocation,
  saveUserLocation,
  getSavedLocation,
  clearSavedLocation,
  MEXICAN_CITIES,
} from '@/lib/services/geolocation';

interface UseGeolocationReturn {
  location: UserLocation | null;
  status: GeolocationStatus;
  error: string | null;
  requestLocation: () => Promise<void>;
  selectCity: (cityKey: string) => void;
  clearLocation: () => void;
  isLoading: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  // Cargar ubicación guardada al iniciar
  useEffect(() => {
    const savedLocation = getSavedLocation();
    if (savedLocation) {
      setLocation(savedLocation);
      setStatus('granted');
    }
  }, []);

  // Solicitar ubicación al usuario
  const requestLocation = useCallback(async () => {
    setStatus('requesting');
    setError(null);

    try {
      const userLocation = await getUserLocation();
      setLocation(userLocation);
      setStatus('granted');
      saveUserLocation(userLocation);
    } catch (err: any) {
      setError(err.message || 'Error al obtener ubicación');
      if (err.code === 1) {
        setStatus('denied');
      } else if (err.code === 0) {
        setStatus('unavailable');
      } else {
        setStatus('error');
      }
    }
  }, []);

  // Seleccionar ciudad manualmente
  const selectCity = useCallback((cityKey: string) => {
    const city = MEXICAN_CITIES[cityKey];
    if (city) {
      setLocation(city);
      setStatus('granted');
      saveUserLocation(city);
      setError(null);
    }
  }, []);

  // Limpiar ubicación
  const clearLocation = useCallback(() => {
    setLocation(null);
    setStatus('idle');
    setError(null);
    clearSavedLocation();
  }, []);

  return {
    location,
    status,
    error,
    requestLocation,
    selectCity,
    clearLocation,
    isLoading: status === 'requesting',
  };
}