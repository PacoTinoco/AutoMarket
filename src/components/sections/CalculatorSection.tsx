'use client';

// src/components/sections/CalculatorSection.tsx
// Sección de la Calculadora - Se accede desde el botón del Hero

import { BudgetCalculator } from '@/components/calculator/BudgetCalculator';

export function CalculatorSection() {
  return (
    <section id="calculadora" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
            Calculadora de Presupuesto
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Descubre Cuánto Puedes Pagar
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ingresa tu enganche, mensualidad deseada y plazo para ver vehículos que se ajustan a tu realidad financiera.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <BudgetCalculator />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            * Los cálculos son estimados basados en tasas promedio del mercado. 
            Consulta directamente con la agencia para una cotización personalizada.
          </p>
        </div>
      </div>
    </section>
  );
}