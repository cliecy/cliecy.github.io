import { Float, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import type { Points as ThreePoints, Mesh } from 'three';

function ParticleField() {
  const points = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(700 * 3);
    for (let index = 0; index < values.length; index += 3) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[index] = radius * Math.sin(phi) * Math.cos(theta);
      values[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[index + 2] = radius * Math.cos(phi);
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.025;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#f4f1ea" size={0.018} sizeAttenuation depthWrite={false} opacity={0.72} />
    </Points>
  );
}

function Orb() {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.08;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.25}>
      <mesh ref={mesh} scale={1.46}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#171521" roughness={0.28} metalness={0.6} />
      </mesh>
      <mesh scale={1.49}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#ff3d8d" wireframe transparent opacity={0.32} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="hero-scene-fallback" />;

  return (
    <div className="hero-scene-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <pointLight color="#ff3d8d" intensity={16} position={[3, 2, 3]} distance={8} />
        <pointLight color="#7c5cff" intensity={13} position={[-3, -2, 2]} distance={8} />
        <ParticleField />
        <Orb />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.38} />
      </Canvas>
    </div>
  );
}
