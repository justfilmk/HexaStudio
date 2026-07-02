'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ExperienceCanvas } from '@/features/scene/components/ExperienceCanvas';
import { LoadingScreen } from '@/components/LoadingScreen';

export const HomeHero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-8 pt-20 overflow-hidden">
      {/* 3D Background Experience */}
      <Suspense fallback={<LoadingScreen />}>
        <ExperienceCanvas />
      </Suspense>

      <div className="relative z-10 max-w-5xl text-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-500">
            Architectural Visualization
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-6xl md:text-8xl font-light tracking-tighter text-white mb-8"
        >
          Defining <span className="italic">Spaces</span> <br />
          Through Light
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="mx-auto max-w-xl text-lg font-light text-neutral-400 mb-12 leading-relaxed"
        >
          HexaStudio blends technical precision with cinematic storytelling, 
          creating immersive 3D experiences for the world's most ambitious architectures.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center justify-center gap-6 pointer-events-auto"
        >
          <Button variant="primary" className="px-8 py-4 uppercase text-xs tracking-widest">
            Explore Works
          </Button>
          <Button variant="outline" className="px-8 py-4 uppercase text-xs tracking-widest">
            Our Process
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-600">Scroll</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-neutral-600 to-transparent" />
      </motion.div>
    </section>
  );
};
