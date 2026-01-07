// src/types/budget.ts

/**
 * Parámetros de entrada del presupuesto del usuario
 */
export interface BudgetInput {
  downPayment: number;        // Enganche
  monthlyPayment: number;     // Mensualidad máxima
  term: number;               // Plazo en meses (12, 24, 36, 48, 60, 72)
  interestRate?: number;      // Tasa de interés anual (opcional, se usa default)
}

/**
 * Resultado del cálculo de presupuesto
 */
export interface BudgetResult {
  // Input original
  input: BudgetInput;
  
  // Cálculos
  maxVehiclePrice: number;    // Precio máximo del vehículo
  totalFinanced: number;      // Total a financiar
  totalInterest: number;      // Total de intereses
  totalPayment: number;       // Pago total (enganche + financiamiento)
  
  // Costos adicionales estimados
  estimatedInsurance: number;  // Seguro anual estimado
  estimatedRegistration: number; // Placas/tenencia estimada
  estimatedMaintenance: number; // Mantenimiento anual estimado
  
  // Costo mensual real (incluyendo extras)
  realMonthlyPayment: number;
  
  // Rango de precios recomendado
  recommendedPriceRange: {
    min: number;
    max: number;
  };
}

/**
 * Configuración de cálculo financiero
 */
export interface FinancingConfig {
  defaultInterestRate: number;  // Tasa por defecto
  insuranceRate: number;        // % del valor del vehículo para seguro
  registrationFee: number;      // Costo fijo de placas
  maintenanceRate: number;      // % del valor para mantenimiento anual
}

/**
 * Rangos de presupuesto predefinidos
 */
export interface BudgetRange {
  id: string;
  name: string;
  description: string;
  downPaymentRange: [number, number];
  monthlyPaymentRange: [number, number];
  recommendedTerm: number;
}