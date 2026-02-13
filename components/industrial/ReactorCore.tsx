"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Tesseract() {
    const meshRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
        if (outerRef.current) {
            outerRef.current.rotation.x -= delta * 0.1;
            outerRef.current.rotation.y -= delta * 0.15;
        }
    });

    return (
        <group>
            {/* Inner Core */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <octahedronGeometry args={[1, 0]} />
                    <MeshTransmissionMaterial
                        backside
                        samples={4}
                        thickness={0.5}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                        distortion={0.1}
                        distortionScale={0.1}
                        temporalDistortion={0.1}
                        ior={1.2}
                        color="#00F0FF"
                        background={new THREE.Color("#050B14")}
                    />
                </mesh>
            </Float>

            {/* Outer Shell */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={outerRef}>
                    <boxGeometry args={[2.5, 2.5, 2.5]} />
                    <meshBasicMaterial color="#00F0FF" wireframe />
                </mesh>
            </Float>

            {/* Particle Halo */}
            <points>
                <sphereGeometry args={[4, 32, 32]} />
                <pointsMaterial size={0.02} color="#00F0FF" transparent opacity={0.3} sizeAttenuation />
            </points>
        </group>
    );
}

export function ReactorCore() {
    return (
        <div className="w-full h-full min-h-[500px] relative rounded-3xl overflow-hidden glass-panel border-brand-core/20 shadow-[0_0_50px_-20px_rgba(0,240,255,0.3)]">
            {/* Vignette Overlay */}
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050B14_100%)] pointer-events-none" />

            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00F0FF" />
                <spotLight position={[-10, -10, -5]} intensity={1} color="#B026FF" />

                <Tesseract />

                <Environment preset="city" />
            </Canvas>

            {/* HUD Elements */}
            <div className="absolute bottom-6 left-6 z-20 font-mono text-xs text-brand-core tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-core rounded-full animate-pulse" />
                REACTOR ONLINE
            </div>
        </div>
    );
}
