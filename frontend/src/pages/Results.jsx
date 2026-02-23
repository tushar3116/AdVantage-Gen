import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImagePreview from '../components/ImagePreview';
import TaglineDisplay from '../components/TaglineDisplay';
import TagsDisplay from '../components/TagsDisplay';
import GenerateAnotherButton from '../components/GenerateAnotherButton';

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
                    <ImagePreview imageUrl={imageUrl} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Tagline Section */}
                        <TaglineDisplay tagline={tagline} />

                        {/* Tags Section */}
                        <TagsDisplay tags={tags} />

                        <GenerateAnotherButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
