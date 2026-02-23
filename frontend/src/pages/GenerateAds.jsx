import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { generateAd } from '../services/api';
import PromptForm from '../components/PromptForm';
import LoadingSpinner from '../components/LoadingSpinner';

const GenerateAds = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt) return;

        setLoading(true);
        try {
            const data = await generateAd(prompt);
            
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
                    <PromptForm prompt={prompt} setPrompt={setPrompt} onSubmit={handleSubmit} />
                ) : (
                    <LoadingSpinner />
                )}
            </div>
        </div>
    );
};

export default GenerateAds;
