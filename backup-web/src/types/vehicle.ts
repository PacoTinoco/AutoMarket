// src/types/vehicle.ts

/**
 * Tipo de vehículo según su carrocería
 */
export type VehicleType = 
  | 'sedan'
  | 'suv'
  | 'pickup'
  | 'hatchback'
  | 'coupe'
  | 'van'
  | 'crossover';

/**
 * Tipo de transmisión
 */
export type TransmissionType = 'manual' | 'automatic' | 'cvt';

/**
 * Tipo de combustible
 */
export type FuelType = 'gasoline' | 'diesel' | 'hybrid' | 'electric';

/**
 * Condición del vehículo
 */
export type VehicleCondition = 'new' | 'used' | 'certified';

/**
 * Interface principal del vehículo
 */
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  type: VehicleType;
  condition: VehicleCondition;
  
  // Especificaciones técnicas
  transmission: TransmissionType;
  fuelType: FuelType;
  engine: string; // ej: "2.0L I4"
  mileage?: number; // Kilometraje (para usados)
  
  // Características
  features: string[];
  colors: string[];
  
  // Información visual
  images: string[];
  thumbnailUrl: string;
  
  // Información del dealer
  dealerId: string;
  dealerName: string;
  dealerLocation: string;
  
  // Disponibilidad
  inStock: boolean;
  stockQuantity: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Versión resumida del vehículo para listados
 */
export interface VehicleSummary {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  type: VehicleType;
  thumbnailUrl: string;
  dealerName: string;
  inStock: boolean;
}

/**
 * Filtros para búsqueda de vehículos
 */
export interface VehicleFilters {
  brands?: string[];
  types?: VehicleType[];
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  transmission?: TransmissionType[];
  fuelType?: FuelType[];
  condition?: VehicleCondition[];
  mileageMax?: number;
}

/**
 * Opciones de ordenamiento
 */
export type VehicleSortOption = 
  | 'price_asc'
  | 'price_desc'
  | 'year_desc'
  | 'year_asc'
  | 'mileage_asc'
  | 'brand_asc';