'use client';

// src/app/vehiculo/[id]/page.tsx
// Página de Detalle de Vehículo - Rediseñada FASE A3

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
import { 
  ArrowLeft, 
  Share2, 
  Heart, 
  MapPin, 
  CheckCircle2, 
  XCircle,
  Car,
  Calculator,
  Loader2,
  Building2,
  Phone,
  Star
} from 'lucide-react';

export default function VehiculoDetailPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [budgetInput, setBudgetInput] = useState<BudgetInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const handleShare = async () => {
    if (navigator.share && vehicle) {
      try {
        await navigator.share({
          title: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
          text: `Mira este ${vehicle.brand} ${vehicle.model} en AutoMarket`,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

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
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Cargando información del vehículo...</h2>
          <p className="text-slate-500">Un momento por favor</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Car className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Vehículo no encontrado
          </h2>
          <p className="text-slate-600 mb-8">
            El vehículo que buscas no está disponible o ya no existe en nuestro inventario.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <Button onClick={() => router.push('/resultados')}>
              Ver otros vehículos
            </Button>
          </div>
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
                onClick={() => router.back()}
                className="text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Volver</span>
              </Button>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <div className="hidden sm:block">
                <p className="text-sm text-slate-500">Detalle del vehículo</p>
                <h1 className="text-lg font-semibold text-slate-900">
                  {vehicle.brand} {vehicle.model}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? 'text-red-500' : 'text-slate-600'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-slate-600"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Vehicle Title - Mobile */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vehicle.condition === 'new' 
                    ? 'bg-green-100 text-green-700'
                    : vehicle.condition === 'certified'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {vehicle.condition === 'new' ? 'Nuevo' : vehicle.condition === 'certified' ? 'Certificado' : 'Usado'}
                </span>
                <span className="text-sm text-slate-500">{vehicle.year}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="text-slate-600">{vehicle.version}</p>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <VehicleGallery images={vehicle.images} vehicleName={`${vehicle.brand} ${vehicle.model}`} />
            </div>

            {/* Vehicle Title - Desktop */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vehicle.condition === 'new' 
                        ? 'bg-green-100 text-green-700'
                        : vehicle.condition === 'certified'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {vehicle.condition === 'new' ? 'Nuevo' : vehicle.condition === 'certified' ? 'Certificado' : 'Usado'}
                    </span>
                    <span className="text-slate-500">{vehicle.year}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">
                    {vehicle.brand} {vehicle.model}
                  </h1>
                  <p className="text-lg text-slate-600">{vehicle.version}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">Precio</p>
                  <p className="text-3xl font-bold text-blue-600">
                    ${vehicle.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" />
                Especificaciones
              </h2>
              <VehicleSpecs vehicle={vehicle} />
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Características
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {vehicle.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dealer Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Información de la Agencia
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Nombre</p>
                  <p className="font-semibold text-slate-900">{vehicle.dealerName}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-1">Ubicación</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-slate-900">{vehicle.dealerLocation}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl sm:col-span-2">
                  <p className="text-sm text-slate-500 mb-1">Disponibilidad</p>
                  <div className="flex items-center gap-2">
                    {vehicle.inStock ? (
                      <>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-medium text-green-700">
                          En stock ({vehicle.stockQuantity} {vehicle.stockQuantity === 1 ? 'unidad disponible' : 'unidades disponibles'})
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-700">No disponible actualmente</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              {/* Price Card - Mobile */}
              <div className="lg:hidden bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <p className="text-blue-100 mb-1">Precio</p>
                <p className="text-4xl font-bold">${vehicle.price.toLocaleString()}</p>
              </div>

              {/* Financing */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Financiamiento
                </h3>
                <VehicleFinancing 
                  vehicle={vehicle} 
                  budgetInput={budgetInput}
                />
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Contactar Agencia
                </h3>
                <VehicleContactForm vehicle={vehicle} />
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => router.push('/resultados')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ver más opciones
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => router.push('/')}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Ajustar presupuesto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}