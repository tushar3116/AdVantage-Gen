import React from 'react';
import { teamMembers } from '../data/team';
import TeamCard from './TeamCard';

const TeamSection = () => {
  return (
    <div className="container" style={{ marginTop: '8rem', width: '100%', paddingBottom: '4rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3rem', fontWeight: 'bold' }}>
        Meet the <span className="text-gradient">Team</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        {teamMembers.map((member, index) => (
          <TeamCard key={index} member={member} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
