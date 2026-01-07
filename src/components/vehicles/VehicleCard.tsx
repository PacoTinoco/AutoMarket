// src/components/vehicles/VehicleCard.tsx

import { Vehicle } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/financial';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const conditionLabels = {
    new: 'Nuevo',
    used: 'Usado',
    certified: 'Seminuevo Certificado',
  };

  const conditionColors = {
    new: 'bg-green-100 text-green-800',
    used: 'bg-blue-100 text-blue-800',
    certified: 'bg-purple-100 text-purple-800',
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
      {/* Imagen */}
      <div className="relative h-48 bg-slate-200">
        <img
          src={vehicle.thumbnailUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={conditionColors[vehicle.condition]}>
            {conditionLabels[vehicle.condition]}
          </Badge>
        </div>
        {!vehicle.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">No Disponible</Badge>
          </div>
        )}
      </div>

      {/* Contenido */}
      <CardHeader className="pb-3">
        <div>
          <p className="text-sm text-slate-600">{vehicle.brand}</p>
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

        <div className="mt-3 pt-3 border-t">
          <p className="text-sm text-slate-600">
            📍 {vehicle.dealerLocation}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" disabled={!vehicle.inStock}>
          {vehicle.inStock ? 'Ver Detalles' : 'No Disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
}