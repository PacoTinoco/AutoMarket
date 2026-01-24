'use client';

// src/components/location/DistanceBadge.tsx
// Badge para mostrar la distancia a una agencia

import { MapPin, Navigation } from 'lucide-react';
import { formatDistance } from '@/lib/services/geolocation';

interface DistanceBadgeProps {
  distance: number; // En kilómetros
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export function DistanceBadge({ distance, variant = 'default', className = '' }: DistanceBadgeProps) {
  const formattedDistance = formatDistance(distance);
  
  // Determinar color basado en distancia
  const getColorClasses = () => {
    if (distance <= 5) {
      return 'bg-green-100 text-green-700'; // Muy cerca
    } else if (distance <= 15) {
      return 'bg-blue-100 text-blue-700'; // Cerca
    } else if (distance <= 30) {
      return 'bg-amber-100 text-amber-700'; // Moderado
    } else {
      return 'bg-slate-100 text-slate-600'; // Lejos
    }
  };

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium ${getColorClasses()} px-2 py-0.5 rounded-full ${className}`}>
        <MapPin className="w-3 h-3" />
        {formattedDistance}
      </span>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses()}`}>
          <Navigation className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-slate-900">{formattedDistance}</p>
          <p className="text-xs text-slate-500">de distancia</p>
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={`inline-flex items-center gap-1.5 text-sm ${getColorClasses()} px-3 py-1.5 rounded-full ${className}`}>
      <MapPin className="w-4 h-4" />
      <span className="font-medium">{formattedDistance}</span>
    </div>
  );
}