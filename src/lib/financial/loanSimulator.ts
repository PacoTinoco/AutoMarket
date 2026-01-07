// src/lib/financial/loanSimulator.ts

import {
  FinancingPlan,
  AmortizationSchedule,
  AmortizationPayment,
  FinancingComparison,
} from '../../types';
import { calculateMonthlyPayment } from './calculator';
import { getInterestRateByTerm, FINANCIAL_CONFIG } from './config';

/**
 * Crea un plan de financiamiento para un vehículo específico
 */
export function createFinancingPlan(
  vehicleId: string,
  vehiclePrice: number,
  downPayment: number,
  term: number,
  interestRate?: number
): FinancingPlan {
  const rate = interestRate || getInterestRateByTerm(term);
  const financedAmount = vehiclePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(financedAmount, rate, term);
  const totalPayment = downPayment + monthlyPayment * term;
  const totalInterest = totalPayment - vehiclePrice;

  // Fechas de primer y último pago (estimadas)
  const today = new Date();
  const firstPaymentDate = new Date(today);
  firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 1);

  const lastPaymentDate = new Date(firstPaymentDate);
  lastPaymentDate.setMonth(lastPaymentDate.getMonth() + term - 1);

  return {
    vehicleId,
    vehiclePrice,
    downPayment,
    financedAmount,
    term,
    interestRate: rate,
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    firstPaymentDate: firstPaymentDate.toISOString().split('T')[0],
    lastPaymentDate: lastPaymentDate.toISOString().split('T')[0],
  };
}

/**
 * Genera tabla de amortización completa
 */
export function generateAmortizationSchedule(
  plan: FinancingPlan
): AmortizationSchedule {
  const { financedAmount, interestRate, term, monthlyPayment } = plan;
  const monthlyRate = interestRate / 100 / 12;

  let remainingBalance = financedAmount;
  const payments: AmortizationPayment[] = [];
  const startDate = new Date(plan.firstPaymentDate || new Date());

  for (let i = 1; i <= term; i++) {
    // Calcular interés del mes
    const interestPayment = remainingBalance * monthlyRate;
    
    // Calcular abono a capital
    const principalPayment = monthlyPayment - interestPayment;
    
    // Actualizar balance
    remainingBalance = Math.max(0, remainingBalance - principalPayment);

    // Fecha de pago
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + i - 1);

    payments.push({
      paymentNumber: i,
      paymentDate: paymentDate.toISOString().split('T')[0],
      paymentAmount: Math.round(monthlyPayment),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      remainingBalance: Math.round(remainingBalance),
    });
  }

  // Calcular resumen
  const totalPrincipal = payments.reduce((sum, p) => sum + p.principal, 0);
  const totalInterest = payments.reduce((sum, p) => sum + p.interest, 0);

  return {
    vehicleId: plan.vehicleId,
    plan,
    payments,
    summary: {
      totalPayments: payments.length,
      totalPrincipal: Math.round(totalPrincipal),
      totalInterest: Math.round(totalInterest),
    },
  };
}

/**
 * Compara diferentes planes de financiamiento para un vehículo
 */
export function compareFinancingPlans(
  vehicleId: string,
  vehiclePrice: number,
  downPayment: number
): FinancingComparison {
  const plans: FinancingComparison['plans'] = {};

  // Generar planes para cada plazo disponible
  FINANCIAL_CONFIG.availableTerms.forEach((term) => {
    const key = `term${term}` as keyof FinancingComparison['plans'];
    plans[key] = createFinancingPlan(
      vehicleId,
      vehiclePrice,
      downPayment,
      term
    );
  });

  return {
    vehicleId,
    vehiclePrice,
    plans,
  };
}

/**
 * Calcula el costo total de propiedad (TCO - Total Cost of Ownership)
 * Incluye: precio del vehículo + intereses + seguros + mantenimiento + placas
 */
export function calculateTotalCostOfOwnership(
  vehiclePrice: number,
  term: number,
  downPayment: number
): {
  vehiclePrice: number;
  financing: number;
  insurance: number;
  maintenance: number;
  registration: number;
  total: number;
} {
  const plan = createFinancingPlan('temp', vehiclePrice, downPayment, term);
  
  const years = term / 12;
  const insurance = Math.round(
    vehiclePrice * FINANCIAL_CONFIG.additionalCosts.insuranceRate * years
  );
  const maintenance = Math.round(
    vehiclePrice * FINANCIAL_CONFIG.additionalCosts.maintenanceRate * years
  );
  const registration = Math.round(
    FINANCIAL_CONFIG.additionalCosts.registrationFee * years
  );

  return {
    vehiclePrice,
    financing: plan.totalInterest,
    insurance,
    maintenance,
    registration,
    total: vehiclePrice + plan.totalInterest + insurance + maintenance + registration,
  };
}