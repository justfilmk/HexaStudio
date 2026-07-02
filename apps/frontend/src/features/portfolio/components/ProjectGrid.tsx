'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/cards/Card';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
}

const ProjectCard = ({ title, category, image }: ProjectCardProps) => (
  <motion.div 
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    className="group cursor-pointer"
  >
    <Card variant="glass" className="overflow-hidden p-0 aspect-[4/5]">
      <div className="h-full w-full relative overflow-hidden bg-neutral-800">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{category}</p>
          <h3 className="text-xl font-light text-white">{title}</h3>
        </div>
      </div>
    </Card>
  </motion.div>
);

export const ProjectGrid = () => {
  const projects = [
    { title: 'The Obsidian Villa', category: 'Residential', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { title: 'Lumina Pavilion', category: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92//' },
    { title: 'Azure Heights', category: 'Residential', image: 'https://images.unsplash.com/photo-1600607687940-4e2a09cf159d' },
    { title: 'Zenith Office', category: 'Commercial', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
  ];

  return (
    <section className="px-8 py-32 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 block">Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
            Creating <span className="italic">Visual</span> Truth
          </h2>
        </div>
        <p className="text-neutral-400 font-light max-w-xs text-sm leading-relaxed">
          A curation of architectural narratives defined by light, material, and space.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
};
