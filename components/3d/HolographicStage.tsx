"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Tesseract() {
    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta * 0.1;
            ref.current.rotation.y -= delta * 0.15;
        }
    });

    return (
        <group ref={ref}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                {/* Outer Cube */}
                <mesh>
                    <boxGeometry args={[2.5, 2.5, 2.5]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={16}
                        thickness={0.5}
                        chromaticAberration={1}
                        anisotropy={1}
                        distortion={0.5}
                        distortionScale={0.5}
                        temporalDistortion={0.2}
                        color="#00F0FF"
                        roughness={0.1}
                        transmission={0.9}
                        metalness={0.2}
                    />
                </mesh>

                {/* Inner Core */}
                <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial color="#00F0FF" wireframe />
                </mesh>

                {/* Inner Glow */}
                <pointLight color="#00F0FF" intensity={2} distance={5} />
            </Float>
        </group>
    );
}

export function HolographicStage() {
    return (
        <div className="w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050B14] to-[#0F172A] z-0" />

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="z-10 relative">
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#00F0FF" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />

                <Tesseract />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>

            {/* Overlay UI */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-cyan-500 tracking-widest uppercase">
                        Holographic Projection // Active
                    </span>
                </div>
            </div>
        </div>
    );
}
