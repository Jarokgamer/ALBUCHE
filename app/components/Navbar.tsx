'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-albuche-black/95 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-around">
          {/* Logo */}
          <Link href="/" className="font-bold tracking-widest text-white shrink-0">
            <span className="text-base">AL</span><span className="text-xl">BUCHE</span><span className="text-xl">.</span>
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center justify-center space-x-12">
            <Link
              href="#menu"
              className="text-white hover:text-albuche-orange transition-colors text-lg"
            >
              Menú
            </Link>
            <Link
              href="#order"
              className="text-white hover:text-albuche-orange transition-colors text-lg"
            >
              Ordenar
            </Link>
            <Link
              href="#location"
              className="text-white hover:text-albuche-orange transition-colors text-lg"
            >
              Ubicación
            </Link>
          </div>

          {/* Instagram Icon */}
          <a
            href="https://www.instagram.com/albuche.cba/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-white hover:text-albuche-orange transition-colors shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="py-4 space-y-4">
                <Link
                  href="#menu"
                  className="block text-white hover:text-albuche-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Menú
                </Link>
                <Link
                  href="#order"
                  className="block text-white hover:text-albuche-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Ordenar
                </Link>
                <Link
                  href="#location"
                  className="block text-white hover:text-albuche-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Ubicación
                </Link>
                <a
                  href="https://www.instagram.com/albuche.cba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white hover:text-albuche-orange transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 