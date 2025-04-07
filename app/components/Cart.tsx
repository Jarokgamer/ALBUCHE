'use client';

import { useState } from 'react';

interface CartItem {
  id: string;
  type?: 'hamburguesas' | 'sandwiches';
  base: string;
  queso?: string;
  toppings?: string[];
  extras?: string[];
  price: number;
  isExtra?: boolean;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function Cart({ items, onRemoveItem, onCheckout }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Botón del carrito */}
      <button
        className="fixed top-4 right-4 z-50 bg-albuche-orange p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-albuche-orange text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {/* Panel del carrito */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-96 bg-albuche-black border-l border-gray-800 shadow-xl z-40 overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Tu Pedido</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Tu carrito está vacío
              </p>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-albuche-gray p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{item.base}</h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          ×
                        </button>
                      </div>
                      {!item.isExtra && (
                        <>
                          {item.queso && (
                            <p className="text-sm text-gray-400 mb-1">
                              Queso: {item.queso}
                            </p>
                          )}
                          {item.toppings && item.toppings.length > 0 && (
                            <p className="text-sm text-gray-400 mb-1">
                              Toppings: {item.toppings.join(', ')}
                            </p>
                          )}
                          {item.extras && item.extras.length > 0 && (
                            <p className="text-sm text-gray-400 mb-1">
                              Aderezos: {item.extras.join(', ')}
                            </p>
                          )}
                        </>
                      )}
                      <div className="text-albuche-orange font-bold">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-xl font-bold text-albuche-orange">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onCheckout();
                    }}
                    className="block w-full btn-primary text-center mb-2"
                  >
                    Confirmar Pedido
                  </button>
                  <p className="text-center text-sm text-gray-400">
                    recordá enviar el comprobante
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
} 