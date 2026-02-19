import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import PhoneModel from '../components/PhoneModel';
import { teamMembers } from '../data/team';

const Home = () => {
  return (
    <div className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8rem', overflow: 'hidden' }}>
      
      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
           initial={{ opacity: 0, y: -50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 10 }}
        >
          <h1 style={{ fontSize: '4rem', fontWeight: '800', margin: 0, letterSpacing: '-2px', lineHeight: 1.1 }}>
            <span style={{ color: '#fff' }}>Generate</span> <br />
            <span className="text-gradient">Digital Magic</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem', maxWidth: '600px' }}>
            Transform your ideas into stunning advertisements with the power of AI.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
             <a href="/generate" className="btn-primary" style={{ textDecoration: 'none' }}>Start Creating</a>
          </div>
        </motion.div>

        {/* 3D Phone Section */}
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
      </div>

      {/* Moving Alphabet Line */}
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', background: 'rgba(124, 58, 237, 0.1)', padding: '1.5rem 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', backdropFilter: 'blur(5px)' }}>
        <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: 'inline-block', fontSize: '2.5rem', fontWeight: '800', color: 'rgba(255,255,255,0.1)', letterSpacing: '4px' }}
        >
          GENERATE ADS &bull; CREATE &bull; INSPIRE &bull; GENERATE ADS &bull; CREATE &bull; INSPIRE &bull; GENERATE ADS &bull; CREATE &bull; INSPIRE &bull;
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="container" style={{ marginTop: '8rem', width: '100%', paddingBottom: '4rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', fontWeight: 'bold' }}>
          Meet the <span className="text-gradient">Team</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel"
              style={{ padding: '3rem 2rem', borderRadius: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                <div style={{ position: 'absolute', inset: '-5px', background: 'var(--primary-gradient)', borderRadius: '50%', filter: 'blur(10px)', opacity: 0.5 }}></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '120px', height: '120px', borderRadius: '50%', position: 'relative', border: '3px solid rgba(255,255,255,0.1)', background: '#1e293b' }} 
                />
              </div>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', color: '#fff' }}>{member.name}</h3>
              <p style={{ color: 'var(--accent-color)', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.875rem' }}>{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
