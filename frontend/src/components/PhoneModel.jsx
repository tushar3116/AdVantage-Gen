import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';

const PhoneModel = (props) => {
  const group = useRef();
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group} {...props} dispose={null}>
        {/* Phone Body - Rounded with Metallic Finish */}
        <RoundedBox args={[2.8, 5.8, 0.3]} radius={0.15} smoothness={4}>
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.2} 
            metalness={0.9} 
          />
        </RoundedBox>

        {/* Buttons */}
        <mesh position={[1.42, 1, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[-1.42, 1.2, 0]}>
          <boxGeometry args={[0.05, 0.6, 0.1]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>

        {/* Camera Strip Back */}
        <mesh position={[0, 2.2, -0.16]}>
             <boxGeometry args={[2.8, 0.8, 0.1]} />
             <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Front Screen - Glossy Glass */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.6, 5.6]} />
          <meshPhysicalMaterial 
            color="#000" 
            roughness={0.1} 
            metalness={0.1} 
          />
        </mesh>

        {/* Screen Content - Glowing Text */}
        <group position={[0, 0, 0.17]}>
          <Text
            position={[0, 0.5, 0.01]}
            fontSize={0.4}
            color="#fff"
            anchorX="center"
            anchorY="middle"
          >
            AdVantage
          </Text>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.4}
            color="#d946ef"
            anchorX="center"
            anchorY="middle"
          >
            Gen
          </Text>
        </group>
      </group>
    </Float>
  );
};

export default PhoneModel;
