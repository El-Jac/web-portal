import React from 'react';
import RandomAvatarCloud from '../../../../Components/RandomAvatarCloud.jsx';
import SectionEyebrow from '../../../../Components/SectionEyebrow.jsx';

const OurSpecialistsSection = ({
    subtitle = 'Our Specialists',
    title = 'Meet the people who know your destination best',
    description,
    avatarUrls = [],
    totalCircles = 20,
    minSize = 40,
    maxSize = 120,
    spacing = 2,
}) => (
    <section className="mesh-section bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Text — min-w-0 prevents grid blowout */}
                <div className="min-w-0">
                    <SectionEyebrow className="mb-4 block text-[#3f484a]">
                        {subtitle}
                    </SectionEyebrow>
                    <h2 className="mb-6 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3rem]">
                        Meet the people who know your destination{' '}
                        <span className="font-light italic text-[#3260FE]">best</span>
                    </h2>
                    {description && (
                        <p className="text-[15px] leading-[1.7] text-[#3f484a]">
                            {description}
                        </p>
                    )}
                </div>

                {/* Avatar cloud */}
                <div className="min-w-0 overflow-hidden rounded-[2rem] bg-white p-6 editorial-shadow">
                    <RandomAvatarCloud
                        avatarUrls={avatarUrls}
                        totalCircles={totalCircles}
                        minSize={minSize}
                        maxSize={maxSize}
                        spacing={spacing}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default OurSpecialistsSection;
