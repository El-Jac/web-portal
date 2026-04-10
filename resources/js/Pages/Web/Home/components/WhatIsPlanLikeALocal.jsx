import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import {featureHighlights, statItems} from './homeData';
import BlendedBackground from '@/Components/BlendedBackground';

const WhatIsPlanLikeALocal = () => (
    <BlendedBackground className="z-30 bg-[#f9f9f9] px-5 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-16 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:mb-24 md:grid-cols-4 md:gap-3">
                {featureHighlights.map(({label, icon: Icon}) => (
                    <div
                        key={label}
                        className="group flex min-h-[4.75rem] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/60 bg-white/85 px-3 py-3.5 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_4px_14px_-6px_rgba(15,23,42,0.08)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#3260FE]/28 hover:bg-white hover:shadow-[0_8px_24px_-12px_rgba(50,96,254,0.18)] sm:min-h-0 sm:flex-row sm:justify-start sm:gap-3 sm:py-3 md:min-h-[7rem] md:flex-col md:justify-center md:gap-2.5 md:px-2.5 md:py-4 md:text-center"
                    >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/90 text-[#3f484a] shadow-inner ring-1 ring-slate-200/80 transition-[background,box-shadow,color,ring-color] duration-300 group-hover:from-[#3260FE]/12 group-hover:to-[#3260FE]/6 group-hover:text-[#3260FE] group-hover:ring-[#3260FE]/25">
                            <Icon sx={{fontSize: 28}}/>
                        </div>
                        <span className="flex max-w-[11rem] flex-col items-center gap-0 text-center text-[11px] font-bold uppercase leading-none tracking-[0.11em] text-[#3f484a] sm:items-start sm:text-left sm:text-xs sm:tracking-[0.12em] md:max-w-[9.5rem] md:items-center md:text-center md:tracking-[0.1em]">
                            {label.split(/\s+/).map((word, idx) => (
                                <span key={idx} className="block">
                                    {word}
                                </span>
                            ))}
                        </span>
                    </div>
                ))}
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

export default WhatIsPlanLikeALocal;
