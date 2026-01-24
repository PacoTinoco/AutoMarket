// src/lib/services/geolocation.ts
// Servicio de Geolocalización para AutoMarket

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  accuracy?: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

// Estados posibles de geolocalización
export type GeolocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'error';

// Ciudades principales de México con coordenadas (para fallback y demo)
export const MEXICAN_CITIES: Record<string, UserLocation> = {
  'guadalajara': {
    latitude: 20.6597,
    longitude: -103.3496,
    city: 'Guadalajara',
    state: 'Jalisco',
  },
  'mexico-city': {
    latitude: 19.4326,
    longitude: -99.1332,
    city: 'Ciudad de México',
    state: 'CDMX',
  },
  'monterrey': {
    latitude: 25.6866,
    longitude: -100.3161,
    city: 'Monterrey',
    state: 'Nuevo León',
  },
  'tijuana': {
    latitude: 32.5149,
    longitude: -117.0382,
    city: 'Tijuana',
    state: 'Baja California',
  },
  'puebla': {
    latitude: 19.0414,
    longitude: -98.2063,
    city: 'Puebla',
    state: 'Puebla',
  },
  'leon': {
    latitude: 21.1250,
    longitude: -101.6860,
    city: 'León',
    state: 'Guanajuato',
  },
  'cancun': {
    latitude: 21.1619,
    longitude: -86.8515,
    city: 'Cancún',
    state: 'Quintana Roo',
  },
  'merida': {
    latitude: 20.9674,
    longitude: -89.5926,
    city: 'Mérida',
    state: 'Yucatán',
  },
};

// Calcular distancia entre dos puntos (fórmula de Haversine)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Redondear a 1 decimal
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Formatear distancia para mostrar
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  } else if (km < 10) {
    return `${km.toFixed(1)} km`;
  } else {
    return `${Math.round(km)} km`;
  }
}

// Obtener ubicación del usuario
export function getUserLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'La geolocalización no está disponible en este navegador',
      } as GeolocationError);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let message = 'Error al obtener ubicación';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permiso de ubicación denegado';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Ubicación no disponible';
            break;
          case error.TIMEOUT:
            message = 'Tiempo de espera agotado';
            break;
        }
        reject({
          code: error.code,
          message,
        } as GeolocationError);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache por 5 minutos
      }
    );
  });
}

// Guardar ubicación en sessionStorage
export function saveUserLocation(location: UserLocation): void {
  sessionStorage.setItem('userLocation', JSON.stringify(location));
}

// Obtener ubicación guardada
export function getSavedLocation(): UserLocation | null {
  const saved = sessionStorage.getItem('userLocation');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

// Limpiar ubicación guardada
export function clearSavedLocation(): void {
  sessionStorage.removeItem('userLocation');
}