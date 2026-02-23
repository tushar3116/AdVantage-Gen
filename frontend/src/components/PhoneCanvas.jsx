import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import PhoneModel from './PhoneModel';

const PhoneCanvas = () => {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative', marginTop: '-50px' }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7C3AED" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#DB2777" />
        <Suspense fallback={null}>
          <PhoneModel scale={[1.2, 1.2, 1.2]} />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  );
};

export default PhoneCanvas;
