'use client';

// src/components/sections/HeroSection.tsx
// Hero Section con diseño moderno - Imagen + Texto + Features + Video Modal

import { useState } from 'react';
import { ArrowRight, Play, Calculator, Eye, Shield, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { VideoModal } from '@/components/ui/VideoModal';

export function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const features = [
    {
      icon: Calculator,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Conoce tu Presupuesto Primero',
      description: 'Calcula tu poder de compra real',
    },
    {
      icon: Eye,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Ve Solo lo que Puedes Comprar',
      description: 'Sin perder tiempo ni decepciones',
    },
    {
      icon: Shield,
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      title: 'Transparencia Total en Costos',
      description: 'Seguro, placas y mantenimiento incluidos',
    },
    {
      icon: Building2,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Conecta con Agencias',
      description: 'Inventario disponible cerca de ti',
    },
  ];

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm mb-8">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Compra Inteligente de Autos para México</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-slate-900">Compra Autos que </span>
                <span className="text-blue-600">Realmente Puedes Pagar</span>
                <span className="text-slate-900"> — Con Confianza</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                Deja de ver autos fuera de tu presupuesto. AutoMarket te muestra solo los vehículos 
                que puedes pagar — con total transparencia en enganche, mensualidades y costos ocultos.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${feature.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">{feature.title}</h3>
                      <p className="text-slate-500 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
                >
                  <Link href="#calculadora">
                    Calcular Mi Presupuesto
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                {/* Botón que abre el Video Modal */}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsVideoOpen(true)}
                  className="bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Cómo Funciona
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Gratis para usar
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  Sin tarjeta de crédito
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  Resultados en 30 segundos
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 lg:p-8">
                  <Image
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop"
                    alt="Auto en balance con monedas - representa compra inteligente"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl object-cover"
                    priority
                  />
                  
                  {/* Play Button Overlay on Image */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="absolute inset-0 m-6 lg:m-8 flex items-center justify-center group"
                  >
                    <div className="w-20 h-20 bg-blue-600/90 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </button>
                  
                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-2xl lg:text-3xl font-bold text-blue-600">100+</p>
                      <p className="text-xs text-slate-500">Vehículos</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl lg:text-3xl font-bold text-green-600">60%</p>
                      <p className="text-xs text-slate-500">Tiempo Ahorrado</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl lg:text-3xl font-bold text-orange-500">100%</p>
                      <p className="text-xs text-slate-500">Transparente</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - Optional decorative */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-60 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-100 rounded-full opacity-60 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId="dQw4w9WgXcQ" // TODO: Reemplazar con el ID de tu video real de YouTube
        title="Cómo Funciona AutoMarket"
      />
    </>
  );
}