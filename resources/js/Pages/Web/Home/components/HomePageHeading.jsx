import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';

const HomePageHeading = () => (
    <header className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img
                src="/images/home/stitch/hero.jpg"
                alt="Woman with a straw hat and backpack walking on a coastal path with yellow flowers"
                className="h-full w-full object-cover object-[74%_center] md:object-[72%_center]"
            />
            <div className="hero-overlay absolute inset-0"/>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] px-5 py-24 md:px-10 lg:px-0 lg:py-0">
            <div className="max-w-[520px] pt-16 sm:pt-20 md:pt-0">
                <div className="mb-6 inline-block rounded-full bg-[#3260FE]/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#3260FE] backdrop-blur-sm md:mb-7 md:px-4 md:text-[9px] md:tracking-[0.22em]">
                    #1 Planning Hub for your Trips
                </div>

                <h1 className="mb-6 text-[2.75rem] font-extrabold leading-[0.92] tracking-[-0.06em] text-[#1a1c1c] sm:text-[3.2rem] md:mb-7 md:text-[5.2rem]">
                    Your personal
                    <br/>
                    itinerary,
                    <br/>
                    <span className="text-[1.95rem] font-light italic leading-[0.96] text-[#3260FE] sm:text-[2.4rem] md:text-[4.25rem]">
                        planned by real
                    </span>
                    <br/>
                    <span className="text-[1.95rem] font-light italic leading-[0.96] text-[#3260FE] sm:text-[2.4rem] md:text-[4.25rem]">
                        people who live there.
                    </span>
                </h1>

                <p className="mb-8 max-w-[310px] text-[15px] leading-[1.65] text-[#3f484a] sm:max-w-[360px] sm:text-[17px] md:mb-10 md:text-[20px] md:leading-[1.75]">
                    Connect with local experts to plan your perfect trip. Your priorities, your pace, your local guide.
                </p>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:gap-7">
                    <Link
                        href="/plan"
                        className="inline-flex items-center rounded-xl bg-[#3260FE] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(50,96,254,0.8)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(50,96,254,0.35)] md:px-7 md:py-4 md:text-[14px]"
                    >
                        Start Planning
                        <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                    </Link>
                    <Link
                        href="/destinations"
                        className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#3260FE] sm:text-[10px] sm:tracking-[0.2em]"
                    >
                        <span className="h-px w-12 bg-[#3260FE]/30 transition-all group-hover:w-16"/>
                        View Destinations
                    </Link>
                </div>
            </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-none">
            <svg className="relative block h-[60px] w-full md:h-[120px]" preserveAspectRatio="none"
                 viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z" fill="#f9f9f9"/>
            </svg>
        </div>
    </header>
);

export default HomePageHeading;
