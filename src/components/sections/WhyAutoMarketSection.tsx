'use client';

// src/components/sections/WhyAutoMarketSection.tsx
// Sección "Por Qué AutoMarket lo Cambia Todo"

import { Shield, Clock, DollarSign, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function WhyAutoMarketSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Deja de Adivinar, Empieza a Saber',
      description: 'Conoce exactamente qué puedes pagar antes de enamorarte de un auto',
    },
    {
      icon: Clock,
      title: 'Ahorra Horas de Búsqueda',
      description: 'No más navegación infinita por listados que están fuera de tu presupuesto',
    },
    {
      icon: DollarSign,
      title: 'Sin Sorpresas Ocultas',
      description: 'Todos los costos calculados por adelantado: impuestos, seguros y financiamiento',
    },
    {
      icon: Heart,
      title: 'Protege tu Salud Financiera',
      description: 'Toma una decisión de la que estarás orgulloso por años',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-1 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop"
                alt="Comprador feliz con su auto nuevo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 lg:-right-6 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">$85,000</p>
                <p className="text-sm text-slate-500">Ahorro promedio por comprador</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-2 lg:order-2">
            <span className="inline-block text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
              Por Qué AutoMarket
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              Por Qué AutoMarket lo Cambia Todo
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              El 68% de los compradores de autos terminan con vehículos que comprometen su presupuesto. 
              Estamos aquí para cambiar eso poniendo tu salud financiera primero.
            </p>

            {/* Benefits List */}
            <ul className="space-y-6 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">{benefit.title}</h4>
                    <p className="text-slate-600 text-sm">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/">
                Calcula tu Presupuesto Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}