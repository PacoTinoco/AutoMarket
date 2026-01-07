// src/lib/financial/config.ts

/**
 * Configuración financiera para cálculos
 * Estos valores son estimaciones basadas en el mercado mexicano
 */

export const FINANCIAL_CONFIG = {
  // Tasas de interés anuales por plazo (%)
  interestRates: {
    12: 12.5,  // 1 año
    24: 13.5,  // 2 años
    36: 14.5,  // 3 años
    48: 15.5,  // 4 años
    60: 16.5,  // 5 años
    72: 17.5,  // 6 años
  } as const,

  // Tasa de interés por defecto si no se especifica
  defaultInterestRate: 15.0,

  // Costos adicionales (% del valor del vehículo)
  additionalCosts: {
    // Seguro anual (5-8% del valor del vehículo)
    insuranceRate: 0.06, // 6%
    
    // Costo de placas/tenencia/registro (estimado anual)
    registrationFee: 3500, // MXN fijo
    
    // Mantenimiento anual estimado (2-3% del valor)
    maintenanceRate: 0.025, // 2.5%
  },

  // Parámetros de seguridad financiera
  safety: {
    // % máximo del ingreso que debería destinarse al auto (regla general: 30%)
    maxIncomePercentage: 0.30,
    
    // Enganche mínimo recomendado (% del valor del vehículo)
    minDownPaymentRate: 0.15, // 15%
    
    // Enganche recomendado (% del valor del vehículo)
    recommendedDownPaymentRate: 0.20, // 20%
  },

  // Plazos disponibles (meses)
  availableTerms: [12, 24, 36, 48, 60, 72] as const,

  // Límites de precio de vehículos (MXN)
  priceLimits: {
    min: 50000,    // $50,000
    max: 2000000,  // $2,000,000
  },
};

/**
 * Obtener tasa de interés según el plazo
 */
export function getInterestRateByTerm(term: number): number {
  return FINANCIAL_CONFIG.interestRates[term as keyof typeof FINANCIAL_CONFIG.interestRates] 
    || FINANCIAL_CONFIG.defaultInterestRate;
}

/**
 * Validar que el plazo sea válido
 */
export function isValidTerm(term: number): boolean {
  return FINANCIAL_CONFIG.availableTerms.includes(term as any);
}