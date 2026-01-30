// src/app/terminos/page.tsx
// Página de Términos y Condiciones

import { ArrowLeft, Shield, FileText, CreditCard, Car, AlertTriangle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FINANCING_CONFIG } from '@/lib/config/financing';

export default function TerminosPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Uso de la Plataforma',
      content: `AutoMarket es una plataforma digital de información y comparación de vehículos. Nuestro servicio permite a los usuarios calcular estimados de financiamiento y explorar opciones de vehículos disponibles en agencias asociadas. El uso de esta plataforma implica la aceptación de estos términos y condiciones.`,
    },
    {
      icon: CreditCard,
      title: '2. Cálculos de Financiamiento',
      content: `Los cálculos de financiamiento presentados en AutoMarket son ESTIMADOS basados en:
      
• Tasa de interés anual promedio del ${FINANCING_CONFIG.ANNUAL_INTEREST_RATE}% para vehículos seminuevos certificados
• Tasas diferenciadas: ${FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION.new}% para nuevos, ${FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION.certified}% para certificados, ${FINANCING_CONFIG.INTEREST_RATES_BY_CONDITION.used}% para usados
• Plazos estándar de ${FINANCING_CONFIG.AVAILABLE_TERMS.join(', ')} meses

Estos cálculos NO constituyen una oferta de crédito ni una cotización formal. Las tasas, mensualidades y condiciones finales serán determinadas por la institución financiera correspondiente y están sujetas a:

• Aprobación crediticia
• Historial crediticio del solicitante
• Políticas vigentes de la institución financiera
• Condiciones del mercado al momento de la solicitud`,
    },
    {
      icon: Car,
      title: '3. Información de Vehículos',
      content: `Los precios, especificaciones y disponibilidad de los vehículos mostrados son proporcionados por las agencias asociadas y están sujetos a cambios sin previo aviso.

• Los precios son de REFERENCIA y pueden no incluir: placas, tenencia, verificación vehicular, seguro, gastos de escrituración u otros costos asociados
• Las imágenes son ILUSTRATIVAS y pueden no corresponder exactamente al vehículo en existencia
• La disponibilidad debe verificarse directamente con la agencia
• Las especificaciones técnicas pueden variar según el modelo y versión específica`,
    },
    {
      icon: Shield,
      title: '4. Responsabilidad de AutoMarket',
      content: `AutoMarket actúa ÚNICAMENTE como plataforma informativa y de conexión entre usuarios y agencias automotrices. 

NO somos:
• Una institución financiera
• Una agencia automotriz
• Un intermediario de crédito autorizado

NO somos responsables de:
• Las transacciones realizadas entre usuarios y agencias
• La exactitud de la información proporcionada por terceros
• Cambios en precios, disponibilidad o condiciones de financiamiento
• Disputas entre usuarios y agencias o instituciones financieras

Recomendamos a los usuarios verificar toda la información directamente con la agencia antes de tomar decisiones de compra.`,
    },
    {
      icon: AlertTriangle,
      title: '5. Protección de Datos',
      content: `La información personal proporcionada a través de formularios de contacto será compartida únicamente con la agencia seleccionada para el propósito de atender su solicitud.

• No vendemos información personal a terceros
• Los datos de cálculo (presupuesto, enganche, etc.) no son almacenados permanentemente
• Puede solicitar la eliminación de sus datos en cualquier momento

Para más información, consulte nuestra Política de Privacidad.`,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Términos y Condiciones</h1>
              <p className="text-sm text-slate-500">Última actualización: Enero 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  Información Importante
                </h2>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Al utilizar AutoMarket, aceptas estos términos y condiciones. Te recomendamos leerlos 
                  cuidadosamente antes de usar nuestra plataforma. Si tienes dudas, contáctanos.
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">
                      {section.title}
                    </h3>
                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 bg-slate-100 rounded-xl p-6 text-center">
            <Mail className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              ¿Tienes preguntas?
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Si tienes dudas sobre estos términos, no dudes en contactarnos.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:legal@automarket.mx">
                Contactar Soporte Legal
              </a>
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-500 mt-8">
            © 2025 AutoMarket. Todos los derechos reservados. 
            Estos términos pueden ser actualizados periódicamente.
          </p>
        </div>
      </div>
    </main>
  );
}