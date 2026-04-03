import React from 'react';
import ImageCarousel from './ImageCarousel.jsx';

const OverviewTab = ({ destination, id }) => {
    return (
        <div id={id}>
            {/* Section header */}
            <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                    About This Destination
                </span>
                <h2 className="font-extrabold text-slate-800 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    {destination.overview_title || destination.name}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Overview text */}
                {destination.overview ? (
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(43,43,81,0.06)] p-10">
                        <p
                            className="text-slate-500 leading-[1.9] whitespace-pre-wrap"
                            style={{ fontSize: '16px' }}
                        >
                            {destination.overview}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_40px_rgba(43,43,81,0.06)] p-10 flex items-center justify-center min-h-[200px]">
                        <p className="text-slate-400 text-[15px]">No overview available.</p>
                    </div>
                )}

                {/* Image carousel */}
                {destination.images && destination.images.length > 0 ? (
                    <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)]">
                        <ImageCarousel images={destination.images} />
                    </div>
                ) : (
                    <div
                        className="rounded-[2rem] flex items-center justify-center min-h-[260px] border-2 border-dashed border-slate-200"
                    >
                        <p className="text-slate-400 text-[15px]">No images available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverviewTab;
