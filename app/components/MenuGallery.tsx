'use client';

import { useState } from 'react';
import Image from 'next/image';

const MENU_IMAGES = [
  {
    src: '/Imagenes/Menu 1.jpeg',
    alt: 'Menú 1 - Hamburguesas Albuche',
  },
  {
    src: '/Imagenes/Menu 2.jpeg',
    alt: 'Menú 2 - Hamburguesas Albuche',
  },
  {
    src: '/Imagenes/Menu 3.jpeg',
    alt: 'Menú 3 - Hamburguesas Albuche',
  },
  {
    src: '/Imagenes/Menu 4 promos.jpeg',
    alt: 'Menú 4 - Promociones Albuche',
  },
];

export default function MenuGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="menu" className="py-16 bg-albuche-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Nuestro Menú</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {MENU_IMAGES.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg transform transition-transform hover:scale-105 shadow-lg shadow-black/50"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal para preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <button
              className="absolute top-4 right-4 text-white hover:text-albuche-orange"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
} 