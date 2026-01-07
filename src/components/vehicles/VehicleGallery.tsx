'use client';

// src/components/vehicles/VehicleGallery.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface VehicleGalleryProps {
  images: string[];
  vehicleName: string;
}

export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Imagen principal */}
      <div className="relative aspect-video bg-slate-200">
        <img
          src={images[currentIndex]}
          alt={`${vehicleName} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
              onClick={prevImage}
            >
              ←
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white"
              onClick={nextImage}
            >
              →
            </Button>
          </>
        )}

        {/* Indicador de imagen */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="p-4 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                ${index === currentIndex 
                  ? 'border-blue-600 ring-2 ring-blue-200' 
                  : 'border-slate-200 hover:border-slate-300'
                }
              `}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}