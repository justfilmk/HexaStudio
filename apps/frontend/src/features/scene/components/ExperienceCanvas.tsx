'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, BakeShadows } from '@react-three/drei';
import { SceneContent } from './SceneContent';
import { CameraController } from './CameraController';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PostProcessing } from './PostProcessing';
import { useAdaptiveQuality } from '@/hooks/useAdaptiveQuality';

/**
 * ExperienceCanvas is the primary 3D entry point.
 * It configures the Three.js environment for architectural visualization.
 */
export const ExperienceCanvas = () => {
  const { level, settings } = useAdaptiveQuality();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-base">
      <Canvas
        shadows
        dpr={settings.dpr}
        gl={{ 
          antialias: true, 
          powerPreference: 'high-performance',
          toneMappingExposure: 1.2 
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={45} />
          <CameraController />
          
          {/* OrbitControls are disabled in Hero for cinematic experience, 
              but kept for other project views */}
          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2} 
            makeDefault 
          />
          
          {/* Cinematic HDRI Lighting */}
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={[1024, 1024]} 
          />
          
          <SceneContent />
          
          <ContactShadows 
            position={[0, -0.01, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4.5} 
          />
          <BakeShadows />
          
          {/* Cinematic Post-Processing Stack */}
          <PostProcessing quality={level} />
        </Suspense>
      </Canvas>
    </div>
  );
};
