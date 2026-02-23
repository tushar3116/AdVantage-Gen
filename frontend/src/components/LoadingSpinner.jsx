import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ textAlign: 'center', padding: '4rem 0' }}
    >
      <div className="loader" style={{ width: '80px', height: '80px', borderWidth: '6px', borderBottomColor: 'var(--primary-color)' }}></div>
      <h2 style={{ marginTop: '2rem', fontSize: '2rem', color: '#fff' }}>Weaving Pixels...</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Our AI is dreaming up your ad. Hold tight.</p>
    </motion.div>
  );
};

export default LoadingSpinner;
