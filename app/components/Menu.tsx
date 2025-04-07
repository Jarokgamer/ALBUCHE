'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isCombo?: boolean;
  options?: {
    acompañamiento?: string[];
    bebida?: string[];
  };
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'Combo Albuche XL',
    description: 'Hamburguesa doble carne, queso cheddar, lechuga, tomate, cebolla y salsa especial + acompañamiento + bebida',
    price: 9500,
    image: '/Imagenes/Menu 1.jpeg',
    isCombo: true,
    options: {
      acompañamiento: ['Papas fritas', 'Aros de cebolla', 'Papas rústicas'],
      bebida: ['Coca-Cola', 'Sprite', 'Fanta', 'Agua mineral']
    }
  },
  {
    id: 2,
    name: 'Combo BBQ Lover',
    description: 'Hamburguesa doble carne, bacon, cebolla caramelizada, queso americano y salsa BBQ + acompañamiento + bebida',
    price: 10000,
    image: '/Imagenes/Menu 2.jpeg',
    isCombo: true,
    options: {
      acompañamiento: ['Papas fritas', 'Aros de cebolla', 'Papas rústicas'],
      bebida: ['Coca-Cola', 'Sprite', 'Fanta', 'Agua mineral']
    }
  },
  {
    id: 3,
    name: 'Combo Mexicana',
    description: 'Hamburguesa doble carne, guacamole, jalapeños, queso manchego y salsa chipotle + acompañamiento + bebida',
    price: 9800,
    image: '/Imagenes/Menu 3.jpeg',
    isCombo: true,
    options: {
      acompañamiento: ['Papas fritas', 'Aros de cebolla', 'Papas rústicas'],
      bebida: ['Coca-Cola', 'Sprite', 'Fanta', 'Agua mineral']
    }
  }
];

export default function Menu() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedAcompañamiento, setSelectedAcompañamiento] = useState<string>('');
  const [selectedBebida, setSelectedBebida] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  return (
    <section id="menu" className="py-16 bg-[#1A1A1A]">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">
          Nuestros Combos
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {MENU_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="bg-[#2A2A2A] rounded-lg overflow-hidden hover:bg-[#333333] transition-colors"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 h-48 md:h-auto relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                    </div>
                    <span className="text-2xl font-bold text-albuche-orange">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  
                  {selectedItem?.id === item.id && (
                    <div className="mt-4 space-y-4">
                      {/* Selección de acompañamiento */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Elección acompañamiento
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-albuche-orange"
                          value={selectedAcompañamiento}
                          onChange={(e) => setSelectedAcompañamiento(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          {item.options?.acompañamiento?.map((acc) => (
                            <option key={acc} value={acc}>{acc}</option>
                          ))}
                        </select>
                      </div>

                      {/* Selección de bebida */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Elección bebida
                        </label>
                        <select
                          className="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-albuche-orange"
                          value={selectedBebida}
                          onChange={(e) => setSelectedBebida(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          {item.options?.bebida?.map((beb) => (
                            <option key={beb} value={beb}>{beb}</option>
                          ))}
                        </select>
                      </div>

                      {/* Control de cantidad */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white border border-gray-600"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </button>
                          <span className="text-white">{quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] text-white border border-gray-600"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="btn-primary"
                          onClick={() => {
                            // Aquí iría la lógica para agregar al carrito
                          }}
                        >
                          Agregar {formatPrice(item.price * quantity)}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {selectedItem?.id !== item.id && (
                    <button 
                      className="mt-4 btn-primary"
                      onClick={() => setSelectedItem(item)}
                    >
                      Elegir
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 