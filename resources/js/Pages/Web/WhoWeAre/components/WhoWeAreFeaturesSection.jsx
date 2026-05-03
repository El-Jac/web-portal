import React from 'react';
import { CalendarMonthOutlined, ArrowForward } from '@mui/icons-material';
import { Link } from '@inertiajs/react';

const heroSerif = "!font-['Fraunces',Georgia,ui-serif,serif]";

const chartBars = [
    { key: 'jp', heightPx: 72, color: '#14b8a6', initial: 'JP' },
    { key: 'it', heightPx: 54, color: '#38bdf8', initial: 'IT' },
    { key: 'pe', heightPx: 92, color: '#f472b6', initial: 'PE' },
    { key: 'ma', heightPx: 44, color: '#facc15', initial: 'MA' },
];

const WhoWeAreFeaturesSection = () => (
    <section className="bg-[#faf9fb] px-5 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">

                {/* Left — text column */}
                <div className="flex flex-col justify-center rounded-[2rem] bg-transparent px-1 py-6 md:px-3 md:py-8">
                    <h2
                        className={`${heroSerif} mb-4 text-[1.65rem] font-bold leading-[1.18] tracking-[-0.02em] text-[#1a1a2e] md:text-[1.85rem]`}
                    >
                        Your trusted travel specialists
                    </h2>
                    <p className="mb-8 flex-1 text-[13px] leading-[1.85] text-[#666666] md:text-[14px]">
                        Work with real people who know your destination inside out — not algorithms. Our specialists
                        craft trips based on years of local living and genuine passion.
                    </p>
                    <Link
                        href="/plan"
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e9d5ff] px-7 py-3 text-[12px] font-bold text-[#5b21b6] shadow-sm shadow-violet-200/60 transition-all hover:bg-[#ddd6fe] hover:shadow-md"
                    >
                        Make a schedule
                        <ArrowForward sx={{ fontSize: 14 }} />
                    </Link>
                </div>

                {/* Center — lavender featured card */}
                <div
                    className="relative flex flex-col overflow-hidden rounded-[2.25rem] p-8 shadow-[0_24px_56px_-28px_rgba(91,33,182,0.35)]"
                    style={{
                        background: 'linear-gradient(165deg, #ddd6fe 0%, #c4b5fd 42%, #a78bfa 100%)',
                    }}
                >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-indigo-400/25 blur-3xl" />

                    <div className="relative z-10 mb-6">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                            Planning session
                        </p>
                        <h3 className={`${heroSerif} text-[1.4rem] font-bold leading-snug tracking-[-0.02em] text-white md:text-[1.5rem]`}>
                            Very fast and personalised service with us
                        </h3>
                        <p className="mt-2 text-[12px] leading-relaxed text-white/85">
                            Book a video session and get a tailored itinerary from a specialist who lives there.
                        </p>
                    </div>

                    {/* App-style mock */}
                    <div className="relative z-10 mt-auto rounded-[1.35rem] bg-white/95 p-4 shadow-[0_16px_40px_-20px_rgba(49,46,129,0.35)] ring-1 ring-white/80 backdrop-blur-sm">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 text-[11px] font-bold text-white shadow-inner">
                                Hi
                            </div>
                            <div>
                                <p className="text-[12px] font-bold text-[#1a1a2e]">Hi, Emma</p>
                                <p className="text-[10px] text-[#666666]">Tokyo · Local specialist</p>
                            </div>
                        </div>
                        <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#f4f4f8] px-3 py-2">
                            <CalendarMonthOutlined sx={{ fontSize: 16, color: '#6366f1' }} />
                            <span className="text-[11px] font-semibold text-[#312e81]">Choose a time</span>
                        </div>
                        <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-center text-[11px] font-bold text-white shadow-md shadow-indigo-500/30">
                            Appointment
                        </div>
                    </div>
                </div>

                {/* Right — analysis card + vertical bars */}
                <div className="flex flex-col rounded-[2.25rem] bg-white p-8 shadow-[0_24px_56px_-32px_rgba(26,26,46,0.14)] ring-1 ring-[#1a1a2e]/[0.04]">
                    <h3 className={`${heroSerif} mb-2 text-[1.45rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1a1a2e] md:text-[1.55rem]`}>
                        Plan your trip from anywhere
                    </h3>
                    <p className="mb-8 text-[13px] leading-[1.85] text-[#666666]">
                        Connect via video and shape your route like tuning vital metrics — pacing, budget, and must-sees
                        in one clear view.
                    </p>

                    <div className="flex flex-1 flex-col justify-end">
                        <div className="flex h-[140px] items-end justify-center gap-3 px-2 md:h-[160px] md:gap-4">
                            {chartBars.map(({ key, heightPx, color, initial }) => (
                                <div key={key} className="flex flex-col items-center justify-end">
                                    <div className="relative mb-1 flex flex-col items-center">
                                        <div className="z-10 -mb-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#f4f4f6] text-[8px] font-bold uppercase tracking-tighter text-[#1a1a2e] shadow-md">
                                            {initial}
                                        </div>
                                        <div
                                            className="w-9 rounded-t-xl md:w-10"
                                            style={{
                                                height: heightPx,
                                                backgroundColor: color,
                                                boxShadow: `0 8px 20px -6px ${color}66`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default WhoWeAreFeaturesSection;
