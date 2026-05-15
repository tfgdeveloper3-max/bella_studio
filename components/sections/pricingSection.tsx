'use client';

import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import styles from '@/components/css/PricingSection.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

const MODELS = [
    { name: 'Nano Banana Pro', type: 'Image generation', typeClass: 'img', active: true },
    { name: 'Seedance 2', type: 'Video generation', typeClass: 'vid', active: false },
    { name: 'ElevenLabs', type: 'Audio/Speech', typeClass: 'aud', active: true },
    { name: 'Flux 2', type: 'Image generation', typeClass: 'img', active: false },
];
const CREDITS = [
    { initials: 'ZK', name: 'Zoya Kendall', email: 'zoya@studio.com', spent: '1.2M', avail: '1.7M', pct: 71, color: '#a855f7' },
    { initials: 'AF', name: 'Arlo Finch', email: 'arlo@studio.com', spent: '310K', avail: '877K', pct: 35, color: '#818cf8' },
    { initials: 'DO', name: 'Demi Ochoa', email: 'demi@studio.com', spent: '10.7M', avail: '19.2M', pct: 56, color: '#14b8a6' },
    { initials: 'NJ', name: 'Nala Jones', email: 'nala@studio.com', spent: '69.9K', avail: '30K', pct: 70, color: '#fb923c' },
];
const ENT_FEATURES = [
    { icon: '⚖', title: 'Legal indemnification', desc: 'Full legal protection for AI-generated content used commercially.' },
    { icon: '🛡', title: 'Security & compliance', desc: 'GDPR, ISO/IEC 27001, and SOC 2. Procurement-ready from day one.' },
    { icon: '⚙', title: 'Admin control', desc: 'Users, permissions, credits, and model access — one dashboard.' },
    { icon: '◎', title: 'You own everything', desc: 'Every asset belongs to you. We never train on your data.' },
    { icon: '◈', title: 'Dedicated support', desc: 'A real team, from onboarding through to day-to-day.' },
    { icon: '∞', title: 'Scale without limits', desc: 'Flexible credits, parallel generations, and no seat restrictions.' },
];
const TESTIMONIALS = [
    { logo: 'R/GA', quote: '"Best-in-class models and workflow tools through a single unified interface. It has been a key unlock as we\'ve woven AI into our workflows, end to end."', name: 'Nick Coronges', role: 'CTO at R/GA', featured: false },
    { logo: 'Delivery Hero', quote: '"We are highly satisfied. It consistently delivers high-quality, reliable results while streamlining our workflows and enhancing efficiency."', name: 'Javier Romero', role: 'Global Head of Content, Delivery Hero', featured: true },
    { logo: 'job&talent', quote: '"A key part of our marketing stack. It helps us create high-quality content at scale as we expand our AI-native workforce platform globally."', name: 'Juan Urdiales', role: 'Co-Founder & Co-CEO, Job&Talent', featured: false },
];

export default function PricingSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.glowA} aria-hidden />
            <div className={styles.glowB} aria-hidden />

            <m.div className={styles.plansWrap} variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.eyebrow}>PRICING</div>
                <h2 className={styles.heading}>Team Plans Built For Creative Work At Scale</h2>
            </m.div>

            <m.div className={styles.plansGrid} variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.planCard}>
                    <span className={styles.planTag}>◈ BUSINESS</span>
                    <div><h3 className={styles.planName}>Business</h3><p className={styles.planDesc}>For creative teams and agencies ready to move faster and produce more. Shared credits, collaborative workflows, and access to every AI model.</p></div>
                    <ul className={styles.planList}><li>Shared credit pool</li><li>Collaborative workflows</li><li>All AI models included</li></ul>
                    <button className={`${styles.planBtn} ${styles.btnOutline}`}>Learn more →</button>
                </div>
                <div className={`${styles.planCard} ${styles.planEnterprise}`}>
                    <span className={`${styles.planTag} ${styles.planTagEnt}`}>◇ ENTERPRISE</span>
                    <div><h3 className={styles.planName}>Enterprise</h3><p className={styles.planDesc}>For organizations where creative output is mission-critical. Full legal indemnification, enterprise-grade security, unlimited users, custom SSO.</p></div>
                    <ul className={`${styles.planList} ${styles.planListEnt}`}><li>Full legal indemnification</li><li>Unlimited users + custom SSO</li><li>Dedicated team from day one</li></ul>
                    <button className={`${styles.planBtn} ${styles.btnPurple}`}>Talk to the team →</button>
                </div>
            </m.div>

            <div className={styles.divider} aria-hidden />

            <m.div className={styles.testWrap} variants={fadeUp(0.08)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.testHeader}>
                    <div className={styles.eyebrow}>TRUSTED BY</div>
                    <h2 className={styles.testHeading}>What Studios Are Saying</h2>
                </div>
                <div className={styles.testGrid}>
                    {TESTIMONIALS.map(t => (
                        <div key={t.name} className={`${styles.testCard} ${t.featured ? styles.testFeatured : ''}`}>
                            <div className={styles.testLogo}><div className={`${styles.testLogoSquare} ${t.featured ? styles.testLogoSquareFeat : ''}`} />{t.logo}</div>
                            <p className={styles.testQuote}>{t.quote}</p>
                            <div><div className={styles.testName}>{t.name}</div><div className={styles.testRole}>{t.role}</div></div>
                        </div>
                    ))}
                </div>
            </m.div>
        </section>
    );
}