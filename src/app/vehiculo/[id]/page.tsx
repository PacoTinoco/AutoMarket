'use client';

// src/app/vehiculo/[id]/page.tsx

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Vehicle, BudgetInput } from '@/types';
import { vehicleRepository } from '@/lib/data/repositories/vehicleRepository';
import { VehicleDetailHeader } from '@/components/vehicles/VehicleDetailHeader';
import { VehicleGallery } from '@/components/vehicles/VehicleGallery';
import { VehicleSpecs } from '@/components/vehicles/VehicleSpecs';
import { VehicleFinancing } from '@/components/vehicles/VehicleFinancing';
import { VehicleContactForm } from '@/components/vehicles/VehicleContactForm';
import { Button } from '@/components/ui/button';

export default function VehiculoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [budgetInput, setBudgetInput] = useState<BudgetInput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
    loadBudget();
  }, [vehicleId]);

  const loadVehicle = async () => {
    setLoading(true);
    try {
      const vehicleData = await vehicleRepository.getVehicleById(vehicleId);
      setVehicle(vehicleData);
    } catch (error) {
      console.error('Error loading vehicle:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600">Cargando información del vehículo...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Vehículo no encontrado
          </h2>
          <p className="text-slate-600 mb-6">
            El vehículo que buscas no está disponible o no existe.
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
      {/* Header con navegación */}
      <VehicleDetailHeader vehicle={vehicle} onBack={() => router.back()} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galería de imágenes */}
            <VehicleGallery images={vehicle.images} vehicleName={`${vehicle.brand} ${vehicle.model}`} />

            {/* Especificaciones */}
            <VehicleSpecs vehicle={vehicle} />

            {/* Características */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                ✨ Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3"
                  >
                    <span className="text-blue-600">✓</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de la agencia */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                🏢 Agencia
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Nombre</p>
                  <p className="font-semibold text-slate-900">{vehicle.dealerName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ubicación</p>
                  <p className="text-slate-900">📍 {vehicle.dealerLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Disponibilidad</p>
                  <div className="flex items-center gap-2">
                    {vehicle.inStock ? (
                      <>
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="text-green-700 font-medium">
                          En stock ({vehicle.stockQuantity} {vehicle.stockQuantity === 1 ? 'unidad' : 'unidades'})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                        <span className="text-red-700 font-medium">No disponible</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Financiamiento y contacto */}
          <div className="lg:col-span-1 space-y-6">
            {/* Sticky sidebar */}
            <div className="lg:sticky lg:top-4 space-y-6">
              {/* Financiamiento */}
              <VehicleFinancing 
                vehicle={vehicle} 
                budgetInput={budgetInput}
              />

              {/* Formulario de contacto */}
              <VehicleContactForm vehicle={vehicle} />

              {/* Botones de acción */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/resultados')}
                >
                  🔄 Ver más opciones
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/')}
                >
                  🧮 Ajustar presupuesto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}