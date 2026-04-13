import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Link, router} from '@inertiajs/react';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import DestinationCard from './DestinationCard';

const DESTINATIONS_TITLE = 'Destinations';
const DESTINATIONS_TYPE_MS = 46;
const DESTINATIONS_CONTENT_AFTER_TYPE_MS = 400;
const DESTINATIONS_CONTENT_REVEAL_MS = 1050;
const DESTINATIONS_GRID_REVEAL_DELAY_MS = 180;

const arrowBtnClass =
    'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-[#1a1c1c] shadow-[0_2px_10px_-2px_rgba(15,23,42,0.14),0_1px_3px_rgba(15,23,42,0.08)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[rgba(29,78,216,0.14)] hover:text-[#1d4ed8] hover:shadow-[0_8px_28px_-6px_rgba(29,78,216,0.42)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-[#1a1c1c] disabled:hover:shadow-[0_2px_10px_-2px_rgba(15,23,42,0.14),0_1px_3px_rgba(15,23,42,0.08)]';

const DestinationsPageArrows = ({currentPage, lastPage, goToPage, className = ''}) => {
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < lastPage;
    return (
        <div
            className={`hidden shrink-0 gap-4 sm:flex ${className}`}
            role="group"
            aria-label="Browse destination pages"
        >
            <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={!hasPrev}
                className={arrowBtnClass}
            >
                <ArrowBack sx={{fontSize: 18}}/>
            </button>
            <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={!hasNext}
                className={arrowBtnClass}
            >
                <ArrowForward sx={{fontSize: 18}}/>
            </button>
        </div>
    );
};

