import React from 'react';
import HeroSection from '../components/HeroSection';
import PhoneCanvas from '../components/PhoneCanvas';
import MarqueeBanner from '../components/MarqueeBanner';
import TeamSection from '../components/TeamSection';

const Home = () => {
  return (
    <div className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8rem', overflow: 'hidden' }}>
      
      {/* Hero Section */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HeroSection />

        {/* 3D Phone Section */}
        <PhoneCanvas />
      </div>

      {/* Moving Alphabet Line */}
      <MarqueeBanner />

      {/* Team Section */}
      <TeamSection />
    </div>
  );
};

export default Home;
