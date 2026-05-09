import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowForward,
    ExploreOutlined,
    PersonPinCircleOutlined,
    TipsAndUpdatesOutlined,
} from '@mui/icons-material';
import { Link } from '@inertiajs/react';
import HowItWorks from '../../Home/components/HowItWorks.jsx';
import HomeSectionDivider from '../../Home/components/HomeSectionDivider.jsx';

/** Home page accent (WhatIsPlanLikeALocal quotes, feature orbit) */
const HOME_ORANGE = '#EA6D4F';

/** Brand purple: “Local Specialists” & “Plan Like a Local” in headings */
const SPECIALISTS_TITLE_COLOR = 'rgb(81, 74, 230)';

/** Question marquee strip — `public/images/home/stitch/who-we-are/carousel-bg.jpg` */
const WHO_WE_ARE_CAROUSEL_BG_IMAGE = '/images/home/stitch/who-we-are/carousel-bg.jpg?v=3';

const PLACEHOLDER_QUESTION_COUNT = 100;

/** Placeholder copy until real questions are wired in */
const CAROUSEL_QUESTIONS = Array.from({ length: PLACEHOLDER_QUESTION_COUNT }, (_, i) => {
    const n = i + 1;
    return {
        id: n,
        trip: `Trip idea ${n}`,
        question: `Placeholder question ${n}: example planning detail your specialist can help you figure out.`,
    };
});

const forYouBullets = [
    {
        Icon: PersonPinCircleOutlined,
        title: 'Passionate locals',
        desc: 'Specialists who live where you’re going and love it, invested in standout experiences, not armchair research.',
    },
    {
        Icon: TipsAndUpdatesOutlined,
        title: 'Up to date intel',
        desc: 'What’s actually open, how the season is playing out, and which stops deserve your day, not stale lists from six months ago.',
    },
    {
        Icon: ExploreOutlined,
        title: 'Hidden gems',
        desc: 'Neighborhood picks and side-street stops locals rely on, not the same recycled highlights every roundup rehashes.',
    },
];

