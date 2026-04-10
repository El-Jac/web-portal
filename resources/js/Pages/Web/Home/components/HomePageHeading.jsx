import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';

const HomePageHeading = () => (
    <header className="relative flex min-h-[max(100vh,800px)] items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#f9f9f9]">
            <picture className="block h-full w-full">
                <source srcSet="/images/home/stitch/hero.webp" type="image/webp"/>
                <img
                    src="/images/home/stitch/hero.jpg"
                    alt="Woman with a straw hat and backpack walking on a coastal path with yellow flowers"
                    className="hero-home-media h-full w-full object-cover object-[74%_center] md:object-[72%_center]"
                />
            </picture>
            <div className="hero-overlay absolute inset-0"/>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1120px] px-5 py-24 md:px-10 lg:px-0 lg:py-0">
            <div className="hero-home-inner max-w-[540px] pt-16 sm:pt-20 md:pt-0">
                <div className="hero-home-badge mb-6 inline-flex items-center rounded-full px-6 py-1.5 backdrop-blur-md md:mb-7 md:px-9 md:py-2">
                    #1 Planning Hub for your Trips
                </div>

                <h1 className="hero-home-heading text-balance text-[2.75rem] leading-[1.06] text-[#0f1419] sm:text-[3.25rem] sm:leading-[1.05] md:text-[5.2rem] md:leading-[1.02]">
                    <span className="hero-home-heading-primary block">
                        Your personal
                        <br/>
                        itinerary,
                    </span>
                    <span className="hero-home-heading-accent-wrap block">
                        <span className="hero-home-accent block">
                            planned by real
                        </span>
                        <span className="hero-home-accent block">
                            people who live there.
                        </span>
                    </span>
                </h1>

                <div className="hero-home-bubble mb-5 md:mb-6">
                    <div className="hero-home-bubble-inner">
                        <p className="hero-home-lede">
                            Connect with local experts to plan your perfect trip. Your priorities, your pace, your local guide.
                        </p>
                        <span className="hero-home-bubble-tail" aria-hidden="true"/>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:gap-7">
                    <Link
                        href="/plan"
                        className="hero-cta-primary inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                    >
                        <span className="relative z-[1] inline-flex items-center">
                            Start Planning
                            <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                        </span>
                    </Link>
                    <Link
                        href="/destinations"
                        className="hero-home-cta-secondary group inline-flex items-center gap-4 rounded-full py-2.5 pl-2 pr-4 text-[#3260FE] transition-colors hover:bg-[rgba(50,96,254,0.07)] sm:py-3 sm:pl-2.5 sm:pr-5 md:gap-5"
                    >
                        <span className="h-px w-14 bg-[#3260FE]/35 transition-all duration-300 group-hover:w-[4.5rem] group-hover:bg-[#3260FE]/55 sm:w-16 sm:group-hover:w-[5rem]"/>
                        View Destinations
                    </Link>
                </div>
            </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-none">
            <svg className="relative block h-[60px] w-full md:h-[120px]" preserveAspectRatio="none"
                 viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <defs>
                    <linearGradient id="heroCurveFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fafafa"/>
                        <stop offset="100%" stopColor="#f9f9f9"/>
                    </linearGradient>
                </defs>
                <path
                    d="M0,20 C360,104 840,104 1200,20 L1200,120 L0,120 Z"
                    fill="url(#heroCurveFill)"
                />
            </svg>
        </div>
    </header>
);

export default HomePageHeading;
