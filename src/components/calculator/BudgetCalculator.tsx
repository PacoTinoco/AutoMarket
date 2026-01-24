'use client';

// src/components/calculator/BudgetCalculator.tsx
// Calculadora de Presupuesto - Con tasas diferenciadas por condición
// Compatible con tipos de @/types/budget

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Info, Car, Sparkles, Shield, Clock } from 'lucide-react';
import { BudgetInput, BudgetResult } from '@/types';
import { 
  FINANCING_CONFIG, 
  calculateMaxVehiclePrice,
  getInterestRateByCondition,
  CONDITION_LABELS,
  CONDITION_DESCRIPTIONS,
  VehicleConditionType,
} from '@/lib/config/financing';

export function BudgetCalculator() {
  const router = useRouter();
  
  // Estados de los inputs
  const [downPayment, setDownPayment] = useState(50000);
  const [monthlyPayment, setMonthlyPayment] = useState(5000);
  const [term, setTerm] = useState(FINANCING_CONFIG.DEFAULT_TERM);
  const [vehicleCondition, setVehicleCondition] = useState<VehicleConditionType>('certified');
  
  // Estado del resultado
  const [result, setResult] = useState<BudgetResult | null>(null);

  // Configuración de rangos
  const DOWN_PAYMENT_MIN = 10000;
  const DOWN_PAYMENT_MAX = 200000;
  const MONTHLY_PAYMENT_MIN = 1000;
  const MONTHLY_PAYMENT_MAX = 20000;

  // Iconos para cada condición
  const conditionIcons: Record<VehicleConditionType, React.ReactNode> = {
    new: <Sparkles className="w-4 h-4" />,
    certified: <Shield className="w-4 h-4" />,
    used: <Clock className="w-4 h-4" />,
  };

  // Calcular resultado cuando cambian los inputs
  useEffect(() => {
    const interestRate = getInterestRateByCondition(vehicleCondition);
    
    const maxPrice = calculateMaxVehiclePrice(
      downPayment,
      monthlyPayment,
      term,
      interestRate
    );

    const totalFinanced = maxPrice - downPayment;
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - totalFinanced;

    // Estimados de costos adicionales
    const estimatedInsurance = Math.round(maxPrice * FINANCING_CONFIG.INSURANCE_PERCENTAGE_OF_VALUE);
    const estimatedRegistration = Math.round(maxPrice * 0.02);
    const estimatedMaintenance = Math.round(maxPrice * 0.01);

    // Input para guardar
    const input: BudgetInput = {
      downPayment,
      monthlyPayment,
      term,
      interestRate,
    };

    // Resultado completo según el tipo BudgetResult
    const budgetResult: BudgetResult = {
      input,
      maxVehiclePrice: maxPrice,
      totalFinanced,
      totalInterest: Math.max(0, totalInterest),
      totalPayment: downPayment + totalPayment,
      estimatedInsurance,
      estimatedRegistration,
      estimatedMaintenance,
      realMonthlyPayment: monthlyPayment + Math.round(estimatedInsurance / 12),
      recommendedPriceRange: {
        min: Math.round(maxPrice * 0.7),
        max: maxPrice,
      },
    };

    setResult(budgetResult);
  }, [downPayment, monthlyPayment, term, vehicleCondition]);

  // Manejar búsqueda
  const handleSearch = () => {
    if (!result) return;

    // Guardar en sessionStorage para la página de resultados
    sessionStorage.setItem('budgetResult', JSON.stringify(result));
    sessionStorage.setItem('budgetInput', JSON.stringify(result.input));
    sessionStorage.setItem('vehicleCondition', vehicleCondition);

    // Navegar a resultados
    router.push('/resultados');
  };

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const currentRate = getInterestRateByCondition(vehicleCondition);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-xl font-semibold">Calculadora de Presupuesto</h2>
        <p className="text-blue-100 text-sm">Ingresa tus datos y descubre qué vehículos puedes comprar</p>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Tipo de Vehículo */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">¿Qué tipo de vehículo buscas?</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(CONDITION_LABELS) as VehicleConditionType[]).map((condition) => (
              <button
                key={condition}
                onClick={() => setVehicleCondition(condition)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                  vehicleCondition === condition
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={vehicleCondition === condition ? 'text-blue-600' : 'text-slate-400'}>
                    {conditionIcons[condition]}
                  </span>
                  <span className="font-medium text-sm">{CONDITION_LABELS[condition]}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Tasa ~{FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION[condition]}%
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Enganche */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Enganche</label>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(downPayment)}
            </span>
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={(value) => setDownPayment(value[0])}
            min={DOWN_PAYMENT_MIN}
            max={DOWN_PAYMENT_MAX}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatCurrency(DOWN_PAYMENT_MIN)}</span>
            <span>{formatCurrency(DOWN_PAYMENT_MAX)}</span>
          </div>
        </div>

        {/* Mensualidad Máxima */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Mensualidad Máxima</label>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(monthlyPayment)}
            </span>
          </div>
          <Slider
            value={[monthlyPayment]}
            onValueChange={(value) => setMonthlyPayment(value[0])}
            min={MONTHLY_PAYMENT_MIN}
            max={MONTHLY_PAYMENT_MAX}
            step={500}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatCurrency(MONTHLY_PAYMENT_MIN)}</span>
            <span>{formatCurrency(MONTHLY_PAYMENT_MAX)}</span>
          </div>
        </div>

        {/* Plazo */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">Plazo del Crédito</label>
          <Select
            value={term.toString()}
            onValueChange={(value) => setTerm(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el plazo" />
            </SelectTrigger>
            <SelectContent>
              {FINANCING_CONFIG.AVAILABLE_TERMS.map((t) => (
                <SelectItem key={t} value={t.toString()}>
                  {t} meses ({t / 12} {t / 12 === 1 ? 'año' : 'años'})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resultado */}
        {result && (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-5 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Info className="w-4 h-4" />
                Tu Presupuesto:
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                Tasa {currentRate}% anual
              </span>
            </div>
            
            {/* Precio Máximo - ÚNICO VALOR DESTACADO */}
            <div>
              <p className="text-sm text-slate-500 mb-1">Precio Máximo del Vehículo</p>
              <p className="text-4xl font-bold text-slate-900">
                {formatCurrency(result.maxVehiclePrice)}
              </p>
            </div>

            {/* Info de condición seleccionada */}
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-lg px-3 py-2">
              {conditionIcons[vehicleCondition]}
              <span>Buscando vehículos <strong>{CONDITION_LABELS[vehicleCondition].toLowerCase()}</strong></span>
            </div>

            {/* Disclaimer */}
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-relaxed">
                * Incluye estimados de seguro y placas. 
                Calculado con tasa del {currentRate}% anual para vehículos {CONDITION_LABELS[vehicleCondition].toLowerCase()}.
              </p>
            </div>
          </div>
        )}

        {/* Botón de búsqueda */}
        <Button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300"
          disabled={!result}
        >
          Ver Vehículos Disponibles
          <Car className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}