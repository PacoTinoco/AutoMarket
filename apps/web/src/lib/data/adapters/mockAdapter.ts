// src/lib/data/adapters/mockAdapter.ts

import { Vehicle, VehicleFilters, VehicleSortOption, Dealer, BudgetInput } from '@/types';
import { VehicleAdapter } from './vehicleAdapter';
import { calculateBudget } from '@/lib/financial';
import mockVehiclesData from '@/data/mock-vehicles.json';
import mockDealersData from '@/data/mock-dealers.json';

/**
 * Implementación Mock del VehicleAdapter
 * Usa datos JSON locales para la demo
 */
export class MockVehicleAdapter implements VehicleAdapter {
  private vehicles: Vehicle[] = mockVehiclesData as Vehicle[];
  private dealers: Dealer[] = mockDealersData as Dealer[];

  /**
   * Simula delay de red para realismo
   */
  private async simulateDelay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Obtener vehículos según presupuesto
   */
  async getVehiclesByBudget(
    budget: BudgetInput,
    filters?: VehicleFilters,
    sort: VehicleSortOption = 'price_asc'
  ): Promise<Vehicle[]> {
    await this.simulateDelay();

    // Calcular precio máximo basado en presupuesto
    const budgetResult = calculateBudget(budget);
    const maxPrice = budgetResult.maxVehiclePrice;

    // Filtrar vehículos por precio
    let filtered = this.vehicles.filter(v => 
      v.price <= maxPrice && 
      v.price >= budgetResult.recommendedPriceRange.min
    );

    // Aplicar filtros adicionales
    filtered = this.applyFilters(filtered, filters);

    // Ordenar
    filtered = this.sortVehicles(filtered, sort);

    return filtered;
  }

  /**
   * Obtener vehículo por ID
   */
  async getVehicleById(id: string): Promise<Vehicle | null> {
    await this.simulateDelay(200);
    return this.vehicles.find(v => v.id === id) || null;
  }

  /**
   * Obtener todos los vehículos
   */
  async getAllVehicles(
    filters?: VehicleFilters,
    sort: VehicleSortOption = 'price_asc',
    limit: number = 50,
    offset: number = 0
  ): Promise<{ vehicles: Vehicle[]; total: number }> {
    await this.simulateDelay();

    let filtered = [...this.vehicles];

    // Aplicar filtros
    filtered = this.applyFilters(filtered, filters);

    // Ordenar
    filtered = this.sortVehicles(filtered, sort);

    const total = filtered.length;
    const vehicles = filtered.slice(offset, offset + limit);

    return { vehicles, total };
  }

  /**
   * Obtener agencias cercanas (simulado)
   */
  async getDealersByLocation(
    lat: number,
    lng: number,
    radiusKm: number = 50
  ): Promise<Dealer[]> {
    await this.simulateDelay(300);
    
    // En mock, simplemente devuelve todas las agencias
    // En producción, esto calcularía distancias reales
    return this.dealers;
  }

  /**
   * Obtener agencia por ID
   */
  async getDealerById(id: string): Promise<Dealer | null> {
    await this.simulateDelay(200);
    return this.dealers.find(d => d.id === id) || null;
  }

  /**
   * Obtener marcas disponibles
   */
  async getAvailableBrands(): Promise<string[]> {
    await this.simulateDelay(100);
    const brands = [...new Set(this.vehicles.map(v => v.brand))];
    return brands.sort();
  }

  /**
   * Aplicar filtros a la lista de vehículos
   */
  private applyFilters(vehicles: Vehicle[], filters?: VehicleFilters): Vehicle[] {
    if (!filters) return vehicles;

    return vehicles.filter(vehicle => {
      // Filtro por marcas
      if (filters.brands && filters.brands.length > 0) {
        if (!filters.brands.includes(vehicle.brand)) return false;
      }

      // Filtro por tipos
      if (filters.types && filters.types.length > 0) {
        if (!filters.types.includes(vehicle.type)) return false;
      }

      // Filtro por año
      if (filters.yearMin && vehicle.year < filters.yearMin) return false;
      if (filters.yearMax && vehicle.year > filters.yearMax) return false;

      // Filtro por precio
      if (filters.priceMin && vehicle.price < filters.priceMin) return false;
      if (filters.priceMax && vehicle.price > filters.priceMax) return false;

      // Filtro por transmisión
      if (filters.transmission && filters.transmission.length > 0) {
        if (!filters.transmission.includes(vehicle.transmission)) return false;
      }

      // Filtro por combustible
      if (filters.fuelType && filters.fuelType.length > 0) {
        if (!filters.fuelType.includes(vehicle.fuelType)) return false;
      }

      // Filtro por condición
      if (filters.condition && filters.condition.length > 0) {
        if (!filters.condition.includes(vehicle.condition)) return false;
      }

      // Filtro por kilometraje
      if (filters.mileageMax && vehicle.mileage && vehicle.mileage > filters.mileageMax) {
        return false;
      }

      return true;
    });
  }

  /**
   * Ordenar vehículos
   */
  private sortVehicles(vehicles: Vehicle[], sort: VehicleSortOption): Vehicle[] {
    const sorted = [...vehicles];

    switch (sort) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'year_desc':
        return sorted.sort((a, b) => b.year - a.year);
      case 'year_asc':
        return sorted.sort((a, b) => a.year - b.year);
      case 'mileage_asc':
        return sorted.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
      case 'brand_asc':
        return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
      default:
        return sorted;
    }
  }
}