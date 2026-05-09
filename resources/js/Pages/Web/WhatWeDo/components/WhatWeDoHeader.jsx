import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward } from '@mui/icons-material';

const WhatWeDoHeader = ({ title = 'Our Process', description }) => (
    <section className="relative overflow-hidden -mt-20">
        {/* Hero image — same as home page */}
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: 'url(/images/home/stitch/hero.webp?v=20)',
                backgroundSize: 'cover',
                backgroundPosition: '52% center',
            }}
        />
        {/* Overlay gradient — matches home page hero style */}
        <div
            className="absolute inset-0"
            style={{
                background: 'linear-gradient(to right, rgba(26,28,28,0.85) 30%, rgba(26,28,28,0.5) 60%, rgba(26,28,28,0.2) 100%)',
            }}
        />

        {/* Content — pt-40 clears the fixed nav */}
        <div className="relative z-10 mx-auto max-w-[1120px] px-5 pt-40 pb-32 md:px-10 md:pt-48 md:pb-40 lg:px-16">
            <span className="mb-5 inline-block text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
                Our Story
            </span>
            <h1 className="mb-6 max-w-[580px] text-[2.6rem] font-extrabold leading-[0.97] tracking-[-0.05em] text-white sm:text-[3.2rem] md:text-[4.2rem]">
                {title}
                <br/>
                <span className="font-light italic text-[#3260FE]">Behind the Journey.</span>
            </h1>
            {description && (
                <p className="mb-8 max-w-[420px] text-[15px] leading-[1.7] text-white/70">
                    {description}
                </p>
            )}
            <Link
                href="/plan"
                className="inline-flex items-center rounded-lg bg-[#3260FE] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#3260FE]/30 transition-all hover:scale-[1.02]"
            >
                Start Planning
                <ArrowForward sx={{ ml: 1, fontSize: 16 }}/>
            </Link>
        </div>

        {/* Wave transition to white sections below */}
        <div className="relative w-full leading-none" style={{ height: '80px' }}>
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                <path d="M0,80 L1440,80 L1440,60 C1080,0 360,0 0,60 Z" fill="#f9f9f9"/>
            </svg>
        </div>
    </section>
);

export default WhatWeDoHeader;
