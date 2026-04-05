import React from 'react';

const OurTeamHeader = ({ title = 'Our Team' }) => (
    <div className="px-5 pt-20 pb-4 text-center md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <span className="mb-4 block text-[9px] font-black uppercase tracking-[0.3em] text-[#3f484a]">
                The People
            </span>
            <h2 className="text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                {title}
            </h2>
        </div>
    </div>
);

export default OurTeamHeader;
