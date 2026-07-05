'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextReveal = ({ children, className, delay = 0, duration = 0.8 }: TextRevealProps) => {
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ 
          duration, 
          delay, 
          ease: [0.33, 1, 0.68, 1] // Custom cubic-bezier for a luxury feel
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
