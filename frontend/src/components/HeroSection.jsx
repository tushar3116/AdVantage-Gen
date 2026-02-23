import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
