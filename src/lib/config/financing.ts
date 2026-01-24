// src/lib/config/financing.ts
// Configuración de tasas y constantes de financiamiento
// ⚠️ MODIFICA ESTOS VALORES SEGÚN SEA NECESARIO

export const FINANCING_CONFIG = {
  // Tasa de interés anual promedio general (en porcentaje)
  // Se usa como fallback si no se especifica condición
  ANNUAL_INTEREST_RATE: 15,

  // Tasas de interés por condición del vehículo (en porcentaje)
  INTEREST_RATES_BY_CONDITION: {
    new: 13,        // Nuevo: ~12-14% anual
    certified: 15,  // Seminuevo certificado: ~14-16% anual
    used: 18,       // Usado: ~16-20% anual
  } as const,

  // Seguro vehicular mensual estimado (en pesos MXN)
  // Este es un estimado base, puede variar según el vehículo
  MONTHLY_INSURANCE_BASE: 1500,

  // Porcentaje del valor del vehículo para calcular seguro (opcional)
  // Ejemplo: 0.015 = 1.5% del valor del vehículo anual
  INSURANCE_PERCENTAGE_OF_VALUE: 0.015,

  // Costos adicionales estimados (placas, tenencia, etc.)
  // Se calculan como porcentaje del precio del vehículo
  ADDITIONAL_COSTS_PERCENTAGE: 0.03, // 3% del precio

  // Plazos disponibles (en meses)
  AVAILABLE_TERMS: [12, 24, 36, 48, 60, 72],

  // Plazo por defecto
  DEFAULT_TERM: 48,

  // Enganche mínimo recomendado (porcentaje)
  MIN_DOWN_PAYMENT_PERCENTAGE: 10,

  // Enganche máximo (porcentaje)
  MAX_DOWN_PAYMENT_PERCENTAGE: 50,
};

// Tipo para la condición del vehículo
export type VehicleConditionType = 'new' | 'certified' | 'used';

// Etiquetas en español para las condiciones
export const CONDITION_LABELS: Record<VehicleConditionType, string> = {
  new: 'Nuevo',
  certified: 'Seminuevo Certificado',
  used: 'Usado',
};

// Descripciones de las condiciones
export const CONDITION_DESCRIPTIONS: Record<VehicleConditionType, string> = {
  new: 'Vehículo 0 km directo de agencia',
  certified: 'Vehículo usado con garantía de agencia',
  used: 'Vehículo de segunda mano',
};

// Función para obtener la tasa según la condición
export function getInterestRateByCondition(condition: VehicleConditionType): number {
  return FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION[condition] ?? FINANCING_CONFIG.ANNUAL_INTEREST_RATE;
}

// Función para calcular el seguro mensual basado en el precio del vehículo
export function calculateMonthlyInsurance(vehiclePrice: number): number {
  const annualInsurance = vehiclePrice * FINANCING_CONFIG.INSURANCE_PERCENTAGE_OF_VALUE;
  return Math.round(annualInsurance / 12);
}

// Función para calcular la mensualidad
export function calculateMonthlyPayment(
  principal: number, // Monto a financiar (precio - enganche)
  annualRate: number = FINANCING_CONFIG.ANNUAL_INTEREST_RATE,
  termMonths: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  
  if (monthlyRate === 0) {
    return principal / termMonths;
  }
  
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                  (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return Math.round(payment);
}

// Función para calcular el precio máximo del vehículo dado un presupuesto
export function calculateMaxVehiclePrice(
  downPayment: number,       // Enganche disponible
  maxMonthlyPayment: number, // Mensualidad máxima que puede pagar
  termMonths: number,        // Plazo en meses
  annualRate: number = FINANCING_CONFIG.ANNUAL_INTEREST_RATE
): number {
  const monthlyRate = annualRate / 100 / 12;
  
  // Calcular el monto máximo que puede financiar
  let maxFinancingAmount: number;
  
  if (monthlyRate === 0) {
    maxFinancingAmount = maxMonthlyPayment * termMonths;
  } else {
    maxFinancingAmount = maxMonthlyPayment * 
      (Math.pow(1 + monthlyRate, termMonths) - 1) / 
      (monthlyRate * Math.pow(1 + monthlyRate, termMonths));
  }
  
  // Precio máximo = enganche + monto financiado
  const maxPrice = downPayment + maxFinancingAmount;
  
  return Math.round(maxPrice);
}

// Texto del disclaimer
export function getDisclaimerText(condition?: VehicleConditionType): string {
  const rate = condition 
    ? FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION[condition]
    : FINANCING_CONFIG.ANNUAL_INTEREST_RATE;
    
  return `* Precio estimado considerando tasa promedio del ${rate}% anual para vehículos ${condition ? CONDITION_LABELS[condition].toLowerCase() : ''}. Los costos finales pueden variar según la agencia y tu historial crediticio.`;
}

// Disclaimer corto para badges
export const SHORT_DISCLAIMER = `Tasas desde ${FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION.new}% anual`;