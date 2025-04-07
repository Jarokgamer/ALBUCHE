'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function BurgerAnimation() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  const bounceAnimation = {
    y: [0, -40, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      repeatDelay: 1
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(bounceAnimation);
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative w-[600px] h-[600px]">
      <motion.div
        animate={controls}
        className="relative"
      >
        {/* Pan superior */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 left-0 w-full"
        >
          <svg viewBox="0 0 200 80" className="w-full">
            <defs>
              <linearGradient id="panGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD176' }} />
                <stop offset="100%" style={{ stopColor: '#FFB649' }} />
              </linearGradient>
              <pattern id="sesamePattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="10" cy="10" r="1.5" fill="#E67E22" />
              </pattern>
            </defs>
            <path
              d="M20,60 C40,50 80,45 100,45 C120,45 160,50 180,60 C180,40 160,20 100,20 C40,20 20,40 20,60"
              fill="url(#panGradient)"
              stroke="#E67E22"
              strokeWidth="2"
            />
            <path
              d="M20,60 C40,50 80,45 100,45 C120,45 160,50 180,60"
              fill="url(#sesamePattern)"
              opacity="0.5"
            />
          </svg>
        </motion.div>

        {/* Lechuga */}
        <motion.div
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[60px] left-0 w-full"
        >
          <svg viewBox="0 0 200 40" className="w-full">
            {[...Array(4)].map((_, i) => (
              <motion.path
                key={i}
                d="M30,20 C50,0 80,30 100,15 C120,0 150,30 170,20"
                fill="none"
                stroke={i % 2 ? "#27AE60" : "#2ECC71"}
                strokeWidth="8"
                strokeLinecap="round"
                style={{ transform: `translateY(${i * 4}px)` }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Tomates */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute top-[100px] left-0 w-full"
        >
          <svg viewBox="0 0 200 30" className="w-full">
            {[...Array(3)].map((_, i) => (
              <g key={i} transform={`translate(${65 + i * 35}, 15)`}>
                <circle r="12" fill="#E74C3C" />
                <circle r="10" fill="#C0392B" />
                <path
                  d="M-6,-2 C-4,-4 4,-4 6,-2"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Queso */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-[120px] left-0 w-full"
        >
          <svg viewBox="0 0 200 40" className="w-full">
            <defs>
              <linearGradient id="quesoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFC82C' }} />
                <stop offset="100%" style={{ stopColor: '#FFB302' }} />
              </linearGradient>
            </defs>
            <path
              d="M30,10 L170,10 L160,35 L40,35 Z"
              fill="url(#quesoGradient)"
              stroke="#E6A100"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        {/* Carne */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute top-[150px] left-0 w-full"
        >
          <svg viewBox="0 0 200 60" className="w-full">
            <defs>
              <linearGradient id="carneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#8B4513' }} />
                <stop offset="50%" style={{ stopColor: '#654321' }} />
                <stop offset="100%" style={{ stopColor: '#8B4513' }} />
              </linearGradient>
              <pattern id="carneTexture" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M0,5 L10,5" stroke="#5C3317" strokeWidth="0.5" opacity="0.3" />
                <path d="M5,0 L5,10" stroke="#5C3317" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <path
              d="M20,10 C40,5 80,0 100,0 C120,0 160,5 180,10 L180,40 C160,45 120,50 100,50 C80,50 40,45 20,40 Z"
              fill="url(#carneGradient)"
            />
            <path
              d="M20,10 C40,5 80,0 100,0 C120,0 160,5 180,10 L180,40 C160,45 120,50 100,50 C80,50 40,45 20,40 Z"
              fill="url(#carneTexture)"
            />
          </svg>
        </motion.div>

        {/* Pan inferior */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute top-[200px] left-0 w-full"
        >
          <svg viewBox="0 0 200 60" className="w-full">
            <path
              d="M20,10 C40,5 80,0 100,0 C120,0 160,5 180,10 L180,40 C160,45 120,50 100,50 C80,50 40,45 20,40 Z"
              fill="url(#panGradient)"
              stroke="#E67E22"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
} 