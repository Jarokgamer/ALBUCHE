'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  type?: 'hamburguesas' | 'sandwiches';
  base: string;
  queso?: string;
  toppings?: string[];
  extras?: string[];
  price: number;
  isCombo?: boolean;
  bebida?: string;
  isExtra?: boolean;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia'>('efectivo');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Recuperar los items del carrito del localStorage
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      try {
        const parsedItems = JSON.parse(savedCartItems);
        setCartItems(parsedItems);
      } catch (error) {
        console.error('Error parsing cart items:', error);
        router.push('/');
      }
    } else {
      // Si no hay items, redirigir al inicio
      router.push('/');
    }
  }, [router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    
    // Construir el mensaje para WhatsApp
    const message = `
🍔 *Nuevo Pedido* 🍔

*Detalle del pedido:*
${cartItems.map((item, index) => {
  // Formato diferente para extras
  if (item.isExtra) {
    return `
${index + 1}. Adicional: ${item.base}
   - Precio: ${formatPrice(item.price)}`;
  }
  
  // Formato para hamburguesas y sandwiches
  return `
${index + 1}. ${item.type ? `${item.type === 'hamburguesas' ? 'Hamburguesa' : 'Sandwich'} ` : ''}${item.base}
   ${item.queso ? `- Queso: ${item.queso}` : ''}
   ${item.toppings && item.toppings.length > 0 ? `- Toppings: ${item.toppings.join(', ')}` : ''}
   ${item.extras && item.extras.length > 0 ? `- Aderezos: ${item.extras.join(', ')}` : ''}
   ${item.isCombo && item.bebida ? `- Bebida: ${item.bebida}` : ''}
   - Precio: ${formatPrice(item.price)}`;
}).join('\n')}

*Total:* ${formatPrice(total)}

*Método de entrega:* ${deliveryMethod === 'pickup' ? 'Retiro en local' : 'Delivery'}
${deliveryMethod === 'delivery' ? `*Dirección:* ${address}` : ''}
${instructions ? `*Instrucciones:* ${instructions}` : ''}
*Método de pago:* ${paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia'}

¡Gracias por tu pedido!
    `.trim();

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Limpiar el carrito del localStorage
    localStorage.removeItem('cartItems');
    
    // Redirigir a WhatsApp
    window.location.href = `https://api.whatsapp.com/send?phone=543513030145&text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-albuche-black py-12">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-center mb-8">
          Finalizar Pedido
        </h1>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Método de entrega */}
            <div>
              <h2 className="text-xl font-bold mb-4">Método de entrega</h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                    ${deliveryMethod === 'pickup'
                      ? 'border-albuche-orange bg-albuche-gray'
                      : 'border-gray-600 hover:border-gray-400'}
                  `}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    className="sr-only"
                    checked={deliveryMethod === 'pickup'}
                    onChange={(e) => setDeliveryMethod('pickup')}
                  />
                  <div className="font-bold">Retiro en local</div>
                </label>

                <label
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                    ${deliveryMethod === 'delivery'
                      ? 'border-albuche-orange bg-albuche-gray'
                      : 'border-gray-600 hover:border-gray-400'}
                  `}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    className="sr-only"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod('delivery')}
                  />
                  <div className="font-bold">Delivery</div>
                </label>
              </div>
            </div>

            {/* Dirección para delivery */}
            {deliveryMethod === 'delivery' && (
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Dirección de entrega
                </label>
                <input
                  type="text"
                  id="address"
                  className="input-primary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Instrucciones adicionales */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-medium mb-2">
                Instrucciones adicionales (opcional)
              </label>
              <textarea
                id="instructions"
                rows={3}
                className="input-primary"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Timbre, referencias, instrucciones especiales..."
              />
            </div>

            {/* Método de pago */}
            <div>
              <h2 className="text-xl font-bold mb-4">Método de pago</h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                    ${paymentMethod === 'efectivo'
                      ? 'border-albuche-orange bg-albuche-gray'
                      : 'border-gray-600 hover:border-gray-400'}
                  `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="efectivo"
                    className="sr-only"
                    checked={paymentMethod === 'efectivo'}
                    onChange={(e) => setPaymentMethod('efectivo')}
                  />
                  <div className="font-bold">Efectivo</div>
                </label>

                <label
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                    ${paymentMethod === 'transferencia'
                      ? 'border-albuche-orange bg-albuche-gray'
                      : 'border-gray-600 hover:border-gray-400'}
                  `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="transferencia"
                    className="sr-only"
                    checked={paymentMethod === 'transferencia'}
                    onChange={(e) => setPaymentMethod('transferencia')}
                  />
                  <div className="font-bold">Transferencia</div>
                </label>
              </div>
            </div>

            <button type="submit" className="w-full btn-primary text-lg py-4">
              Confirmar y enviar por WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 