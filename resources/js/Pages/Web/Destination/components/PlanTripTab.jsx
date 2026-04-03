import React, { useMemo } from 'react';
import { router } from '@inertiajs/react';

const PlanTripTab = ({ destination, id }) => {
    const specialists = destination?.specialists || [];
    const primary = useMemo(() => specialists.find((s) => s) || null, [specialists]);

    const handleSchedulePlanning = () => {
        if (!primary?.id) {
            alert('No specialist available');
            return;
        }
        router.post('/plans', {
            specialist_id: primary.id,
            destination_id: destination?.id || null,
        });
    };

    // Format location
    let locationText = '';
    if (destination?.state_province || destination?.country) {
        const parts = [];
        if (destination.state_province) parts.push(destination.state_province);
        if (destination.country?.name || destination.country) parts.push(destination.country?.name || destination.country);
        locationText = parts.join(', ');
    } else if (primary?.location) {
        const locationParts = primary.location.split(',').map(s => s.trim());
        locationText = locationParts.length >= 2 ? locationParts.slice(-2).join(', ') : primary.location;
    }

    return (
        <div id={id}>
            {/* Section header */}
            <div className="mb-10 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                    Your Journey Starts Here
                </span>
                <h2 className="font-extrabold text-slate-800 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    Plan Your Trip
                </h2>
            </div>

            {/* CTA card */}
            <div
                className="rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)]"
                style={{ backgroundColor: '#eef0ff' }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left: specialist info */}
                    <div className="p-12 flex flex-col items-center text-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-28 h-28 rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_rgba(50,96,254,0.2)] border-4 border-white">
                                {primary?.avatar_url ? (
                                    <img
                                        src={primary.avatar_url}
                                        alt={primary.full_name || 'Specialist'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {/* Verified badge */}
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-600 mb-1 block">
                                Local Expert
                            </span>
                            <h3 className="text-[22px] font-extrabold text-slate-800 mb-2">
                                {primary?.full_name || 'A Local Specialist'}
                            </h3>
                            {locationText && (
                                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[13px]">
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{locationText}</span>
                                </div>
                            )}
                        </div>

                        {primary?.bio && (
                            <p className="text-slate-500 leading-[1.75]" style={{ fontSize: '15px', maxWidth: '360px' }}>
                                {primary.bio}
                            </p>
                        )}
                    </div>

                    {/* Right: CTA content */}
                    <div className="bg-blue-600 p-12 flex flex-col justify-center gap-6 relative overflow-hidden">
                        {/* Dot texture */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }}
                        />
                        <div className="relative z-10">
                            <h3 className="text-white font-extrabold leading-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}>
                                Get a Custom Itinerary in 24 Hours
                            </h3>
                            <p className="text-blue-200 leading-[1.75] mb-8" style={{ fontSize: '15px' }}>
                                {primary?.bio
                                    ? `Share your travel dates and preferences, and ${primary.full_name?.split(' ')[0] || 'your specialist'} will craft a bespoke journey just for you.`
                                    : 'Tell us what you want to experience and we will craft a tailored trip with the best timings, activities and stays.'}
                            </p>

                            {/* Features list */}
                            <ul className="space-y-3 mb-8">
                                {['Personalised day-by-day plan', 'Local insider tips & hidden gems', 'Flexible & fully adjustable'].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-white text-[14px] font-medium">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {primary?.id ? (
                                <button
                                    onClick={handleSchedulePlanning}
                                    className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-extrabold text-[15px] hover:bg-slate-50 transition-colors"
                                >
                                    Start Planning with {primary.full_name?.split(' ')[0] || 'a Specialist'}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            ) : (
                                <div className="bg-white/20 text-white px-8 py-4 rounded-2xl text-[15px] font-semibold text-center">
                                    No specialist available yet — check back soon.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanTripTab;
