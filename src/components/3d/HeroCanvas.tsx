import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';
import ScrollCamera from './ScrollCamera';

const HeroCanvas = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#FF6B9D" />
          <pointLight position={[-10, -5, 5]} intensity={0.5} color="#00E5CC" />
          <pointLight position={[0, 5, -10]} intensity={0.4} color="#C084FC" />
          <ScrollCamera />
          <ParticleField count={1500} spread={40} />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
