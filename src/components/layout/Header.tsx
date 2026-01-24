'use client';

// src/components/layout/Header.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Calculadora de Presupuesto' },
    { href: '/resultados', label: 'Lista de Vehículos' },
    { href: '/comparar', label: 'Comparar Vehículos' },
    { href: '#how-it-works', label: 'Cómo Funciona' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Solo imagen, sin texto */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo.svg.png"
              alt="AutoMarket"
              width={180}
              height={60}
              className="h-14 w-auto"
              onError={(e) => {
                // Fallback si no carga SVG
                const target = e.target as HTMLImageElement;
                target.src = "/logo.png";
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium text-base transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 text-base shadow-md"
            >
              <Link href="/">Encuentra tu Auto Ideal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 font-medium text-base transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2"
              >
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  Encuentra tu Auto Ideal
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}