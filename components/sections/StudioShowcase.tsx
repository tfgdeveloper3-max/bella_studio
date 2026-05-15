'use client';

import React, { useState } from 'react';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import styles from '@/components/css/StudioSection.module.css';

const EASE = [0.22, 1, 0.36, 1] as const;
const VP   = { once: true, amount: 0.1 } as const;

const TABS = [
  { id: 'suite', label: 'Creative Suite' },
  { id: 'api',   label: 'Developer API'  },
  { id: 'stock', label: 'Stock'           },
];

const MENU: Record<string, { icon: string; title: string; desc: string }[]> = {
  suite: [
    { icon: '◈', title: 'Photoshoots',      desc: 'AI-directed studio sessions at any scale.'   },
    { icon: '⬡', title: 'Video Generation', desc: 'Cinematic output from a single prompt.'      },
    { icon: '◎', title: 'Upscaling',        desc: 'Push every pixel to 4K resolution.'          },
    { icon: '⬟', title: 'Brand Kits',       desc: 'Lock colours, fonts and tone across output.' },
    { icon: '◇', title: 'Workflows',        desc: 'Chain tools into repeatable pipelines.'      },
  ],
  api: [
    { icon: '⌁', title: 'REST Endpoints',   desc: 'Full programmatic access to every model.'    },
    { icon: '⌬', title: 'Batch Processing', desc: 'Queue thousands of jobs in parallel.'        },
    { icon: '◫', title: 'Webhooks',         desc: 'Get notified the instant a job completes.'   },
    { icon: '⬡', title: 'Model Versioning', desc: 'Pin to a specific checkpoint anytime.'       },
    { icon: '◈', title: 'Usage Analytics',  desc: 'Real-time token and cost dashboards.'        },
  ],
  stock: [
    { icon: '◎', title: 'Photos',                  desc: 'Millions of high-quality licensed images.'        },
    { icon: '⬟', title: 'Vectors & Illustrations', desc: 'Scalable art for any canvas.'                    },
    { icon: '◇', title: 'PSD Templates',           desc: 'Layered files ready for your edits.'             },
    { icon: '⌁', title: 'Video Clips',             desc: 'Cinematic footage, cleared for commercial use.'  },
    { icon: '⌬', title: 'Icons',                   desc: '500 000+ icons in every style and format.'       },
  ],
};

const PANEL: Record<string, { headline: string; body: string; tag: string }> = {
  suite: { tag: 'STUDIO',    headline: "The World's Most Powerful\nCreative Operating System.", body: 'Every AI model for video, image, and audio — unified in one intelligent workspace. Direct photoshoots, cast characters, stay on brand at any scale.' },
  api:   { tag: 'DEVELOPER', headline: 'Build Anything\nOn Our Infrastructure.',                body: 'Production-grade endpoints, sub-100ms latency, and a generous free tier. Ship AI-powered features without managing a single GPU.' },
  stock: { tag: 'LIBRARY',   headline: "The World's Creative Library.\nReady To Use.",          body: '250M+ photos, vectors, icons and templates. Licensed for commercial use, connected to every workflow.' },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit:   { opacity: 0, y: -16, transition: { duration: 0.25 } },
};
const stagger: Variants    = { show: { transition: { staggerChildren: 0.07 } } };
const itemVariant: Variants = {
  hidden: { opacity: 0, x: -18 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.38, ease: EASE } },
};

export default function StudioSection() {
  const [activeTab,  setActiveTab]  = useState<'suite' | 'api' | 'stock'>('suite');
  const [activeItem, setActiveItem] = useState(0);

  const menu  = MENU[activeTab];
  const panel = PANEL[activeTab];

  const handleTab = (id: string) => { setActiveTab(id as 'suite' | 'api' | 'stock'); setActiveItem(0); };

  return (
    <section className={styles.section}>
      <div className={styles.glowLeft}  aria-hidden />
      <div className={styles.glowRight} aria-hidden />

      <div className={styles.topText}>
        <m.h2 className={styles.heading} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, ease: EASE }}>
          One Place To Create Anything
        </m.h2>
        <m.p className={styles.subheading} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>
          Pick your starting point. Every tool, every model, every format.
        </m.p>
      </div>

      <m.div className={styles.tabBar} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.5, delay: 0.2 }}>
        {TABS.map(t => (
          <button key={t.id} className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`} onClick={() => handleTab(t.id)}>{t.label}</button>
        ))}
      </m.div>

      <m.div className={styles.card} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VP} transition={{ duration: 0.6, delay: 0.25, ease: EASE }}>
        <div className={styles.grain} aria-hidden />

        <div className={styles.left}>
          <AnimatePresence mode="wait">
            <m.div key={activeTab + '-menu'} variants={stagger} initial="hidden" animate="show" exit="exit" className={styles.menuList}>
              {menu.map((item, i) => (
                <m.button key={item.title} variants={itemVariant}
                  className={`${styles.menuItem} ${activeItem === i ? styles.menuItemActive : ''}`}
                  onClick={() => setActiveItem(i)}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <div className={styles.menuText}>
                    <span className={styles.menuTitle}>{item.title}</span>
                    <AnimatePresence>
                      {activeItem === i && (
                        <m.span className={styles.menuDesc}
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                          {item.desc}
                        </m.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {activeItem === i && (
                    <m.div className={styles.menuBar} layoutId="menuBar" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                </m.button>
              ))}
            </m.div>
          </AnimatePresence>
          <a className={styles.moreLink} href="#">More info <span>→</span></a>
        </div>

        <div className={styles.divider} aria-hidden />

        <div className={styles.right}>
          <AnimatePresence mode="wait">
            <m.div key={activeTab + '-panel'} variants={fadeUp} initial="hidden" animate="show" exit="exit" className={styles.panelInner}>
              <span className={styles.panelTag}>{panel.tag}</span>
              <h3 className={styles.panelHeadline}>
                {panel.headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
              </h3>
              <p className={styles.panelBody}>{panel.body}</p>
              <div className={styles.mediaBox}>
                <m.div className={`${styles.floatCard} ${styles.floatCard1}`} animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}>
                  <div className={styles.floatCardInner}><div className={styles.fcDot} /><span>{menu[0]?.title}</span></div>
                </m.div>
                <m.div className={`${styles.floatCard} ${styles.floatCard2}`} animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.8 }}>
                  <div className={styles.floatCardInner}><div className={`${styles.fcDot} ${styles.fcDotPurple}`} /><span>{menu[2]?.title}</span></div>
                </m.div>
                <div className={styles.mediaGlow} />
                <AnimatePresence mode="wait">
                  <m.div key={activeTab + activeItem} className={styles.bigIcon}
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }} transition={{ duration: 0.4, ease: EASE }}>
                    {menu[activeItem]?.icon}
                  </m.div>
                </AnimatePresence>
                <div className={styles.searchBar}>
                  <span className={styles.searchIcon}>⌕</span>
                  <AnimatePresence mode="wait">
                    <m.span key={activeItem} className={styles.searchText}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
                      {menu[activeItem]?.title}...
                    </m.span>
                  </AnimatePresence>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </m.div>
    </section>
  );
}