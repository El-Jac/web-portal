import React from 'react';

const ItinerariesTab = ({ itineraries, id }) => {
    return (
        <div id={id}>
            {/* Section header */}
            <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                    Curated Itineraries
                </span>
                <h2 className="font-extrabold text-slate-800 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    Itineraries
                </h2>
            </div>

            {itineraries && itineraries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map((itinerary) => (
                        <div
                            key={itinerary.id}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)] transition-transform hover:-translate-y-1 duration-300"
                        >
                            {/* Itinerary image */}
                            {itinerary.image_url ? (
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={itinerary.image_url}
                                        alt={itinerary.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="h-56 flex items-center justify-center" style={{ backgroundColor: '#eef0ff' }}>
                                    <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                            )}

                            <div className="p-7">
                                <h3 className="text-[18px] font-bold text-slate-800 mb-3">{itinerary.title}</h3>
                                {itinerary.description && (
                                    <p
                                        className="text-slate-500 leading-[1.65]"
                                        style={{
                                            fontSize: '14px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {itinerary.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <p className="text-slate-400 font-medium" style={{ fontSize: '16px' }}>No itineraries available</p>
                </div>
            )}
        </div>
    );
};

export default ItinerariesTab;
