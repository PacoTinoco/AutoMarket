
// src/app/page.tsx
// Versión actualizada - Deploy 2

import { BudgetCalculator } from '@/components/calculator/BudgetCalculator';
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Encuentra el Auto que{' '}
            <span className="text-blue-600">Realmente Puedes Pagar</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            No más frustraciones. Descubre vehículos que se ajustan a tu presupuesto real,
            no solo a tus deseos.
          </p>
        </div>

        {/* Calculadora */}
        <div className="max-w-4xl mx-auto">
          <BudgetCalculator />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
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
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="1,200+" label="Vehículos Disponibles" />
            <StatCard number="15+" label="Agencias Asociadas" />
            <StatCard number="95%" label="Satisfacción de Usuarios" />
            <StatCard number="$0" label="Costo de Uso" />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
}