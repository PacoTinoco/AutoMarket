// scripts/generate-mock-data.ts

import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';

// Datos realistas del mercado mexicano
const MEXICAN_BRANDS = [
  'Nissan', 'Toyota', 'Chevrolet', 'Honda', 'Mazda', 
  'Volkswagen', 'Ford', 'Hyundai', 'Kia', 'Suzuki',
  'SEAT', 'Renault', 'Peugeot', 'BMW', 'Mercedes-Benz'
];

const MODELS_BY_BRAND: Record<string, string[]> = {
  Nissan: ['Versa', 'Sentra', 'Altima', 'Kicks', 'X-Trail', 'Frontier'],
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Yaris', 'Tacoma'],
  Chevrolet: ['Aveo', 'Cavalier', 'Onix', 'Trax', 'Equinox', 'Silverado'],
  Honda: ['City', 'Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
  Mazda: ['Mazda2', 'Mazda3', 'CX-3', 'CX-5', 'CX-30', 'CX-9'],
  Volkswagen: ['Jetta', 'Vento', 'Tiguan', 'Taos', 'Teramont', 'Polo'],
  Ford: ['Fiesta', 'Focus', 'Escape', 'Explorer', 'Ranger', 'Maverick'],
  Hyundai: ['Accent', 'Elantra', 'Tucson', 'Santa Fe', 'Creta', 'Venue'],
  Kia: ['Rio', 'Forte', 'Sportage', 'Seltos', 'Sorento', 'Soul'],
  Suzuki: ['Swift', 'Vitara', 'S-Cross', 'Jimny', 'Ertiga'],
  SEAT: ['Ibiza', 'Leon', 'Arona', 'Ateca', 'Tarraco'],
  Renault: ['Logan', 'Sandero', 'Stepway', 'Duster', 'Oroch', 'Koleos'],
  Peugeot: ['208', '2008', '3008', '5008', 'Partner', 'Rifter'],
  BMW: ['Serie 1', 'Serie 3', 'Serie 5', 'X1', 'X3', 'X5'],
  'Mercedes-Benz': ['Clase A', 'Clase C', 'Clase E', 'GLA', 'GLC', 'GLE']
};

const VEHICLE_TYPES = ['sedan', 'suv', 'pickup', 'hatchback', 'crossover'];
const TRANSMISSIONS = ['manual', 'automatic', 'cvt'];
const FUEL_TYPES = ['gasoline', 'diesel', 'hybrid'];
const CONDITIONS = ['new', 'used', 'certified'];
const COLORS = ['Blanco', 'Negro', 'Plata', 'Gris', 'Rojo', 'Azul', 'Café'];

const MEXICAN_CITIES = [
  'Morelia, Michoacán', 'Ciudad de México', 'Guadalajara, Jalisco',
  'Monterrey, Nuevo León', 'Puebla, Puebla', 'Querétaro, Querétaro',
  'Toluca, Estado de México', 'León, Guanajuato', 'Aguascalientes, Aguascalientes',
  'Mérida, Yucatán', 'Tijuana, Baja California', 'Cancún, Quintana Roo'
];

const FEATURES = [
  'Aire Acondicionado', 'Dirección Hidráulica', 'Frenos ABS',
  'Bolsas de Aire', 'Control de Estabilidad', 'Bluetooth',
  'Cámara de Reversa', 'Sensor de Estacionamiento', 'Cruise Control',
  'Asientos de Piel', 'Quemacocos', 'Rines de Aleación',
  'Sistema de Navegación', 'Puerto USB', 'Entrada Auxiliar'
];

// Generar ID único
function generateId(prefix: string): string {
  return `${prefix}-${faker.string.alphanumeric(8)}`;
}

// Generar precio realista según marca, modelo y año
function generatePrice(brand: string, year: number, condition: string): number {
  let basePrice = 200000; // Precio base

  // Ajustar por marca (premium vs económica)
  if (['BMW', 'Mercedes-Benz'].includes(brand)) {
    basePrice = 600000;
  } else if (['Toyota', 'Honda', 'Mazda'].includes(brand)) {
    basePrice = 300000;
  } else if (['Nissan', 'Chevrolet', 'Volkswagen'].includes(brand)) {
    basePrice = 250000;
  }

  // Ajustar por año
  const yearDiff = new Date().getFullYear() - year;
  basePrice *= Math.pow(0.92, yearDiff); // Depreciación ~8% anual

  // Ajustar por condición
  if (condition === 'used') {
    basePrice *= 0.85;
  } else if (condition === 'certified') {
    basePrice *= 0.90;
  }

  // Añadir variación aleatoria ±10%
  const variation = 1 + (Math.random() * 0.2 - 0.1);
  basePrice *= variation;

  // Redondear a miles
  return Math.round(basePrice / 1000) * 1000;
}

// Generar un vehículo
function generateVehicle(index: number): any {
  const brand = faker.helpers.arrayElement(MEXICAN_BRANDS);
  const model = faker.helpers.arrayElement(MODELS_BY_BRAND[brand]);
  const year = faker.number.int({ min: 2018, max: 2025 });
  const condition = faker.helpers.arrayElement(CONDITIONS);
  const type = faker.helpers.arrayElement(VEHICLE_TYPES);
  const price = generatePrice(brand, year, condition);
  
  const dealerId = generateId('dealer');
  const dealerName = `${brand} ${faker.helpers.arrayElement(MEXICAN_CITIES.map(c => c.split(',')[0]))}`;
  const location = faker.helpers.arrayElement(MEXICAN_CITIES);

  return {
    id: generateId('vh'),
    brand,
    model,
    year,
    price,
    type,
    condition,
    transmission: faker.helpers.arrayElement(TRANSMISSIONS),
    fuelType: faker.helpers.arrayElement(FUEL_TYPES),
    engine: faker.helpers.arrayElement(['1.6L I4', '2.0L I4', '2.5L I4', '3.0L V6', '1.5L Turbo']),
    mileage: condition === 'new' ? 0 : faker.number.int({ min: 10000, max: 100000 }),
    features: faker.helpers.arrayElements(FEATURES, faker.number.int({ min: 5, max: 10 })),
    colors: faker.helpers.arrayElements(COLORS, faker.number.int({ min: 2, max: 4 })),
    images: [
      `https://source.unsplash.com/800x600/?car,${brand.toLowerCase()},${index}`,
      `https://source.unsplash.com/800x600/?automobile,${model.toLowerCase()},${index + 1000}`
    ],
    thumbnailUrl: `https://source.unsplash.com/400x300/?car,${brand.toLowerCase()},${index}`,
    dealerId,
    dealerName,
    dealerLocation: location,
    inStock: faker.datatype.boolean(0.85), // 85% en stock
    stockQuantity: faker.number.int({ min: 1, max: 5 }),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString()
  };
}

// Generar agencias
function generateDealer(brand: string): any {
  const city = faker.helpers.arrayElement(MEXICAN_CITIES);
  const [cityName, state] = city.split(', ');

  return {
    id: generateId('dealer'),
    name: `${brand} ${cityName}`,
    brand,
    address: faker.location.streetAddress(),
    city: cityName,
    state: state,
    zipCode: faker.location.zipCode('#####'),
    country: 'México',
    coordinates: {
      lat: faker.location.latitude({ min: 14, max: 32 }),
      lng: faker.location.longitude({ min: -118, max: -86 })
    },
    phone: faker.phone.number({ style: 'national' }),
    email: `contacto@${brand.toLowerCase()}${cityName.toLowerCase()}.com.mx`,
    website: `www.${brand.toLowerCase()}${cityName.toLowerCase()}.com.mx`,
    whatsapp: faker.phone.number({ style: 'national' }),
    hours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 7:00 PM',
      friday: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 3:00 PM'
    },
    rating: faker.number.float({ min: 3.5, max: 5, multipleOf: 0.1 }),
    reviewCount: faker.number.int({ min: 10, max: 500 }),
    certified: faker.datatype.boolean(0.7),
    vehicleCount: faker.number.int({ min: 15, max: 80 }),
    createdAt: faker.date.past({ years: 3 }).toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString()
  };
}

// Generar todos los datos
function generateAllData() {
  console.log('🚗 Generando datos mock...');

  // Generar 100 vehículos
  const vehicles = Array.from({ length: 100 }, (_, i) => generateVehicle(i));
  console.log(`✓ ${vehicles.length} vehículos generados`);

  // Generar agencias (una por marca)
  const dealers = MEXICAN_BRANDS.map(brand => generateDealer(brand));
  console.log(`✓ ${dealers.length} agencias generadas`);

  // Guardar archivos
  const dataDir = path.join(__dirname, '../apps/web/src/data');
  
  // Crear directorio si no existe
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Guardar vehículos
  fs.writeFileSync(
    path.join(dataDir, 'mock-vehicles.json'),
    JSON.stringify(vehicles, null, 2),
    'utf-8'
  );
  console.log('✓ mock-vehicles.json guardado');

  // Guardar agencias
  fs.writeFileSync(
    path.join(dataDir, 'mock-dealers.json'),
    JSON.stringify(dealers, null, 2),
    'utf-8'
  );
  console.log('✓ mock-dealers.json guardado');

  console.log('\n✅ Datos mock generados exitosamente!');
  console.log(`📁 Archivos guardados en: ${dataDir}`);
}

// Ejecutar
generateAllData();