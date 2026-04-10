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

const WhatIsPlanLikeALocal = () => {
    const [featureHighlightsVisible, setFeatureHighlightsVisible] = useState(false);
    const featureHighlightsGridRef = useRef(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setFeatureHighlightsVisible(true);
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

            <div className="mb-16 grid grid-cols-1 gap-6 md:mb-24 lg:grid-cols-12 lg:items-start">
                <div className="pt-1 md:pt-4 lg:col-span-3">
                    <span className="ibrow">
                        Who We Are
                    </span>
                </div>
                <div className="lg:col-span-8 lg:col-start-4">
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
                        className="inline-flex items-center rounded-lg bg-[#1a1c1c] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#f9f9f9] shadow-xl transition-all hover:scale-[1.02] md:px-6 md:text-[10px]"
                    >
                        Meet Founders
                        <ArrowForward sx={{ml: 1, fontSize: 16}}/>
                    </Link>
                </div>
            </div>

            <div className="rounded-[2rem] bg-[#f3f3f3] px-5 py-7 md:px-8 md:py-10">
                <div className="grid grid-cols-2 gap-y-6 sm:gap-6 lg:grid-cols-4 lg:gap-0">
                    {statItems.map(([value, label]) => (
                        <div key={label} className="text-center lg:border-r lg:border-[#bec8ca]/30 lg:px-6 lg:text-left last:border-r-0">
                            <div className="mb-1 text-[2.1rem] font-extrabold tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.4rem] md:text-[3.2rem]">{value}</div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3f484a]">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </BlendedBackground>
    );
};

export default WhatIsPlanLikeALocal;
