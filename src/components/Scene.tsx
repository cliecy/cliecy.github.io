import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2
            meshRef.current.rotation.y = t * 0.3
        }
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh
                ref={meshRef}
                scale={hovered ? 2.2 : 2}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <icosahedronGeometry args={[1, 15]} />
                <MeshDistortMaterial
                    color={hovered ? "#ff0055" : "#4400ff"}
                    attach="material"
                    distort={0.6}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    )
}

export default function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="red" intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <AnimatedSphere />
        </>
    )
}
