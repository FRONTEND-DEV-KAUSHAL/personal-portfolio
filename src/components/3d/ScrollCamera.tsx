import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ScrollCamera = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);
  const targetPosZ = useRef(8);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    const p = scrollProgress.current;

    // Camera slowly rotates and zooms based on scroll
    targetRotY.current = p * Math.PI * 0.3;
    targetRotX.current = Math.sin(p * Math.PI) * 0.15;
    targetPosZ.current = 8 + p * 4;

    // Smooth lerp
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotY.current, 0.03);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotX.current, 0.03);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPosZ.current, 0.03);

    // Subtle lateral movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(p * Math.PI * 2) * 1.5, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.cos(p * Math.PI) * 0.8, 0.03);
  });

  return null;
};

export default ScrollCamera;
