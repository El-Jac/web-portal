import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward } from '@mui/icons-material';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import { processSteps } from '../Home/components/homeData';

const PlanStart = () => (
    <WebsiteLayout>
        {/* Hero */}
        <section
            className="relative overflow-hidden px-5 pt-16 pb-28 md:px-10 lg:px-16"
            style={{ backgroundColor: '#eef0ff', borderRadius: '0 0 80px 80px' }}
        >
            <div className="mx-auto max-w-[1120px] relative z-10">
                <span className="mb-5 inline-block text-[9px] font-black uppercase tracking-[0.3em] text-[#3260FE]">
                    Start Planning
                </span>
                <h1 className="mb-6 max-w-[640px] text-[2.4rem] font-extrabold leading-[0.97] tracking-[-0.05em] text-[#1a1c1c] sm:text-[3rem] md:text-[4rem]">
                    Your perfect trip,
                    <br/>
                    <span className="font-light italic text-[#3260FE]">planned by a local.</span>
                </h1>
                <p className="mb-8 max-w-[480px] text-[15px] leading-[1.7] text-[#3f484a]">
                    Browse our destinations, pick the one that excites you, and connect with a specialist who knows it inside out.
                </p>
                <Link
                    href="/destinations"
                    className="inline-flex items-center rounded-lg bg-[#3260FE] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#3260FE]/20 transition-all hover:scale-[1.02]"
                >
                    Browse Destinations
                    <ArrowForward sx={{ ml: 1, fontSize: 16 }}/>
                </Link>
            </div>
        </section>

        {/* How it works */}
        <section className="mesh-section bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
            <div className="mx-auto max-w-[1120px]">
                <div className="mb-14 text-center md:mb-18">
                    <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1c1c]">
                        The Process
                    </span>
                    <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                        Four steps to your
                        <br/>
                        <span className="font-light italic text-[#3260FE]">perfect journey.</span>
                    </h2>
                    <p className="mx-auto max-w-[480px] text-[14px] leading-[1.7] text-[#3f484a]">
                        From first click to your final itinerary — here's exactly how it works.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map(({ step, title, description, image }) => (
                        <div key={step} className="flex flex-col">
                            <div className="editorial-shadow relative mb-5 h-[92px] overflow-hidden rounded-[2rem] border border-[#ececec] bg-white">
                                <img
                                    src={image}
                                    alt=""
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div className="mb-3 inline-flex w-fit items-center rounded-full border border-[#EA6D4F]/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#EA6D4F]">
                                {step}
                            </div>
                            <h3 className="mb-2 text-[1.25rem] font-extrabold leading-tight tracking-[-0.03em] text-[#1a1c1c]">
                                {title}
                            </h3>
                            <p className="max-w-[280px] text-[12px] leading-[1.6] text-[#3f484a]">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA banner */}
        <section className="px-5 pb-20 md:px-10 md:pb-28 lg:px-16">
            <div className="mx-auto max-w-[1120px]">
                <div
                    className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-20"
                    style={{ backgroundColor: '#1a1c1c' }}
                >
                    <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20"
                         style={{ background: 'radial-gradient(circle, #3260FE 0%, transparent 70%)' }}/>
                    <span className="relative mb-5 inline-block text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
                        Ready?
                    </span>
                    <h2 className="relative mb-6 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.5rem] md:text-[3rem]">
                        Find your destination
                        <br/>
                        <span className="font-light italic text-[#3260FE]">and meet your local.</span>
                    </h2>
                    <Link
                        href="/destinations"
                        className="relative inline-flex items-center rounded-xl bg-[#3260FE] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#3260FE]/30 transition-all hover:scale-[1.02]"
                    >
                        Browse Destinations
                        <ArrowForward sx={{ ml: 1, fontSize: 16 }}/>
                    </Link>
                </div>
            </div>
        </section>
    </WebsiteLayout>
);

export default PlanStart;
