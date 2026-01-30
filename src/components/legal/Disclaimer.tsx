'use client';

// src/components/legal/Disclaimer.tsx
// Componente de Disclaimer Legal reutilizable

import { useState } from 'react';
import { Info, AlertTriangle, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { FINANCING_CONFIG } from '@/lib/config/financing';

type DisclaimerVariant = 'inline' | 'banner' | 'expandable' | 'footer' | 'modal';
type DisclaimerType = 'financing' | 'pricing' | 'general' | 'full';

interface DisclaimerProps {
  variant?: DisclaimerVariant;
  type?: DisclaimerType;
  className?: string;
  showIcon?: boolean;
}

// Textos de disclaimer
const DISCLAIMER_TEXTS = {
  financing: `Los cálculos de financiamiento son estimados basados en una tasa de interés anual promedio del ${FINANCING_CONFIG.ANNUAL_INTEREST_RATE}%. Las tasas reales pueden variar según la institución financiera, historial crediticio del solicitante y condiciones del mercado. Sujeto a aprobación crediticia.`,
  
  pricing: `Los precios mostrados son de referencia y pueden variar sin previo aviso. No incluyen costos adicionales como placas, tenencia, verificación, seguro vehicular u otros gastos relacionados con la compra. Consulta el precio final directamente con la agencia.`,
  
  availability: `La disponibilidad de vehículos está sujeta a cambios. Las imágenes son ilustrativas y pueden no corresponder exactamente al vehículo en existencia. Verifica disponibilidad y características directamente con la agencia.`,
  
  general: `AutoMarket es una plataforma de información y comparación. No somos una institución financiera ni agencia automotriz. Toda la información proporcionada es de carácter informativo y no constituye una oferta vinculante.`,
  
  full: `AVISO LEGAL: Los cálculos de financiamiento mostrados son estimados basados en tasas promedio del mercado (${FINANCING_CONFIG.ANNUAL_INTEREST_RATE}% anual) y no constituyen una oferta de crédito. Las tasas, mensualidades y condiciones finales dependen de la institución financiera y están sujetas a aprobación crediticia según el historial del solicitante. Los precios de los vehículos son de referencia, pueden variar sin previo aviso y no incluyen costos adicionales (placas, tenencia, seguro, etc.). La disponibilidad está sujeta a cambios. Las imágenes son ilustrativas. AutoMarket actúa únicamente como plataforma informativa y no es responsable por las transacciones realizadas entre usuarios y agencias. Consulta términos y condiciones completos.`,
};

export function Disclaimer({ 
  variant = 'inline', 
  type = 'general',
  className = '',
  showIcon = true,
}: DisclaimerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getText = () => {
    if (type === 'full') {
      return DISCLAIMER_TEXTS.full;
    }
    return DISCLAIMER_TEXTS[type] || DISCLAIMER_TEXTS.general;
  };

  // Variante inline (texto simple)
  if (variant === 'inline') {
    return (
      <p className={`text-xs text-slate-500 leading-relaxed ${className}`}>
        {showIcon && <span className="mr-1">*</span>}
        {getText()}
      </p>
    );
  }

  // Variante banner (destacado)
  if (variant === 'banner') {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          {showIcon && (
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-medium text-amber-800 mb-1">Información importante</p>
            <p className="text-xs text-amber-700 leading-relaxed">{getText()}</p>
          </div>
        </div>
      </div>
    );
  }

  // Variante expandible
  if (variant === 'expandable') {
    return (
      <div className={`border border-slate-200 rounded-lg overflow-hidden ${className}`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            {showIcon && <Info className="w-4 h-4 text-slate-500" />}
            <span className="text-sm font-medium text-slate-700">Información legal y disclaimers</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>
        {isExpanded && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-3">
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">Sobre el financiamiento:</p>
              <p className="text-xs text-slate-500 leading-relaxed">{DISCLAIMER_TEXTS.financing}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">Sobre los precios:</p>
              <p className="text-xs text-slate-500 leading-relaxed">{DISCLAIMER_TEXTS.pricing}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">Sobre la disponibilidad:</p>
              <p className="text-xs text-slate-500 leading-relaxed">{DISCLAIMER_TEXTS.availability}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 mb-1">Sobre AutoMarket:</p>
              <p className="text-xs text-slate-500 leading-relaxed">{DISCLAIMER_TEXTS.general}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Variante footer
  if (variant === 'footer') {
    return (
      <div className={`text-center ${className}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {showIcon && <Shield className="w-4 h-4 text-slate-400" />}
          <span className="text-xs font-medium text-slate-500">Aviso Legal</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto">
          {getText()}
        </p>
      </div>
    );
  }

  // Default
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {showIcon && <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />}
      <p className="text-xs text-slate-500 leading-relaxed">{getText()}</p>
    </div>
  );
}

// Componente para disclaimer corto en línea
export function DisclaimerShort({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-slate-500 ${className}`}>
      * Precios y financiamiento estimados. Sujeto a aprobación crediticia. 
      <a href="/terminos" className="text-blue-600 hover:underline ml-1">
        Ver términos completos
      </a>
    </p>
  );
}

// Componente para badge de disclaimer
export function DisclaimerBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full ${className}`}>
      <Info className="w-3 h-3" />
      Precios estimados
    </span>
  );
}