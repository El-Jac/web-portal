import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import {featureHighlights, statItems} from './homeData';

const WhatIsPlanLikeALocal = () => (
    <section className="relative z-30 overflow-hidden bg-[#f9f9f9] px-5 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-18 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mb-24 md:grid-cols-5 md:gap-4">
                {featureHighlights.map(({label, icon: Icon}) => (
                    <div key={label} className="group flex items-center gap-2.5 rounded-2xl bg-white/40 px-3 py-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeeee] text-[#3f484a] transition-colors group-hover:bg-[#3260FE]/10 group-hover:text-[#3260FE]">
                            <Icon sx={{fontSize: 18}}/>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3f484a] md:text-[10px]">
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mb-16 grid grid-cols-1 gap-6 md:mb-24 lg:grid-cols-12 lg:items-start">
                <div className="pt-1 md:pt-4 lg:col-span-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3f484a]">
                        Who We Are
                    </span>
                </div>
                <div className="lg:col-span-8 lg:col-start-4">
                    <h2 className="mb-8 max-w-[760px] text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.35rem] md:mb-10 md:text-[4.1rem]">
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
    </section>
);

export default WhatIsPlanLikeALocal;
