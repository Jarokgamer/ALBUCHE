'use client';

import { useState } from 'react';
import Hero from './components/Hero';
import MenuGallery from './components/MenuGallery';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import AnimatedBackground from './components/AnimatedBackground';
import Location from './components/Location';
import { useRouter } from 'next/navigation';

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

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    setCartItems([...cartItems, { ...item, id: Date.now().toString() }]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // Guardar los items del carrito en localStorage antes de navegar
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    router.push('/checkout');
  };

  return (
    <main className="min-h-screen bg-albuche-black">
      <AnimatedBackground />
      <Hero />
      <MenuGallery />
      <ProductSection onAddToCart={handleAddToCart} />
      <Location />
      <Cart 
        items={cartItems} 
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
    </main>
  );
} 