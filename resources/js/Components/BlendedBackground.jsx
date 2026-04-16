import React from 'react';

const BlendedBackground = ({
    children,
    image = '/images/home/stitch/what-is-plan-bg.webp',
    blendColor = '#f9f9f9',
    blendSize = '8rem',
    className = '',
    /** When false, vertical overflow is visible so children can animate with transform without clipping. */
    clipOverflow = true,
    /** e.g. `cover` (fills area, may crop) or `contain` (full image visible, no zoom crop) */
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    backgroundRepeat = 'no-repeat',
}) => (
    <div
        className={`relative ${
            clipOverflow ? 'overflow-hidden' : 'overflow-x-hidden overflow-y-visible'
        } ${className}`}
    >
        <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize,
                backgroundPosition,
                backgroundRepeat,
            }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0"
                 style={{height: blendSize, background: `linear-gradient(to bottom, ${blendColor}, transparent)`}}/>
            <div className="absolute inset-x-0 bottom-0"
                 style={{height: blendSize, background: `linear-gradient(to top, ${blendColor}, transparent)`}}/>
            <div className="absolute inset-y-0 left-0"
                 style={{width: blendSize, background: `linear-gradient(to right, ${blendColor}, transparent)`}}/>
            <div className="absolute inset-y-0 right-0"
                 style={{width: blendSize, background: `linear-gradient(to left, ${blendColor}, transparent)`}}/>
        </div>
        {children}
    </div>
);

export default BlendedBackground;
