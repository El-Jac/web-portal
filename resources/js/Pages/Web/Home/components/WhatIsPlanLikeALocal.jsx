import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import {featureHighlights, statItems} from './homeData';
import BlendedBackground from '@/Components/BlendedBackground';
import FasterPlanningCalendarIcon from '@/Components/icons/FasterPlanningCalendarIcon';
import TourGuideIcon from '@/Components/icons/TourGuideIcon';
import PersonalizedItineraryListIcon from '@/Components/icons/PersonalizedItineraryListIcon';

const FEATURE_CUSTOM_SVG_ICONS = [
    FasterPlanningCalendarIcon,
    TourGuideIcon,
    PersonalizedItineraryListIcon,
];

/** Delay between each card’s fade-in (ms) */
const FEATURE_HIGHLIGHT_STAGGER_MS = 150;
/** Opacity / translate transition length (ms) */
const FEATURE_HIGHLIGHT_REVEAL_MS = 1200;
/** Starting offset for fade-down (rem); keep in sync with translate in card style */
const FEATURE_HIGHLIGHT_DROP_REM = 6;

const WHO_WE_ARE_TITLE = 'Who We Are';
const WHO_WE_ARE_TYPE_MS = 46;
/** Pause after “Who We Are” finishes typing, before the quote block fades in */
const WHO_WE_ARE_QUOTES_AFTER_TYPE_MS = 400;
const WHO_WE_ARE_QUOTES_REVEAL_MS = 1050;

/** Home stats counter: full run when section enters view */
const STAT_COUNT_DURATION_MS = 1500;

function easeOutCubic(t) {
    return 1 - (1 - t) ** 3;
}

function formatStatCount(n, suffix) {
    const rounded = Math.round(n);
    const body = rounded >= 1000 ? rounded.toLocaleString('en-US') : String(rounded);
    return body + suffix;
}

