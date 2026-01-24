'use client';

// src/components/sections/DealershipsSection.tsx
// Sección "Para Agencias: Obtén Mejores Leads"

import { CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function DealershipsSection() {
  const benefits = [
    'Compradores Pre-Calificados',
    'Mayor Tasa de Conversión',
    'Integración API Simple',
    'Analíticos en Tiempo Real',
  ];

  const dashboardLeads = [
    { initials: 'MG', name: 'María G.', vehicle: 'Honda CR-V', status: 'new' },
    { initials: 'RS', name: 'Roberto S.', vehicle: 'Toyota RAV4', status: 'pending' },
    { initials: 'AL', name: 'Ana L.', vehicle: 'Mazda CX-5', status: 'new' },
  ];

  return (
    <section id="dealerships" className="py-20 lg:py-28 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div>
            <span className="inline-block text-sm font-semibold text-blue-400 tracking-wide uppercase mb-3">
              Para Agencias
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Obtén Mejores Leads, Cierra Más Ventas
            </h2>
            
            {/* Warning Stat */}
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              35% de los leads no están calificados financieramente
            </div>
            
            <p className="text-lg text-slate-400 mb-8">
              Deja de perder tiempo con leads que no pueden comprar. AutoMarket te envía 
              compradores pre-calificados que ya conocen su presupuesto y están listos para comprar.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="#contact">
                Más Información para Agencias
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-slate-800 rounded-2xl p-6 lg:p-8">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-white">Panel de Agencia</h3>
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                3 leads nuevos
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">24</p>
                <p className="text-xs text-slate-400">Leads Hoy</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">18.5%</p>
                <p className="text-xs text-slate-400">Conversión</p>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">$420K</p>
                <p className="text-xs text-slate-400">Presup. Prom.</p>
              </div>
            </div>

            {/* Leads List */}
            <div className="space-y-3">
              {dashboardLeads.map((lead, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {lead.initials}
                    </div>
                    <span className="text-sm text-slate-200">
                      {lead.name} • {lead.vehicle}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      lead.status === 'new'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {lead.status === 'new' ? 'Nuevo' : 'Pendiente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}