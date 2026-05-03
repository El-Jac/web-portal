import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowForward } from '@mui/icons-material';
import { Link } from '@inertiajs/react';

const HERO_CAROUSEL_SLIDES = [
    {
        id: 'nyc',
        src: '/images/home/stitch/who-we-are/hero/nyc.jpg',
        alt: 'Brooklyn Bridge in New York City',
        locationLabel: 'Brooklyn Bridge in New York City',
    },
    {
        id: 'zion',
        src: '/images/home/stitch/who-we-are/hero/zion.jpg',
        alt: "Pa'rus Trail in Zion National Park, Utah",
        locationLabel: "Pa'rus Trail in Zion National Park, Utah",
    },
    {
        id: 'la',
        src: '/images/home/stitch/who-we-are/hero/la.jpg',
        alt: 'Griffith Observatory in Los Angeles',
        locationLabel: 'Griffith Observatory in Los Angeles',
    },
    {
        id: 'miami',
        src: '/images/home/stitch/who-we-are/hero/miami.jpg',
        alt: 'Miami Beach in Florida',
        locationLabel: 'Miami Beach in Florida',
    },
    {
        id: 'chicago',
        src: '/images/home/stitch/who-we-are/hero/chicago.jpg',
        alt: 'Chicago River Architectural Cruise',
        locationLabel: 'Chicago River Architectural Cruise',
    },
    {
        id: 'dc',
        src: '/images/home/stitch/who-we-are/hero/dc.jpg',
        alt: 'Jefferson Memorial in DC',
        locationLabel: 'Jefferson Memorial in DC',
    },
];

const SLIDE_COUNT = HERO_CAROUSEL_SLIDES.length;

const WHO_WE_ARE_HERO_BG_IMAGE = '/images/home/stitch/who-we-are/hero/bg.jpg';

const WHO_WE_ARE_TYPEWRITER_LINE = 'We are local experts who live there.';
const WHO_WE_ARE_TW_PURPLE_START = 'We are '.length;
const WHO_WE_ARE_TW_PURPLE_END = WHO_WE_ARE_TW_PURPLE_START + 'local experts'.length;
const WHO_WE_ARE_EYEBROW_TRANSITION_MS = 560;
const WHO_WE_ARE_TYPEWRITER_CHAR_MS = 38;
const WHO_WE_ARE_REST_AFTER_TYPE_MS = 180;

function WhoWeAreHeroTypewriterLine({ visibleLen, showCursor }) {
    const g1 = WHO_WE_ARE_TYPEWRITER_LINE.slice(0, Math.min(visibleLen, WHO_WE_ARE_TW_PURPLE_START));
    const purp =
        visibleLen > WHO_WE_ARE_TW_PURPLE_START
            ? WHO_WE_ARE_TYPEWRITER_LINE.slice(
                  WHO_WE_ARE_TW_PURPLE_START,
                  Math.min(visibleLen, WHO_WE_ARE_TW_PURPLE_END),
              )
            : '';
    const g2 =
        visibleLen > WHO_WE_ARE_TW_PURPLE_END
            ? WHO_WE_ARE_TYPEWRITER_LINE.slice(WHO_WE_ARE_TW_PURPLE_END, visibleLen)
            : '';

    return (
        <span className="block min-h-[1.35em] font-['Raleway',system-ui,sans-serif] text-[1.2rem] font-normal italic leading-snug tracking-[-0.02em] sm:text-[1.35rem] md:text-[1.5rem]">
            {g1 ? <span className="text-[#666666]">{g1}</span> : null}
            {purp ? <span className="text-[#514ae6]">{purp}</span> : null}
            {g2 ? <span className="text-[#666666]">{g2}</span> : null}
            {showCursor ? (
                <span className="ml-px inline-block animate-pulse font-light text-[#999999]" aria-hidden>
                    |
                </span>
            ) : null}
        </span>
    );
}