const WhatIsPlanLikeALocal = () => {
    const [featureHighlightsVisible, setFeatureHighlightsVisible] = useState(false);
    const featureHighlightsGridRef = useRef(null);

    const [whoWeAreInView, setWhoWeAreInView] = useState(false);
    const [whoWeAreTitleTyped, setWhoWeAreTitleTyped] = useState('');
    const [whoWeAreQuotesVisible, setWhoWeAreQuotesVisible] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const whoWeAreSectionRef = useRef(null);
    const statsSectionRef = useRef(null);
    const statsCountStartedRef = useRef(false);
    const [statCounts, setStatCounts] = useState(() => statItems.map(() => 0));

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mqReduce.matches) {
            setFeatureHighlightsVisible(true);
            setReduceMotion(true);
            setWhoWeAreInView(true);
            setWhoWeAreTitleTyped(WHO_WE_ARE_TITLE);
            setWhoWeAreQuotesVisible(true);
            setStatCounts(statItems.map((s) => s.target));
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || featureHighlightsVisible) {
            return undefined;
        }
        const el = featureHighlightsGridRef.current;
        if (!el) {
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setFeatureHighlightsVisible(true);
                    io.disconnect();
                }
            },
            {root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [featureHighlightsVisible]);

    useEffect(() => {
        if (typeof window === 'undefined' || whoWeAreInView || reduceMotion) {
            return undefined;
        }
        const el = whoWeAreSectionRef.current;
        if (!el) {
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setWhoWeAreInView(true);
                    io.disconnect();
                }
            },
            {root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.18},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [whoWeAreInView, reduceMotion]);

    useEffect(() => {
        if (!whoWeAreInView || reduceMotion) {
            return undefined;
        }
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setWhoWeAreTitleTyped(WHO_WE_ARE_TITLE.slice(0, i));
            if (i >= WHO_WE_ARE_TITLE.length) {
                clearInterval(id);
            }
        }, WHO_WE_ARE_TYPE_MS);
        return () => clearInterval(id);
    }, [whoWeAreInView, reduceMotion]);

    useEffect(() => {
        if (reduceMotion || !whoWeAreInView) {
            return undefined;
        }
        if (whoWeAreTitleTyped !== WHO_WE_ARE_TITLE) {
            return undefined;
        }
        const t = setTimeout(() => {
            setWhoWeAreQuotesVisible(true);
        }, WHO_WE_ARE_QUOTES_AFTER_TYPE_MS);
        return () => clearTimeout(t);
    }, [whoWeAreTitleTyped, whoWeAreInView, reduceMotion]);

    useEffect(() => {
        if (reduceMotion) {
            return undefined;
        }
        const el = statsSectionRef.current;
        if (!el) {
            return undefined;
        }
        const targets = statItems.map((s) => s.target);
        const io = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || statsCountStartedRef.current) {
                    return;
                }
                statsCountStartedRef.current = true;
                io.disconnect();
                const start = performance.now();
                const tick = (now) => {
                    const elapsed = now - start;
                    const t = Math.min(1, elapsed / STAT_COUNT_DURATION_MS);
                    const eased = easeOutCubic(t);
                    setStatCounts(targets.map((tgt) => tgt * eased));
                    if (t < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        setStatCounts([...targets]);
                    }
                };
                requestAnimationFrame(tick);
            },
            {root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduceMotion]);

    const whoWeAreShowCursor =
        whoWeAreInView && !reduceMotion && whoWeAreTitleTyped.length < WHO_WE_ARE_TITLE.length;

    return (
    <BlendedBackground clipOverflow={false} className="z-30 bg-[#f9f9f9] px-5 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div
                ref={featureHighlightsGridRef}
                className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mb-24 md:grid-cols-4 md:gap-6"
            >
                {featureHighlights.map(({label, icon: Icon}, index) => {
                    const staggerMs = featureHighlightsVisible ? index * FEATURE_HIGHLIGHT_STAGGER_MS : 0;
                    const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
                    const orbitSafeId = label.replace(/\W+/g, '-').replace(/^-+|-+$/g, '') || 'icon';
                    const orbitFilterId = `orbit-feather-${orbitSafeId}`;
                    const orbitGradId = `orbit-grad-${orbitSafeId}`;
                    return (
                    <div
                        key={label}
                        style={{
                            opacity: featureHighlightsVisible ? 1 : 0,
                            transform: featureHighlightsVisible
                                ? 'translate3d(0, 0, 0)'
                                : `translate3d(0, -${FEATURE_HIGHLIGHT_DROP_REM}rem, 0)`,
                            transition: `opacity ${FEATURE_HIGHLIGHT_REVEAL_MS}ms ${easing} ${staggerMs}ms, transform ${FEATURE_HIGHLIGHT_REVEAL_MS}ms ${easing} ${staggerMs}ms, box-shadow 300ms ease-out, background-color 300ms ease-out`,
                            willChange: featureHighlightsVisible ? 'auto' : 'opacity, transform',
                        }}
                        className={`group flex min-h-[5.75rem] flex-col items-center justify-center gap-4 rounded-[1.375rem] bg-gradient-to-b from-white to-slate-50/40 px-4 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.98),inset_0_-1px_0_0_rgba(148,163,184,0.06),0_1px_2px_rgba(15,23,42,0.05),0_8px_20px_-10px_rgba(30,41,59,0.1),0_20px_48px_-24px_rgba(15,23,42,0.11),0_0_40px_-12px_rgba(59,130,246,0.06)] hover:bg-white hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,1),inset_0_-1px_0_0_rgba(234,109,79,0.08),0_2px_6px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(234,109,79,0.22),0_28px_56px_-22px_rgba(15,23,42,0.14),0_44px_88px_-32px_rgba(30,41,59,0.1),0_0_60px_-16px_rgba(234,109,79,0.12)] sm:min-h-0 sm:flex-row sm:justify-start sm:gap-5 sm:py-5 md:min-h-[9.5rem] md:flex-col md:justify-center md:gap-4 md:px-6 md:py-8 md:text-center ${
                            featureHighlightsVisible ? '' : 'pointer-events-none'
                        }`}
                    >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.125rem]">
                            {/* Orange segment travels around the icon edge (stroke-dash animation, not a spinning disk) */}
                            <svg
                                className="feature-highlight-icon-orbit-svg pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <defs>
                                    <linearGradient
                                        id={orbitGradId}
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#EA6D4F" />
                                        <stop offset="55%" stopColor="#ff9a7a" />
                                        <stop offset="100%" stopColor="#ffd4c4" />
                                    </linearGradient>
                                    <filter
                                        id={orbitFilterId}
                                        x="-65%"
                                        y="-65%"
                                        width="230%"
                                        height="230%"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        {/* Thin stroke + dual blur: wide halo (glowy) + tight rim (definition) */}
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.85" result="orbitTight" />
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.6" result="orbitWide" />
                                        <feColorMatrix
                                            in="orbitWide"
                                            type="matrix"
                                            values="1.14 0 0 0 0.06  0 1.1 0 0 0  0 0 1 0 0  0 0 0 1.72 0"
                                            result="orbitWideBoost"
                                        />
                                        <feColorMatrix
                                            in="orbitTight"
                                            type="matrix"
                                            values="1.1 0 0 0 0.04  0 1.06 0 0 0  0 0 1 0 0  0 0 0 1.22 0"
                                            result="orbitTightBoost"
                                        />
                                        <feMerge>
                                            <feMergeNode in="orbitWideBoost" />
                                            <feMergeNode in="orbitTightBoost" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                <rect
                                    className="feature-highlight-icon-orbit-stroke"
                                    x="1.25"
                                    y="1.25"
                                    width="61.5"
                                    height="61.5"
                                    rx="16.75"
                                    ry="16.75"
                                    stroke={`url(#${orbitGradId})`}
                                    strokeWidth="1.05"
                                    strokeLinecap="round"
                                    pathLength="100"
                                    strokeDasharray="42 58"
                                    filter={`url(#${orbitFilterId})`}
                                />
                            </svg>
                            <div className="absolute inset-[3px] z-[1] flex items-center justify-center rounded-[0.95rem] bg-gradient-to-br from-slate-50 to-slate-100/90 text-slate-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),inset_0_-2px_6px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/60 transition-[color,background,box-shadow,ring-color] duration-300 ease-out group-hover:bg-gradient-to-br group-hover:from-[#EA6D4F]/10 group-hover:to-[#EA6D4F]/5 group-hover:text-[#EA6D4F] group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_6px_18px_-6px_rgba(234,109,79,0.35),0_2px_8px_-4px_rgba(234,109,79,0.2)] group-hover:ring-[#EA6D4F]/20">
                                {FEATURE_CUSTOM_SVG_ICONS.includes(Icon) ? (
                                    <Icon/>
                                ) : (
                                    <Icon sx={{fontSize: 34}}/>
                                )}
                            </div>
                        </div>
                        <span className="flex max-w-[13rem] flex-col items-center gap-1 text-center text-xs font-semibold uppercase leading-[1.1] tracking-[0.1em] text-slate-700 antialiased sm:items-start sm:text-left sm:text-sm sm:tracking-[0.09em] md:max-w-[12rem] md:items-center md:text-[15px] md:text-center md:tracking-[0.08em]">
                            {(label.includes('\n')
                                ? label.split('\n').map((line) => line.trim())
                                : label.split(/\s+/)
                            ).map((word, idx) => (
                                <span key={idx} className="block">
                                    {word}
                                </span>
                            ))}
                        </span>
                    </div>
                    );
                })}
            </div>

            <div
                ref={whoWeAreSectionRef}
                className="mb-16 grid grid-cols-1 gap-6 md:mb-24 lg:grid-cols-12 lg:items-start"
            >
                <div className="pt-1 md:pt-4 lg:col-span-3">
                    <span
                        className="ibrow block min-h-[1.4em]"
                        aria-label={WHO_WE_ARE_TITLE}
                    >
                        <span aria-hidden="true">
                            {whoWeAreTitleTyped}
                            {whoWeAreShowCursor ? (
                                <span className="who-we-are-typewriter-cursor">|</span>
                            ) : null}
                        </span>
                    </span>
                </div>
                <div
                    className="lg:col-span-8 lg:col-start-4"
                    aria-hidden={!whoWeAreQuotesVisible}
                    style={{
                        opacity: whoWeAreQuotesVisible ? 1 : 0,
                        transition: reduceMotion
                            ? 'none'
                            : `opacity ${WHO_WE_ARE_QUOTES_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                        pointerEvents: whoWeAreQuotesVisible ? 'auto' : 'none',
                    }}
                >
                    <div
                        style={{
                            transform: whoWeAreQuotesVisible
                                ? 'translate3d(0, 0, 0)'
                                : 'translate3d(0, 1.75rem, 0)',
                            transition: reduceMotion
                                ? 'none'
                                : `transform ${WHO_WE_ARE_QUOTES_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                        }}
                    >
                        <h2 className="quotes">
                            This isn&apos;t a travel guide.
                            <br/>
                            <span className="font-light italic text-[#EA6D4F]">It&apos;s a one-on-one planning</span>
                            <br/>
                            experience designed to help
                            <br/>
                            you explore with <span className="font-light italic text-[#EA6D4F]">clarity,</span>
                            <br/>
                            <span className="font-light italic text-[#EA6D4F]">confidence, and local</span>
                            <br/>
                            <span className="font-light italic text-[#EA6D4F]">knowledge.</span>
                        </h2>
                        <Link
                            href="/who-we-are"
                            className="hero-cta-primary hero-cta-primary--dark inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                        >
                            <span className="relative z-[1] inline-flex items-center">
                                Meet Founders
                                <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                ref={statsSectionRef}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[#f0f0f0] px-6 py-10 md:px-11 md:py-12"
            >
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-[#EA6D4F]"
                    aria-hidden
                />
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-11 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-0">
                    {statItems.map((item, index) => (
                        <div
                            key={item.label}
                            className="text-center max-lg:[&:nth-child(3)]:col-span-2 lg:border-r lg:border-slate-300/45 lg:px-8 lg:last:border-r-0"
                        >
                            <div className="tabular-nums text-[2.15rem] font-extrabold leading-none tracking-[-0.045em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.2rem]">
                                {formatStatCount(statCounts[index] ?? 0, item.suffix)}
                            </div>
                            <div className="mt-2.5 text-[11px] font-semibold uppercase leading-snug tracking-[0.14em] text-slate-600">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </BlendedBackground>
    );
};

export default WhatIsPlanLikeALocal;
