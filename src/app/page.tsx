// src/app/page.tsx
// Página Principal de AutoMarket - Versión con Hero Moderno

import { HeroSection } from '@/components/sections/HeroSection';
import { CalculatorSection } from '@/components/sections/CalculatorSection';
import { SmartWaySection } from '@/components/sections/SmartWaySection';
import { WhyAutoMarketSection } from '@/components/sections/WhyAutoMarketSection';
import { DealershipsSection } from '@/components/sections/DealershipsSection';
import { CTASection } from '@/components/sections/CTASection';

// Componente de Feature Card
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Componente de Stat Card
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl lg:text-4xl font-bold text-white mb-1">{value}</p>
      <p className="text-blue-200 text-sm">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ===== HERO SECTION (NUEVO) ===== */}
      <HeroSection />

      {/* ===== CALCULATOR SECTION (SEPARADA) ===== */}
      <CalculatorSection />

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              ¿Por Qué Usar AutoMarket?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Simplificamos la compra de tu próximo vehículo con herramientas inteligentes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon="💰"
              title="Presupuesto Real"
              description="Calcula exactamente cuánto puedes pagar, incluyendo enganche, mensualidades e intereses."
            />
            <FeatureCard
              icon="🎯"
              title="Resultados Personalizados"
              description="Solo vehículos que se ajustan a tu capacidad financiera, sin sorpresas."
            />
            <FeatureCard
              icon="📊"
              title="Comparación Clara"
              description="Compara opciones lado a lado con todos los costos transparentes."
            />
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 lg:py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard value="1,200+" label="Vehículos Disponibles" />
            <StatCard value="15+" label="Agencias Asociadas" />
            <StatCard value="95%" label="Satisfacción de Usuarios" />
            <StatCard value="$0" label="Costo de Uso" />
          </div>
        </div>
      </section>

      {/* ===== SMART WAY SECTION ===== */}
      <SmartWaySection />

      {/* ===== WHY AUTOMARKET SECTION ===== */}
      <WhyAutoMarketSection />

      {/* ===== DEALERSHIPS SECTION ===== */}
      <DealershipsSection />

      {/* ===== CTA SECTION ===== */}
      <CTASection />
    </main>
  );
}