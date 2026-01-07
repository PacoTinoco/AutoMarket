// src/components/vehicles/VehicleDetailHeader.tsx

import { Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/financial';

interface VehicleDetailHeaderProps {
  vehicle: Vehicle;
  onBack: () => void;
}

export function VehicleDetailHeader({ vehicle, onBack }: VehicleDetailHeaderProps) {
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
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mt-1"
            >
              ←
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {vehicle.brand} {vehicle.model}
                </h1>
                <Badge className={conditionColors[vehicle.condition]}>
                  {conditionLabels[vehicle.condition]}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-600">
                <span>{vehicle.year}</span>
                <span>•</span>
                <span>{vehicle.engine}</span>
                <span>•</span>
                <span className="capitalize">{vehicle.transmission}</span>
                {vehicle.mileage && vehicle.mileage > 0 && (
                  <>
                    <span>•</span>
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-blue-600">
              {formatCurrency(vehicle.price)}
            </div>
            <div className="text-sm text-slate-600">Precio total</div>
          </div>
        </div>
      </div>
    </div>
  );
}