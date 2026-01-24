'use client';

// src/components/sections/CTASection.tsx
// Sección de Llamada a la Acción Final

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
            ¿Listo para Encontrar tu Auto Perfecto?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Empieza con tu presupuesto. Termina con el auto de tus sueños. Así de simple.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-100 font-semibold px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/">
                Calcula tu Presupuesto
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 hover:border-white font-semibold px-8 py-6 text-base rounded-full transition-all duration-300"
            >
              <Link href="#contact">
                Hablar con un Experto
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}