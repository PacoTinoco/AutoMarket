'use client';

// src/components/sections/SmartWaySection.tsx
// Sección "La Forma Inteligente de Comprar un Auto"
// Comparación: Forma Tradicional vs AutoMarket

import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export function SmartWaySection() {
  const oldWayItems = [
    'Navegas por autos que te gustan primero',
    'Te enamoras de algo fuera de tu presupuesto',
    'Estiras tu presupuesto para "hacerlo funcionar"',
    'Te arrepientes meses después',
  ];

  const newWayItems = [
    'Defines tu presupuesto real primero',
    'Solo ves autos que realmente puedes pagar',
    'Comparas dentro de tu zona de confort',
    'Compras con confianza, sin arrepentimientos',
  ];

  const steps = [
    {
      number: '1',
      title: 'Define tu Presupuesto',
      description: 'Ingresa enganche, mensualidad y plazo deseado',
    },
    {
      number: '2',
      title: 'Recibe Opciones Reales',
      description: 'Te mostramos vehículos que realmente puedes pagar',
    },
    {
      number: '3',
      title: 'Compara y Decide',
      description: 'Analiza opciones con información clara y completa',
    },
    {
      number: '4',
      title: 'Conecta con la Agencia',
      description: 'Agenda una cita o contacta directamente',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
            Por Qué es Importante
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            La Forma Inteligente de Comprar un Auto
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Deja de enamorarte de autos que no puedes pagar. Empieza con tu presupuesto, no con tus sueños.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto mb-20">
          {/* Old Way Card */}
          <div className="bg-slate-50 rounded-2xl p-6 lg:p-8 border-2 border-slate-200 opacity-90">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">😰</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">La Forma Tradicional</h3>
                <p className="text-sm text-slate-500">Emocional y Riesgosa</p>
              </div>
            </div>
            <ul className="space-y-4">
              {oldWayItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          
          {/* Mobile Arrow */}
          <div className="flex lg:hidden items-center justify-center py-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center rotate-90">
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          {/* New Way Card */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 border-2 border-blue-500 shadow-lg shadow-blue-500/10 relative">
            {/* Badge */}
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recomendado
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">La Forma AutoMarket</h3>
                <p className="text-sm text-slate-500">Inteligente y Segura</p>
              </div>
            </div>
            <ul className="space-y-4">
              {newWayItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}