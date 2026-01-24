'use client';

// src/app/resultados/page.tsx
// Página de Resultados - Rediseñada FASE A3

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, BudgetResult, BudgetInput, VehicleFilters as Filters, VehicleSortOption } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { VehicleFilters } from '@/components/vehicles/VehicleFilters';
import { BudgetSummary } from '@/components/calculator/BudgetSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Search, SlidersHorizontal, GitCompare, X, Loader2, Sparkles, Shield, Clock, MapPin } from 'lucide-react';
import { VehicleConditionType, CONDITION_LABELS } from '@/lib/config/financing';
import { LocationSelector } from '@/components/location/LocationSelector';
import { useGeolocation } from '@/hooks/useGeolocation';
import { calculateDistance, UserLocation } from '@/lib/services/geolocation';

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
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [vehicleCondition, setVehicleCondition] = useState<VehicleConditionType | null>(null);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  
  // Hook de geolocalización
  const { location: userLocation, status: locationStatus } = useGeolocation();

  // Función para agregar distancia a los vehículos
  const addDistanceToVehicles = (vehicles: Vehicle[], userLoc: UserLocation | null): Vehicle[] => {
    if (!userLoc) return vehicles;
    
    return vehicles.map(vehicle => {
      // Simular coordenadas de la agencia basadas en dealerLocation
      // En producción, estas vendrían de la base de datos
      const dealerCoords = getDealerCoordinates(vehicle.dealerLocation);
      if (dealerCoords) {
        const distance = calculateDistance(
          userLoc.latitude,
          userLoc.longitude,
          dealerCoords.lat,
          dealerCoords.lng
        );
        return { ...vehicle, distance };
      }
      return vehicle;
    }).sort((a, b) => {
      // Ordenar por distancia si ambos tienen distancia
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return 0;
    });
  };

  // Obtener coordenadas simuladas de agencias (en producción vendrían de la BD)
  const getDealerCoordinates = (dealerLocation: string): { lat: number; lng: number } | null => {
    const locations: Record<string, { lat: number; lng: number }> = {
      'Guadalajara': { lat: 20.6597, lng: -103.3496 },
      'Zapopan': { lat: 20.7167, lng: -103.4000 },
      'Tlaquepaque': { lat: 20.6167, lng: -103.3167 },
      'Tonalá': { lat: 20.6167, lng: -103.2333 },
      'Ciudad de México': { lat: 19.4326, lng: -99.1332 },
      'Monterrey': { lat: 25.6866, lng: -100.3161 },
      'Puebla': { lat: 19.0414, lng: -98.2063 },
      'León': { lat: 21.1250, lng: -101.6860 },
    };
    
    // Buscar coincidencia parcial
    const key = Object.keys(locations).find(k => 
      dealerLocation.toLowerCase().includes(k.toLowerCase())
    );
    
    return key ? locations[key] : null;
  };

  useEffect(() => {
    const storedResult = sessionStorage.getItem('budgetResult');
    const storedInput = sessionStorage.getItem('budgetInput');
    const storedCondition = sessionStorage.getItem('vehicleCondition') as VehicleConditionType | null;

    if (!storedResult || !storedInput) {
      router.push('/');
      return;
    }

    const result: BudgetResult = JSON.parse(storedResult);
    const input: BudgetInput = JSON.parse(storedInput);

    setBudgetResult(result);
    setBudgetInput(input);
    if (storedCondition) {
      setVehicleCondition(storedCondition);
    }
    loadVehicles(input);
  }, [router]);

  const loadVehicles = async (input: BudgetInput) => {
    setLoading(true);
    try {
      let vehicles = await vehicleRepository.getVehiclesByBudget(input, undefined, currentSort);
      
      // Agregar distancia si hay ubicación del usuario
      if (userLocation) {
        vehicles = addDistanceToVehicles(vehicles, userLocation);
      }
      
      setAllVehicles(vehicles);
      setFilteredVehicles(vehicles);

      const brands = await vehicleRepository.getAvailableBrands();
      setAvailableBrands(brands);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recargar vehículos cuando cambie la ubicación
  useEffect(() => {
    if (budgetInput && userLocation) {
      const vehiclesWithDistance = addDistanceToVehicles(allVehicles, userLocation);
      setAllVehicles(vehiclesWithDistance);
      setFilteredVehicles(addDistanceToVehicles(filteredVehicles, userLocation));
    }
  }, [userLocation]);

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

  const handleSelectVehicle = (vehicleId: string, selected: boolean) => {
    if (selected) {
      if (selectedVehicles.length >= 3) {
        alert('Solo puedes comparar hasta 3 vehículos');
        return;
      }
      setSelectedVehicles([...selectedVehicles, vehicleId]);
    } else {
      setSelectedVehicles(selectedVehicles.filter(id => id !== vehicleId));
    }
  };

  const handleCompare = () => {
    if (selectedVehicles.length < 2) {
      alert('Selecciona al menos 2 vehículos para comparar');
      return;
    }
    router.push(`/comparar?ids=${selectedVehicles.join(',')}`);
  };

  // Loading State
  if (loading || !budgetResult) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Buscando vehículos perfectos para ti...</h2>
          <p className="text-slate-500">Analizando más de 100 opciones</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/')}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-slate-900">
                  Vehículos para Ti
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  {filteredVehicles.length} opciones dentro de tu presupuesto
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!compareMode ? (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setCompareMode(true)}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Comparar</span>
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 hidden sm:inline">
                    {selectedVehicles.length}/3 seleccionados
                  </span>
                  <Button 
                    size="sm"
                    onClick={handleCompare}
                    disabled={selectedVehicles.length < 2}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Comparar ({selectedVehicles.length})
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCompareMode(false);
                      setSelectedVehicles([]);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <BudgetSummary result={budgetResult} vehicleCondition={vehicleCondition ?? undefined} />
        </div>
      </div>

      {/* Vehicle Condition Badge */}
      {vehicleCondition && (
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-blue-700">
              {vehicleCondition === 'new' && <Sparkles className="w-4 h-4" />}
              {vehicleCondition === 'certified' && <Shield className="w-4 h-4" />}
              {vehicleCondition === 'used' && <Clock className="w-4 h-4" />}
              <span className="text-sm font-medium">
                Mostrando vehículos: <strong>{CONDITION_LABELS[vehicleCondition]}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Location Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-400" />
              {userLocation ? (
                <span className="text-sm text-slate-600">
                  Mostrando agencias cerca de{' '}
                  <strong className="text-slate-900">
                    {userLocation.city || 'tu ubicación'}
                  </strong>
                  {' '}• Ordenado por distancia
                </span>
              ) : (
                <span className="text-sm text-slate-500">
                  Activa tu ubicación para ver agencias cercanas
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLocationSelector(!showLocationSelector)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              {userLocation ? 'Cambiar' : 'Activar ubicación'}
            </Button>
          </div>
          
          {/* Location Selector Expandible */}
          {showLocationSelector && (
            <div className="mt-4 pb-2">
              <LocationSelector 
                onLocationChange={(loc) => {
                  setShowLocationSelector(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Compare Mode Banner */}
      {compareMode && (
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <GitCompare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-blue-900">Modo Comparación Activo</p>
                  <p className="text-sm text-blue-600">Selecciona de 2 a 3 vehículos para comparar</p>
                </div>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all ${
                      selectedVehicles.length >= num
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-blue-300 text-blue-300'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <VehicleFilters
          availableBrands={availableBrands}
          onFiltersChange={handleFiltersChange}
          onSortChange={handleSortChange}
          totalResults={filteredVehicles.length}
        />
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-24 lg:pb-12">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No encontramos vehículos con estos filtros
            </h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Intenta ajustar los filtros o tu presupuesto para ver más opciones disponibles
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setCurrentFilters({});
                  setFilteredVehicles(allVehicles);
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Limpiar Filtros
              </Button>
              <Button onClick={() => router.push('/')}>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Ajustar Presupuesto
              </Button>
            </div>
          </div>
        ) : (
          <>
            <VehicleGrid 
              vehicles={filteredVehicles}
              selectedVehicles={selectedVehicles}
              onSelectVehicle={handleSelectVehicle}
              showCheckboxes={compareMode}
            />
            
            {/* Footer Stats */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
                <span className="text-slate-600">
                  Mostrando <span className="font-semibold text-slate-900">{filteredVehicles.length}</span> de{' '}
                  <span className="font-semibold text-slate-900">{allVehicles.length}</span> vehículos
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile Floating Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-20">
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ajustar
          </Button>
          {!compareMode ? (
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => setCompareMode(true)}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Comparar
            </Button>
          ) : (
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleCompare}
              disabled={selectedVehicles.length < 2}
            >
              Comparar ({selectedVehicles.length})
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}