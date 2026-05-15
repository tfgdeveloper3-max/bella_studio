'use client';

import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from '@/components/css/ServicesSection.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceItem = {
    id: string; title: string; desc: string;
    img: string | null; video: string | null;
    tag: string; span: 'normal' | 'wide';
};

const SERVICES: ServiceItem[] = [
    { id: 'advertising', title: 'Advertising', desc: 'Brief to final asset. No vendor chain, no waiting. Just the work.', img: '/images/advertising.avif', video: null, tag: 'AD FILMS', span: 'normal' },
    { id: 'product', title: 'Product shots', desc: 'AI-powered photoshoots. No studio. No crew. No scheduling.', img: '/images/product-shots.avif', video: null, tag: 'PHOTOGRAPHY', span: 'normal' },
    { id: 'brand', title: 'Brand campaigns', desc: 'On-brand visuals, video, and audio at any scale, any format.', img: '/images/brand-campaign.avif', video: null, tag: 'CAMPAIGNS', span: 'normal' },
    { id: 'filmmaking', title: 'Filmmaking', desc: 'Characters, storyboards, and concepts to explore. Cinematic tools made for the final frame.', img: null, video: '/videos/filmmaking.webm', tag: 'CINEMA', span: 'wide' },
];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

export default function ServicesSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.glowA} aria-hidden />
            <div className={styles.glowB} aria-hidden />

            <m.div className={styles.header} variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.headerLeft}>
                    <div className={styles.eyebrow}>WHAT WE DO</div>
                    <h2 className={styles.heading}>From product shot to<br /><em>viral phenomenon.</em></h2>
                    <p className={styles.subheading}>Global on-brand campaigns, product shots, and top-tier filmmaking. Everything a brand needs to show up at the highest level, in every format, every time.</p>
                </div>
                <m.button className={styles.ctaBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    Start creating →
                </m.button>
            </m.div>

            <div className={styles.grid}>
                {SERVICES.filter(s => s.span === 'normal').map((s, i) => (
                    <m.div key={s.id} className={styles.card} variants={fadeUp(0.1 + i * 0.08)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                        <ServiceCard service={s} />
                    </m.div>
                ))}
                {SERVICES.filter(s => s.span === 'wide').map(s => (
                    <m.div key={s.id} className={`${styles.card} ${styles.cardWide}`} variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                        <ServiceCard service={s} wide />
                    </m.div>
                ))}
            </div>
        </section>
    );
}

function ServiceCard({ service, wide = false }: { service: ServiceItem; wide?: boolean }) {
    return (
        <div className={`${styles.cardInner} ${wide ? styles.cardInnerWide : ''}`}>
            <div className={styles.imgWrap}>
                {service.video ? (
                    <video className={styles.video} src={service.video} autoPlay muted loop playsInline preload="metadata" />
                ) : service.img ? (
                    <Image src={service.img} alt={service.title} fill sizes={wide ? '100vw' : '33vw'} className={styles.img} priority={false} loading="lazy" />
                ) : null}
                <div className={styles.overlay} />
            </div>
            <div className={styles.hoverGlow} aria-hidden />
            <span className={styles.tag}>{service.tag}</span>
            <div className={styles.textBlock}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <div className={styles.arrow}>
                    <span>Explore</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
            </div>
        </div>
    );
}