'use client';

import { motion } from 'framer-motion';
import RotatingText from './RotatingText';

export default function Hero() {
  const scrollToOrder = () => {
    const orderSection = document.getElementById('order');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-8">
          {/* Contenido del lado izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start justify-center space-y-8 md:pl-12"
          >
            {/* Logo con gradiente */}
            <h1 className="flex items-baseline font-bold tracking-tighter">
              <motion.span 
                className="text-4xl md:text-5xl"
                animate={{ opacity: [0.8, 1], y: [2, 0] }}
                transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 2 }}
              >
                AL
              </motion.span>
              <motion.span 
                className="text-7xl md:text-9xl text-gradient"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 5 }}
              >
                BUCHE
              </motion.span>
              <motion.span 
                className="text-7xl md:text-9xl text-orange-500"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, repeatType: "reverse" as const, duration: 5 }}
              >
                .
              </motion.span>
            </h1>

            {/* Slogan */}
            <div className="flex flex-col text-4xl md:text-5xl font-semibold -mt-4">
              <span className="mb-2">Sabemos</span>
              <RotatingText
                texts={["de hamburguesas", "como tentarte", "lo que querés"]}
                mainClassName="bg-orange-500 text-black px-4 py-2 rounded-lg min-w-[300px]"
                rotationInterval={3000}
              />
            </div>

            {/* Botón con animación */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 107, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToOrder}
              className="bg-orange-500 text-black text-xl md:text-2xl font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-orange-600 transition-all mt-8 pulse-on-hover"
            >
              Ordená ahora
            </motion.button>
          </motion.div>

          {/* Espacio reservado para futura animación */}
          <div className="hidden md:flex justify-center items-center">
            {/* Futura animación irá aquí */}
          </div>
        </div>
      </div>
    </section>
  );
} 
