'use client';

import { useEffect, useRef } from 'react';

const INGREDIENTS = [
  '🍔', '🥬', '🧀', '🥓', '🍅', '🧅'
];

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Crear elementos flotantes
    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.textContent = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)];
      element.style.position = 'absolute';
      element.style.fontSize = `${Math.random() * 20 + 20}px`;
      element.style.opacity = '0.1';
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.transform = 'translate(-50%, -50%)';
      element.style.transition = 'all 3s ease-in-out';
      
      container.appendChild(element);

      // Animación
      setTimeout(() => {
        element.style.transform = `translate(-50%, -50%) translate(
          ${Math.random() * 100 - 50}px,
          ${Math.random() * 100 - 50}px
        )`;
        element.style.opacity = '0';
      }, 100);

      // Eliminar después de la animación
      setTimeout(() => {
        container.removeChild(element);
      }, 3000);
    };

    // Crear elementos periódicamente
    const interval = setInterval(createFloatingElement, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none bg-black/80"
      style={{ zIndex: 0 }}
    />
  );
} 