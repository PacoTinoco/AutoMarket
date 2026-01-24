'use client';

// src/components/calculator/BudgetSummary.tsx
// Resumen de presupuesto para la página de resultados
// Compatible con tasas diferenciadas por condición

import { FINANCING_CONFIG, CONDITION_LABELS, VehicleConditionType } from '@/lib/config/financing';
import { Info, DollarSign, Calendar, Percent } from 'lucide-react';
import { BudgetResult } from '@/types';

interface BudgetSummaryProps {
  result: BudgetResult;
  vehicleCondition?: VehicleConditionType;
}

export function BudgetSummary({ result, vehicleCondition }: BudgetSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Obtener la tasa usada (del input o la config)
  const usedRate = result.input.interestRate ?? FINANCING_CONFIG.ANNUAL_INTEREST_RATE;
  const conditionLabel = vehicleCondition ? CONDITION_LABELS[vehicleCondition].toLowerCase() : '';

  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Precio Máximo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Precio Máximo
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-white">
            {formatCurrency(result.maxVehiclePrice)}
          </p>
        </div>

        {/* Enganche */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Tu Enganche
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-white">
            {formatCurrency(result.input.downPayment)}
          </p>
        </div>

        {/* Mensualidad */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
            <Calendar className="w-4 h-4" />
            Mensualidad
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-white">
            {formatCurrency(result.input.monthlyPayment)}
          </p>
        </div>

        {/* Plazo y Tasa */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-100 text-sm mb-1">
            <Percent className="w-4 h-4" />
            Plazo / Tasa
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-white">
            {result.input.term}m <span className="text-lg text-blue-200">/ {usedRate}%</span>
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 bg-white/5 rounded-lg px-4 py-3">
        <Info className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-100 leading-relaxed">
          * Precio estimado con tasa del {usedRate}% anual
          {conditionLabel && ` para vehículos ${conditionLabel}`}. 
          El costo del seguro varía según el vehículo (~1.5% del valor anual). 
          Sujeto a aprobación crediticia. Los costos finales pueden variar según la agencia.
        </p>
      </div>
    </div>
  );
}