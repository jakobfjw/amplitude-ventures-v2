'use client';
import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function Spotlight({ size = 700 }: { size?: number }) {
  const mouseX = useSpring(0, { bounce: 0, duration: 600 });
  const mouseY = useSpring(0, { bounce: 0, duration: 600 });

  const left = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const top = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[3] rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        background:
          'radial-gradient(circle at center, rgba(var(--crimson-rgb),0.22) 0%, rgba(var(--crimson-rgb),0.07) 50%, transparent 72%)',
        filter: 'blur(60px)',
      }}
    />
  );
}
