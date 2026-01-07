// src/types/index.ts

/**
 * Archivo central que exporta todos los tipos
 * Permite importar desde: import { Vehicle, BudgetInput } from '@/types'
 */

// Vehicle types
export type {
  Vehicle,
  VehicleSummary,
  VehicleFilters,
  VehicleType,
  TransmissionType,
  FuelType,
  VehicleCondition,
  VehicleSortOption,
} from './vehicle';

// Budget types
export type {
  BudgetInput,
  BudgetResult,
  FinancingConfig,
  BudgetRange,
} from './budget';

// Financing types
export type {
  FinancingPlan,
  AmortizationPayment,
  AmortizationSchedule,
  FinancingComparison,
  AvailableTerm,
  InterestRateByTerm,
} from './financing';

export { AVAILABLE_TERMS } from './financing';

// Dealer types
export type {
  Dealer,
  DealerSummary,
  DealerLead,
} from './dealer';