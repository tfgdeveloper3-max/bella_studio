'use client';

import React, { useState } from 'react';
import { m, type Variants } from 'framer-motion';
import styles from '@/components/css/Bentosection.module.css';

const FILTERS = ['ALL', 'IMAGE', 'VIDEO', 'AUDIO'];

const TOOLS = [
    { emoji: '🌀', label: 'IMAGE GENERATOR', icon: '◈', bg: 'linear-gradient(135deg,#1a0533,#4a1060)', category: 'IMAGE' },
    { emoji: '🎬', label: 'VIDEO GENERATOR', icon: '▶', bg: 'linear-gradient(135deg,#0a2040,#1a4070)', category: 'VIDEO' },
    { emoji: '🥊', label: 'VIDEO EDITOR', icon: '◈', bg: 'linear-gradient(135deg,#200a2a,#5a1070)', category: 'VIDEO' },
    { emoji: '🎵', label: 'AUDIO', icon: '♫', bg: 'linear-gradient(135deg,#0a0a20,#2a2a5a)', category: 'AUDIO' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
    }),
};

export default function BentoSection() {
    const [activeFilter, setActiveFilter] = useState('ALL');

    const visibleTools = activeFilter === 'ALL'
        ? TOOLS
        : TOOLS.filter(t => t.category === activeFilter);

    return (
        <section className={styles.section}>
            <div className={styles.glowA} aria-hidden />
            <div className={styles.glowB} aria-hidden />

            {/* Top row */}
            <div className={styles.topRow}>
                <m.div
                    className={styles.topLeft}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: EASE }}
                >
                    <h2 className={styles.heading}>
                        Start simple.<br />Scale when you're ready
                    </h2>
                    <p className={styles.subheading}>
                        From a single tool to a complete workflow, at your own pace.
                    </p>
                </m.div>

                <m.button
                    className={styles.startBtn}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Start creating →
                </m.button>
            </div>

            {/* Bento Grid */}
            <div className={styles.grid}>

                {/* Card 1 — Tools */}
                <m.div
                    className={`${styles.card} ${styles.c1}`}
                    custom={0} variants={cardVariant}
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.3)' }}
                >
                    <div className={styles.c1Text}>
                        <h3>Every tool, ready to go</h3>
                        <p>Image, video, audio, 3D — thirty tools, no setup. Open what you need, make what you want.</p>
                    </div>

                    <div className={styles.filterTabs}>
                        {FILTERS.map(f => (
                            <button
                                key={f}
                                className={`${styles.ftab} ${activeFilter === f ? styles.ftabActive : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className={styles.toolGrid}>
                        {(visibleTools.length ? visibleTools : TOOLS).map((tool, i) => (
                            <m.div
                                key={tool.label}
                                className={styles.toolCell}
                                style={{ background: tool.bg }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                            >
                                <div className={styles.toolEmoji}>{tool.emoji}</div>
                                <div className={styles.toolLabel}>
                                    <span>{tool.icon}</span> {tool.label}
                                </div>
                            </m.div>
                        ))}
                    </div>
                </m.div>

                {/* Card 2 — Canvas */}
                <m.div
                    className={`${styles.card} ${styles.c2}`}
                    custom={1} variants={cardVariant}
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.3)' }}
                >
                    <div className={styles.c2Inner}>
                        <h3>Your entire creative process<br />on one node-based canvas</h3>
                        <p>All your tools. All your workflows. One infinite, node-based canvas. Branch ideas, compare versions, work with your team, all in Spaces.</p>
                    </div>

                    {/* Node canvas decoration */}
                    <div className={styles.nodeCanvas} aria-hidden>
                        <svg className={styles.connector} viewBox="0 0 200 200" fill="none">
                            <defs>
                                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                                </linearGradient>
                            </defs>
                            <path d="M20 80 C70 80, 120 150, 180 130" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <div className={`${styles.node} ${styles.n1}`}><span>🚗</span></div>
                        <div className={`${styles.node} ${styles.n2}`}><span>🚴</span></div>
                        <span className={`${styles.collabTag} ${styles.tagBlue}`}>Paolo</span>
                        <span className={`${styles.collabTag} ${styles.tagPink}`}>Marina</span>
                    </div>
                </m.div>

                {/* Card 3 — Team */}
                <m.div
                    className={`${styles.card} ${styles.c3}`}
                    custom={2} variants={cardVariant}
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.3)' }}
                >
                    <h3>One place, whole team</h3>
                    <p>Organize brand assets, generated content, and workflows with Projects. Your team works together, your work stays together.</p>

                    <div className={styles.projectCards}>
                        <div className={styles.projCard}>
                            <div className={`${styles.projThumb} ${styles.ptGreen}`}>🌿</div>
                            <div className={styles.projName}>BRAND PROJECT</div>
                        </div>
                        <div className={styles.projCard}>
                            <div className={`${styles.projThumb} ${styles.ptWine}`}>🕊️</div>
                            <div className={styles.projName}>CAMPAIGN ASSETS</div>
                        </div>
                    </div>
                </m.div>

                {/* Card 4 — Workflow */}
                <m.div
                    className={`${styles.card} ${styles.c4}`}
                    custom={3} variants={cardVariant}
                    initial="hidden" whileInView="show" viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: 'rgba(168,85,247,0.3)' }}
                >
                    <h3>Workflow in one click</h3>
                    <p>Save any complex on-brand workflow as an App. The next person runs it in one click.</p>

                    <div className={styles.wfVisual}>
                        <div className={styles.wfGlow} aria-hidden />
                        <m.div
                            className={styles.wfIcon}
                            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        >
                            🏀
                        </m.div>
                        <button className={styles.runBtn}>RUN APP</button>
                    </div>
                </m.div>

            </div>
        </section>
    );
}