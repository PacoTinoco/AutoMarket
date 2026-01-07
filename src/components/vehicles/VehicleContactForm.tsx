'use client';

// src/components/vehicles/VehicleContactForm.tsx

import { useState } from 'react';
import { Vehicle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface VehicleContactFormProps {
  vehicle: Vehicle;
}

export function VehicleContactForm({ vehicle }: VehicleContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Lead generado:', {
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.brand} ${vehicle.model}`,
      dealerId: vehicle.dealerId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      message,
    });

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <Card className="bg-green-50 border-green-300">
        <CardContent className="pt-6 text-center">
          <div className="text-5xl mb-3">✅</div>
          <h3 className="font-semibold text-green-900 mb-2">
            ¡Mensaje enviado!
          </h3>
          <p className="text-sm text-green-800 mb-4">
            La agencia se pondrá en contacto contigo pronto.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
            className="border-green-600 text-green-700 hover:bg-green-100"
          >
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">📞 Contactar Agencia</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="444 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje (opcional)</Label>
            <textarea
              id="message"
              className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="¿Tienes alguna pregunta específica?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !vehicle.inStock}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Enviando...
              </>
            ) : !vehicle.inStock ? (
              'Vehículo no disponible'
            ) : (
              <>📤 Enviar consulta</>
            )}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Al enviar aceptas que la agencia se comunique contigo sobre este vehículo.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}