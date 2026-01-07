// src/components/calculator/BudgetSummary.tsx

import { BudgetResult } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/financial';

interface BudgetSummaryProps {
  result: BudgetResult;
}

export function BudgetSummary({ result }: BudgetSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Tu Presupuesto</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Enganche</p>
            <p className="text-2xl font-bold">{formatCurrency(result.input.downPayment)}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Mensualidad</p>
            <p className="text-2xl font-bold">{formatCurrency(result.input.monthlyPayment)}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Plazo</p>
            <p className="text-2xl font-bold">{result.input.term} meses</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Precio Máximo</p>
            <p className="text-2xl font-bold">{formatCurrency(result.maxVehiclePrice)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}