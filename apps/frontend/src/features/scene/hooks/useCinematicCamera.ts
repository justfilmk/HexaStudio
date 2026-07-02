import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useCameraStore } from '@/features/scene/store/camera-store';
import * as THREE from 'three';

/**
 * useCinematicCamera handles the smooth transition of the camera 
 * and adds subtle mouse-based parallax for a "living" feel.
 */
export function useCinematicCamera() {
  const { camera } = useThree();
  const { currentTarget, setTransitioning } = useCameraStore();
  const mouse = useRef({ x: 0, y: 0 });

  // Define fixed camera targets for the architectural experience
  const targets: Record<string, { position: [number, number, number], lookAt: [number, number, number] }> = {
    'hero': { position: [5, 5, 5], lookAt: [0, 0, 0] },
    'detail-1': { position: [2, 1, 2], lookAt: [0, 0.5, 0] },
    'detail-2': { position: [-3, 2, 1], lookAt: [0, 0.5, 0] },
    'overview': { position: [10, 10, 10], lookAt: [0, 0, 0] },
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Parallax loop
    const tick = () => {
      // Subtle camera shift based on mouse
      const targetX = camera.position.x + (mouse.current.x * 0.1);
      const targetY = camera.position.y + (mouse.current.y * 0.1);
      
      gsap.to(camera.position, {
        x: targetX,
        y: targetY,
        duration: 0.5,
        ease: 'power2.out',
      });

      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [camera]);

  useEffect(() => {
    if (!currentTarget || !targets[currentTarget]) return;

    const target = targets[currentTarget];
    setTransitioning(true);

    // Animate camera position
    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 2,
      ease: 'power3.inOut',
      onComplete: () => setTransitioning(false),
    });

    // Animate camera lookAt (using a proxy object for smooth rotation)
    const proxy = new THREE.Vector3(...target.lookAt);
    gsap.to(proxy, {
      duration: 2,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(proxy);
      },
    });
  }, [currentTarget, camera, setTransitioning]);

  return {
    camera,
  };
}
