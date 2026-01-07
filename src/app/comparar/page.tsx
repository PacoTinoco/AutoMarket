'use client';

// src/app/comparar/page.tsx

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Vehicle, BudgetInput } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleComparisonTable } from '@/components/vehicles/VehicleComparisonTable';
import { Button } from '@/components/ui/button';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Cargando comparación...</p>
        </div>
      </div>
    );
  }

  if (vehicles.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Necesitas al menos 2 vehículos
          </h2>
          <p className="text-slate-600 mb-6">
            Selecciona al menos 2 vehículos para poder compararlos.
          </p>
          <Button onClick={() => router.push('/resultados')}>
            ← Volver a resultados
          </Button>
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
                Comparación de Vehículos
              </h1>
              <p className="text-slate-600">
                Comparando {vehicles.length} {vehicles.length === 2 ? 'vehículo' : 'vehículos'}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/resultados')}
            >
              ← Volver a resultados
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-8">
        <VehicleComparisonTable
          vehicles={vehicles}
          budgetInput={budgetInput}
          onRemoveVehicle={handleRemoveVehicle}
        />

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/resultados')}
          >
            Ver más vehículos
          </Button>
          <Button onClick={() => router.push('/')}>
            Ajustar presupuesto
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function CompararPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Preparando comparación...</p>
        </div>
      </div>
    }>
      <CompararContent />
    </Suspense>
  );
}