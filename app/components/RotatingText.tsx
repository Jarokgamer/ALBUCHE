'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface RotatingTextProps {
  texts: string[];
  transition?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  rotationInterval?: number;
  mainClassName?: string;
}

const RotatingText = forwardRef<any, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition,
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-100%", opacity: 0 },
    rotationInterval = 3000,
    mainClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTextIndex((current) => 
      current === texts.length - 1 ? 0 : current + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  }, [texts.length, isAnimating]);

  useEffect(() => {
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval]);

  return (
    <div className={cn("relative overflow-hidden", mainClassName || "")} {...rest}>
      <div className="invisible" aria-hidden="true" style={{ display: 'inline-block' }}>
        {texts.reduce((a, b) => a.length > b.length ? a : b)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTextIndex}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1], // Curva de animación suave
          }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {texts[currentTextIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText; 
