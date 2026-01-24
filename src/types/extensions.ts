// src/types/extensions.ts
// Extensiones de tipos para funcionalidades adicionales

import { Vehicle } from '@/types';

// Vehicle con distancia calculada
export interface VehicleWithDistance extends Vehicle {
  distance?: number; // Distancia en km desde el usuario
}

// Tipo para ordenar por distancia
export type SortByDistance = 'distance_asc' | 'distance_desc';