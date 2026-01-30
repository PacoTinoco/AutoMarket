// src/components/vehicles/VehicleCard.tsx
// Actualizado con badge de distancia

import { Vehicle } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/financial';
import { MapPin, Navigation } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle & { distance?: number }; // Extendido con distancia opcional
  isSelected?: boolean;
  onSelect?: (vehicleId: string, selected: boolean) => void;
  showCheckbox?: boolean;
}

// Función para formatear distancia
function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  } else if (km < 10) {
    return `${km.toFixed(1)} km`;
  } else {
    return `${Math.round(km)} km`;
  }
}

// Función para obtener color según distancia
function getDistanceColor(km: number): string {
  if (km <= 5) {
    return 'bg-green-100 text-green-700'; // Muy cerca
  } else if (km <= 15) {
    return 'bg-blue-100 text-blue-700'; // Cerca
  } else if (km <= 30) {
    return 'bg-amber-100 text-amber-700'; // Moderado
  } else {
    return 'bg-slate-100 text-slate-600'; // Lejos
  }
}

export function VehicleCard({ vehicle, isSelected = false, onSelect, showCheckbox = false }: VehicleCardProps) {
  const conditionLabels = {
    new: 'Nuevo',
    used: 'Usado',
    certified: 'Seminuevo',
  };

  const conditionColors = {
    new: 'bg-green-100 text-green-800',
    used: 'bg-orange-100 text-orange-800',
    certified: 'bg-blue-100 text-blue-800',
  };

  return (
    <Card className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Imagen */}
      <div className="relative h-48 bg-slate-200">
        <img
          src={vehicle.thumbnailUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
        
        {/* Badge de condición */}
        <div className="absolute top-3 right-3">
          <Badge className={`${conditionColors[vehicle.condition]} font-medium`}>
            {conditionLabels[vehicle.condition]}
          </Badge>
        </div>

        {/* Badge de distancia (si está disponible) */}
        {vehicle.distance !== undefined && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getDistanceColor(vehicle.distance)}`}>
              <Navigation className="w-3 h-3" />
              {formatDistance(vehicle.distance)}
            </span>
          </div>
        )}

        {/* Overlay si no está disponible */}
        {!vehicle.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">No Disponible</Badge>
          </div>
        )}

        {/* Checkbox de selección */}
        {showCheckbox && vehicle.inStock && (
          <div className="absolute bottom-3 left-3">
            <label className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onSelect?.(vehicle.id, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700">Comparar</span>
            </label>
          </div>
        )}
      </div>

      {/* Contenido */}
      <CardHeader className="pb-3">
        <div>
          <p className="text-sm text-slate-500">{vehicle.brand}</p>
          <h3 className="text-xl font-bold text-slate-900">
            {vehicle.model} {vehicle.year}
          </h3>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold text-blue-600">
            {formatCurrency(vehicle.price)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-slate-500">Transmisión</p>
            <p className="font-medium capitalize">{vehicle.transmission}</p>
          </div>
          <div>
            <p className="text-slate-500">Combustible</p>
            <p className="font-medium capitalize">{vehicle.fuelType}</p>
          </div>
          {vehicle.mileage && vehicle.mileage > 0 && (
            <div className="col-span-2">
              <p className="text-slate-500">Kilometraje</p>
              <p className="font-medium">{vehicle.mileage.toLocaleString()} km</p>
            </div>
          )}
        </div>

        {/* Ubicación con distancia */}
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              {vehicle.dealerLocation}
            </p>
            {vehicle.distance !== undefined && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDistanceColor(vehicle.distance)}`}>
                {formatDistance(vehicle.distance)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700" 
          disabled={!vehicle.inStock}
          onClick={() => window.location.href = `/vehiculo/${vehicle.id}`}
        >
          {vehicle.inStock ? 'Ver Detalles' : 'No Disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
}