'use client';

// src/components/location/LocationSelector.tsx
// Componente para seleccionar o detectar ubicación del usuario

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  X, 
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MEXICAN_CITIES } from '@/lib/services/geolocation';

interface LocationSelectorProps {
  onLocationChange?: (location: { latitude: number; longitude: number; city?: string } | null) => void;
  compact?: boolean;
}

export function LocationSelector({ onLocationChange, compact = false }: LocationSelectorProps) {
  const { 
    location, 
    status, 
    error, 
    requestLocation, 
    selectCity, 
    clearLocation,
    isLoading 
  } = useGeolocation();
  
  const [showCitySelector, setShowCitySelector] = useState(false);

  const handleRequestLocation = async () => {
    await requestLocation();
    if (location) {
      onLocationChange?.(location);
    }
  };

  const handleSelectCity = (cityKey: string) => {
    selectCity(cityKey);
    const city = MEXICAN_CITIES[cityKey];
    if (city) {
      onLocationChange?.(city);
    }
    setShowCitySelector(false);
  };

  const handleClear = () => {
    clearLocation();
    onLocationChange?.(null);
  };

  // Versión compacta para el header o filtros
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {location ? (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">{location.city || 'Mi ubicación'}</span>
            <button 
              onClick={handleClear}
              className="hover:bg-blue-100 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRequestLocation}
            disabled={isLoading}
            className="text-slate-600"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Detectando...' : 'Mi ubicación'}
          </Button>
        )}
      </div>
    );
  }

  // Versión completa
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Tu Ubicación</h3>
            <p className="text-sm text-slate-500">Para mostrarte agencias cercanas</p>
          </div>
        </div>
        
        {location && (
          <button 
            onClick={handleClear}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Estado: Ubicación detectada */}
      {location && status === 'granted' && (
        <div className="flex items-center gap-3 bg-green-50 text-green-700 p-3 rounded-lg">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">
              {location.city ? `${location.city}, ${location.state}` : 'Ubicación detectada'}
            </p>
            <p className="text-sm text-green-600">
              Mostrando agencias cercanas a ti
            </p>
          </div>
        </div>
      )}

      {/* Estado: Error o denegado */}
      {(status === 'denied' || status === 'error') && (
        <div className="flex items-center gap-3 bg-amber-50 text-amber-700 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">
              {status === 'denied' ? 'Permiso denegado' : 'No pudimos detectar tu ubicación'}
            </p>
            <p className="text-sm text-amber-600">
              Selecciona tu ciudad manualmente
            </p>
          </div>
        </div>
      )}

      {/* Acciones */}
      {!location && (
        <div className="space-y-3">
          {/* Botón de detectar ubicación */}
          <Button
            onClick={handleRequestLocation}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Detectando ubicación...
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Usar mi ubicación actual
              </>
            )}
          </Button>

          {/* Separador */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400">o</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Selector de ciudad */}
          <Select onValueChange={handleSelectCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona tu ciudad" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(MEXICAN_CITIES).map(([key, city]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {city.city}, {city.state}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Cambiar ciudad si ya hay una seleccionada */}
      {location && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleClear()}
          className="w-full"
        >
          Cambiar ubicación
        </Button>
      )}
    </div>
  );
}