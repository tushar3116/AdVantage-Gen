import React from 'react';
import { motion } from 'framer-motion';

const TagsDisplay = ({ tags }) => {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="glass-panel" 
      style={{ padding: '2.5rem', borderRadius: '1.5rem' }}
    >
      <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Targeted Tags</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {tags.map((tag, index) => (
          <motion.span 
            key={index} 
            whileHover={{ scale: 1.05 }}
            style={{ 
              background: 'rgba(45, 212, 191, 0.1)', 
              color: 'var(--accent-color)', 
              padding: '0.5rem 1rem', 
              borderRadius: '999px', 
              fontSize: '0.95rem',
              fontWeight: '600',
              border: '1px solid rgba(45, 212, 191, 0.2)',
              cursor: 'default'
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default TagsDisplay;
