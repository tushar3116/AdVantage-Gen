import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '3rem 0', marginTop: 'auto', textAlign: 'center', borderTop: '1px solid var(--glass-border)', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} <span style={{ color: '#fff', fontWeight: 600 }}>AdVantage-Gen</span>. Empowering Creativity with AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
