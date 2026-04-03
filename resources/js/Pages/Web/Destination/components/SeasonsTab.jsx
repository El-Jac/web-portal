import React from 'react';

const seasonColors = [
    { bg: '#eef0ff', accent: '#3260FE', dot: 'bg-blue-600' },
    { bg: '#fff7ed', accent: '#ea6d4f', dot: 'bg-orange-400' },
    { bg: '#f0fdf4', accent: '#16a34a', dot: 'bg-green-600' },
    { bg: '#fdf4ff', accent: '#9333ea', dot: 'bg-purple-600' },
];

const SeasonsTab = ({ seasons, id }) => {
    return (
        <div id={id}>
            {/* Section header */}
            <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold tracking-widest uppercase mb-4">
                    Best Time To Visit
                </span>
                <h2 className="font-extrabold text-slate-800 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
                    Best Time To Go
                </h2>
            </div>

            {seasons && seasons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seasons.map((season, idx) => {
                        const color = seasonColors[idx % seasonColors.length];
                        return (
                            <div
                                key={season.id}
                                className="rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(43,43,81,0.06)] flex flex-col gap-4 bg-white"
                            >
                                {/* Season name badge */}
                                <div className="flex items-center gap-3">
                                    <span className={`w-3 h-3 rounded-full ${color.dot} flex-shrink-0`} />
                                    <span
                                        className="text-[11px] font-bold tracking-widest uppercase"
                                        style={{ color: color.accent }}
                                    >
                                        {season.name}
                                    </span>
                                </div>

                                {/* Duration */}
                                <h3 className="text-[22px] font-extrabold text-slate-800 leading-tight">
                                    {season.duration}
                                </h3>

                                {/* Description */}
                                {season.description && (
                                    <p className="text-slate-500 leading-[1.75] flex-1" style={{ fontSize: '15px' }}>
                                        {season.description}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-[2rem]">
                    <p className="text-slate-400 font-medium" style={{ fontSize: '16px' }}>No season information available</p>
                </div>
            )}
        </div>
    );
};

export default SeasonsTab;
