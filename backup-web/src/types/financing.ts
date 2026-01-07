// src/types/financing.ts

/**
 * Plan de financiamiento para un vehículo específico
 */
export interface FinancingPlan {
  vehicleId: string;
  vehiclePrice: number;
  
  downPayment: number;
  financedAmount: number;
  
  term: number;              // Meses
  interestRate: number;      // Tasa anual
  monthlyPayment: number;
  
  totalInterest: number;
  totalPayment: number;      // downPayment + (monthlyPayment * term)
  
  // Breakdown mensual
  firstPaymentDate?: string;
  lastPaymentDate?: string;
}

/**
 * Tabla de amortización - un pago individual
 */
export interface AmortizationPayment {
  paymentNumber: number;
  paymentDate: string;
  paymentAmount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

/**
 * Tabla completa de amortización
 */
export interface AmortizationSchedule {
  vehicleId: string;
  plan: FinancingPlan;
  payments: AmortizationPayment[];
  
  summary: {
    totalPayments: number;
    totalPrincipal: number;
    totalInterest: number;
  };
}

/**
 * Comparación de planes de financiamiento
 */
export interface FinancingComparison {
  vehicleId: string;
  vehiclePrice: number;
  plans: {
    term12?: FinancingPlan;
    term24?: FinancingPlan;
    term36?: FinancingPlan;
    term48?: FinancingPlan;
    term60?: FinancingPlan;
    term72?: FinancingPlan;
  };
}

/**
 * Opciones de plazo disponibles
 */
export const AVAILABLE_TERMS = [12, 24, 36, 48, 60, 72] as const;
export type AvailableTerm = typeof AVAILABLE_TERMS[number];

/**
 * Tasas de interés por plazo (ejemplo)
 */
export interface InterestRateByTerm {
  term: AvailableTerm;
  rate: number;
  description: string;
}