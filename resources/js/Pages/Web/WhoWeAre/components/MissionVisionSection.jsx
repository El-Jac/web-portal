import React from 'react';
import SectionEyebrow from '../../../../Components/SectionEyebrow.jsx';

const MissionVisionSection = ({
    missionTitle = 'Our Mission',
    missionDescription,
    visionTitle = 'Our Vision',
    visionDescription,
}) => (
    <section className="bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-14 text-center">
                <SectionEyebrow variant="subtle" className="mb-4 block text-[#1a1c1c]">
                    What Drives Us
                </SectionEyebrow>
                <h2 className="text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                    Purpose&nbsp;&amp;&nbsp;
                    <span className="font-light italic text-[#3260FE]">Direction.</span>
                </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Mission */}
                <div className="rounded-[2rem] bg-white p-10 editorial-shadow">
                    <div className="mb-4 inline-flex items-center rounded-full border border-[#3260FE]/30 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#3260FE]">
                        {missionTitle}
                    </div>
                    <p className="text-[15px] leading-[1.75] text-[#3f484a]">
                        {missionDescription}
                    </p>
                </div>

                {/* Vision */}
                <div className="rounded-[2rem] bg-accent p-10 editorial-shadow">
                    <div className="mb-4 inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/70">
                        {visionTitle}
                    </div>
                    <p className="text-[15px] leading-[1.75] text-white/90">
                        {visionDescription}
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default MissionVisionSection;
