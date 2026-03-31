import React from 'react';
import {processSteps} from './homeData';

const HowItWorks = () => (
    <section className="mesh-section overflow-hidden bg-[#f9f9f9] px-5 py-18 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-14 text-center md:mb-18">
                <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1c1c]">
                    What We Do
                </span>
                <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                    We Make Travel Planning
                    <br/>
                    <span className="font-light italic text-[#3260FE]">Personalized.</span>
                </h2>
                <p className="mx-auto max-w-[560px] text-[14px] leading-[1.7] text-[#3f484a] md:text-[15px]">
                    We bridge the gap between travelers and locals, turning ideas into thoughtfully planned journeys tailored to you.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {processSteps.map(({step, title, description, icon: Icon}) => (
                    <div key={step} className="flex flex-col">
                        <div className="editorial-shadow mb-5 flex h-[92px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#ececec] bg-white">
                            <div className="flex h-full w-full items-center justify-center bg-[#f8f8f8] transition-colors duration-500 hover:bg-[#3260FE]/5">
                                <Icon sx={{fontSize: 40, color: '#3260FE', opacity: 0.9}}/>
                            </div>
                        </div>
                        <div className="mb-3 inline-flex w-fit items-center rounded-full border border-[#EA6D4F]/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#EA6D4F]">
                            {step}
                        </div>
                        <h3 className="mb-2 text-[1.45rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#1a1c1c] sm:text-[1.6rem] md:text-[1.8rem]">{title}</h3>
                        <p className="max-w-[280px] text-[12px] leading-[1.6] text-[#3f484a]">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default HowItWorks;
