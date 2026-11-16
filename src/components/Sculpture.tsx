"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Brand gold on dark, and a deep charcoal-green for the darker volumes.
const GOLD = "#c6a36a";
const DARK = "#222a24";

function Model() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.5, 2.7, 2.7)), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointer.current.x = state.pointer.x * 0.11;
    pointer.current.y = state.pointer.y * 0.06;
    if (group.current) {
      group.current.rotation.y += (pointer.current.x + Math.sin(t * 0.22) * 0.08 - group.current.rotation.y) * 0.02;
      group.current.rotation.x += (pointer.current.y + Math.sin(t * 0.3) * 0.025 - group.current.rotation.x) * 0.02;
    }
    if (ring.current) ring.current.rotation.z = t * 0.08;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[3.2, 0.16, 2.4]} />
        <meshStandardMaterial color={DARK} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[-0.55, 0.25, 0]}>
        <boxGeometry args={[1.35, 1.9, 1.5]} />
        <meshStandardMaterial color={GOLD} metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[0.72, -0.15, 0]}>
        <boxGeometry args={[1.2, 1.1, 1.5]} />
        <meshStandardMaterial color={DARK} metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[-0.45, 1.28, 0]}>
        <boxGeometry args={[1.55, 0.12, 1.72]} />
        <meshStandardMaterial color={GOLD} metalness={0.72} roughness={0.28} />
      </mesh>
      <lineSegments geometry={edges} position={[0, 0.35, 0]}>
        <lineBasicMaterial color="#d6c49f" transparent opacity={0.55} />
      </lineSegments>
      <mesh ref={ring} position={[0, -0.45, 0]} rotation={[Math.PI / 2.7, 0, 0]}>
        <torusGeometry args={[2.1, 0.012, 8, 120]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/** A slowly turning architectural sculpture: a building block on a base. Decorative only. */
export default function Sculpture() {
  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.7]}
      camera={{ position: [5.5, 3.2, 8.5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <hemisphereLight args={["#f6e9d0", "#202820", 2.1]} />
      <directionalLight position={[4, 7, 5]} intensity={3.1} color="#ffe2b5" />
      <pointLight position={[-4, 1, -3]} intensity={16} distance={20} color="#7d9479" />
      <Model />
    </Canvas>
  );
}
