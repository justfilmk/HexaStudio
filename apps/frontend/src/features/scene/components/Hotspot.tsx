'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { ProjectHotspot } from '@hexastudio/types';
import { useCameraStore } from '@/features/scene/store/camera-store';

interface HotspotProps {
  hotspot: ProjectHotspot;
}

/**
 * Hotspot is an interactive 3D marker that triggers camera transitions
 * and displays architectural details.
 */
export const Hotspot = ({ hotspot }: HotspotProps) => {
  const { setTarget } = useCameraStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <group position={hotspot.position}>
       {/* Visual Marker */}
       <mesh 
         onClick={() => setTarget(hotspot.id)}
         onPointerOver={() => setIsHovered(true)}
         onPointerOut={() => setIsHovered(false)}
       >
         <sphereGeometry args={[0.1, 16, 16]} />
         <meshStandardMaterial 
           color={isHovered ? '#6366f1' : '#ffffff'} 
           emissive={isHovered ? '#6366f1' : '#ffffff'}
           emissiveIntensity={2}
         />
       </mesh>


      {/* Label Overlay */}
      {isHovered && (
        <Html distanceFactor={10} position={[0, 0.3, 0]} center>
          <div className="bg-black/80 backdrop-blur-md border border-neutral-800 p-3 rounded-sm pointer-events-none">
            <h4 className="text-white text-[10px] uppercase tracking-widest font-medium">{hotspot.title}</h4>
            <p className="text-neutral-400 text-[9px] leading-relaxed mt-1">{hotspot.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
};
