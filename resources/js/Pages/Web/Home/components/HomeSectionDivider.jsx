import React from 'react';

/** Faint horizontal rule, centered, shorter than full width — between home sections */
const HomeSectionDivider = () => (
    <div
        className="pointer-events-none flex w-full justify-center px-5 py-4 md:py-6 lg:py-7"
        aria-hidden
    >
        <div
            className="h-px w-[min(100%,15rem)] rounded-full bg-gradient-to-r from-transparent via-slate-400/32 to-transparent sm:w-[min(100%,22rem)] md:w-[min(100%,28rem)] lg:w-[min(100%,36rem)]"
        />
    </div>
);

export default HomeSectionDivider;
