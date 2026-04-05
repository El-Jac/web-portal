import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward } from '@mui/icons-material';

const WhatWeDoHeader = ({ title = 'What We Do', description }) => (
    <section
        className="relative overflow-hidden px-5 pt-16 pb-28 md:px-10 lg:px-16"
        style={{ backgroundColor: '#eef0ff', borderRadius: '0 0 80px 80px' }}
    >
        <div className="mx-auto max-w-[1120px] relative z-10">
            <span className="mb-5 inline-block text-[9px] font-black uppercase tracking-[0.3em] text-[#3260FE]">
                Our Story
            </span>

            <h1 className="mb-6 max-w-[640px] text-[2.4rem] font-extrabold leading-[0.97] tracking-[-0.05em] text-[#1a1c1c] sm:text-[3rem] md:text-[4rem]">
                {title}
                <br/>
                <span className="font-light italic text-[#3260FE]">Behind the Journey.</span>
            </h1>

            {description && (
                <p className="mb-8 max-w-[480px] text-[15px] leading-[1.7] text-[#3f484a]">
                    {description}
                </p>
            )}

            <Link
                href="/plan"
                className="inline-flex items-center rounded-lg bg-[#3260FE] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#3260FE]/20 transition-all hover:scale-[1.02]"
            >
                Start Planning
                <ArrowForward sx={{ ml: 1, fontSize: 16 }}/>
            </Link>
        </div>
    </section>
);

export default WhatWeDoHeader;
