import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward } from '@mui/icons-material';

const WhoWeAreCTASection = () => (
    <section className="px-5 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div
                className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-20"
                style={{ background: 'linear-gradient(135deg, #2451e8 0%, #4b79f5 55%, #7B9FFF 100%)' }}
            >
                {/* Decorative glows */}
                <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

                <h2 className="relative mx-auto mb-8 max-w-[580px] text-[2rem] font-extrabold leading-[1.15] tracking-[-0.04em] text-white sm:text-[2.75rem] md:text-[3.25rem]">
                    Bring your travel experience to the next level of excellence.
                </h2>

                <Link
                    href="/plan"
                    className="relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold text-[#2451e8] shadow-xl transition-all hover:scale-[1.02]"
                >
                    Start Planning
                    <ArrowForward sx={{ fontSize: 16 }} />
                </Link>
            </div>
        </div>
    </section>
);

export default WhoWeAreCTASection;
