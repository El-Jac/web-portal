import React from 'react';

const TeamMembersSection = ({ teamMembers = [] }) => (
    <section className="bg-[#f9f9f9] px-5 py-10 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid gap-8 sm:grid-cols-2">
                {teamMembers.map((member, index) => {
                    const isRight = index % 2 !== 0;
                    return (
                        <div key={index} className={`flex flex-col ${isRight ? 'items-start text-left' : 'items-end text-right'}`}>
                            {/* Portrait photo */}
                            <div className="mb-5 w-48 overflow-hidden rounded-[1.5rem] bg-slate-100 editorial-shadow" style={{ aspectRatio: '3/4' }}>
                                <img
                                    src={member.imageSrc}
                                    alt={member.name}
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>

                            {/* Info */}
                            <span className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#3260FE]">
                                {member.title}
                            </span>
                            <h3 className="mb-3 text-xl font-extrabold tracking-[-0.03em] text-[#1a1c1c]">
                                {member.name}
                            </h3>
                            <p className="text-[13px] leading-[1.75] text-[#3f484a] max-w-[300px]">
                                {member.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);

export default TeamMembersSection;
