'use client';

// src/components/layout/Header.tsx
// Header mejorado siguiendo el plan de producción FASE A1

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#calculadora', label: 'Calculadora de Presupuesto' },
    { href: '/resultados', label: 'Lista de Vehículos' },
    { href: '/comparar', label: 'Comparar Vehículos' },
    { href: '#how-it-works', label: 'Cómo Funciona' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Image
              src="/logo.svg.png"
              alt="AutoMarket"
              width={180}
              height={60}
              className="h-10 lg:h-12 w-auto"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/logo.png";
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium text-sm rounded-lg hover:bg-slate-50 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Link href="#calculadora">
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
                Encuentra tu Auto Ideal
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-slate-700 hover:text-blue-600 font-medium text-base rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base rounded-full"
                >
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <svg 
                      className="w-5 h-5 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                      />
                    </svg>
                    Encuentra tu Auto Ideal
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}