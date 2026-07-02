'use client';

import React from 'react';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { QualityLevel } from '@/hooks/useAdaptiveQuality';

interface PostProcessingProps {
  quality: QualityLevel;
}

/**
 * PostProcessing manages the cinematic visual stack.
 * It adjusts the effects based on the detected quality level.
 */
export const PostProcessing = ({ quality }: PostProcessingProps) => {
  if (quality === 'low') return null;

  return (
    <EffectComposer disableNormalPass>
      {/* Bloom for architectural highlights */}
      <Bloom 
        intensity={quality === 'high' ? 1.2 : 0.8} 
        luminanceThreshold={1} 
        luminanceSmoothing={0.1} 
        radius={0.4} 
      />
      
      {/* DOF for cinematic focus - Only for high quality */}
      {quality === 'high' && (
        <DepthOfField 
          focusDistance={0} 
          focalLength={0.025} 
          bokehScale={2} 
        />
      )}
      
      {/* Subtle noise to remove digital flatness */}
      <Noise opacity={0.05} />
      
      {/* Vignette to focus on the center */}
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};
