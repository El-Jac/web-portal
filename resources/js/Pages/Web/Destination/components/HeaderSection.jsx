import React from 'react';
import { Link } from '@inertiajs/react';

const HeaderSection = ({ destination }) => {
    const locationParts = [destination.city, destination.state_province, destination.country?.name || destination.country]
        .filter(Boolean);
    const locationText = locationParts.join(', ') || destination.full_location;

    return (
        <div className="max-w-7xl mx-auto px-8 pt-8 mb-0">
            <div className="relative h-[520px] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.10)]">
                {/* Banner image */}
                {destination.banner_image ? (
                    <img
                        src={destination.banner_image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full" style={{ backgroundColor: '#eef0ff' }} />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Back button */}
                <Link
                    href="/destinations"
                    className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-[13px] font-semibold hover:bg-white/30 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All Destinations
                </Link>

                {/* Destination info overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-10 pb-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[11px] font-bold tracking-widest uppercase mb-4">
                        Destination
                    </span>
                    <h1 className="text-white font-extrabold leading-[1.05] mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                        {destination.name}
                    </h1>
                    {locationText && (
                        <div className="flex items-center gap-2 text-white/80 text-[14px] font-medium">
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{locationText}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
