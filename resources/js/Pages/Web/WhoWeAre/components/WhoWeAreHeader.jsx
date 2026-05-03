import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowForward, AutoAwesome } from '@mui/icons-material';
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
            className="relative -mx-5 mt-12 w-[calc(100%+2.5rem)] max-w-none sm:mt-14 md:-mx-10 md:mt-16 md:w-[calc(100%+5rem)] lg:-mx-16 lg:mt-20 lg:w-[calc(100%+8rem)]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Who we are gallery"
        >
            <div
                ref={viewportRef}
                className="touch-pan-x cursor-grab overflow-hidden pb-1 active:cursor-grabbing"
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
                                <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] shadow-[0_28px_60px_-28px_rgba(26,26,46,0.28)] ring-1 ring-black/[0.06] md:rounded-[2.25rem]">
                                    <img
                                        src={slide.src}
                                        alt={active ? slide.alt : ''}
                                        className="pointer-events-none h-full w-full object-cover"
                                        draggable={false}
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                    />
                                    {active && (
                                        <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-[1] sm:bottom-5 sm:left-5 sm:right-5">
                                            <div className="inline-flex max-w-full rounded-2xl border border-white/95 bg-black/40 px-4 py-2.5 shadow-lg backdrop-blur-md sm:max-w-[min(100%,26rem)]">
                                                <span className="text-left text-[11px] font-semibold leading-snug tracking-tight text-white sm:text-[12px]">
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

const WhoWeAreHeader = () => (
    <section
        className="relative px-5 pb-10 pt-12 md:px-10 md:pb-14 md:pt-16 lg:px-16 lg:pb-16"
        style={{
            background: `
                        radial-gradient(ellipse 88% 78% at 100% 100%, rgba(233, 213, 255, 0.56) 0%, transparent 56%),
                        radial-gradient(ellipse 62% 48% at 92% 96%, rgba(196, 181, 253, 0.42) 0%, transparent 52%),
                        radial-gradient(ellipse 72% 52% at 6% 94%, rgba(252, 231, 243, 0.42) 0%, transparent 48%),
                        linear-gradient(180deg, #faf9fb 0%, #ffffff 55%, #ffffff 100%)
                    `,
        }}
    >
        <div className="relative mx-auto max-w-[1120px]">
            {/* Eyebrow with extending lines */}
            <div className="mb-8 flex items-center gap-3 md:mb-10">
                <div className="flex flex-1 items-center gap-2">
                    <div className="h-px flex-1 bg-[#7c3aed]/15" />
                    <div className="h-1 w-1 rounded-full bg-[#7c3aed]/35" />
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#a78bfa]/45 bg-white/90 px-5 py-2 font-['Manrope',system-ui,sans-serif] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6d28d9] md:gap-2.5 md:px-6 md:py-2.5 md:text-[12px]">
                    <AutoAwesome sx={{ fontSize: 13 }} />
                    About Us
                </span>
                <div className="flex flex-1 items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-[#7c3aed]/35" />
                    <div className="h-px flex-1 bg-[#7c3aed]/15" />
                </div>
            </div>

            {/* Heading — Manrope (explicit; matches site UI type) */}
            <h1 className="mx-auto max-w-[820px] text-center font-['Manrope',system-ui,sans-serif] text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#1a1a2e] sm:text-[3rem] md:text-[3.65rem] md:leading-[1.06] !mb-6 md:!mb-8">
                Discover Our Mission and Values in <span className="text-[#312e81]">Local Travel</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-9 max-w-[580px] text-center font-['Manrope',system-ui,sans-serif] text-[16px] leading-[1.75] text-[#666666] sm:text-[17px] md:mb-10 md:text-[18px] md:leading-[1.72]">
                We are dedicated to providing exceptional travel experiences through a compassionate, personalised approach built on genuine local expertise.
            </p>

            {/* CTA — hover sweep matches header nav Start Planning */}
            <div className="mb-5 flex justify-center md:mb-8">
                <Link
                    href="/plan"
                    className="group who-we-are-hero-start-planning inline-flex items-center gap-3 px-9 py-4 text-[15px] md:px-10 md:py-[1.05rem] md:text-[16px]"
                >
                    <span className="relative z-[1] inline-flex items-center gap-3">
                        Start Planning
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 transition-colors group-hover:bg-white/35 md:h-10 md:w-10">
                            <ArrowForward sx={{ fontSize: 18 }} />
                        </span>
                    </span>
                </Link>
            </div>
        </div>

        <WhoWeAreHeroCarousel />
    </section>
);

export default WhoWeAreHeader;
