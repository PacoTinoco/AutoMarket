'use client';

// src/components/calculator/BudgetCalculator.tsx

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { calculateBudget, formatCurrency, validateBudgetInput } from '@/lib/financial';
import { BudgetInput } from '@/types';
import { FINANCIAL_CONFIG } from '@/lib/financial/config';

export function BudgetCalculator() {
  const router = useRouter();
  const [budget, setBudget] = useState<BudgetInput>({
    downPayment: 50000,
    monthlyPayment: 5000,
    term: 48,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleCalculate = () => {
    // Validar entrada
    const validation = validateBudgetInput(budget);
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    // Calcular resultado
    const result = calculateBudget(budget);

    // Guardar en sessionStorage para la página de resultados
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('budgetResult', JSON.stringify(result));
      sessionStorage.setItem('budgetInput', JSON.stringify(budget));
    }

    // Navegar a resultados
    router.push('/resultados');
  };

  const handleDownPaymentChange = (value: number[]) => {
    setBudget({ ...budget, downPayment: value[0] });
    setErrors([]);
  };

  const handleMonthlyPaymentChange = (value: number[]) => {
    setBudget({ ...budget, monthlyPayment: value[0] });
    setErrors([]);
  };

  const handleTermChange = (value: string) => {
    setBudget({ ...budget, term: parseInt(value) });
    setErrors([]);
  };

  // Calcular preview del resultado
  const previewResult = calculateBudget(budget);

  return (
    <Card className="shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="text-2xl">Calculadora de Presupuesto</CardTitle>
        <CardDescription className="text-blue-100">
          Ingresa tus datos y descubre qué vehículos puedes comprar
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Enganche */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="downPayment" className="text-base font-semibold">
              Enganche
            </Label>
            <span className="text-xl font-bold text-blue-600">
              {formatCurrency(budget.downPayment)}
            </span>
          </div>
          <Slider
            id="downPayment"
            min={10000}
            max={200000}
            step={5000}
            value={[budget.downPayment]}
            onValueChange={handleDownPaymentChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$10,000</span>
            <span>$200,000</span>
          </div>
        </div>

        {/* Mensualidad */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="monthlyPayment" className="text-base font-semibold">
              Mensualidad Máxima
            </Label>
            <span className="text-xl font-bold text-blue-600">
              {formatCurrency(budget.monthlyPayment)}
            </span>
          </div>
          <Slider
            id="monthlyPayment"
            min={1000}
            max={20000}
            step={500}
            value={[budget.monthlyPayment]}
            onValueChange={handleMonthlyPaymentChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$1,000</span>
            <span>$20,000</span>
          </div>
        </div>

        {/* Plazo */}
        <div className="space-y-2">
          <Label htmlFor="term" className="text-base font-semibold">
            Plazo del Crédito
          </Label>
          <Select value={budget.term.toString()} onValueChange={handleTermChange}>
            <SelectTrigger id="term" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FINANCIAL_CONFIG.availableTerms.map((term) => (
                <SelectItem key={term} value={term.toString()}>
                  {term} meses ({term / 12} {term === 12 ? 'año' : 'años'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Errores */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Preview del Resultado */}
        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-slate-900 mb-3">Tu Presupuesto:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Precio Máximo del Vehículo</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(previewResult.maxVehiclePrice)}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Mensualidad Real (con extras)</p>
              <p className="text-xl font-semibold text-blue-600">
                {formatCurrency(previewResult.realMonthlyPayment)}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              * Incluye estimados de seguro, placas y mantenimiento
            </p>
          </div>
        </div>

        {/* Botón */}
        <Button
          onClick={handleCalculate}
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          Ver Vehículos Disponibles 🚗
        </Button>
      </CardContent>
    </Card>
  );
}