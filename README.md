# 🚗 AutoMarket

<div align="center">

![AutoMarket Logo](public/logo.svg.png)

**Compra autos que realmente puedes pagar**

La plataforma inteligente que conecta compradores con agencias basándose en capacidad de compra real, no en deseos.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Demo en Vivo](https://auto-market-gamma.vercel.app) · [Reportar Bug](https://github.com/PacoTinoco/AutoMarket/issues) · [Solicitar Feature](https://github.com/PacoTinoco/AutoMarket/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Reference](#-api-reference)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Sobre el Proyecto

### El Problema

El proceso de compra de un vehículo en México está fragmentado:
- Los compradores no conocen su capacidad real de compra
- Se ilusionan con autos fuera de su presupuesto
- Las agencias reciben leads no calificados (70% sin capacidad de compra)
- Mucho tiempo perdido en ambos lados

### La Solución

AutoMarket invierte el proceso tradicional:

> **En lugar de preguntar "¿Qué auto quieres?", preguntamos "¿Qué auto puedes comprar sin comprometer tu economía?"**

#### Flujo del Usuario

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. Ingresa     │     │  2. Calculamos  │     │  3. Mostramos   │     │  4. Conectamos  │
│  Presupuesto    │ ──► │  Precio Máximo  │ ──► │  Opciones       │ ──► │  con Agencia    │
│  (enganche,     │     │  (tasas reales) │     │  Reales         │     │  (lead          │
│  mensualidad)   │     │                 │     │                 │     │  calificado)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## ✨ Características

### 🧮 Calculadora Inteligente de Presupuesto
- Ingreso de enganche, mensualidad máxima y plazo
- **Tasas diferenciadas por condición del vehículo:**
  - Nuevo: ~13% anual
  - Seminuevo Certificado: ~15% anual
  - Usado: ~18% anual
- Cálculo preciso del precio máximo del vehículo
- Estimación de seguro y costos adicionales

### 📍 Geolocalización
- Detección automática de ubicación del usuario
- Selección manual de ciudad (8 ciudades principales de México)
- Ordenamiento de vehículos por distancia
- Badge visual de cercanía (verde/azul/ámbar/gris)

### 🔍 Búsqueda y Filtros Avanzados
- Filtros por: marca, tipo, transmisión, combustible, año
- Ordenamiento múltiple: precio, año, kilometraje, distancia
- Resultados en tiempo real

### ⚖️ Comparador de Vehículos
- Compara hasta 3 vehículos lado a lado
- Tabla detallada de especificaciones
- Identificación del mejor valor (precio más bajo)
- Cálculos de financiamiento comparativos

### 📄 Fichas Detalladas de Vehículos
- Galería de imágenes
- Especificaciones completas
- Simulación de financiamiento personalizada
- Información de la agencia y contacto
- Indicador de disponibilidad en tiempo real

### 📱 Diseño Responsive
- Optimizado para móvil, tablet y desktop
- 70% de usuarios buscan desde celular
- Interfaz moderna y profesional

### ⚖️ Cumplimiento Legal
- Disclaimers de financiamiento
- Página de Términos y Condiciones
- Protección de datos del usuario

---

## 🛠 Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| [Next.js](https://nextjs.org/) | 15.x | Framework React con App Router |
| [React](https://reactjs.org/) | 19.x | Biblioteca UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.x | Estilos utilitarios |
| [Lucide React](https://lucide.dev/) | Latest | Iconografía |
| [shadcn/ui](https://ui.shadcn.com/) | Latest | Componentes UI |

### Herramientas de Desarrollo
| Herramienta | Uso |
|-------------|-----|
| ESLint | Linting de código |
| Prettier | Formateo de código |
| Turbopack | Bundler de desarrollo |

### Despliegue
| Servicio | Uso |
|----------|-----|
| [Vercel](https://vercel.com/) | Hosting y CI/CD |

---

## 🏗 Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Pages     │  │ Components  │  │   Hooks     │              │
│  │  (App Router)│  │  (UI/Logic) │  │  (State)    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Services Layer                        │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │ Geolocation │  │  Financial  │  │ Vehicle     │      │    │
│  │  │  Service    │  │  Calculator │  │ Repository  │      │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                          │                                       │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Config Layer                           │    │
│  │  ┌─────────────────────────────────────────────────┐    │    │
│  │  │              financing.ts                        │    │    │
│  │  │  (Tasas, plazos, seguros configurables)         │    │    │
│  │  └─────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │           Mock Data / Future: API + Database             │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18.x o superior
- npm, yarn o pnpm

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/PacoTinoco/AutoMarket.git
cd AutoMarket
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

### Build para Producción

```bash
npm run build
npm start
```

---

## 📁 Estructura del Proyecto

```
AutoMarket/
├── public/                     # Archivos estáticos
│   ├── logo.svg.png
│   └── videos/
│       └── hero-video.mp4
│
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página de inicio
│   │   ├── resultados/
│   │   │   └── page.tsx        # Resultados de búsqueda
│   │   ├── vehiculo/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Detalle de vehículo
│   │   ├── comparar/
│   │   │   └── page.tsx        # Comparador
│   │   └── terminos/
│   │       └── page.tsx        # Términos y condiciones
│   │
│   ├── components/
│   │   ├── ui/                 # Componentes base (shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── slider.tsx
│   │   │   └── badge.tsx
│   │   │
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── landing/            # Secciones del landing
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── calculator/         # Calculadora de presupuesto
│   │   │   ├── BudgetCalculator.tsx
│   │   │   └── BudgetSummary.tsx
│   │   │
│   │   ├── vehicles/           # Componentes de vehículos
│   │   │   ├── VehicleCard.tsx
│   │   │   ├── VehicleGrid.tsx
│   │   │   ├── VehicleFilters.tsx
│   │   │   └── VehicleComparisonTable.tsx
│   │   │
│   │   ├── location/           # Geolocalización
│   │   │   ├── LocationSelector.tsx
│   │   │   ├── DistanceBadge.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── legal/              # Componentes legales
│   │       ├── Disclaimer.tsx
│   │       └── index.ts
│   │
│   ├── hooks/                  # Custom hooks
│   │   └── useGeolocation.ts
│   │
│   ├── lib/                    # Utilidades y servicios
│   │   ├── config/
│   │   │   └── financing.ts    # Configuración de financiamiento
│   │   ├── services/
│   │   │   └── geolocation.ts  # Servicio de geolocalización
│   │   ├── data/
│   │   │   └── repositories/
│   │   │       └── vehicleRepository.ts
│   │   ├── financial.ts        # Cálculos financieros
│   │   └── utils.ts            # Utilidades generales
│   │
│   └── types/                  # Definiciones de tipos
│       ├── index.ts
│       ├── budget.ts
│       ├── vehicle.ts
│       └── extensions.ts
│
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Configuración

### Tasas de Financiamiento

Edita `src/lib/config/financing.ts` para ajustar las tasas:

```typescript
export const FINANCING_CONFIG = {
  // Tasa general (fallback)
  ANNUAL_INTEREST_RATE: 15,
  
  // Tasas por condición del vehículo
  INTEREST_RATES_BY_CONDITION: {
    new: 13,        // Vehículos nuevos
    certified: 15,  // Seminuevos certificados
    used: 18,       // Usados
  },
  
  // Seguro estimado (% anual del valor)
  INSURANCE_PERCENTAGE_OF_VALUE: 0.015,
  
  // Costos adicionales (placas, tenencia, etc.)
  ADDITIONAL_COSTS_PERCENTAGE: 0.03,
  
  // Plazos disponibles (meses)
  AVAILABLE_TERMS: [12, 24, 36, 48, 60, 72],
  
  // Plazo por defecto
  DEFAULT_TERM: 48,
};
```

### Ciudades para Geolocalización

Edita `src/lib/services/geolocation.ts` para agregar más ciudades:

```typescript
export const MEXICAN_CITIES: Record<string, UserLocation> = {
  'guadalajara': {
    latitude: 20.6597,
    longitude: -103.3496,
    city: 'Guadalajara',
    state: 'Jalisco',
  },
  // Agregar más ciudades aquí...
};
```

---

## 📖 Uso

### Flujo Principal

1. **Usuario ingresa a la página principal**
2. **Completa la calculadora de presupuesto:**
   - Enganche disponible
   - Mensualidad máxima
   - Plazo deseado
   - Tipo de vehículo (nuevo/seminuevo/usado)
3. **Sistema calcula precio máximo del vehículo**
4. **Usuario ve resultados filtrados por su presupuesto**
5. **Puede:**
   - Filtrar por marca, tipo, etc.
   - Activar ubicación para ver agencias cercanas
   - Comparar hasta 3 vehículos
   - Ver detalles completos
6. **Contacta a la agencia con datos pre-calificados**

### Ejemplo de Cálculo

```
Entrada:
- Enganche: $50,000
- Mensualidad máxima: $8,000
- Plazo: 48 meses
- Tipo: Seminuevo (tasa 15%)

Salida:
- Precio máximo del vehículo: ~$320,000
- Muestra solo vehículos ≤ $320,000
```

---

## 📚 API Reference

### Tipos Principales

```typescript
// Entrada del presupuesto
interface BudgetInput {
  downPayment: number;      // Enganche
  monthlyPayment: number;   // Mensualidad máxima
  term: number;             // Plazo en meses
  interestRate?: number;    // Tasa (opcional, se calcula por condición)
}

// Resultado del cálculo
interface BudgetResult {
  input: BudgetInput;
  maxVehiclePrice: number;
  totalFinanced: number;
  totalInterest: number;
  totalPayment: number;
  estimatedInsurance: number;
  estimatedRegistration: number;
  estimatedMaintenance: number;
  realMonthlyPayment: number;
  recommendedPriceRange: {
    min: number;
    max: number;
  };
}

// Vehículo
interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: 'new' | 'certified' | 'used';
  type: string;
  transmission: string;
  fuelType: string;
  mileage?: number;
  engine: string;
  features: string[];
  thumbnailUrl: string;
  images: string[];
  dealerName: string;
  dealerLocation: string;
  inStock: boolean;
  distance?: number;  // Calculado si hay geolocalización
}
```

### Funciones de Configuración

```typescript
// Obtener tasa por condición
getInterestRateByCondition(condition: VehicleConditionType): number

// Calcular precio máximo del vehículo
calculateMaxVehiclePrice(
  downPayment: number,
  maxMonthlyPayment: number,
  termMonths: number,
  annualRate: number
): number

// Calcular seguro mensual
calculateMonthlyInsurance(vehiclePrice: number): number

// Calcular distancia entre dos puntos
calculateDistance(lat1, lon1, lat2, lon2): number
```

---

## 🗺 Roadmap

### ✅ Fase A - Completada
- [x] Landing page profesional
- [x] Calculadora de presupuesto
- [x] Página de resultados
- [x] Página de detalle de vehículo
- [x] Comparador de vehículos
- [x] Header y Footer

### ✅ Fase B - Completada
- [x] Tasas diferenciadas por condición
- [x] Geolocalización y distancia
- [x] Disclaimer legal
- [x] Página de términos y condiciones

### 🔄 Fase C - En Progreso
- [x] Presentación para agencias
- [x] README profesional
- [ ] Testing E2E
- [ ] Optimización de performance
- [ ] SEO

### 📋 Fase D - Próximamente
- [ ] Backend API (Node.js/Express o Next.js API Routes)
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Panel de administración para agencias
- [ ] Sistema de autenticación
- [ ] Notificaciones de leads
- [ ] Dashboard de métricas
- [ ] Integración con CRM

### 🚀 Fase E - Futuro
- [ ] App móvil (React Native)
- [ ] Chat en tiempo real
- [ ] Integración con financieras
- [ ] Pre-aprobación de crédito
- [ ] Historial de búsquedas del usuario

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios mayores:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- Usa TypeScript estricto
- Sigue las convenciones de ESLint configuradas
- Componentes en PascalCase
- Hooks con prefijo `use`
- Commits descriptivos en español o inglés

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

---

## 📞 Contacto

**AutoMarket**

- 📧 Email: hola@automarket.mx
- 📱 Teléfono: +52 (33) 1234-5678
- 🌐 Web: [www.automarket.mx](https://auto-market-gamma.vercel.app)
- 📍 Ubicación: Guadalajara, Jalisco, México

**Repositorio:** [https://github.com/PacoTinoco/AutoMarket](https://github.com/PacoTinoco/AutoMarket)

---

<div align="center">

**Hecho con ❤️ en México**

*Compra inteligente de autos para México*

</div>