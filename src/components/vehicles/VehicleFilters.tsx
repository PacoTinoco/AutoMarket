'use client';

// src/components/vehicles/VehicleFilters.tsx
// Actualizado: Sin filtro de Condición (ya se selecciona en calculadora)
// Agregado: Ordenar por distancia

import { useState } from 'react';
import { VehicleFilters as Filters, VehicleSortOption } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal } from 'lucide-react';

interface VehicleFiltersProps {
  availableBrands: string[];
  onFiltersChange: (filters: Filters) => void;
  onSortChange: (sort: VehicleSortOption) => void;
  totalResults: number;
  hasUserLocation?: boolean; // Nueva prop para saber si hay ubicación
}

export function VehicleFilters({ 
  availableBrands, 
  onFiltersChange, 
  onSortChange,
  totalResults,
  hasUserLocation = false,
}: VehicleFiltersProps) {
  const [filters, setFilters] = useState<Filters>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan' },
    { value: 'suv', label: 'SUV' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'hatchback', label: 'Hatchback' },
    { value: 'crossover', label: 'Crossover' },
    { value: 'coupe', label: 'Coupé' },
    { value: 'van', label: 'Van' },
  ];

  const transmissions = [
    { value: 'manual', label: 'Manual' },
    { value: 'automatic', label: 'Automática' },
    { value: 'cvt', label: 'CVT' },
  ];

  const fuelTypes = [
    { value: 'gasoline', label: 'Gasolina' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'electric', label: 'Eléctrico' },
  ];

  // Opciones de ordenamiento - incluye distancia si hay ubicación
  const sortOptions = [
    { value: 'price_asc', label: 'Precio: Menor a Mayor' },
    { value: 'price_desc', label: 'Precio: Mayor a Menor' },
    ...(hasUserLocation ? [{ value: 'distance_asc', label: 'Distancia: Más Cercano' }] : []),
    { value: 'year_desc', label: 'Año: Más Reciente' },
    { value: 'year_asc', label: 'Año: Más Antiguo' },
    { value: 'mileage_asc', label: 'Kilometraje: Menor' },
    { value: 'brand_asc', label: 'Marca: A-Z' },
  ];

  const updateFilters = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'brands' | 'types' | 'transmission' | 'fuelType', value: string) => {
    const currentArray = (filters[key] || []) as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilters(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof Filters];
    return value !== undefined && (Array.isArray(value) ? value.length > 0 : true);
  }).length;

  return (
    <Card className="mb-6 border-slate-200">
      <CardContent className="p-4 lg:p-6">
        {/* Header con resultados y ordenamiento */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Filtros
            </h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {activeFiltersCount} activos
              </Badge>
            )}
            <span className="text-slate-500">
              • {totalResults} vehículos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="sort" className="text-sm text-slate-600 whitespace-nowrap">
              Ordenar por:
            </Label>
            <Select 
              defaultValue={hasUserLocation ? "distance_asc" : "price_asc"}
              onValueChange={(value) => onSortChange(value as VehicleSortOption)}
            >
              <SelectTrigger id="sort" className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros principales (sin Condición - ya se seleccionó en calculadora) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Marca */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Marca</Label>
            <Select onValueChange={(value) => toggleArrayFilter('brands', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las marcas" />
              </SelectTrigger>
              <SelectContent>
                {availableBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de vehículo */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Tipo</Label>
            <Select onValueChange={(value) => toggleArrayFilter('types', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón expandir más filtros */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full border-slate-200 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {isExpanded ? 'Menos filtros' : 'Más filtros'}
            </Button>
          </div>
        </div>

        {/* Filtros expandidos */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            {/* Transmisión */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Transmisión</Label>
              <Select onValueChange={(value) => toggleArrayFilter('transmission', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier transmisión" />
                </SelectTrigger>
                <SelectContent>
                  {transmissions.map((trans) => (
                    <SelectItem key={trans.value} value={trans.value}>
                      {trans.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Combustible */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Combustible</Label>
              <Select onValueChange={(value) => toggleArrayFilter('fuelType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier combustible" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel.value} value={fuel.value}>
                      {fuel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Año */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Año mínimo</Label>
              <Select onValueChange={(value) => updateFilters('yearMin', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier año" />
                </SelectTrigger>
                <SelectContent>
                  {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year} o más reciente
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Tags de filtros activos */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200 mt-4">
            <span className="text-sm text-slate-500">Filtros activos:</span>
            
            {filters.brands?.map((brand) => (
              <Badge 
                key={brand} 
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                onClick={() => toggleArrayFilter('brands', brand)}
              >
                {brand} ✕
              </Badge>
            ))}
            
            {filters.types?.map((type) => (
              <Badge 
                key={type} 
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                onClick={() => toggleArrayFilter('types', type)}
              >
                {vehicleTypes.find(t => t.value === type)?.label} ✕
              </Badge>
            ))}

            {filters.transmission?.map((trans) => (
              <Badge 
                key={trans} 
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                onClick={() => toggleArrayFilter('transmission', trans)}
              >
                {transmissions.find(t => t.value === trans)?.label} ✕
              </Badge>
            ))}

            {filters.fuelType?.map((fuel) => (
              <Badge 
                key={fuel} 
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                onClick={() => toggleArrayFilter('fuelType', fuel)}
              >
                {fuelTypes.find(f => f.value === fuel)?.label} ✕
              </Badge>
            ))}

            {filters.yearMin && (
              <Badge 
                variant="secondary"
                className="cursor-pointer hover:bg-red-100 hover:text-red-700 transition-colors"
                onClick={() => updateFilters('yearMin', undefined)}
              >
                Año ≥ {filters.yearMin} ✕
              </Badge>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
            >
              Limpiar todos
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}