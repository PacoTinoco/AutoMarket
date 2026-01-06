// src/lib/data/adapters/vehicleAdapter.ts

import { Vehicle, VehicleFilters, VehicleSortOption, Dealer, BudgetInput } from '@/types';

/**
 * Interface que define el contrato para acceder a datos de vehículos
 * Esto permite cambiar fácilmente entre mock data y API real
 */
export interface VehicleAdapter {
  /**
   * Obtener vehículos según presupuesto del usuario
   */
  getVehiclesByBudget(
    budget: BudgetInput,
    filters?: VehicleFilters,
    sort?: VehicleSortOption
  ): Promise<Vehicle[]>;

  /**
   * Obtener un vehículo por ID
   */
  getVehicleById(id: string): Promise<Vehicle | null>;

  /**
   * Obtener todos los vehículos (con paginación opcional)
   */
  getAllVehicles(
    filters?: VehicleFilters,
    sort?: VehicleSortOption,
    limit?: number,
    offset?: number
  ): Promise<{
    vehicles: Vehicle[];
    total: number;
  }>;

  /**
   * Obtener agencias cercanas
   */
  getDealersByLocation(
    lat: number,
    lng: number,
    radiusKm?: number
  ): Promise<Dealer[]>;

  /**
   * Obtener una agencia por ID
   */
  getDealerById(id: string): Promise<Dealer | null>;

  /**
   * Obtener todas las marcas disponibles
   */
  getAvailableBrands(): Promise<string[]>;
}