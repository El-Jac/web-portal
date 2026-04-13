import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {processSteps} from './homeData';
import BlendedBackground from '@/Components/BlendedBackground';

const WHAT_WE_DO_TITLE = 'What We Do';
const WHAT_WE_DO_TYPE_MS = 46;
/** Pause after title finishes typing, before headline + subcopy reveal */
const WHAT_WE_DO_CONTENT_AFTER_TYPE_MS = 400;
const WHAT_WE_DO_CONTENT_REVEAL_MS = 1050;

const HowItWorks = () => {
    const [sectionInView, setSectionInView] = useState(false);
    const [titleTyped, setTitleTyped] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const headerRef = useRef(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mqReduce.matches) {
            setReduceMotion(true);
            setSectionInView(true);
            setTitleTyped(WHAT_WE_DO_TITLE);
            setContentVisible(true);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || sectionInView || reduceMotion) {
            return undefined;
        }
        const el = headerRef.current;
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
            {root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.18},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [sectionInView, reduceMotion]);

    useEffect(() => {
        if (!sectionInView || reduceMotion) {
            return undefined;
        }
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTitleTyped(WHAT_WE_DO_TITLE.slice(0, i));
            if (i >= WHAT_WE_DO_TITLE.length) {
                clearInterval(id);
            }
        }, WHAT_WE_DO_TYPE_MS);
        return () => clearInterval(id);
    }, [sectionInView, reduceMotion]);

    useEffect(() => {
        if (reduceMotion || !sectionInView) {
            return undefined;
        }
        if (titleTyped !== WHAT_WE_DO_TITLE) {
            return undefined;
        }
        const t = setTimeout(() => {
            setContentVisible(true);
        }, WHAT_WE_DO_CONTENT_AFTER_TYPE_MS);
        return () => clearTimeout(t);
    }, [titleTyped, sectionInView, reduceMotion]);

    const showCursor =
        sectionInView && !reduceMotion && titleTyped.length < WHAT_WE_DO_TITLE.length;

    return (
        <BlendedBackground
            className="z-30 bg-[#f9f9f9] px-5 pt-12 pb-14 md:px-10 md:pt-14 md:pb-16 lg:px-16"
            image="/images/home/stitch/what-we-do-bg.jpg"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <div className="mx-auto max-w-[1120px]">
                <div ref={headerRef} className="mb-14 text-center md:mb-18">
                    <span
                        className="ibrow block min-h-[1.4em] pb-2 text-center md:pb-3"
                        aria-label={WHAT_WE_DO_TITLE}
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
                                : `opacity ${WHAT_WE_DO_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
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
                                    : `transform ${WHAT_WE_DO_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                            }}
                        >
                            <h2 className="quotes mx-auto">
                                We Make Travel Planning
                                <br/>
                                <span className="font-light italic text-[#EA6D4F]">Personalized.</span>
                            </h2>
                            <p className="mx-auto max-w-[560px] text-[15px] leading-[1.7] text-[#3f484a] md:text-[17px]">
                                We bridge the gap between travelers and locals, turning ideas into thoughtfully
                                planned journeys tailored to you.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8"
                    style={{
                        opacity: contentVisible ? 1 : 0,
                        transition: reduceMotion
                            ? 'none'
                            : `opacity ${WHAT_WE_DO_CONTENT_REVEAL_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                        transitionDelay: reduceMotion || !contentVisible ? '0ms' : '180ms',
                    }}
                >
                    {processSteps.map(({step, title, description, icon: Icon}) => (
                        <article
                            key={step}
                            className="group flex h-full flex-col rounded-3xl border border-slate-200/70 bg-white/95 p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_14px_40px_-18px_rgba(15,23,42,0.1)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-200 hover:bg-white hover:shadow-[0_8px_32px_-14px_rgba(15,23,42,0.14),0_20px_48px_-28px_rgba(50,96,254,0.08)] sm:p-7"
                        >
                            <div className="mb-5 flex h-[5.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-white to-[#f3f6ff] ring-1 ring-slate-200/80 transition-[box-shadow,transform] duration-500 group-hover:ring-[#3260FE]/20 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_10px_28px_-14px_rgba(50,96,254,0.18)]">
                                <span className="inline-flex transition-transform duration-300 ease-out group-hover:scale-[1.06]">
                                    <Icon sx={{fontSize: 42, color: '#3260FE'}}/>
                                </span>
                            </div>
                            <div className="mb-3.5 inline-flex w-fit items-center rounded-full bg-[#EA6D4F]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#c9543c]">
                                {step}
                            </div>
                            <h3 className="mb-3 text-lg font-semibold leading-snug tracking-tight text-slate-900 md:text-[1.15rem]">
                                {title}
                            </h3>
                            <p className="text-[13px] leading-[1.65] text-slate-600 antialiased">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </BlendedBackground>
    );
};

export default HowItWorks;
