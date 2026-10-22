import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import { Component, ReactNode, useMemo, useRef } from "react";
import * as THREE from "three";

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const random = seededRandom(42);
    const array = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i += 1) {
      const radius = 2.6 + random() * 4.2;
      const angle = random() * Math.PI * 2;
      array[i * 3] = Math.cos(angle) * radius;
      array[i * 3 + 1] = (random() - 0.5) * 6;
      array[i * 3 + 2] = Math.sin(angle) * radius - 1;
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d9ff63" size={0.018} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Core({ progress, reducedMotion }: { progress: MotionValue<number>; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    const scroll = progress.get();
    const ease = 1 - Math.pow(0.001, delta);
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.2 + scroll * 0.85,
      ease,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.28 + scroll * 1.5,
      ease,
    );
    const targetScale = 1 - scroll * 0.25;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, ease));
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, scroll * 0.65, ease);
    if (knot.current) knot.current.rotation.z += delta * 0.075;
    if (orbit.current) orbit.current.rotation.z -= delta * 0.06;
  });

  return (
    <group ref={group} rotation={[0.35, -0.3, -0.12]}>
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.18, 0.36, 180, 32, 2, 3]} />
        <meshStandardMaterial color="#343832" metalness={0.92} roughness={0.2} />
      </mesh>
      <mesh scale={1.008}>
        <torusKnotGeometry args={[1.18, 0.36, 120, 18, 2, 3]} />
        <meshBasicMaterial color="#d9ff63" wireframe transparent opacity={0.09} />
      </mesh>
      <group ref={orbit}>
        {[0, 1, 2].map((ring) => (
          <mesh
            key={ring}
            rotation={[Math.PI / 2 + ring * 0.48, ring * 0.65, ring * 0.85]}
            scale={1 + ring * 0.16}
          >
            <torusGeometry args={[1.95, ring === 1 ? 0.018 : 0.009, 8, 160]} />
            <meshBasicMaterial color={ring === 1 ? "#d9ff63" : "#747c71"} transparent opacity={ring === 1 ? 0.6 : 0.28} />
          </mesh>
        ))}
        {[0, 1, 2, 3, 4].map((node) => {
          const angle = (node / 5) * Math.PI * 2;
          return (
            <mesh key={node} position={[Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, 0]}>
              <sphereGeometry args={[node === 0 ? 0.075 : 0.035, 16, 16]} />
              <meshBasicMaterial color={node === 0 ? "#d9ff63" : "#f0f1e9"} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="scene-fallback" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroScene({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <SceneBoundary>
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0, 6], fov: 43 }}
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 5, 5]} intensity={3.2} color="#f2f4e9" />
        <directionalLight position={[-4, -1, 3]} intensity={2.2} color="#a8c7ff" />
        <pointLight position={[0, 1, 3]} intensity={22} color="#d9ff63" distance={8} />
        <Core progress={progress} reducedMotion={reducedMotion} />
        {!reducedMotion && <Particles />}
      </Canvas>
    </SceneBoundary>
  );
}
