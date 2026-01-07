// src/lib/financial/calculator.ts

import { BudgetInput, BudgetResult } from '../../types';
import { FINANCIAL_CONFIG, getInterestRateByTerm } from './config';

/**
 * Calcula la mensualidad de un préstamo usando la fórmula de anualidad
 * 
 * Fórmula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Donde:
 * - M = Mensualidad
 * - P = Principal (monto financiado)
 * - r = Tasa de interés mensual
 * - n = Número de pagos (meses)
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;

  const monthlyRate = annualRate / 100 / 12;
  const payment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(payment * 100) / 100;
}

/**
 * Calcula el precio máximo del vehículo basado en el presupuesto del usuario
 * 
 * @param input - Parámetros de presupuesto del usuario
 * @returns Resultado completo del cálculo
 */
export function calculateBudget(input: BudgetInput): BudgetResult {
  const { downPayment, monthlyPayment, term } = input;
  
  // Obtener tasa de interés
  const interestRate = input.interestRate || getInterestRateByTerm(term);
  const monthlyRate = interestRate / 100 / 12;

  // Calcular el monto máximo que puede financiar con esa mensualidad
  // Fórmula inversa: P = M * [(1+r)^n - 1] / [r(1+r)^n]
  let maxFinancedAmount: number;
  
  if (interestRate === 0) {
    maxFinancedAmount = monthlyPayment * term;
  } else {
    maxFinancedAmount =
      (monthlyPayment * (Math.pow(1 + monthlyRate, term) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, term));
  }

  // Precio máximo del vehículo = enganche + monto financiado
  const maxVehiclePrice = Math.floor(downPayment + maxFinancedAmount);

  // Calcular intereses totales
  const totalPayments = monthlyPayment * term;
  const totalInterest = Math.max(0, totalPayments - maxFinancedAmount);

  // Calcular costos adicionales estimados
  const estimatedInsurance = Math.floor(
    maxVehiclePrice * FINANCIAL_CONFIG.additionalCosts.insuranceRate
  );
  const estimatedRegistration = FINANCIAL_CONFIG.additionalCosts.registrationFee;
  const estimatedMaintenance = Math.floor(
    maxVehiclePrice * FINANCIAL_CONFIG.additionalCosts.maintenanceRate
  );

  // Costo mensual adicional (seguro, placas y mantenimiento prorrateados)
  const monthlyAdditionalCosts =
    (estimatedInsurance + estimatedRegistration + estimatedMaintenance) / 12;

  const realMonthlyPayment = Math.round(monthlyPayment + monthlyAdditionalCosts);

  // Rango recomendado (90% - 100% del precio máximo)
  const recommendedPriceRange = {
    min: Math.floor(maxVehiclePrice * 0.85),
    max: maxVehiclePrice,
  };

  return {
    input: {
      downPayment,
      monthlyPayment,
      term,
      interestRate,
    },
    maxVehiclePrice,
    totalFinanced: Math.floor(maxFinancedAmount),
    totalInterest: Math.floor(totalInterest),
    totalPayment: Math.floor(downPayment + totalPayments),
    estimatedInsurance,
    estimatedRegistration,
    estimatedMaintenance,
    realMonthlyPayment,
    recommendedPriceRange,
  };
}

/**
 * Calcula si un enganche cumple con el mínimo recomendado
 */
export function isDownPaymentSufficient(
  downPayment: number,
  vehiclePrice: number
): { sufficient: boolean; percentage: number; recommended: number } {
  const percentage = (downPayment / vehiclePrice) * 100;
  const recommendedAmount = Math.ceil(
    vehiclePrice * FINANCIAL_CONFIG.safety.recommendedDownPaymentRate
  );

  return {
    sufficient: percentage >= FINANCIAL_CONFIG.safety.minDownPaymentRate * 100,
    percentage: Math.round(percentage * 10) / 10,
    recommended: recommendedAmount,
  };
}

/**
 * Valida que los parámetros de entrada sean válidos
 */
export function validateBudgetInput(input: BudgetInput): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (input.downPayment < 0) {
    errors.push('El enganche debe ser mayor a 0');
  }

  if (input.downPayment < 10000) {
    errors.push('El enganche mínimo recomendado es de $10,000 MXN');
  }

  if (input.monthlyPayment <= 0) {
    errors.push('La mensualidad debe ser mayor a 0');
  }

  if (input.monthlyPayment < 1000) {
    errors.push('La mensualidad mínima es de $1,000 MXN');
  }

  if (!FINANCIAL_CONFIG.availableTerms.includes(input.term as any)) {
    errors.push(
      `El plazo debe ser uno de: ${FINANCIAL_CONFIG.availableTerms.join(', ')} meses`
    );
  }

  if (input.interestRate && (input.interestRate < 0 || input.interestRate > 50)) {
    errors.push('La tasa de interés debe estar entre 0% y 50%');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Formatea un número a moneda mexicana
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea un porcentaje
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}