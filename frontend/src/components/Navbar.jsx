import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLink from './NavLink';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav" style={{ padding: '1.25rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AdVantage-Gen
          </span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
          <NavLink to="/generate" currentPath={location.pathname}>Generate Ads</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
