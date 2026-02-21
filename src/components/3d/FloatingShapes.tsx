import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Torus, Dodecahedron, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Torus args={[1.2, 0.15, 16, 32]} position={[4, 2, -3]}>
          <meshStandardMaterial color="#FF6B9D" emissive="#FF6B9D" emissiveIntensity={0.4} wireframe />
        </Torus>
      </Float>

      <Float speed={1.5} rotationIntensity={3} floatIntensity={2}>
        <Dodecahedron args={[0.8]} position={[-4, -1, -2]}>
          <meshStandardMaterial color="#00E5CC" emissive="#00E5CC" emissiveIntensity={0.4} wireframe />
        </Dodecahedron>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={2.5}>
        <Icosahedron args={[0.6]} position={[3, -2, -4]}>
          <meshStandardMaterial color="#FFA94D" emissive="#FFA94D" emissiveIntensity={0.3} wireframe />
        </Icosahedron>
      </Float>

      <Float speed={1.2} rotationIntensity={2.5} floatIntensity={1.8}>
        <Octahedron args={[0.7]} position={[-3, 3, -5]}>
          <meshStandardMaterial color="#C084FC" emissive="#C084FC" emissiveIntensity={0.4} wireframe />
        </Octahedron>
      </Float>

      <Float speed={2.2} rotationIntensity={1} floatIntensity={3}>
        <Torus args={[0.5, 0.1, 16, 32]} position={[5, -3, -6]}>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} wireframe />
        </Torus>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Dodecahedron args={[1]} position={[-5, 0, -8]}>
          <meshStandardMaterial color="#FF6B9D" emissive="#FF6B9D" emissiveIntensity={0.2} transparent opacity={0.3} wireframe />
        </Dodecahedron>
      </Float>
    </group>
  );
};

export default FloatingShapes;
