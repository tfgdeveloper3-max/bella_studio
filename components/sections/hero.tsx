'use client';

import React from 'react';
import Image from 'next/image';
import '@/components/css/hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-bg">
                <Image
                    src="/images/hero-bg.jpeg"
                    alt=""
                    fill
                    priority
                    quality={90}
                    className="hero-bg-img"
                    sizes="100vw"
                />
            </div>

            <div className="hero-overlay" aria-hidden />

            <div className="hero-content">
                <h1>Welcome To <br /> Bella J. White Talks</h1>
                <p>Bella J. White brings published authors into the spotlight to share how their rough ideas became <br/>
                    global opportunities, loyal audiences, and lasting impact.</p>
                <button className="hero-btn">Start Watching</button>
            </div>
        </section>
    );
};

export default Hero;