/** Center-mode track: one dominant slide with neighbours peeking — matches editorial carousel reference. */
function WhoWeAreHeroCarousel() {
    const viewportRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [layout, setLayout] = useState({ cw: 390, slideW: 280, gap: 18 });

    const dragRef = useRef({ startX: 0, startY: 0, startIndex: 0, active: false, pointerId: null });

    const measure = useCallback(() => {
        const el = viewportRef.current;
        if (!el) return;
        const cw = el.clientWidth;
        const gap = cw < 640 ? 18 : cw < 1024 ? 22 : 26;
        const slideW = Math.min(cw * 0.72, 860);
        setLayout({ cw, slideW, gap });
    }, []);

    useEffect(() => {
        measure();
        const el = viewportRef.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [measure]);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduceMotion(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    const goNext = useCallback(() => {
        setIndex((i) => (i === SLIDE_COUNT - 1 ? 0 : i + 1));
    }, []);

    /** Single autoplay advance on load; no repeating loop (manual swipe/taps still work). */
    useEffect(() => {
        if (reduceMotion) return undefined;
        const id = window.setTimeout(goNext, 6500);
        return () => window.clearTimeout(id);
    }, [goNext, reduceMotion]);

    const translateX = layout.cw / 2 - layout.slideW / 2 - index * (layout.slideW + layout.gap);

    const slideHeight = 'clamp(220px, min(42vw, 52vh), 480px)';

    const slideIndexFromPoint = useCallback((clientX, clientY) => {
        const stack = document.elementsFromPoint(clientX, clientY);
        const root = viewportRef.current;
        if (!root) return null;
        for (const node of stack) {
            if (!(node instanceof Element)) continue;
            const slideEl = node.closest('[data-who-we-are-carousel-slide]');
            if (slideEl && root.contains(slideEl)) {
                const raw = slideEl.getAttribute('data-who-we-are-carousel-slide');
                const parsed = raw != null ? Number.parseInt(raw, 10) : NaN;
                if (!Number.isNaN(parsed)) return parsed;
            }
        }
        return null;
    }, []);

    const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            startIndex: index,
            active: true,
            pointerId: e.pointerId,
        };
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) {}
    };

    const endDrag = (e) => {
        if (!dragRef.current.active) return;
        const pid = dragRef.current.pointerId;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        const base = dragRef.current.startIndex;
        dragRef.current.active = false;
        dragRef.current.pointerId = null;
        try {
            if (pid != null) {
                e.currentTarget.releasePointerCapture(pid);
            }
        } catch (_) {}

        const tap = Math.abs(dx) < 52 && Math.abs(dy) < 44;
        if (tap) {
            const tapped = slideIndexFromPoint(e.clientX, e.clientY);
            if (tapped != null) setIndex(tapped);
            return;
        }

        if (Math.abs(dx) < 52) return;
        if (dx < 0) setIndex(base === SLIDE_COUNT - 1 ? 0 : base + 1);
        else setIndex(base === 0 ? SLIDE_COUNT - 1 : base - 1);
    };

    const cancelDrag = (e) => {
        const pid = dragRef.current.pointerId;
        dragRef.current.active = false;
        dragRef.current.pointerId = null;
        try {
            if (pid != null) {
                e.currentTarget.releasePointerCapture(pid);
            }
        } catch (_) {}
    };

    return (
        <div
            className="relative -mx-5 mt-6 w-[calc(100%+2.5rem)] max-w-none sm:mt-7 md:-mx-10 md:mt-8 md:w-[calc(100%+5rem)] lg:-mx-16 lg:mt-10 lg:w-[calc(100%+8rem)]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Who we are gallery"
        >
            <div
                ref={viewportRef}
                className="touch-pan-x cursor-grab overflow-hidden pt-6 pb-10 active:cursor-grabbing md:pt-10 md:pb-14"
                onPointerDown={onPointerDown}
                onPointerUp={endDrag}
                onPointerCancel={cancelDrag}
            >
                <div
                    className="flex flex-row flex-nowrap items-center"
                    style={{
                        gap: layout.gap,
                        transform: `translateX(${translateX}px)`,
                        transition: reduceMotion ? 'none' : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                        willChange: 'transform',
                    }}
                >
                    {HERO_CAROUSEL_SLIDES.map((slide, i) => {
                        const active = i === index;
                        return (
                            <div
                                key={slide.id}
                                data-who-we-are-carousel-slide={i}
                                className={`relative shrink-0 select-none ${active ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
                                style={{
                                    width: layout.slideW,
                                    height: slideHeight,
                                    opacity: active ? 1 : 0.88,
                                    transform: active ? 'scale(1)' : 'scale(0.94)',
                                    transition: reduceMotion ? 'none' : 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                                }}
                                aria-hidden={!active}
                            >
                                <div className="group relative h-full w-full overflow-hidden rounded-[1.75rem] border-[14px] border-white shadow-[0_-10px_36px_-8px_rgba(26,26,46,0.22),0_28px_60px_-28px_rgba(26,26,46,0.28)] transition-shadow duration-300 ease-out hover:shadow-[0_-12px_42px_-8px_rgba(26,26,46,0.28),0_30px_62px_-26px_rgba(26,26,46,0.34)] motion-reduce:transition-none md:rounded-[2.25rem]">
                                    <img
                                        src={slide.src}
                                        alt={active ? slide.alt : ''}
                                        className="pointer-events-none h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        draggable={false}
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                    />
                                    {active && (
                                        <div className="pointer-events-none absolute bottom-4 right-4 z-[1] max-w-[min(26rem,calc(100%-2rem))] sm:bottom-5 sm:right-5 sm:max-w-[min(26rem,calc(100%-2.5rem))]">
                                            <div className="ml-auto inline-flex max-w-full rounded-2xl bg-black/40 px-4 py-2.5 shadow-lg backdrop-blur-md">
                                                <span className="text-right text-[11px] font-semibold leading-snug tracking-tight text-white sm:text-[12px]">
                                                    {slide.locationLabel}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center gap-2 pt-4">
                {HERO_CAROUSEL_SLIDES.map((slide, i) => (
                    <button
                        key={slide.id}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index ? 'true' : undefined}
                        className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[#6366f1]' : 'w-2 bg-[#c4b5fd]/80 hover:bg-[#a78bfa]'}`}
                    />
                ))}
            </div>
        </div>
    );
}

