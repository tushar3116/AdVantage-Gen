import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLink = ({ to, children, currentPath }) => {
  const isActive = currentPath === to;
  
  return (
    <Link to={to} style={{ position: 'relative', textDecoration: 'none', color: isActive ? 'var(--secondary-color)' : 'var(--text-secondary)', fontWeight: 600, transition: 'color 0.3s' }}>
      {children}
      {isActive && (
        <motion.div
          layoutId="underline"
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            right: 0,
            height: '2px',
            background: 'var(--secondary-color)',
            borderRadius: '2px'
          }}
        />
      )}
    </Link>
  );
};

export default NavLink;
