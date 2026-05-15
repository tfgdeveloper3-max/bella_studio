'use client';

import React, { useRef, useState } from 'react';
import { m, useInView, AnimatePresence } from 'framer-motion';
import styles from '@/components/css/FAQSection.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

const FAQS = [
    { q: 'Is Bella J the same as other studios?', a: 'No — Bella J is a dedicated AI-powered creative studio. Every tool, model, and workflow is built specifically for professional brand output, not general-purpose generation.' },
    { q: 'I have an existing subscription — what happens now?', a: 'Your existing subscription continues uninterrupted. All your credits, projects, and assets remain intact. You can upgrade, downgrade, or cancel at any time from your dashboard.' },
    { q: 'Will stock content still be available?', a: 'Both. Our library includes 250M+ licensed stock assets alongside every AI generation tool. You can mix and match within the same workflow — no switching between platforms.' },
    { q: 'I already have a paid plan. What happens to it?', a: 'Paid plans are honoured in full. If you are mid-cycle, your billing date and credit balance stay the same. Enterprise customers get a dedicated account manager.' },
    { q: 'Who owns the content I create?', a: 'You do — 100%. Every asset you generate belongs to you. We never use your output to train our models, and you receive full commercial rights to everything produced.' },
    { q: 'How does credit billing work?', a: 'Credits are consumed per generation, not per user or per seat. You buy a pool of credits and share them however your team needs — complete cost visibility and zero wasted seats.' },
];

export default function FAQSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.glowA} aria-hidden />
            <div className={styles.glowB} aria-hidden />

            <div className={styles.inner}>
                <m.div className={styles.left} variants={fadeUp(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                    <div className={styles.eyebrow}>FAQ</div>
                    <h2 className={styles.heading}>Answers to your<br /><em>top questions</em></h2>
                    <p className={styles.subtext}>Can't find what you're looking for? Our team is one message away.</p>
                    <button className={styles.supportBtn}>Contact support →</button>
                </m.div>

                <m.div className={styles.right} variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                    {FAQS.map((faq, i) => (
                        <div key={i} className={`${styles.item} ${openIdx === i ? styles.itemOpen : ''}`}>
                            <button className={styles.question} onClick={() => setOpenIdx(prev => prev === i ? null : i)} aria-expanded={openIdx === i}>
                                <span>{faq.q}</span>
                                <m.div className={styles.icon} animate={{ rotate: openIdx === i ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}>+</m.div>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIdx === i && (
                                    <m.div className={styles.answer}
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: EASE }}>
                                        <p>{faq.a}</p>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </m.div>
            </div>
        </section>
    );
}