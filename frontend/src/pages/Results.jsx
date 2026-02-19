import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Results = () => {
    const location = useLocation();
    const { imageUrl, tags, tagline } = location.state || { 
        imageUrl: 'https://via.placeholder.com/800x600', 
        tags: ['#NoData'], 
        tagline: 'No data generated' 
    };

    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '8rem', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>Your <span className="text-gradient">Masterpiece</span></h1>
                </motion.div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'start' }}>
                    {/* Image Section */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel" 
                        style={{ padding: '1rem', borderRadius: '1.5rem', overflow: 'hidden' }}
                    >
                        <img src={imageUrl} alt="Generated Ad" style={{ width: '100%', borderRadius: '1rem', display: 'block' }} />
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Tagline Section */}
                        <motion.div 
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="glass-panel" 
                            style={{ padding: '2.5rem', borderRadius: '1.5rem', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--secondary-color)' }}></div>
                            <h3 style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Tagline</h3>
                            <p style={{ fontSize: '1.8rem', fontWeight: '700', fontStyle: 'italic', lineHeight: '1.4', color: '#fff' }}>
                                "{tagline}"
                            </p>
                        </motion.div>

                        {/* Tags Section */}
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

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{ marginTop: '1rem' }}
                        >
                            <Link to="/generate" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                                Generate Another
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
