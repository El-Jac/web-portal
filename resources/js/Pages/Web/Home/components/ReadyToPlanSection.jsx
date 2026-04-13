import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';

const CTA_IMAGE = '/images/home/stitch/hero.jpg';

const ReadyToPlanSection = () => (
    <section className="relative w-full max-w-none overflow-hidden pb-0 pt-12 md:pt-16">
        {/* Warm, airy atmosphere */}
        <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(50,96,254,0.09),transparent_50%),radial-gradient(ellipse_80%_60%_at_100%_50%,rgba(234,109,79,0.06),transparent_45%),linear-gradient(180deg,#faf9f7_0%,#f3f5fb_45%,#e9ecf8_100%)]"
            aria-hidden
        />
        <div
            className="pointer-events-none absolute -left-48 top-1/4 h-[min(480px,60vw)] w-[min(480px,60vw)] rounded-full bg-[#3260FE]/[0.09] blur-[120px]"
            aria-hidden
        />
        <div
            className="pointer-events-none absolute -right-40 bottom-1/4 h-[min(380px,50vw)] w-[min(380px,50vw)] rounded-full bg-[#EA6D4F]/[0.08] blur-[100px]"
            aria-hidden
        />

        {/* Main panel */}
        <div className="relative z-[1] w-full px-4 pb-6 sm:px-6 md:px-8 lg:px-10">
            <div className="mx-auto w-full max-w-[min(100%,1400px)] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/[0.72] shadow-[0_2px_8px_rgba(15,23,42,0.04),0_32px_80px_-32px_rgba(15,23,42,0.12),inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl sm:rounded-[1.75rem] md:rounded-[2rem]">
                <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-2 md:gap-0">
                    <div className="flex flex-col justify-center bg-gradient-to-br from-white via-[#fafbff] to-[#f4f6fc] px-6 py-11 text-center sm:px-10 sm:py-14 md:order-1 md:px-12 md:py-16 md:pl-14 md:pr-10 md:text-left lg:pl-16 lg:pr-12 xl:pl-20 xl:pr-14">
                        <p className="mb-3 inline-flex items-center justify-center gap-2 self-center rounded-full bg-[#3260FE]/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#3260FE] md:mb-4 md:self-start">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EA6D4F]" aria-hidden/>
                            We&apos;re here to help
                        </p>
                        <h2 className="mb-5 text-[2.15rem] font-extrabold leading-[1.06] tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.65rem] md:mb-6 md:text-[3rem] lg:text-[3.35rem] xl:text-[3.55rem]">
                            Ready to plan{' '}
                            <span className="font-light italic text-[#EA6D4F]">like a local</span>
                            ?
                        </h2>
                        <p className="mx-auto mb-3 max-w-[28rem] text-[16px] font-medium leading-[1.65] text-[#4a5558] md:mx-0 md:mb-4 md:max-w-[26rem] md:text-[17px] lg:text-[1.0625rem]">
                            Wherever you&apos;re dreaming of going, we&apos;ll connect you with someone who truly knows
                            that place — so your trip feels personal, calm, and completely{' '}
                            <span className="text-[#3f484a]">yours</span>.
                        </p>
                        <p className="mx-auto mb-9 max-w-[28rem] text-[14px] leading-relaxed text-[#6b7679] md:mx-0 md:mb-10 md:max-w-[26rem]">
                            No guesswork, no generic lists — just real insight from locals who love where they live.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Link
                                href="/plan"
                                className="group inline-flex items-center gap-2 rounded-full bg-[#3260FE] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_-8px_rgba(50,96,254,0.55),0_2px_8px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2a52e0] hover:shadow-[0_14px_40px_-10px_rgba(50,96,254,0.5)] md:px-9 md:py-4 md:text-[13px]"
                            >
                                Start planning
                                <ArrowForward
                                    sx={{fontSize: 18}}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="relative min-h-[240px] md:order-2 md:h-full md:min-h-[min(24rem,52vh)]">
                        <img
                            src={CTA_IMAGE}
                            alt=""
                            className="h-full min-h-[240px] w-full object-cover md:absolute md:inset-0 md:min-h-full"
                            loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#faf9f7]/40 via-transparent to-transparent md:from-[#f8fafc]/25"/>
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/[0.02] to-black/[0.08]"/>
                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/[0.05]"/>
                    </div>
                </div>
            </div>
        </div>

        {/* Handoff into footer (SiteFooter uses #12151a) */}
        <div
            className="pointer-events-none relative z-0 h-20 w-full bg-gradient-to-b from-[#e8ecf6] via-[#5c6578]/35 to-[#12151a] sm:h-24 md:h-28"
            aria-hidden
        />
    </section>
);

export default ReadyToPlanSection;
