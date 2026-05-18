'use client';

import React from 'react';
import FloatingLines from '@/components/FloatingLines';
import styles from '@/components/css/Footer.module.css';

const NAV = [
    { heading: 'Studio', links: ['Advertising', 'Product Shots', 'Brand Campaigns', 'Filmmaking', 'AI Photoshoots'] },
    { heading: 'Platform', links: ['Creative Suite', 'Developer API', 'Stock Library', 'Workflows', 'Spaces'] },
    { heading: 'Company', links: ['About us', 'Careers', 'Blog', 'Press room', 'Events'] },
    { heading: 'Get in touch', links: ['Customer support', 'Instagram', 'YouTube', 'LinkedIn', 'Discord'] },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles.ctaBanner}>
                <div className={styles.linesWrap} aria-hidden>
                    <FloatingLines
                        enabledWaves={['top', 'middle', 'bottom']}
                        lineCount={8} lineDistance={8}
                        bendRadius={8} bendStrength={-2}
                        interactive parallax={true} animationSpeed={1}
                        linesGradient={['#3b0f6e', '#7c3aed', '#a855f7', '#c084fc', '#6d28d9']}
                        mixBlendMode="screen"
                    />
                </div>
                <div className={styles.bannerOverlay} aria-hidden />
                <div className={styles.bannerContent}>
                    <p className={styles.bannerEyebrow}>BELLA J STUDIO</p>
                    <h2 className={styles.bannerHeading}>Be Void.<em></em></h2>
                    <p className={styles.bannerSub}>The creative platform to direct your best work.</p>
                    <button className={styles.bannerBtn}>Start creating →</button>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.glowFooter} aria-hidden />
                <div className={styles.inner}>
                    <div className={styles.brand}>
                        <div className={styles.logoMark}>
                            <img src="/images/logo.png" alt="" className={styles.logo_img} />
                        </div>
                        <p className={styles.brandDesc}>The creative platform to direct your best work. Trusted by studios, agencies, and enterprises worldwide.</p>
                        <div className={styles.langPill}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            English
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                        </div>
                    </div>

                    {NAV.map(col => (
                        <div key={col.heading} className={styles.navCol}>
                            <h4 className={styles.navHeading}>{col.heading}</h4>
                            <ul className={styles.navList}>
                                {col.links.map(link => <li key={link}><a href="#" className={styles.navLink}>{link}</a></li>)}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>© {new Date().getFullYear()} Bella J Studio. All rights reserved.</p>
                    <div className={styles.legal}>
                        <a href="#" className={styles.legalLink}>Privacy policy</a>
                        <a href="#" className={styles.legalLink}>Terms of use</a>
                        <a href="#" className={styles.legalLink}>Cookies</a>
                    </div>
                </div>
            </div>

        </footer>
    );
}