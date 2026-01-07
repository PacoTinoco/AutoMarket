// src/components/vehicles/VehicleGrid.tsx

import { Vehicle } from '@/types';
import { VehicleCard } from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
  selectedVehicles?: string[];
  onSelectVehicle?: (vehicleId: string, selected: boolean) => void;
  showCheckboxes?: boolean;
}

export function VehicleGrid({ 
  vehicles, 
  selectedVehicles = [], 
  onSelectVehicle,
  showCheckboxes = false 
}: VehicleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard 
          key={vehicle.id} 
          vehicle={vehicle}
          isSelected={selectedVehicles.includes(vehicle.id)}
          onSelect={onSelectVehicle}
          showCheckbox={showCheckboxes}
        />
      ))}
    </div>
  );
}