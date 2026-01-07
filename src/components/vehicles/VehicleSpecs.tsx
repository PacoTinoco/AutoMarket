// src/components/vehicles/VehicleSpecs.tsx

import { Vehicle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VehicleSpecsProps {
  vehicle: Vehicle;
}

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs = [
    { 
      icon: '🚗', 
      label: 'Tipo', 
      value: vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) 
    },
    { 
      icon: '⚙️', 
      label: 'Transmisión', 
      value: vehicle.transmission.charAt(0).toUpperCase() + vehicle.transmission.slice(1) 
    },
    { 
      icon: '⛽', 
      label: 'Combustible', 
      value: vehicle.fuelType.charAt(0).toUpperCase() + vehicle.fuelType.slice(1) 
    },
    { 
      icon: '🔧', 
      label: 'Motor', 
      value: vehicle.engine 
    },
    { 
      icon: '📅', 
      label: 'Año', 
      value: vehicle.year.toString() 
    },
    ...(vehicle.mileage && vehicle.mileage > 0 
      ? [{ 
          icon: '📏', 
          label: 'Kilometraje', 
          value: `${vehicle.mileage.toLocaleString()} km` 
        }] 
      : []
    ),
  ];

  const colors = vehicle.colors || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">📋 Especificaciones Técnicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specs.map((spec, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-lg p-4 border border-slate-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{spec.icon}</span>
                <span className="text-sm text-slate-600">{spec.label}</span>
              </div>
              <p className="font-semibold text-slate-900">{spec.value}</p>
            </div>
          ))}
        </div>

        {colors.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-slate-600 mb-2">Colores disponibles:</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}