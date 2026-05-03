import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const defaultTeam = [
    { name: 'Emma Laurent', title: 'Paris Specialist', imageSrc: '/images/home/stitch/emma.jpg', featured: false },
    { name: 'Pasindu Wewegama', title: 'Co-Founder & Specialist', imageSrc: '/web/pasindu.jpeg', featured: false },
    { name: 'Jerry Saxe', title: 'Co-Founder & Specialist', imageSrc: '/web/Jerry_resized.jpeg', featured: true },
    { name: 'Kenji Nakamura', title: 'Tokyo Specialist', imageSrc: '/images/home/stitch/kenji.jpg', featured: false },
    { name: 'Daniel Osei', title: 'Cape Town Specialist', imageSrc: '/images/home/stitch/daniel.jpg', featured: false },
];

const WhoWeAreTeamSection = ({ teamMembers }) => {
    const base = teamMembers && teamMembers.length > 0
        ? teamMembers.map((m, i) => ({ ...m, featured: i === Math.floor(teamMembers.length / 2) }))
        : defaultTeam;

    return (
        <section className="bg-white px-5 py-14 md:px-10 md:py-20">
            <div className="mx-auto max-w-[1120px]">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="text-[2.15rem] font-extrabold tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.75rem]">
                        Meet our expert specialists
                    </h2>
                    <p className="mt-3 text-[14px] text-[#5a6472]">
                        We are here to share information about our incredible team.
                    </p>
                </div>

                {/* Horizontal card row */}
                <div className="flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {base.map((member, i) => (
                        <div
                            key={i}
                            className="relative shrink-0 w-[200px] overflow-hidden rounded-[1.5rem] sm:w-[220px]"
                            style={
                                member.featured
                                    ? { background: 'linear-gradient(160deg, #2451e8 0%, #7B9FFF 100%)' }
                                    : { border: '1px solid #ececec', background: 'white' }
                            }
                        >
                            {/* Photo */}
                            <div className="h-[260px] w-full overflow-hidden">
                                <img
                                    src={member.imageSrc}
                                    alt={member.name}
                                    className="h-full w-full object-cover object-top"
                                />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <p className={`text-[14px] font-extrabold tracking-[-0.02em] ${member.featured ? 'text-white' : 'text-[#1a1c1c]'}`}>
                                    {member.name}
                                </p>
                                <p className={`mt-0.5 text-[11px] ${member.featured ? 'text-white/65' : 'text-[#5a6472]'}`}>
                                    {member.title}
                                </p>
                                <div className={`mt-3 flex items-center gap-3 ${member.featured ? 'text-white/55' : 'text-[#5a6472]'}`}>
                                    <FacebookIcon sx={{ fontSize: 15, cursor: 'pointer', '&:hover': { opacity: 1 } }} />
                                    <InstagramIcon sx={{ fontSize: 15, cursor: 'pointer' }} />
                                    <TwitterIcon sx={{ fontSize: 15, cursor: 'pointer' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeAreTeamSection;
