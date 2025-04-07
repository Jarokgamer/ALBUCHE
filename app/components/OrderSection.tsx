'use client';

import { useState } from 'react';

const BURGER_OPTIONS = {
  bases: [
    { name: 'Simple', price: 6400, comboPrice: 8700 },
    { name: 'Doble', price: 7400, comboPrice: 9700 },
    { name: 'Triple', price: 8600, comboPrice: 9300 },
    { name: 'Veggie', price: 6400, comboPrice: 8700 },
  ],
  quesos: [
    { name: 'Cheddar', price: 0 },
    { name: 'Tybo', price: 0 },
    { name: 'Azul', price: 0 },
    { name: 'Provolone', price: 0 },
  ],
  toppings: [
    // Vegetales
    { name: 'Lechuga', price: 0, category: 'vegetal' },
    { name: 'Tomate', price: 0, category: 'vegetal' },
    { name: 'Cebolla', price: 0, category: 'vegetal' },
    { name: 'Cebolla Morada', price: 0, category: 'vegetal' },
    { name: 'Cebolla Caramelizada', price: 0, category: 'vegetal' },
    { name: 'Pepinillos en Conserva', price: 0, category: 'vegetal' },
    { name: 'Rúcula', price: 0, category: 'vegetal' },
    // Proteínas
    { name: 'Huevo', price: 0, category: 'proteina' },
    { name: 'Panceta/Bacon', price: 0, category: 'proteina' },
    { name: 'Hongos Salteados', price: 0, category: 'proteina' },
    { name: 'Jamón', price: 0, category: 'proteina' },
  ],
  aderezos: [
    { name: 'Mayonesa Casera', price: 0 },
    { name: 'Salsa de la Casa', price: 0 },
    { name: 'Ketchup', price: 0 },
    { name: 'Savora', price: 0 },
  ],
};

interface OrderSectionProps {
  onAddToCart: (item: any) => void;
  productType: 'hamburguesas' | 'sandwiches';
  options?: typeof BURGER_OPTIONS;
}

export default function OrderSection({ onAddToCart, productType, options = BURGER_OPTIONS }: OrderSectionProps) {
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedQueso, setSelectedQueso] = useState('');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedAderezos, setSelectedAderezos] = useState<string[]>([]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  const calculateTotal = () => {
    let total = 0;

    // Precio base (siempre con papas)
    const baseOption = options.bases.find(b => b.name === selectedBase);
    if (baseOption) {
      total += baseOption.comboPrice; // Siempre usamos el precio con papas
    }

    // Precio adicional por toppings extras (solo para hamburguesas)
    if (productType === 'hamburguesas' && selectedToppings.length > 2) {
      const extraToppings = selectedToppings.length - 2;
      total += extraToppings * 350;
    }

    return total;
  };

  // Calcular el total actual
  const total = calculateTotal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBase) return;

    const newItem = {
      type: productType,
      base: selectedBase,
      queso: selectedQueso,
      toppings: selectedToppings,
      extras: selectedAderezos,
      price: calculateTotal(),
    };

    onAddToCart(newItem);
    
    // Reset form
    setSelectedBase('');
    setSelectedQueso('');
    setSelectedToppings([]);
    setSelectedAderezos([]);
  };

  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        {productType === 'hamburguesas' ? 'Armá tu hamburguesa' : 'Elegí tu sandwich'}
      </h2>
      <p className="text-xl text-gray-300 text-center mb-12">
        {productType === 'hamburguesas' 
          ? 'Personalizá tu hamburguesa como más te guste'
          : 'Personalizá tu sandwich como más te guste'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Base selection */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Base</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {options.bases.map((base) => (
              <label
                key={base.name}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  selectedBase === base.name
                    ? 'bg-albuche-orange text-black shadow-lg shadow-albuche-orange/20'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="base"
                    value={base.name}
                    checked={selectedBase === base.name}
                    onChange={(e) => setSelectedBase(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-lg">{base.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg">{formatPrice(base.comboPrice)}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="text-gray-400 text-center mt-4">Todos los combos incluyen papas fritas</p>
        </div>

        {/* Quesos selection */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            {productType === 'hamburguesas' ? 'Queso (doble por medallón)' : 'Queso'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {options.quesos.map((queso) => (
              <label
                key={queso.name}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  selectedQueso === queso.name
                    ? 'bg-albuche-orange text-black shadow-lg shadow-albuche-orange/20'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="queso"
                    value={queso.name}
                    checked={selectedQueso === queso.name}
                    onChange={(e) => setSelectedQueso(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-lg">{queso.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Toppings selection */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">¡Ponele Toppings!</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {options.toppings.map((topping) => (
              <label
                key={topping.name}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  selectedToppings.includes(topping.name)
                    ? 'bg-albuche-orange text-black shadow-lg shadow-albuche-orange/20'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value={topping.name}
                    checked={selectedToppings.includes(topping.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedToppings([...selectedToppings, topping.name]);
                      } else {
                        setSelectedToppings(selectedToppings.filter(t => t !== topping.name));
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-lg">{topping.name}</span>
                </div>
              </label>
            ))}
          </div>
          {productType === 'hamburguesas' && selectedToppings.length > 2 && (
            <p className="text-sm text-gray-400 text-center mt-2">
              Los primeros 2 toppings son gratis, cada topping adicional tiene un costo de $350
            </p>
          )}
        </div>

        {/* Aderezos selection */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Aderezos</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {options.aderezos.map((aderezo) => (
              <label
                key={aderezo.name}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                  selectedAderezos.includes(aderezo.name)
                    ? 'bg-albuche-orange text-black shadow-lg shadow-albuche-orange/20'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value={aderezo.name}
                    checked={selectedAderezos.includes(aderezo.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAderezos([...selectedAderezos, aderezo.name]);
                      } else {
                        setSelectedAderezos(selectedAderezos.filter(a => a !== aderezo.name));
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-lg">{aderezo.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Total y botón de submit */}
        <div className="sticky bottom-0 left-0 right-0 bg-albuche-black/95 backdrop-blur-sm py-4 border-t border-gray-800">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            {selectedBase && (
              <>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-gray-400 text-lg">Total a pagar:</span>
                  <span className="text-3xl font-bold text-albuche-orange">
                    {formatPrice(total)}
                  </span>
                  {productType === 'hamburguesas' && selectedToppings.length > 2 && (
                    <span className="text-sm text-gray-400">
                      Incluye {selectedToppings.length - 2} topping{selectedToppings.length - 2 > 1 ? 's' : ''} extra
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    {selectedBase} 
                    {selectedToppings.length > 0 ? ` + ${selectedToppings.length} Toppings` : ''}
                  </div>
                  <button
                    type="submit"
                    className="bg-albuche-orange text-black text-xl font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:bg-orange-600 hover:scale-105"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Espaciador para que el contenido no quede detrás del total fijo */}
        <div className="h-24" />
      </form>
    </div>
  );
} 