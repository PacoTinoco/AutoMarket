'use client';

// src/components/ui/VideoModal.tsx
// Modal para mostrar video explicativo de YouTube

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string; // ID del video de YouTube
  title?: string;
}

export function VideoModal({ 
  isOpen, 
  onClose, 
  videoId = 'dQw4w9WgXcQ', // Video placeholder - reemplazar con tu video real
  title = 'Cómo Funciona AutoMarket'
}: VideoModalProps) {
  
  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay/Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl mx-4 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          Cerrar
          <span className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </span>
        </button>

        {/* Video Container */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
          {/* Title Bar */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800">
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          
          {/* Video Embed - Aspect Ratio 16:9 */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Optional: Additional Info Below Video */}
        <div className="mt-4 text-center">
          <p className="text-white/60 text-sm">
            Presiona <kbd className="px-2 py-1 bg-white/10 rounded text-white/80 text-xs">ESC</kbd> o haz clic afuera para cerrar
          </p>
        </div>
      </div>
    </div>
  );
}