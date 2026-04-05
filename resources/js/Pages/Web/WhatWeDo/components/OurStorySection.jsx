import React from 'react';

const OurStorySection = ({
    imageSrc = '/web/our-story-image.webp',
    imageAlt = 'Our Story',
    subtitle = 'Our Story',
    title = 'Travel Inspired by',
    titleAccent = 'passionate local explorers',
    description,
}) => (
    <section className="bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                {/* Image */}
                <div className="overflow-hidden rounded-[2rem] editorial-shadow">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-64 lg:h-auto object-cover"
                    />
                </div>

                {/* Text — min-w-0 prevents grid blowout */}
                <div className="min-w-0">
                    <span className="mb-4 block text-[9px] font-black uppercase tracking-[0.3em] text-[#3f484a]">
                        {subtitle}
                    </span>
                    <h2 className="mb-6 text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3rem]">
                        {title}{' '}
                        <span className="font-light italic text-[#EA6D4F]">{titleAccent}</span>
                    </h2>
                    {description && (
                        <p className="text-[15px] leading-[1.7] text-[#3f484a]">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    </section>
);

export default OurStorySection;
