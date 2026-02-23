import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ member, index }) => {
  return (
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
  );
};

export default TeamCard;
