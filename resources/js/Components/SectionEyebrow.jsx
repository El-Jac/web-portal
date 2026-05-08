import React from 'react';

const VARIANTS = {
    bold: 'text-[9px] font-black tracking-[0.3em]',
    subtle: 'text-[10px] font-semibold tracking-[0.18em]',
};

const SectionEyebrow = ({ variant = 'bold', className = '', children }) => (
    <span className={`uppercase ${VARIANTS[variant] ?? VARIANTS.bold} ${className}`.trim()}>
        {children}
    </span>
);

export default SectionEyebrow;
