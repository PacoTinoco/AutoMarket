// src/lib/data/repositories/vehicleRepository.ts

import { VehicleAdapter } from '../adapters/vehicleAdapter';
import { MockVehicleAdapter } from '../adapters/mockAdapter';

/**
 * Factory que crea el adapter apropiado según configuración
 * Esto permite cambiar entre mock y API real con solo cambiar una variable de entorno
 */
function createVehicleAdapter(): VehicleAdapter {
  const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE || 'mock';

  if (dataSource === 'mock') {
    console.log('🎭 Using MOCK data (Demo mode)');
    return new MockVehicleAdapter();
  }

  // En el futuro, aquí se agregaría:
  // if (dataSource === 'api') {
  //   return new APIVehicleAdapter(process.env.NEXT_PUBLIC_API_URL!);
  // }

  console.warn('⚠️ Invalid data source, falling back to mock');
  return new MockVehicleAdapter();
}

/**
 * Instancia global del repositorio
 * Se usa en toda la aplicación para acceder a datos de vehículos
 */
export const vehicleRepository = createVehicleAdapter();