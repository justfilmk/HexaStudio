'use client';

import React from 'react';
import { Float } from '@react-three/drei';
import { ArchitecturalModel } from './ArchitecturalModel';
import { Hotspot } from './Hotspot';
import { ProjectHotspot } from '@hexastudio/types';

interface SceneContentProps {
  hotspots?: ProjectHotspot[];
}

/**
 * SceneContent manages the 3D objects present in the scene.
 * It now dynamically renders hotspots provided by the project data.
 */
export const SceneContent = ({ hotspots = [] }: SceneContentProps) => {
  return (
    <group>
      {/* Placeholder for real model loading from API */}
       <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
         <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
           <boxGeometry args={[1, 1, 1]} />
           <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
         </mesh>
       </Float>

      
      {/* Render Interactive Hotspots */}
      {hotspots.map((hotspot) => (
        <Hotspot key={hotspot.id} hotspot={hotspot} />
      ))}

       {/* Ground Plane */}
       <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
         <planeGeometry args={[100, 100]} />
         <meshStandardMaterial color="#0a0a0f" />
       </mesh>

    </group>
  );
};

