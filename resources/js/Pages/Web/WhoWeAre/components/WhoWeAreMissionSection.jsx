import React from 'react';
import { CheckCircleOutline } from '@mui/icons-material';

const checkItems = [
    'Providing Local Knowledge',
    'Building Authentic Experiences',
    'Enhancing Your Journey',
    'Building Trust & Rapport',
    'Community Immersion',
    'Seamless Planning Process',
];

const WhoWeAreMissionSection = () => (
    <section className="bg-white px-5 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center lg:gap-20">

                {/* Left */}
                <div>
                    <h2 className="mb-5 text-[2rem] font-extrabold leading-tight tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[2.75rem]">
                        Let's know about our{' '}
                        <span className="font-light italic text-[#3260FE]">passion for travel</span>
                    </h2>
                    <p className="mb-8 text-[14px] leading-[1.8] text-[#5a6472]">
                        We aim to offer clear and personalised information about our destinations, specialists, and planning options. This ensures that travellers can make informed decisions about their next adventure.
                    </p>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                        {checkItems.map((item) => (
                            <div key={item} className="flex items-center gap-2.5">
                                <CheckCircleOutline sx={{ fontSize: 18, color: '#3260FE', flexShrink: 0 }} />
                                <span className="text-[13px] font-medium text-[#1a1c1c]">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — image */}
                <div className="relative">
                    <div className="overflow-hidden rounded-[2rem] h-[420px] md:h-[500px]">
                        <img
                            src="/images/home/stitch/kenji.jpg"
                            alt="Travel specialist"
                            className="h-full w-full object-cover object-top"
                        />
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-5 -left-4 rounded-2xl bg-[#3260FE] px-5 py-4 text-white shadow-xl shadow-[#3260FE]/30">
                        <p className="text-[2rem] font-extrabold leading-none">3+</p>
                        <p className="mt-0.5 text-[11px] text-white/70">Years of Experience</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default WhoWeAreMissionSection;
