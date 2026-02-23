import React from 'react';
import { motion } from 'framer-motion';

const PromptForm = ({ prompt, setPrompt, onSubmit }) => {
  return (
    <motion.form 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
      className="glass-panel"
      style={{ padding: '3rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'var(--primary-gradient)' }}></div>

      <div style={{ marginBottom: '2.5rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', color: '#fff', fontWeight: '500', fontSize: '1.1rem' }}>What are we promoting today?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., A sleek, noise-cancelling headphone with 40-hour battery life..."
          className="input-glass"
          style={{ 
            height: '200px', 
            resize: 'none',
            lineHeight: '1.6'
          }}
        />
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
        <span>Generate Magic</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
      </button>
    </motion.form>
  );
};

export default PromptForm;
