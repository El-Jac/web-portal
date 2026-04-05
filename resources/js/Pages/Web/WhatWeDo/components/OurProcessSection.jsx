import React from 'react';

const OurProcessSection = ({
    title = 'Our Process',
    subtitle = "What makes our specialists 'special'",
    description,
    processSteps = [],
}) => (
    <section className="bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            {/* Section header */}
            <div className="mb-14 text-center md:mb-18">
                <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1c1c]">
                    {subtitle}
                </span>
                <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                    {title}
                    <br/>
                    <span className="font-light italic text-[#3260FE]">Step by Step.</span>
                </h2>
                {description && (
                    <p className="mx-auto max-w-[560px] text-[14px] leading-[1.7] text-[#3f484a] md:text-[15px]">
                        {description}
                    </p>
                )}
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {processSteps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col rounded-[2rem] bg-white p-8 editorial-shadow"
                    >
                        <div className="mb-4 inline-flex w-fit items-center rounded-full border border-[#EA6D4F]/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#EA6D4F]">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="mb-2 text-[1.25rem] font-extrabold leading-tight tracking-[-0.03em] text-[#1a1c1c]">
                            {step.header}
                        </h3>
                        <p className="text-[13px] leading-[1.6] text-[#3f484a]">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default OurProcessSection;
