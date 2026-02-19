import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const GenerateAds = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt) return;

        setLoading(true);
        // Simulate API call or call actual backend
        try {
            // Placeholder for actual API call
            const response = await axios.post('http://localhost:5000/api/ads/generate', { prompt });
            const data = response.data;
            
            navigate('/result', { state: { 
                prompt: data.prompt, 
                imageUrl: data.imageUrl,
                tags: data.tags,
                tagline: data.tagline 
            } });

        } catch (error) {
            console.error("Error generating ad:", error);
            setLoading(false);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || "Failed to generate ad. Please try again.";
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem' }}>
            <div className="container" style={{ maxWidth: '700px', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.1 }}>
                        Create Your <span className="text-gradient">Campaign</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                        Describe your product or vision, and let our AI craft the perfect advertisement.
                    </p>
                </motion.div>

                {!loading ? (
                    <motion.form 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
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
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '4rem 0' }}
                    >
                        <div className="loader" style={{ width: '80px', height: '80px', borderWidth: '6px', borderBottomColor: 'var(--primary-color)' }}></div>
                        <h2 style={{ marginTop: '2rem', fontSize: '2rem', color: '#fff' }}>Weaving Pixels...</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Our AI is dreaming up your ad. Hold tight.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default GenerateAds;
