'use client';

// src/app/comparar/page.tsx
// Página de Comparación - Rediseñada FASE A3

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Vehicle, BudgetInput } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleComparisonTable } from '@/components/vehicles/VehicleComparisonTable';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  GitCompare, 
  Plus, 
  Loader2,
  Trophy,
  Car,
  Calculator
} from 'lucide-react';

function CompararContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleIds = searchParams.get('ids')?.split(',') || [];

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [budgetInput, setBudgetInput] = useState<BudgetInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vehicleIds.length === 0) {
      router.push('/resultados');
      return;
    }

    loadVehicles();
    loadBudget();
  }, [vehicleIds.join(',')]);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      const loadedVehicles = await Promise.all(
        vehicleIds.map(id => vehicleRepository.getVehicleById(id))
      );
      setVehicles(loadedVehicles.filter(v => v !== null) as Vehicle[]);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBudget = () => {
    const storedInput = sessionStorage.getItem('budgetInput');
    if (storedInput) {
      setBudgetInput(JSON.parse(storedInput));
    }
  };

  const handleRemoveVehicle = (vehicleId: string) => {
    const newIds = vehicleIds.filter(id => id !== vehicleId);
    if (newIds.length < 2) {
      router.push('/resultados');
    } else {
      router.push(`/comparar?ids=${newIds.join(',')}`);
    }
  };

  // Find best value vehicle (lowest price)
  const bestValueVehicle = vehicles.length > 0 
    ? vehicles.reduce((prev, current) => (prev.price < current.price ? prev : current))
    : null;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Preparando comparación...</h2>
          <p className="text-slate-500">Analizando las opciones seleccionadas</p>
        </div>
      </div>
    );
  }

  // Not Enough Vehicles State
  if (vehicles.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <GitCompare className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Necesitas al menos 2 vehículos
          </h2>
          <p className="text-slate-600 mb-8">
            Selecciona al menos 2 vehículos de la lista de resultados para poder compararlos.
          </p>
          <Button onClick={() => router.push('/resultados')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a resultados
          </Button>
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
                onClick={() => router.push('/resultados')}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-blue-600" />
                  Comparación de Vehículos
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  Comparando {vehicles.length} vehículos
                </p>
              </div>
            </div>
            
            {vehicles.length < 3 && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => router.push('/resultados')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Agregar otro</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-1">Vehículos comparando</p>
              <p className="text-2xl font-bold">{vehicles.length}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-1">Rango de precios</p>
              <p className="text-2xl font-bold">
                ${Math.min(...vehicles.map(v => v.price)).toLocaleString()} - ${Math.max(...vehicles.map(v => v.price)).toLocaleString()}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-300" />
                <p className="text-blue-100 text-sm">Mejor precio</p>
              </div>
              <p className="text-2xl font-bold">
                {bestValueVehicle ? `${bestValueVehicle.brand} ${bestValueVehicle.model}` : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Cards Preview */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {vehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id}
              className={`bg-white rounded-xl border-2 p-4 relative ${
                bestValueVehicle?.id === vehicle.id 
                  ? 'border-green-500 shadow-lg shadow-green-500/10' 
                  : 'border-slate-200'
              }`}
            >
              {bestValueVehicle?.id === vehicle.id && (
                <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Mejor precio
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {vehicle.images && vehicle.images.length > 0 ? (
                    <img 
                      src={vehicle.images[0]} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Car className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">
                    {vehicle.brand} {vehicle.model}
                  </p>
                  <p className="text-sm text-slate-500">{vehicle.year} • {vehicle.version}</p>
                  <p className="text-lg font-bold text-blue-600 mt-1">
                    ${vehicle.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 pb-24 lg:pb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">Comparación Detallada</h2>
            <p className="text-slate-500 text-sm mt-1">Analiza las diferencias entre los vehículos seleccionados</p>
          </div>
          <VehicleComparisonTable
            vehicles={vehicles}
            budgetInput={budgetInput}
            onRemoveVehicle={handleRemoveVehicle}
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/resultados')}
            className="px-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver más vehículos
          </Button>
          <Button 
            size="lg"
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Ajustar presupuesto
          </Button>
        </div>
      </div>

      {/* Mobile Floating Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-20">
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => router.push('/resultados')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Más vehículos
          </Button>
          {vehicles.length < 3 && (
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/resultados')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

export default function CompararPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Preparando comparación...</h2>
          <p className="text-slate-500">Un momento por favor</p>
        </div>
      </div>
    }>
      <CompararContent />
    </Suspense>
  );
}