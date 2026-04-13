import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {processSteps} from './homeData';
import BlendedBackground from '@/Components/BlendedBackground';

const WHAT_WE_DO_TITLE = 'What We Do';
const WHAT_WE_DO_TYPE_MS = 46;
/** Pause after title finishes typing, before headline + subcopy reveal */
const WHAT_WE_DO_CONTENT_AFTER_TYPE_MS = 400;
const WHAT_WE_DO_CONTENT_REVEAL_MS = 1050;
const CARD_FLIP_MS = 720;
const CARD_FLIP_STAGGER_MS = 95;
const CARD_FLIP_BASE_DELAY_MS = 200;

const HowItWorks = () => {
    const [sectionInView, setSectionInView] = useState(false);
    const [titleTyped, setTitleTyped] = useState('');
    const [contentVisible, setContentVisible] = useState(false);
    const [cardsInView, setCardsInView] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const headerRef = useRef(null);
    const cardsGridRef = useRef(null);

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
        if (typeof window === 'undefined' || cardsInView) {
            return undefined;
        }
        const el = cardsGridRef.current;
        if (!el) {
            return undefined;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCardsInView(true);
                    io.disconnect();
                }
            },
            {root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12},
        );
        io.observe(el);
        return () => io.disconnect();
    }, [cardsInView]);

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
            className="z-30 bg-[#f9f9f9] px-5 pt-10 pb-14 md:px-10 md:pt-12 md:pb-16 lg:px-16"
            image="/images/home/stitch/what-we-do-bg.jpg"
            backgroundSize="cover"
            backgroundPosition="center"
        >
            <div className="mx-auto max-w-[1120px]">
                <div ref={headerRef} className="mb-12 text-center md:mb-16">
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
                            <h2 className="quotes mx-auto !mb-6 md:!mb-7">
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
                    ref={cardsGridRef}
                    className="grid grid-cols-1 gap-5 overflow-visible sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5 xl:gap-6"
                    style={{perspective: '1100px'}}
                >
                    {processSteps.map(({step, title, description, image}, index) => {
                        const revealed = reduceMotion || cardsInView;
                        const delay =
                            reduceMotion || !cardsInView
                                ? 0
                                : CARD_FLIP_BASE_DELAY_MS + index * CARD_FLIP_STAGGER_MS;
                        const easeFlip = 'cubic-bezier(0.34, 1.12, 0.45, 1)';
                        const easeFade = 'cubic-bezier(0.22, 1, 0.36, 1)';
                        return (
                            <div
                                key={step}
                                className="h-full min-h-0 [transform-style:preserve-3d]"
                                style={{
                                    opacity: revealed ? 1 : 0,
                                    transform: revealed ? 'rotateY(0deg) translateZ(0)' : 'rotateY(-88deg) translateZ(-12px)',
                                    transformOrigin: 'center center',
                                    transition: reduceMotion
                                        ? 'none'
                                        : `opacity ${CARD_FLIP_MS}ms ${easeFade} ${delay}ms, transform ${CARD_FLIP_MS}ms ${easeFlip} ${delay}ms`,
                                    pointerEvents: revealed ? 'auto' : 'none',
                                }}
                            >
                                <article
                                    className="group relative flex h-full flex-col overflow-visible rounded-3xl border border-slate-200/60 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-22px_rgba(15,23,42,0.1),0_40px_80px_-32px_rgba(50,96,254,0.06)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-200/80 hover:shadow-[0_2px_6px_rgba(15,23,42,0.05),0_24px_52px_-20px_rgba(15,23,42,0.13),0_48px_96px_-36px_rgba(50,96,254,0.09)]"
                                >
                                    <div className="relative flex w-full shrink-0 flex-col">
                                        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-t-3xl sm:h-[15rem]">
                                            <img
                                                src={image}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10"/>
                                        </div>
                                        <div className="relative z-0 flex flex-1 flex-col overflow-visible rounded-b-3xl bg-white px-5 pb-6 pt-9 sm:px-6 sm:pt-10">
                                        <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-slate-900">
                                            {title}
                                        </h3>
                                        <p className="min-h-[5.5rem] text-[15px] leading-[1.65] text-slate-600 antialiased">
                                            {description}
                                        </p>
                                        </div>
                                        <p className="absolute left-1/2 top-[13rem] z-20 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-[3px] border-solid border-[#eb6b50] bg-slate-900/90 px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_8px_28px_-6px_rgba(15,23,42,0.35),0_2px_6px_rgba(0,0,0,0.15)] backdrop-blur-md backdrop-saturate-150 sm:top-[15rem] sm:px-6 sm:py-2.5 sm:text-xs">
                                            {step}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BlendedBackground>
    );
};

export default HowItWorks;
