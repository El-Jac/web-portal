import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Link, router} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';

const ACCENT_LINE1 = 'planned by real';
const ACCENT_LINE2 = 'people who live there.';
const TYPEWRITER_CHAR_MS = 42;
const TYPEWRITER_GAP_MS = 260;
const TYPEWRITER_START_MS = 560;

const HERO_INNER_PARALLAX = 0.13;

function HomePageHeading() {
    const [line1, setLine1] = useState('');
    const [line2, setLine2] = useState('');
    const [done, setDone] = useState(false);
    const timersRef = useRef({timeouts: [], intervals: []});
    const heroInnerParallaxRef = useRef(null);
    const parallaxRafRef = useRef(0);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setLine1(ACCENT_LINE1);
            setLine2(ACCENT_LINE2);
            setDone(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const clear = () => {
            timersRef.current.timeouts.forEach(clearTimeout);
            timersRef.current.intervals.forEach(clearInterval);
            timersRef.current.timeouts = [];
            timersRef.current.intervals = [];
        };

        const start = setTimeout(() => {
            let i = 0;
            const id1 = setInterval(() => {
                i += 1;
                setLine1(ACCENT_LINE1.slice(0, i));
                if (i >= ACCENT_LINE1.length) {
                    clearInterval(id1);
                    const gap = setTimeout(() => {
                        let j = 0;
                        const id2 = setInterval(() => {
                            j += 1;
                            setLine2(ACCENT_LINE2.slice(0, j));
                            if (j >= ACCENT_LINE2.length) {
                                clearInterval(id2);
                                setDone(true);
                            }
                        }, TYPEWRITER_CHAR_MS);
                        timersRef.current.intervals.push(id2);
                    }, TYPEWRITER_GAP_MS);
                    timersRef.current.timeouts.push(gap);
                }
            }, TYPEWRITER_CHAR_MS);
            timersRef.current.intervals.push(id1);
        }, TYPEWRITER_START_MS);
        timersRef.current.timeouts.push(start);

        return clear;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return undefined;
        }

        const el = heroInnerParallaxRef.current;
        if (!el) {
            return undefined;
        }

        const update = () => {
            parallaxRafRef.current = 0;
            const node = heroInnerParallaxRef.current;
            if (!node) {
                return;
            }
            const y = -window.scrollY * HERO_INNER_PARALLAX;
            node.style.transform = `translate3d(0, ${y}px, 0)`;
        };

        const onScroll = () => {
            if (parallaxRafRef.current) {
                return;
            }
            parallaxRafRef.current = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, {passive: true});
        update();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (parallaxRafRef.current) {
                cancelAnimationFrame(parallaxRafRef.current);
            }
            el.style.transform = '';
        };
    }, []);

    const showCursorOnLine1 = !done && line1.length < ACCENT_LINE1.length;
    const showCursorOnLine2 = !done && line1.length >= ACCENT_LINE1.length;

    return (
    <header className="relative flex min-h-[max(90vh,700px)] items-center overflow-hidden md:min-h-[max(100vh,850px)]">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#f9f9f9]">
            <picture className="block h-full w-full">
                <source srcSet="/images/home/stitch/hero.webp?v=20" type="image/webp"/>
                <img
                    src="/images/home/stitch/hero.jpg?v=20"
                    alt="Scenic travel photograph"
                    className="hero-home-media h-full w-full object-cover object-right md:object-[52%_center]"
                />
            </picture>
            <div className="hero-overlay absolute inset-0"/>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] pl-8 pr-5 py-24 md:px-10 lg:py-0 lg:pl-[65px] lg:pr-0">
            <div className="hero-home-inner max-w-[540px] pt-16 sm:pt-20 md:pt-0 lg:max-w-[min(580px,100%)] xl:max-w-[min(640px,100%)]">
                <div
                    ref={heroInnerParallaxRef}
                    className="hero-home-inner-parallax will-change-transform"
                >
                    <div className="hero-home-badge mb-6 inline-flex items-center rounded-full px-6 py-1.5 text-white backdrop-blur-md md:mb-7 md:px-9 md:py-2">
                        #1 Planning Hub for your Trips
                    </div>

                    <h1 className="hero-home-heading text-[2.75rem] leading-[1.06] text-white md:text-[#0f1419] sm:text-[3.25rem] sm:leading-[1.05] md:text-[5.2rem] md:leading-[1.02]">
                        <span className="hero-home-heading-primary block">
                            Your personal
                            <br/>
                            itinerary,
                        </span>
                        <span className="hero-home-heading-accent-wrap block">
                            <span className="hero-home-accent-sr">
                                {ACCENT_LINE1} {ACCENT_LINE2}
                            </span>
                            <span className="hero-home-typewriter" aria-hidden="true">
                                <span className="hero-home-accent hero-home-accent-line relative block">
                                    <span
                                        className="invisible block w-full select-none"
                                        aria-hidden="true"
                                    >
                                        {ACCENT_LINE1}
                                    </span>
                                    <span className="hero-home-accent-typed absolute inset-x-0 top-0 z-[1] block">
                                        {line1}
                                        {showCursorOnLine1 ? (
                                            <span className="hero-home-typewriter-cursor">|</span>
                                        ) : null}
                                    </span>
                                </span>
                                <span className="hero-home-accent hero-home-accent-line relative block">
                                    <span
                                        className="invisible block w-full select-none"
                                        aria-hidden="true"
                                    >
                                        {ACCENT_LINE2}
                                    </span>
                                    <span className="hero-home-accent-typed absolute inset-x-0 top-0 z-[1] block">
                                        {line2}
                                        {showCursorOnLine2 ? (
                                            <span className="hero-home-typewriter-cursor">|</span>
                                        ) : null}
                                    </span>
                                </span>
                            </span>
                        </span>
                    </h1>

                    <div
                        className={`hero-home-bubble mb-5 md:mb-6${done ? ' hero-home-bubble--active' : ''}`}
                        aria-hidden={!done}
                    >
                        <div className={`hero-home-bubble-inner${done ? ' hero-home-bubble-inner--in' : ''}`}>
                            <p className="hero-home-lede">
                                Connect with local experts to plan your perfect trip. Your priorities, your pace, your local guide.
                            </p>
                            <span className="hero-home-bubble-tail" aria-hidden="true"/>
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:gap-7">
                        <button
                            onClick={() => router.post('/plans', {})}
                            className="hero-cta-primary inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                        >
                            <span className="relative z-[1] inline-flex items-center">
                                Start Planning
                                <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                            </span>
                        </button>
                        <Link
                            href="/destinations"
                            className="hero-home-cta-secondary group inline-flex items-center gap-4 rounded-full py-2.5 pl-2 pr-4 text-white transition-colors hover:bg-white/12 md:text-[#3260FE] md:hover:bg-[rgba(50,96,254,0.08)] sm:py-3 sm:pl-2.5 sm:pr-5 md:gap-5"
                        >
                            <span className="h-px w-10 bg-white/55 transition-all duration-300 group-hover:w-[3.25rem] group-hover:bg-white/80 sm:w-12 sm:group-hover:w-[3.75rem] md:bg-[#3260FE]/45 md:group-hover:bg-[#3260FE]/60"/>
                            View Destinations
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-none">
            <svg className="relative block h-[60px] w-full md:h-[120px]" preserveAspectRatio="none"
                 viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                    <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fafafa"/>
                        <stop offset="100%" stopColor="#f9f9f9"/>
                    </linearGradient>
                </defs>
                <path
                    d="M0,20 C360,104 840,104 1200,20 L1200,120 L0,120 Z"
                    fill="url(#heroCurveFill)"
                />
            </svg>
        </div>
    </header>
    );
}

export default HomePageHeading;
