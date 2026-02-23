import React from 'react';
import { motion } from 'framer-motion';

const TaglineDisplay = ({ tagline }) => {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="glass-panel" 
      style={{ padding: '2.5rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--secondary-color)' }}></div>
      <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Tagline</h3>
      <p style={{ fontSize: '1.8rem', fontWeight: '700', fontStyle: 'italic', lineHeight: '1.4', color: '#fff' }}>
        "{tagline}"
      </p>
    </motion.div>
  );
};

export default TaglineDisplay;