function WhoWeAreFeaturesSection() {
    const introRef = useRef(null);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [inView, setInView] = useState(false);
    /** idle → questions (carousel visible) */
    const [motionPhase, setMotionPhase] = useState('idle');

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduceMotion(mq.matches);
        sync();
        mq.addEventListener('change', sync);
        return () => mq.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (reduceMotion) {
            setMotionPhase('questions');
            return undefined;
        }
        const el = introRef.current;
        if (!el) return undefined;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduceMotion]);

    useEffect(() => {
        if (reduceMotion || !inView || motionPhase !== 'idle') return undefined;
        setMotionPhase('questions');
        return undefined;
    }, [reduceMotion, inView, motionPhase]);

    const showCarousel = reduceMotion || motionPhase === 'questions';

    const questionCardStaticClass =
        'transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:duration-300 shadow-[0_14px_44px_-26px_rgba(26,26,46,0.13),0_4px_14px_-6px_rgba(234,109,79,0.08)] motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_22px_56px_-24px_rgba(234,109,79,0.16),0_20px_48px_-30px_rgba(26,26,46,0.14)]';

    const duplicatedCarousel = [...CAROUSEL_QUESTIONS, ...CAROUSEL_QUESTIONS];

    const horizontalTripQuestions = showCarousel ? (
        <div
            className="-mx-5 overflow-hidden pb-10 pt-3 md:-mx-10 md:pb-12 md:pt-4 lg:-mx-16"
            role="region"
            aria-label="Examples of planning questions"
        >
            <div
                className={`flex w-max flex-nowrap items-center gap-4 py-2 md:gap-5 md:py-3 ${reduceMotion ? '' : 'who-we-are-questions-marquee-track'}`}
                aria-hidden
            >
                {duplicatedCarousel.map(({ id, trip, question }, i) => (
                    <div
                        key={`${id}-${i}`}
                        className={`group relative w-[min(22rem,calc(100vw-3rem))] shrink-0 overflow-hidden rounded-[1.75rem] border border-[#efe9e6]/90 bg-gradient-to-br from-white via-white to-[#fffaf7] px-5 py-5 text-left ring-1 ring-white/90 sm:w-[288px] md:w-[300px] md:px-6 md:py-6 ${questionCardStaticClass}`}
                    >
                        <div
                            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#EA6D4F]/[0.09] blur-3xl transition-opacity duration-500 group-hover:opacity-100 md:h-40 md:w-40"
                            aria-hidden
                        />
                        <div
                            className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-violet-200/25 blur-3xl"
                            aria-hidden
                        />
                        <span
                            className="pointer-events-none absolute right-3 top-3 font-['Fraunces',Georgia,serif] text-[2.75rem] leading-none text-[#EA6D4F]/[0.18] transition-colors duration-300 group-hover:text-[#EA6D4F]/[0.26] md:right-4 md:top-4 md:text-[3.25rem]"
                            aria-hidden
                        >
                            &ldquo;
                        </span>
                        <div className="relative z-[1]">
                            <span className="mb-3 inline-flex items-center rounded-full bg-gradient-to-r from-[#EA6D4F]/14 to-[#EA6D4F]/[0.06] px-3.5 py-1.5 font-['Manrope',system-ui,sans-serif] text-[10px] font-bold uppercase tracking-[0.14em] text-[#c44830] ring-1 ring-[#EA6D4F]/20 md:text-[11px]">
                                {trip}
                            </span>
                            <p className="font-['Manrope',system-ui,sans-serif] text-[14px] font-medium leading-[1.55] tracking-[-0.015em] text-[#2c2c40] md:text-[15px] md:leading-[1.58]">
                                {question}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;

    const horizontalPlaceholder =
        !reduceMotion && motionPhase === 'idle' ? (
            <div className="min-h-[168px] md:min-h-[158px]" aria-hidden />
        ) : null;

    return (
        <div ref={introRef}>
            {/* Question callouts - horizontal row above section */}
            {(horizontalTripQuestions ?? horizontalPlaceholder) && (
                <div className="relative mb-10 overflow-x-hidden px-5 pb-10 pt-10 md:mb-14 md:px-10 md:pb-12 md:pt-14 lg:px-16">
                    {/* Image layer (separate from tint so the photo reliably paints) */}
                    <div
                        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url("${WHO_WE_ARE_CAROUSEL_BG_IMAGE}")` }}
                        aria-hidden
                    />
                    {/* Purple tint — kept moderate so the photograph stays visible */}
                    <div
                        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#10081c]/78 via-[#130a24]/68 to-[#0a0514]/82"
                        aria-hidden
                    />
                    <div className="relative z-[2]">
                    <h2 className="mx-auto mb-6 max-w-[720px] text-center capitalize !font-['Inter',system-ui,sans-serif] text-[1.125rem] font-semibold leading-snug tracking-[-0.02em] text-[#ece9f7] md:mb-8 md:text-[1.35rem]">
                        The kinds of questions our{' '}
                        <span className="text-[#b9a9ff]">Local Specialists</span> get{' '}
                        <span className="italic capitalize">all the time</span>
                    </h2>
                    {horizontalTripQuestions ?? horizontalPlaceholder}
                    </div>
                </div>
            )}

            <section className="bg-[#faf9fb] px-5 pb-4 pt-10 md:px-10 md:pb-5 md:pt-12 lg:px-16 lg:pt-14">
                <div className="mx-auto max-w-[1120px]">
                {/* Intro - Why Us + headline */}
                <div className="mx-auto max-w-[720px] text-center">
                    <p className="ibrow mb-4 block min-h-[1.4em] !text-sm !leading-snug !tracking-[0.08em] sm:!text-base md:!text-lg !text-[#EA6D4F]">
                        Why Us?
                    </p>

                    <h2 className="mb-5 font-['Manrope',system-ui,sans-serif] text-[2rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#1a1a2e] sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3rem]">
                        Who is{' '}
                        <span style={{ color: SPECIALISTS_TITLE_COLOR }}>Plan Like a Local</span> for?
                    </h2>
                    <p className="text-[17px] leading-[1.72] text-[#666666] sm:text-[19px] md:text-[21px] md:leading-[1.68] lg:text-[22px]">
                        If you want Utah planned by a local who hikes the Mighty 5 every weekend—or LA by a blogger who knows
                        Hollywood's best-kept secrets—{' '}
                        <span className="font-semibold text-[#EA6D4F]">this is for you</span>.
                    </p>
                </div>
                </div>
            </section>

            <section className="bg-[#faf9fb] px-5 pb-8 pt-5 md:px-10 md:pb-12 md:pt-6 lg:px-16">
                <div className="mx-auto max-w-[1120px]">
                {/* Block 1 - bullets */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:mb-10 md:gap-5">
                    {forYouBullets.map(({ Icon, title, desc }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center rounded-[1.35rem] border border-[#ece8f4] bg-white/80 p-6 text-center shadow-[0_12px_36px_-28px_rgba(26,26,46,0.12)] ring-1 ring-[#EA6D4F]/[0.08] backdrop-blur-sm md:p-7"
                        >
                            <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EA6D4F]/10 md:h-14 md:w-14">
                                <Icon sx={{ fontSize: 28, color: HOME_ORANGE, opacity: 0.95 }} />
                            </div>
                            <h3 className="mb-2 capitalize font-['Manrope',system-ui,sans-serif] text-[17px] font-bold tracking-[-0.02em] text-[#1a1a2e] sm:text-[18px] md:mb-2.5 md:text-[19px] lg:text-[20px]">
                                {title}
                            </h3>
                            <p className="text-[15px] leading-[1.68] text-[#5a6472] sm:text-[16px] md:text-[17px] md:leading-[1.72] lg:text-[18px]">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-4 md:pt-6">
                    <Link
                        href="/plan"
                        className="nav-cta-start-planning group inline-flex items-center text-white text-xs px-3 py-2 xl:text-sm xl:px-5 xl:py-2.5"
                    >
                        <span className="relative z-[1] inline-flex items-center gap-1 lg:gap-1.5">
                            Start Planning
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/35 transition-colors group-hover:bg-white/35 lg:h-6 lg:w-6">
                                <ArrowForward
                                    sx={{
                                        fontSize: 11,
                                        '@media (min-width: 1024px)': { fontSize: 13 },
                                    }}
                                />
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </section>

        <HomeSectionDivider />

        <HowItWorks />

        </div>
    );
}

export default WhoWeAreFeaturesSection;
