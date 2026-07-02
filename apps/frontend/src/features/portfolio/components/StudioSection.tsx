'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/cards/Card';

export const StudioSection = () => {
  return (
    <section className="px-8 py-32 bg-neutral-900/30 border-y border-neutral-800/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-square bg-neutral-800 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2" 
            alt="Studio" 
            className="h-full w-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 border-[20px] border-neutral-900/50 pointer-events-none" />
        </div>
        
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 block">The Studio</span>
            <h2 className="text-4xl font-light tracking-tighter text-white mb-6">
              Precision in <span className="italic">Every</span> Pixel
            </h2>
            <p className="text-neutral-400 font-light leading-relaxed mb-8">
              We don't just render buildings; we capture the atmosphere. By combining 
              technical architectural data with cinematic lighting, we create spaces 
              that evoke emotion before they are even built.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-2">Immersion</h4>
              <p className="text-neutral-500 text-xs font-light">Interactive 3D environments via R3F.</p>
            </div>
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-2">Fidelity</h4>
              <p className="text-neutral-500 text-xs font-light">8K photorealistic rendering.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
