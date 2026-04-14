import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';

const CTA_IMAGE = '/images/home/stitch/cta-footer.jpg';

const ReadyToPlanSection = () => {
    const sectionRef = useRef(null);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [reveal, setReveal] = useState(false);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) {
            setReduceMotion(true);
            setReveal(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || reduceMotion || reveal) {
            return undefined;
        }
        const el = sectionRef.current;
        if (!el) {
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setReveal(true);
                    io.disconnect();
                }
            },
            {root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.12},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduceMotion, reveal]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full max-w-none overflow-hidden bg-[#f9f8f8] pb-16 pt-6 md:pb-24 md:pt-12"
            style={{
                opacity: reveal ? 1 : 0,
                transform: reduceMotion || reveal ? 'translateY(0)' : 'translateY(1.25rem)',
                transition: reduceMotion ? 'none' : 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
        >
            {/* Main panel */}
            <div className="relative z-[1] w-full px-4 pb-5 sm:px-6 md:px-8 lg:px-10">
                <div className="mx-auto w-full max-w-[min(100%,1400px)] rounded-[1.5rem] border border-white/80 bg-white/[0.76] shadow-[0_2px_8px_rgba(15,23,42,0.04),0_36px_90px_-36px_rgba(15,23,42,0.14),inset_0_1px_0_0_rgba(255,255,255,0.9)] ring-1 ring-[#3260FE]/[0.06] backdrop-blur-xl sm:rounded-[1.75rem] md:rounded-[2rem]">
                    <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-2 md:gap-0">
                        <div className="relative z-10 flex flex-col justify-center rounded-t-[1.5rem] border-b border-white/[0.06] bg-gradient-to-br from-[#1e222d] via-[#171a22] to-[#12151a] px-6 py-11 text-center sm:rounded-t-[1.75rem] md:order-1 md:rounded-t-none md:rounded-tl-[2rem] md:rounded-bl-[2rem] md:border-b-0 md:px-12 md:py-16 md:pl-14 md:pr-10 md:shadow-[6px_6px_20px_-10px_rgba(0,0,0,0.5),12px_10px_44px_-20px_rgba(15,23,42,0.44),20px_14px_84px_-34px_rgba(50,96,254,0.1)] md:text-left lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-14">
                            <p className="mb-3 inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/10 bg-white/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:px-4 sm:py-2 sm:text-[12px] md:mb-4 md:self-start">
                                <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#EA6D4F]" aria-hidden/>
                                We&apos;re here to help
                            </p>
                            <h2 className="mb-5 text-[2.15rem] font-extrabold leading-[1.1] tracking-[-0.04em] text-white sm:text-[2.65rem] md:mb-6 md:text-[3rem] md:leading-[1.06] lg:text-[3.35rem] xl:text-[3.55rem]">
                                <span className="block">Ready to</span>
                                <span className="mt-1 block font-light italic text-[#ff9a82] sm:mt-1.5">
                                    Plan Like a Local?
                                </span>
                            </h2>
                            <p className="mx-auto mb-3 max-w-[28rem] text-[16px] font-medium leading-[1.65] text-white/[0.82] md:mx-0 md:mb-4 md:max-w-[26rem] md:text-[17px] lg:text-[1.0625rem]">
                                Wherever you&apos;re dreaming of going, we&apos;ll connect you with someone who truly knows
                                that place — so your trip feels personal, calm, and completely{' '}
                                <span className="text-white">yours</span>.
                            </p>
                            <p className="mx-auto mb-9 max-w-[28rem] text-[14px] leading-relaxed text-white/60 md:mx-0 md:mb-10 md:max-w-[26rem]">
                                No guesswork, no generic lists — just real insight from locals who love where they live.
                            </p>
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:items-center md:justify-start">
                                <Link
                                    href="/plan"
                                    className="hero-cta-primary hero-cta-primary--bright-hover inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                                >
                                    <span className="relative z-[1] inline-flex items-center">
                                        Start planning
                                        <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                                    </span>
                                </Link>
                                <span className="hidden text-[13px] text-white/35 sm:inline" aria-hidden>
                                    or
                                </span>
                                <Link
                                    href="/destinations"
                                    className="text-[14px] font-semibold text-[#9ec0ff] underline decoration-[#9ec0ff]/45 decoration-2 underline-offset-[5px] transition-colors hover:text-white hover:decoration-white/50"
                                >
                                    Browse destinations first
                                </Link>
                            </div>
                        </div>

                        <div className="relative z-0 min-h-[240px] overflow-hidden rounded-b-[1.5rem] sm:rounded-b-[1.75rem] md:order-2 md:h-full md:min-h-[min(24rem,52vh)] md:rounded-b-none md:rounded-br-[2rem] md:rounded-tr-[2rem]">
                            <img
                                src={CTA_IMAGE}
                                alt=""
                                className="h-full min-h-[240px] w-full object-cover md:absolute md:inset-0 md:min-h-full"
                                loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/[0.05]"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReadyToPlanSection;
