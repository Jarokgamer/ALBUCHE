'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrderSection from './OrderSection';

const SANDWICH_OPTIONS = {
  bases: [
    { name: 'Sandwich de Milanesa', price: 5500, comboPrice: 7000 },
    { name: 'Sandwich de Pollo', price: 5500, comboPrice: 7000 },
    { name: 'Sandwich de Lomo', price: 6000, comboPrice: 7500 },
  ],
  quesos: [
    { name: 'Cheddar', price: 0 },
    { name: 'Tybo', price: 0 },
    { name: 'Provolone', price: 0 },
  ],
  toppings: [
    { name: 'Lechuga', price: 0, category: 'vegetal' },
    { name: 'Tomate', price: 0, category: 'vegetal' },
    { name: 'Cebolla', price: 0, category: 'vegetal' },
    { name: 'Huevo', price: 0, category: 'proteina' },
    { name: 'Jamón', price: 0, category: 'proteina' },
  ],
  aderezos: [
    { name: 'Mayonesa Casera', price: 0 },
    { name: 'Salsa de la Casa', price: 0 },
    { name: 'Ketchup', price: 0 },
    { name: 'Savora', price: 0 },
  ],
};

const EXTRAS_OPTIONS = [
  { name: 'Papas Fritas', price: 2500 },
  { name: 'Papas con Cheddar', price: 3000 },
  { name: 'Aros de Cebolla', price: 2800 },
  { name: 'Nuggets x6', price: 2500 },
  { name: 'Nuggets x12', price: 4500 },
];

interface ProductSectionProps {
  onAddToCart: (item: any) => void;
}

export default function ProductSection({ onAddToCart }: ProductSectionProps) {
  const [productType, setProductType] = useState<'hamburguesas' | 'sandwiches' | 'extras'>('hamburguesas');
  const [selectedExtra, setSelectedExtra] = useState<string>('');
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  // Efecto para la animación de las secciones al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-in-section');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id;
        
        if (sectionTop < window.innerHeight - 100) {
          setVisibleSections(prev => {
            if (!prev.includes(sectionId)) {
              return [...prev, sectionId];
            }
            return prev;
          });
        }
      });
    };

    handleScroll(); // Comprobar secciones visibles al cargar
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddExtra = () => {
    if (!selectedExtra) return;
    
    const extra = EXTRAS_OPTIONS.find(e => e.name === selectedExtra);
    if (!extra) return;

    onAddToCart({
      base: extra.name,
      price: extra.price,
      isExtra: true
    });

    setSelectedExtra('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price).replace('ARS', '$');
  };

  return (
    <section id="order" className="py-24 px-4 bg-albuche-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Selector de tipo de producto */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProductType('hamburguesas')}
            className={`px-8 py-4 rounded-lg text-xl font-bold transition-all duration-200 ${
              productType === 'hamburguesas'
                ? 'bg-albuche-orange text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Hamburguesas
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProductType('sandwiches')}
            className={`px-8 py-4 rounded-lg text-xl font-bold transition-all duration-200 ${
              productType === 'sandwiches'
                ? 'bg-albuche-orange text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Sandwiches
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setProductType('extras')}
            className={`px-8 py-4 rounded-lg text-xl font-bold transition-all duration-200 ${
              productType === 'extras'
                ? 'bg-albuche-orange text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Para acompañar
          </motion.button>
        </motion.div>

        {/* Sección de producto seleccionado */}
        {productType !== 'extras' && (
          <motion.div
            key={productType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OrderSection 
              onAddToCart={onAddToCart}
              productType={productType}
              options={productType === 'hamburguesas' ? undefined : SANDWICH_OPTIONS}
            />
          </motion.div>
        )}

        {/* Sección de extras */}
        {productType === 'extras' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Para acompañar</h2>
            <p className="text-xl text-gray-300 text-center mb-12">Elegí tus acompañamientos preferidos</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXTRAS_OPTIONS.map((extra, index) => (
                <motion.div 
                  key={extra.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <label
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                      selectedExtra === extra.name
                        ? 'bg-albuche-orange text-black shadow-lg shadow-albuche-orange/20'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="extra"
                        value={extra.name}
                        checked={selectedExtra === extra.name}
                        onChange={(e) => setSelectedExtra(e.target.value)}
                        className="hidden"
                      />
                      <span className="text-lg">{extra.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg">{formatPrice(extra.price)}</span>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
            {selectedExtra && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center mt-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 107, 0, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddExtra}
                  className="bg-albuche-orange text-black text-xl font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:bg-orange-600"
                >
                  Agregar {selectedExtra}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
} 