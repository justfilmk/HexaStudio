'use client';

import React from 'react';
import { useThree } from '@react-three/fiber';
import { useCinematicCamera } from '@/features/scene/hooks/useCinematicCamera';

/**
 * CameraController is a headless component that manages the camera logic.
 * It uses the useCinematicCamera hook to drive GSAP animations.
 */
export const CameraController = () => {
  useCinematicCamera();
  return null;
};
