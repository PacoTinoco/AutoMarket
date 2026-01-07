// src/components/vehicles/VehicleComparisonTable.tsx

import { Vehicle, BudgetInput } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, createFinancingPlan } from '@/lib/financial';

interface VehicleComparisonTableProps {
  vehicles: Vehicle[];
  budgetInput: BudgetInput | null;
  onRemoveVehicle: (vehicleId: string) => void;
}

export function VehicleComparisonTable({ 
  vehicles, 
  budgetInput,
  onRemoveVehicle 
}: VehicleComparisonTableProps) {
  const conditionLabels = {
    new: 'Nuevo',
    used: 'Usado',
    certified: 'Seminuevo Certificado',
  };

  const rows = [
    {
      label: 'Imagen',
      type: 'image' as const,
      getValue: (v: Vehicle) => v.thumbnailUrl,
    },
    {
      label: 'Precio',
      type: 'price' as const,
      getValue: (v: Vehicle) => v.price,
      highlight: true,
    },
    {
      label: 'Marca',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.brand,
    },
    {
      label: 'Modelo',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.model,
    },
    {
      label: 'Año',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.year.toString(),
    },
    {
      label: 'Condición',
      type: 'badge' as const,
      getValue: (v: Vehicle) => conditionLabels[v.condition],
    },
    {
      label: 'Tipo',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.type.charAt(0).toUpperCase() + v.type.slice(1),
    },
    {
      label: 'Transmisión',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.transmission.charAt(0).toUpperCase() + v.transmission.slice(1),
    },
    {
      label: 'Combustible',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.fuelType.charAt(0).toUpperCase() + v.fuelType.slice(1),
    },
    {
      label: 'Motor',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.engine,
    },
    {
      label: 'Kilometraje',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.mileage ? `${v.mileage.toLocaleString()} km` : 'Nuevo',
    },
    {
      label: 'Ubicación',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.dealerLocation,
    },
    {
      label: 'Agencia',
      type: 'text' as const,
      getValue: (v: Vehicle) => v.dealerName,
    },
    {
      label: 'Disponibilidad',
      type: 'availability' as const,
      getValue: (v: Vehicle) => v.inStock,
    },
  ];

  // Filas de financiamiento si hay presupuesto
  const financingRows = budgetInput ? [
    {
      label: 'Mensualidad',
      type: 'price' as const,
      getValue: (v: Vehicle) => {
        const plan = createFinancingPlan(
          v.id,
          v.price,
          budgetInput.downPayment,
          budgetInput.term,
          budgetInput.interestRate
        );
        return plan.monthlyPayment;
      },
      highlight: true,
    },
    {
      label: 'Total a Pagar',
      type: 'price' as const,
      getValue: (v: Vehicle) => {
        const plan = createFinancingPlan(
          v.id,
          v.price,
          budgetInput.downPayment,
          budgetInput.term,
          budgetInput.interestRate
        );
        return plan.totalPayment;
      },
    },
    {
      label: 'Intereses Totales',
      type: 'price' as const,
      getValue: (v: Vehicle) => {
        const plan = createFinancingPlan(
          v.id,
          v.price,
          budgetInput.downPayment,
          budgetInput.term,
          budgetInput.interestRate
        );
        return plan.totalInterest;
      },
    },
  ] : [];

  const allRows = [...rows, ...financingRows];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-50">
            <th className="sticky left-0 bg-slate-50 border-b-2 border-slate-200 p-4 text-left font-semibold text-slate-900 z-10">
              Característica
            </th>
            {vehicles.map((vehicle) => (
              <th key={vehicle.id} className="border-b-2 border-slate-200 p-4 min-w-[250px]">
                <div className="text-center">
                  <div className="font-bold text-lg text-slate-900 mb-2">
                    {vehicle.brand} {vehicle.model}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveVehicle(vehicle.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    ✕ Quitar
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allRows.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`
                border-b border-slate-200 hover:bg-slate-50 transition-colors
                ${row.highlight ? 'bg-blue-50' : ''}
              `}
            >
              <td className={`
                sticky left-0 bg-white p-4 font-medium text-slate-900 z-10
                ${row.highlight ? 'bg-blue-50' : ''}
              `}>
                {row.label}
              </td>
              {vehicles.map((vehicle) => (
                <td key={vehicle.id} className="p-4 text-center">
                  {row.type === 'image' && (
                    <img
                      src={row.getValue(vehicle) as string}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  )}
                  {row.type === 'text' && (
                    <span className="text-slate-700">
                      {row.getValue(vehicle)}
                    </span>
                  )}
                  {row.type === 'price' && (
                    <span className={`font-semibold ${row.highlight ? 'text-blue-600 text-lg' : 'text-slate-900'}`}>
                      {formatCurrency(row.getValue(vehicle) as number)}
                    </span>
                  )}
                  {row.type === 'badge' && (
                    <Badge variant="secondary">
                      {row.getValue(vehicle)}
                    </Badge>
                  )}
                  {row.type === 'availability' && (
                    <div className="flex items-center justify-center gap-2">
                      {row.getValue(vehicle) ? (
                        <>
                          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                          <span className="text-green-700 font-medium">En stock</span>
                        </>
                      ) : (
                        <>
                          <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                          <span className="text-red-700 font-medium">No disponible</span>
                        </>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Acciones rápidas */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="p-4">
            <div className="text-center">
              <p className="font-semibold text-slate-900 mb-3">
                {vehicle.brand} {vehicle.model}
              </p>
              <Button
                className="w-full"
                onClick={() => window.location.href = `/vehiculo/${vehicle.id}`}
              >
                Ver detalles completos
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}