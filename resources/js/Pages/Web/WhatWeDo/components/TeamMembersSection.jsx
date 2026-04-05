import React from 'react';

const TeamMembersSection = ({ teamMembers = [] }) => (
    <section className="bg-[#f9f9f9] px-5 py-10 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid gap-8 sm:grid-cols-2">
                {teamMembers.map((member, index) => (
                    <div
                        key={index}
                        className="group overflow-hidden rounded-[2rem] bg-white editorial-shadow"
                    >
                        {/* Photo */}
                        <div className="h-72 overflow-hidden">
                            <img
                                src={member.imageSrc}
                                alt={member.name}
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-8">
                            <span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#3260FE]">
                                {member.title}
                            </span>
                            <h3 className="mb-4 text-2xl font-extrabold tracking-[-0.03em] text-[#1a1c1c]">
                                {member.name}
                            </h3>
                            <p className="text-[14px] leading-[1.7] text-[#3f484a] line-clamp-4">
                                {member.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default TeamMembersSection;
