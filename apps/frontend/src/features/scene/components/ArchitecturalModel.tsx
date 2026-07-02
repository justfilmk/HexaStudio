'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useAssetLoader } from '@/features/scene/hooks/useAssetLoader';

interface ModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
}

/**
 * ArchitecturalModel is a wrapper for loading and displaying a 3D project model.
 * It utilizes the Draco-compressed loader for optimal performance.
 */
export const ArchitecturalModel = ({ url, position = [0, 0, 0], scale = 1 }: ModelProps) => {
  const { model } = useAssetLoader(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle rotation to bring the model to life
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={model} />
    </group>
  );
};