function WhoWeAreHeader() {
    const [heroReduceMotion, setHeroReduceMotion] = useState(false);
    const [eyebrowIn, setEyebrowIn] = useState(false);
    const [typewriterLen, setTypewriterLen] = useState(0);
    const [heroRestIn, setHeroRestIn] = useState(false);
    const typeIntervalRef = useRef(null);
    const restTimeoutRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => {
            const reduce = mq.matches;
            setHeroReduceMotion(reduce);
            if (reduce) {
                setEyebrowIn(true);
                setTypewriterLen(WHO_WE_ARE_TYPEWRITER_LINE.length);
                setHeroRestIn(true);
            }
        };
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (heroReduceMotion) return undefined;
        const id = window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => setEyebrowIn(true));
        });
        return () => window.cancelAnimationFrame(id);
    }, [heroReduceMotion]);

    useEffect(() => {
        if (heroReduceMotion || !eyebrowIn) return undefined;

        const startDelay = window.setTimeout(() => {
            let i = 0;
            typeIntervalRef.current = window.setInterval(() => {
                i += 1;
                setTypewriterLen(i);
                if (i >= WHO_WE_ARE_TYPEWRITER_LINE.length) {
                    if (typeIntervalRef.current != null) {
                        window.clearInterval(typeIntervalRef.current);
                        typeIntervalRef.current = null;
                    }
                    restTimeoutRef.current = window.setTimeout(
                        () => setHeroRestIn(true),
                        WHO_WE_ARE_REST_AFTER_TYPE_MS,
                    );
                }
            }, WHO_WE_ARE_TYPEWRITER_CHAR_MS);
        }, WHO_WE_ARE_EYEBROW_TRANSITION_MS);

        return () => {
            window.clearTimeout(startDelay);
            if (typeIntervalRef.current != null) {
                window.clearInterval(typeIntervalRef.current);
                typeIntervalRef.current = null;
            }
            if (restTimeoutRef.current != null) {
                window.clearTimeout(restTimeoutRef.current);
                restTimeoutRef.current = null;
            }
        };
    }, [eyebrowIn, heroReduceMotion]);

    const showTwCursor =
        !heroReduceMotion && typewriterLen > 0 && typewriterLen < WHO_WE_ARE_TYPEWRITER_LINE.length;

    const eyebrowMotionClass = heroReduceMotion
        ? ''
        : `transition-all duration-[560ms] ease-out ${
              eyebrowIn ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
          }`;

    const heroRestMotionClass = heroReduceMotion
        ? ''
        : `transition-all duration-[780ms] ease-out ${
              heroRestIn ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
          }`;

    return (
        <section
            className="relative px-5 pb-10 pt-12 md:px-10 md:pb-14 md:pt-16 lg:px-16 lg:pb-16"
            style={{
                backgroundColor: '#faf9fb',
                backgroundImage: `
                linear-gradient(
                    180deg,
                    #faf9fb 0%,
                    rgba(250, 249, 251, 0.96) 8%,
                    rgba(255, 255, 255, 0.78) 26%,
                    rgba(255, 255, 255, 0.42) 48%,
                    rgba(255, 255, 255, 0.14) 72%,
                    transparent 100%
                ),
                linear-gradient(
                    180deg,
                    transparent 0%,
                    transparent 52%,
                    rgba(255, 255, 255, 0.28) 70%,
                    rgba(250, 249, 251, 0.82) 86%,
                    #faf9fb 100%
                ),
                radial-gradient(ellipse 95% 78% at 100% 100%, rgba(233, 213, 255, 0.28) 0%, transparent 56%),
                url("${WHO_WE_ARE_HERO_BG_IMAGE}")
            `,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="relative mx-auto max-w-[1120px]">
                {/* Eyebrow — fade in from top */}
                <div className={`mb-8 flex items-center gap-3 md:mb-10 ${eyebrowMotionClass}`}>
                    <div className="flex flex-1 items-center gap-2">
                        <div className="h-px flex-1 bg-[#7c3aed]/15" />
                        <div className="h-1 w-1 rounded-full bg-[#7c3aed]/35" />
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#a78bfa]/45 bg-white/90 px-5 py-2 font-['Manrope',system-ui,sans-serif] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d28d9] md:px-6 md:py-2.5 md:text-[12px]">
                        About Us
                    </span>
                    <div className="flex flex-1 items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-[#7c3aed]/35" />
                        <div className="h-px flex-1 bg-[#7c3aed]/15" />
                    </div>
                </div>

                {/* Heading — line 1 typewriter; line 2 fades with rest */}
                <h1
                    className="mx-auto max-w-[860px] text-center font-['Manrope',system-ui,sans-serif] text-[#1a1a2e] !mb-6 md:!mb-8"
                    aria-label="We are local experts who live there. We are Plan Like a Local"
                >
                    <WhoWeAreHeroTypewriterLine visibleLen={typewriterLen} showCursor={showTwCursor} />
                    <span
                        className={`mt-2 block text-[2.35rem] font-extrabold leading-[1.12] tracking-[-0.035em] sm:mt-2.5 sm:text-[3rem] md:mt-3 md:text-[3.65rem] md:leading-[1.08] ${heroRestMotionClass}`}
                    >
                        <span className="font-normal">We are </span>
                        <span className="text-[#514ae6]">Plan Like a Local</span>
                    </span>
                </h1>

                <div className={`${heroRestMotionClass}`}>
                    {/* Subtitle */}
                    <p className="mx-auto mb-9 max-w-[580px] text-center font-['Manrope',system-ui,sans-serif] text-[16px] leading-[1.75] text-[#666666] sm:text-[17px] md:mb-10 md:text-[18px] md:leading-[1.72]">
                        We live, breathe, and know the places we plan for — they're home to us. That's the everyday familiarity we bring to every itinerary we shape with you.
                    </p>

                    {/* CTA — hover sweep matches header nav Start Planning */}
                    <div className="mb-2 flex justify-center md:mb-3">
                        <Link
                            href="/plan"
                            className="group who-we-are-hero-start-planning inline-flex items-center gap-2.5 px-7 py-3 text-[14px] md:gap-3 md:px-8 md:py-3.5 md:text-[15px]"
                        >
                            <span className="relative z-[1] inline-flex items-center gap-2.5 md:gap-3">
                                Start Planning
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 transition-colors group-hover:bg-white/35 md:h-9 md:w-9">
                                    <ArrowForward sx={{ fontSize: 16 }} />
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`${heroRestMotionClass}`}>
                <WhoWeAreHeroCarousel />
            </div>
        </section>
    );
}

export default WhoWeAreHeader;
