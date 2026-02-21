import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color1?: string;
  color2?: string;
  spread?: number;
}

const ParticleField = ({ count = 2000, color1 = '#FF6B9D', color2 = '#00E5CC', spread = 50 }: ParticleFieldProps) => {
  const meshRef = useRef<THREE.Points>(null);
  const scrollProgress = useRef(0);
  const originalPositions = useRef<Float32Array | null>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      const t = Math.random();
      const color = c1.clone().lerp(c2, t);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count, color1, color2, spread]);

  useEffect(() => {
    originalPositions.current = new Float32Array(positions);
  }, [positions]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const p = scrollProgress.current;

    meshRef.current.rotation.y = time * 0.02 + p * 0.5;
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1 + p * 0.3;

    // Expand/contract particles based on scroll
    const geom = meshRef.current.geometry;
    const posAttr = geom.getAttribute('position');
    if (posAttr && originalPositions.current) {
      const expansion = 1 + p * 0.8;
      for (let i = 0; i < count; i++) {
        const ox = originalPositions.current[i * 3];
        const oy = originalPositions.current[i * 3 + 1];
        const oz = originalPositions.current[i * 3 + 2];
        posAttr.setXYZ(
          i,
          ox * expansion + Math.sin(time + i * 0.01) * p * 0.3,
          oy * expansion + Math.cos(time + i * 0.02) * p * 0.3,
          oz * expansion
        );
      }
      posAttr.needsUpdate = true;
    }

    // Color shift based on scroll
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = 0.8 - p * 0.3;
    mat.size = 0.08 + p * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleField;
