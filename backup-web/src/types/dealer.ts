// src/types/dealer.ts

/**
 * Información de una agencia/dealer
 */
export interface Dealer {
  id: string;
  name: string;
  brand?: string; // Marca principal (ej: "Toyota", "Honda")
  
  // Ubicación
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  coordinates: {
    lat: number;
    lng: number;
  };
  
  // Contacto
  phone: string;
  email: string;
  website?: string;
  whatsapp?: string;
  
  // Horarios
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  
  // Información adicional
  rating?: number; // 1-5
  reviewCount?: number;
  certified?: boolean; // Agencia certificada
  
  // Inventario
  vehicleCount: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

/**
 * Versión resumida de dealer para listados
 */
export interface DealerSummary {
  id: string;
  name: string;
  city: string;
  phone: string;
  distance?: number; // Distancia en km desde el usuario
  vehicleCount: number;
}

/**
 * Lead/contacto generado por un usuario
 */
export interface DealerLead {
  id: string;
  dealerId: string;
  vehicleId: string;
  
  // Info del usuario
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Budget del usuario
  budget: {
    downPayment: number;
    monthlyPayment: number;
    term: number;
  };
  
  // Mensaje
  message?: string;
  
  // Estado
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  
  // Timestamps
  createdAt: string;
  contactedAt?: string;
}