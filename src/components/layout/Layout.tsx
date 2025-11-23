import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Canvas } from '@react-three/fiber';
import Scene from '../Scene';
import { Suspense } from 'react';

export default function Layout() {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {/* Persistent 3D Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div style={{ position: 'relative', zIndex: 1, height: '100%', overflowY: 'auto' }}>
                <Navbar />
                <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