const DestinationsSection = ({destinations = [], pagination = {}}) => {
    const hasDestinations = destinations && destinations.length > 0;

    const [sectionInView, setSectionInView] = useState(false);
    const [titleTyped, setTitleTyped] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    /** Whole section — observe this so scrolling up triggers when cards enter, not only the header */
    const sectionRef = useRef(null);

    const {current_page = 1, last_page = 1} = pagination;

    const goToPage = (page) => {
        router.get('/', {page}, {preserveScroll: true, preserveState: true});
    };

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mqReduce.matches) {
            setReduceMotion(true);
            setSectionInView(true);
            setTitleTyped(DESTINATIONS_TITLE);
            setContentVisible(true);
        }
    }, []);

    useEffect(() => {
        if (!hasDestinations || reduceMotion || sectionInView) {
            return undefined;
        }
        const el = sectionRef.current;
        if (!el) {
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSectionInView(true);
                    io.disconnect();
                }
            },
            {root: null, rootMargin: '0px', threshold: 0},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [hasDestinations, sectionInView, reduceMotion]);

    useEffect(() => {
        if (!hasDestinations || !sectionInView || reduceMotion) {
            return undefined;
        }
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTitleTyped(DESTINATIONS_TITLE.slice(0, i));
            if (i >= DESTINATIONS_TITLE.length) {
                clearInterval(id);
            }
        }, DESTINATIONS_TYPE_MS);
        return () => clearInterval(id);
    }, [hasDestinations, sectionInView, reduceMotion]);

    useEffect(() => {
        if (!hasDestinations || reduceMotion || !sectionInView) {
            return undefined;
        }
        if (titleTyped !== DESTINATIONS_TITLE) {
            return undefined;
        }
        const t = setTimeout(() => {
            setContentVisible(true);
        }, DESTINATIONS_CONTENT_AFTER_TYPE_MS);
        return () => clearTimeout(t);
    }, [hasDestinations, titleTyped, sectionInView, reduceMotion]);

    const showCursor =
        hasDestinations &&
        sectionInView &&
        !reduceMotion &&
        titleTyped.length < DESTINATIONS_TITLE.length;

    if (!hasDestinations) {
        return null;
    }

    return (
        <section ref={sectionRef} className="relative w-full bg-[#f9f9f9] px-5 py-18 md:px-10 md:py-24 lg:px-16">
            <div className="mx-auto max-w-[1120px]">
                <div className="mb-8 md:mb-10">
                    <span
                        className="ibrow block min-h-[1.4em] pb-2 md:pb-3"
                        aria-label={DESTINATIONS_TITLE}
                    >
                        <span aria-hidden="true">
                            {titleTyped}
                            {showCursor ? (
                                <span className="who-we-are-typewriter-cursor">|</span>
                            ) : null}
                        </span>
                    </span>
                    <div
                        aria-hidden={!contentVisible}
                        style={{
                            opacity: contentVisible ? 1 : 0,
                            transition: reduceMotion
                                ? 'none'
                                : `opacity ${DESTINATIONS_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                            pointerEvents: contentVisible ? 'auto' : 'none',
                        }}
                    >
                        <div
                            style={{
                                transform: contentVisible
                                    ? 'translate3d(0, 0, 0)'
                                    : 'translate3d(0, 1.75rem, 0)',
                                transition: reduceMotion
                                    ? 'none'
                                    : `transform ${DESTINATIONS_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                            }}
                        >
                            <div className="max-w-[620px]">
                                <h2 className="quotes !mb-0">
                                    Our{' '}
                                    <span className="mr-1.5 inline-block font-light italic text-[#EA6D4F] md:mr-2">
                                        Most Popular
                                    </span>{' '}
                                    Travel
                                    Destinations
                                </h2>
                            </div>
                            <div className="mt-4 flex w-full flex-col items-stretch gap-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                <p className="max-w-[470px] text-[14px] leading-relaxed text-[#3f484a] md:text-[16px]">
                                    Explore cities, towns, and hidden gems loved by travelers.
                                </p>
                                <DestinationsPageArrows
                                    currentPage={current_page}
                                    lastPage={last_page}
                                    goToPage={goToPage}
                                    className="w-full justify-end sm:ml-auto sm:w-auto sm:shrink-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="relative w-full"
                    style={{
                        opacity: contentVisible ? 1 : 0,
                        transition: reduceMotion
                            ? 'none'
                            : `opacity ${DESTINATIONS_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                        transitionDelay: reduceMotion || !contentVisible ? '0ms' : `${DESTINATIONS_GRID_REVEAL_DELAY_MS}ms`,
                    }}
                >
                    <div
                        className="hide-scrollbar grid auto-cols-[88vw] grid-flow-col gap-5 overflow-x-auto pb-8 sm:auto-cols-[minmax(0,22rem)] lg:grid-flow-row lg:grid-cols-3 lg:auto-cols-auto lg:overflow-visible">
                        {destinations.map((destination) => (
                            <DestinationCard key={destination.id} destination={destination}/>
                        ))}
                    </div>

                    <div
                        className="pointer-events-none absolute bottom-8 right-0 top-0 hidden w-28 bg-gradient-to-l from-[#f9f9f9] to-transparent md:block lg:hidden"/>
                </div>

                <div
                    className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    style={{
                        opacity: contentVisible ? 1 : 0,
                        transition: reduceMotion
                            ? 'none'
                            : `opacity ${DESTINATIONS_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                        transitionDelay: reduceMotion || !contentVisible ? '0ms' : `${DESTINATIONS_GRID_REVEAL_DELAY_MS}ms`,
                    }}
                >
                    <Link
                        href="/destinations"
                        className="hero-cta-primary hero-cta-primary--dark inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                    >
                        <span className="relative z-[1] inline-flex items-center">
                            Explore All Destinations
                            <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                        </span>
                    </Link>
                    <DestinationsPageArrows
                        currentPage={current_page}
                        lastPage={last_page}
                        goToPage={goToPage}
                        className="w-full justify-end sm:w-auto sm:shrink-0"
                    />
                </div>
            </div>
        </section>
    );
};

export default DestinationsSection;
