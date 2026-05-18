import React from 'react';
import DarkVeil from '@/components/DarkVeil';
import '@/components/css/hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <DarkVeil
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0}
            />
            <div className="hero-content">
                <h1>Welcome To The Bella J</h1>
                <p>Experience the next generation of dark web aesthetics.</p>
                <button className="hero-btn">Enter Now</button>
            </div>
        </section>
    );
};

export default Hero;