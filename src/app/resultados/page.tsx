'use client';

// src/app/resultados/page.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Vehicle, BudgetResult, BudgetInput } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleGrid } from '@/components/vehicles/VehicleGrid';
import { BudgetSummary } from '@/components/calculator/BudgetSummary';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ResultadosPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgetResult, setBudgetResult] = useState<BudgetResult | null>(null);
  const [budgetInput, setBudgetInput] = useState<BudgetInput | null>(null);

  useEffect(() => {
    // Recuperar datos del sessionStorage
    const storedResult = sessionStorage.getItem('budgetResult');
    const storedInput = sessionStorage.getItem('budgetInput');

    if (!storedResult || !storedInput) {
      // Si no hay datos, redirigir al inicio
      router.push('/');
      return;
    }

    const result: BudgetResult = JSON.parse(storedResult);
    const input: BudgetInput = JSON.parse(storedInput);

    setBudgetResult(result);
    setBudgetInput(input);

    // Buscar vehículos
    loadVehicles(input);
  }, [router]);

  const loadVehicles = async (input: BudgetInput) => {
    setLoading(true);
    try {
      const result = await vehicleRepository.getVehiclesByBudget(input);
      setVehicles(result);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !budgetResult) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Buscando vehículos para ti...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Resultados de Búsqueda</h1>
              <p className="text-slate-600">
                Encontramos <Badge variant="secondary">{vehicles.length}</Badge> vehículos para ti
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push('/')}>
              ← Nueva Búsqueda
            </Button>
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="container mx-auto px-4 py-6">
        <BudgetSummary result={budgetResult} />
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 pb-12">
        {vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 mb-4">
              No encontramos vehículos en este rango de presupuesto
            </p>
            <Button onClick={() => router.push('/')}>
              Ajustar Presupuesto
            </Button>
          </div>
        ) : (
          <VehicleGrid vehicles={vehicles} />
        )}
      </div>
    </main>
  );
}