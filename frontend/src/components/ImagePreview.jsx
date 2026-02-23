import React from 'react';
import { motion } from 'framer-motion';

const ImagePreview = ({ imageUrl }) => {
  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-panel" 
      style={{ padding: '1rem', borderRadius: '1.5rem', overflow: 'hidden' }}
    >
      <img src={imageUrl} alt="Generated Ad" style={{ width: '100%', borderRadius: '1rem', display: 'block' }} />
    </motion.div>
  );
};

export default ImagePreview;
