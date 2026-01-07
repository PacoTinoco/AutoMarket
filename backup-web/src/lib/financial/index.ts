// src/lib/financial/index.ts

/**
 * Módulo financiero - Punto de entrada central
 * Exporta todas las funciones de cálculo financiero
 */

// Calculator
export {
  calculateBudget,
  calculateMonthlyPayment,
  isDownPaymentSufficient,
  validateBudgetInput,
  formatCurrency,
  formatPercentage,
} from './calculator';

// Loan Simulator
export {
  createFinancingPlan,
  generateAmortizationSchedule,
  compareFinancingPlans,
  calculateTotalCostOfOwnership,
} from './loanSimulator';

// Config
export {
  FINANCIAL_CONFIG,
  getInterestRateByTerm,
  isValidTerm,
} from './config';