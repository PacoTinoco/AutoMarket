// src/components/vehicles/VehicleFinancing.tsx

import { Vehicle, BudgetInput } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, createFinancingPlan } from '@/lib/financial';

interface VehicleFinancingProps {
  vehicle: Vehicle;
  budgetInput: BudgetInput | null;
}

export function VehicleFinancing({ vehicle, budgetInput }: VehicleFinancingProps) {
  if (!budgetInput) {
    return (
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            💡 Calcula tu presupuesto para ver opciones de financiamiento personalizadas
          </p>
        </CardContent>
      </Card>
    );
  }

  // Crear plan de financiamiento para este vehículo
  const financingPlan = createFinancingPlan(
    vehicle.id,
    vehicle.price,
    budgetInput.downPayment,
    budgetInput.term,
    budgetInput.interestRate
  );

  const canAfford = vehicle.price <= (budgetInput.downPayment + (budgetInput.monthlyPayment * budgetInput.term));

  return (
    <Card className={canAfford ? 'border-green-300 bg-green-50' : 'border-orange-300 bg-orange-50'}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          💰 Tu Financiamiento
          {canAfford ? (
            <span className="text-sm text-green-700 font-normal">✓ Dentro de presupuesto</span>
          ) : (
            <span className="text-sm text-orange-700 font-normal">⚠️ Requiere ajuste</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Enganche */}
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-slate-600">Enganche</span>
          <span className="font-semibold text-slate-900">
            {formatCurrency(financingPlan.downPayment)}
          </span>
        </div>

        {/* Mensualidad */}
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-slate-600">Mensualidad</span>
          <span className="font-semibold text-slate-900">
            {formatCurrency(financingPlan.monthlyPayment)}
          </span>
        </div>

        {/* Plazo */}
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-slate-600">Plazo</span>
          <span className="font-semibold text-slate-900">
            {financingPlan.term} meses ({financingPlan.term / 12} {financingPlan.term === 12 ? 'año' : 'años'})
          </span>
        </div>

        {/* Tasa de interés */}
        <div className="flex justify-between items-center pb-2 border-b">
          <span className="text-sm text-slate-600">Tasa de interés</span>
          <span className="font-semibold text-slate-900">
            {financingPlan.interestRate}% anual
          </span>
        </div>

        {/* Total a pagar */}
        <div className="flex justify-between items-center pt-2 bg-slate-100 -mx-6 px-6 py-3">
          <span className="font-medium text-slate-900">Total a pagar</span>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(financingPlan.totalPayment)}
          </span>
        </div>

        {/* Desglose de costos */}
        <div className="space-y-2 pt-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Precio del vehículo</span>
            <span>{formatCurrency(vehicle.price)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Intereses totales</span>
            <span>{formatCurrency(financingPlan.totalInterest)}</span>
          </div>
        </div>

        {!canAfford && (
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
            💡 Este vehículo excede tu presupuesto. Considera aumentar tu enganche o plazo.
          </div>
        )}
      </CardContent>
    </Card>
  );
}