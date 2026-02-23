import React from 'react';
import { motion } from 'framer-motion';

const MarqueeBanner = () => {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', background: 'rgba(124, 58, 237, 0.1)', padding: '1.5rem 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', backdropFilter: 'blur(5px)' }}>
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        style={{ display: 'inline-block', fontSize: '2.5rem', fontWeight: '800', color: 'rgba(255,255,255,0.1)', letterSpacing: '4px' }}
      >
        GENERATE ADS &bull; CREATE &bull; INSPIRE &bull; GENERATE ADS &bull; CREATE &bull; INSPIRE &bull; GENERATE ADS &bull; CREATE &bull; INSPIRE &bull;
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
