'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { m, useInView } from 'framer-motion';
import {
    Clapperboard, Camera, AudioWaveform, Hexagon, PenTool,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from '@/components/css/ShowcaseSection.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;

const MARQUEE_TAGS = [
    'Cinematic Direction', 'AI Photoshoots', 'Brand Identity', 'Motion Design',
    'Sonic Branding', '3D Visualisation', 'Video Editing', 'Colour Grading',
    'Campaign Strategy', 'Asset Systems', 'UI Motion', 'Product Films',
    'Editorial Photography', 'Workflow Automation', 'Creative Direction', 'Spatial Design',
];

const PROJECTS = [
    { Icon: Clapperboard, cat: 'VIDEO · 2024', title: 'Void Campaign Film', desc: 'Full cinematic production for a global fashion label — concept to colour grade.', tags: ['DIRECTION', 'GRADE'], theme: 'violet' },
    { Icon: Camera, cat: 'PHOTO · 2024', title: 'Lumina SS25 Shoot', desc: 'AI-directed photoshoot — 200 hero images delivered in a single session.', tags: ['AI STUDIO', 'POST'], theme: 'crimson' },
    { Icon: AudioWaveform, cat: 'AUDIO · 2024', title: 'Resonance Identity', desc: 'Sonic branding suite — logo sound, UI tones and campaign audio bed.', tags: ['SONIC', 'BRAND'], theme: 'teal' },
    { Icon: Hexagon, cat: '3D · 2024', title: 'Nyx Product World', desc: 'Immersive 3D product visualisations for a luxury cosmetics launch.', tags: ['3D', 'MOTION'], theme: 'amber' },
    { Icon: PenTool, cat: 'BRAND · 2025', title: 'Studio Zero Rebrand', desc: 'End-to-end identity — mark, motion guidelines and full asset library.', tags: ['IDENTITY', 'SYSTEM'], theme: 'blue' },
];

const STATS = [
    { num: '120+', label: 'PROJECTS DELIVERED' },
    { num: '48+', label: 'GLOBAL CLIENTS' },
    { num: '5★', label: 'AVG RATING' },
];

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

const CARD_WIDTH = 300;
const CARD_GAP = 14;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const AUTO_DELAY = 3000;

export default function ShowcaseSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    const [activeIdx, setActiveIdx] = useState(0);
    const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isPaused = useRef(false);
    const total = PROJECTS.length;

    const scrollTo = useCallback((idx: number) => {
        const el = trackRef.current;
        if (!el) return;
        const clamped = ((idx % total) + total) % total;
        el.scrollTo({ left: clamped * CARD_STEP, behavior: 'smooth' });
        setActiveIdx(clamped);
    }, [total]);

    const scheduleNext = useCallback(() => {
        if (autoTimer.current) clearTimeout(autoTimer.current);
        autoTimer.current = setTimeout(() => {
            if (isPaused.current) return;
            setActiveIdx(prev => {
                const next = (prev + 1) % total;
                trackRef.current?.scrollTo({ left: next * CARD_STEP, behavior: 'smooth' });
                return next;
            });
        }, AUTO_DELAY);
    }, [total]);

    useEffect(() => {
        if (!inView) return;
        scheduleNext();
        return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
    }, [inView, activeIdx, scheduleNext]);

    const onScroll = () => {
        const el = trackRef.current;
        if (!el) return;
        setActiveIdx(Math.round(el.scrollLeft / CARD_STEP));
    };

    const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        const el = trackRef.current; if (!el) return;
        isPaused.current = true;
        drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft };
        el.style.cursor = 'grabbing'; el.style.userSelect = 'none';
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!drag.current.active) return;
        const el = trackRef.current; if (!el) return;
        el.scrollLeft = drag.current.scrollLeft - (e.pageX - drag.current.startX);
    };
    const onDragEnd = () => {
        const el = trackRef.current;
        if (!el || !drag.current.active) return;
        drag.current.active = false; isPaused.current = false;
        el.style.cursor = 'grab'; el.style.userSelect = '';
        scrollTo(Math.round(el.scrollLeft / CARD_STEP));
        scheduleNext();
    };

    const touch = useRef({ startX: 0, scrollLeft: 0 });
    const onTouchStart = (e: React.TouchEvent) => {
        isPaused.current = true;
        touch.current = { startX: e.touches[0].pageX, scrollLeft: trackRef.current?.scrollLeft ?? 0 };
    };
    const onTouchMove = (e: React.TouchEvent) => {
        const el = trackRef.current; if (!el) return;
        el.scrollLeft = touch.current.scrollLeft - (e.touches[0].pageX - touch.current.startX);
    };
    const onTouchEnd = () => {
        isPaused.current = false;
        scrollTo(Math.round((trackRef.current?.scrollLeft ?? 0) / CARD_STEP));
        scheduleNext();
    };

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.glowTL} aria-hidden />
            <div className={styles.glowBR} aria-hidden />

            <m.div className={styles.header} variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.headerLeft}>
                    <div className={styles.eyebrow}>OUR WORK</div>
                    <h2 className={styles.hTitle}>Where Vision Meets<br /><em>The Void.</em></h2>
                </div>
                <div className={styles.headerRight}>
                    <button className={styles.viewBtn}>View all projects →</button>
                    <div className={styles.stats}>
                        {STATS.map(s => (
                            <div key={s.label} className={styles.stat}>
                                <div className={styles.statNum}>{s.num}</div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </m.div>

            <div className={styles.marqueeWrap} aria-hidden>
                <div className={styles.marqueeTrack}>
                    {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, i) => (
                        <div key={i} className={styles.mTag}><div className={styles.mDot} />{tag}</div>
                    ))}
                </div>
            </div>

            <m.div className={styles.sliderOuter} variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.dragHint} aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 9l-3 3 3 3" /><path d="M19 9l3 3-3 3" /><line x1="2" y1="12" x2="22" y2="12" /></svg>
                    drag to explore
                </div>

                <div ref={trackRef} className={styles.cardsRow}
                    onScroll={onScroll}
                    onMouseDown={onMouseDown} onMouseMove={onMouseMove}
                    onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
                    onMouseEnter={() => { isPaused.current = true; if (autoTimer.current) clearTimeout(autoTimer.current); }}
                    onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                    {PROJECTS.map((proj, i) => (
                        <m.div key={proj.title}
                            className={`${styles.projCard} ${styles[`theme_${proj.theme}`]}`}
                            animate={{ scale: activeIdx === i ? 1 : 0.95, opacity: activeIdx === i ? 1 : 0.55 }}
                            transition={{ duration: 0.4, ease: EASE }}>
                            <div className={styles.cardVisual}>
                                <div className={styles.cvGlow} />
                                <div className={styles.cardEmoji}>
                                    <proj.Icon size={36} strokeWidth={1.5} />
                                </div>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.cardCat}>{proj.cat}</div>
                                <div className={styles.cardTitle}>{proj.title}</div>
                                <div className={styles.cardDesc}>{proj.desc}</div>
                                <div className={styles.cardFooter}>
                                    <div className={styles.cardTags}>{proj.tags.map(t => <span key={t} className={styles.ctag}>{t}</span>)}</div>
                                    <div className={styles.cardArrow}>→</div>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>

                <div className={styles.sliderControls}>
                    <button className={styles.arrowBtn} onClick={() => scrollTo(activeIdx - 1)} aria-label="Previous">
                        <ChevronLeft size={18} />
                    </button>
                    <div className={styles.dots} role="tablist">
                        {PROJECTS.map((_, i) => (
                            <button key={i} role="tab" aria-selected={i === activeIdx} aria-label={`Project ${i + 1}`}
                                className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
                                onClick={() => scrollTo(i)} />
                        ))}
                    </div>
                    <button className={styles.arrowBtn} onClick={() => scrollTo(activeIdx + 1)} aria-label="Next">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </m.div>

            <m.div className={styles.ctaStrip} variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <div className={styles.ctaLeft}>
                    <h3>Ready to create something unforgettable?</h3>
                    <p>Tell us your vision — we'll build the void around it.</p>
                </div>
                <div className={styles.ctaActions}>
                    <button className={styles.btnGhost}>See process</button>
                    <button className={styles.btnPrimary}>Start a project</button>
                </div>
            </m.div>
        </section>
    );
}