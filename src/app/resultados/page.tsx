'use client';

// src/app/resultados/page.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, BudgetResult, BudgetInput, VehicleFilters as Filters, VehicleSortOption } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { VehicleFilters } from '@/components/vehicles/VehicleFilters';
import { BudgetSummary } from '@/components/calculator/BudgetSummary';
import { Button } from '@/components/ui/button';

export default function ResultadosPage() {
  const router = useRouter();
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgetResult, setBudgetResult] = useState<BudgetResult | null>(null);
  const [budgetInput, setBudgetInput] = useState<BudgetInput | null>(null);
  const [currentFilters, setCurrentFilters] = useState<Filters>({});
  const [currentSort, setCurrentSort] = useState<VehicleSortOption>('price_asc');

  useEffect(() => {
    // Recuperar datos del sessionStorage
    const storedResult = sessionStorage.getItem('budgetResult');
    const storedInput = sessionStorage.getItem('budgetInput');

    if (!storedResult || !storedInput) {
      router.push('/');
      return;
    }

    const result: BudgetResult = JSON.parse(storedResult);
    const input: BudgetInput = JSON.parse(storedInput);

    setBudgetResult(result);
    setBudgetInput(input);

    loadVehicles(input);
  }, [router]);

  const loadVehicles = async (input: BudgetInput) => {
    setLoading(true);
    try {
      // Obtener vehículos por presupuesto
      const vehicles = await vehicleRepository.getVehiclesByBudget(input, undefined, currentSort);
      setAllVehicles(vehicles);
      setFilteredVehicles(vehicles);

      // Obtener marcas disponibles
      const brands = await vehicleRepository.getAvailableBrands();
      setAvailableBrands(brands);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: Filters) => {
    setCurrentFilters(filters);
    applyFiltersAndSort(filters, currentSort);
  };

  const handleSortChange = (sort: VehicleSortOption) => {
    setCurrentSort(sort);
    applyFiltersAndSort(currentFilters, sort);
  };

  const applyFiltersAndSort = (filters: Filters, sort: VehicleSortOption) => {
    let filtered = [...allVehicles];

    // Aplicar filtros
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(v => filters.brands!.includes(v.brand));
    }

    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(v => filters.types!.includes(v.type));
    }

    if (filters.condition && filters.condition.length > 0) {
      filtered = filtered.filter(v => filters.condition!.includes(v.condition));
    }

    if (filters.transmission && filters.transmission.length > 0) {
      filtered = filtered.filter(v => filters.transmission!.includes(v.transmission));
    }

    if (filters.fuelType && filters.fuelType.length > 0) {
      filtered = filtered.filter(v => filters.fuelType!.includes(v.fuelType));
    }

    if (filters.yearMin) {
      filtered = filtered.filter(v => v.year >= filters.yearMin!);
    }

    if (filters.yearMax) {
      filtered = filtered.filter(v => v.year <= filters.yearMax!);
    }

    if (filters.priceMin) {
      filtered = filtered.filter(v => v.price >= filters.priceMin!);
    }

    if (filters.priceMax) {
      filtered = filtered.filter(v => v.price <= filters.priceMax!);
    }

    if (filters.mileageMax) {
      filtered = filtered.filter(v => !v.mileage || v.mileage <= filters.mileageMax!);
    }

    // Aplicar ordenamiento
    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year_desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        filtered.sort((a, b) => a.year - b.year);
        break;
      case 'mileage_asc':
        filtered.sort((a, b) => (a.mileage || 0) - (b.mileage || 0));
        break;
      case 'brand_asc':
        filtered.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
    }

    setFilteredVehicles(filtered);
  };

  if (loading || !budgetResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Buscando vehículos perfectos para ti...</p>
          <p className="text-sm text-slate-500 mt-2">Analizando más de 100 opciones</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Vehículos para Ti
              </h1>
              <p className="text-slate-600">
                Encontramos opciones dentro de tu presupuesto
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/')}
              className="hidden md:flex"
            >
              ← Ajustar Presupuesto
            </Button>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="container mx-auto px-4 py-6">
        <BudgetSummary result={budgetResult} />
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4">
        <VehicleFilters
          availableBrands={availableBrands}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
          totalResults={filteredVehicles.length}
        />
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-12">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No encontramos vehículos con estos filtros
            </h3>
            <p className="text-slate-600 mb-6">
              Intenta ajustar los filtros o tu presupuesto para ver más opciones
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setCurrentFilters({});
                  setFilteredVehicles(allVehicles);
                }}
              >
                Limpiar Filtros
              </Button>
              <Button onClick={() => router.push('/')}>
                Ajustar Presupuesto
              </Button>
            </div>
          </div>
        ) : (
          <>
            <VehicleGrid vehicles={filteredVehicles} />
            
            {/* Footer con stats */}
            <div className="mt-8 text-center text-slate-600">
              <p>
                Mostrando {filteredVehicles.length} de {allVehicles.length} vehículos disponibles
              </p>
            </div>
          </>
        )}
      </div>

      {/* Floating action button para móvil */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <Button 
          onClick={() => router.push('/')}
          className="rounded-full shadow-lg h-14 w-14"
          size="icon"
        >
          🔙
        </Button>
      </div>
    </main>
  );
}