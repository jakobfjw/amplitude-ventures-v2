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
          'radial-gradient(circle at center, rgba(200,16,46,0.13) 0%, rgba(200,16,46,0.04) 50%, transparent 72%)',
        filter: 'blur(60px)',
      }}
    />
  );
}
