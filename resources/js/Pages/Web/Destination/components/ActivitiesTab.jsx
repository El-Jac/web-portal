import React from 'react';

const ActivitiesTab = ({ activities, id }) => {
    return (
        <div id={id}>
            {/* Section header */}
            <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                    Local Experiences
                </span>
                <h2 className="font-extrabold text-slate-800 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    Activities
                </h2>
            </div>

            {activities && activities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)] transition-transform hover:-translate-y-1 duration-300"
                        >
                            {/* Activity image */}
                            {activity.image_url ? (
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={activity.image_url}
                                        alt={activity.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="h-52 flex items-center justify-center" style={{ backgroundColor: '#eef0ff' }}>
                                    <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            )}

                            <div className="p-7">
                                <h3 className="text-[18px] font-bold text-slate-800 mb-3">{activity.name}</h3>
                                {activity.description && (
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
                                        {activity.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <p className="text-slate-400 font-medium" style={{ fontSize: '16px' }}>No activities available</p>
                </div>
            )}
        </div>
    );
};

export default ActivitiesTab;
