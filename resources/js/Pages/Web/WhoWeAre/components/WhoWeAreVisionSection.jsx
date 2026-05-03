import React from 'react';
import {
    MapOutlined,
    ExploreOutlined,
    CalendarMonthOutlined,
    VideoChatOutlined,
    VerifiedOutlined,
    FavoriteBorderOutlined,
    LanguageOutlined,
    SupportAgentOutlined,
} from '@mui/icons-material';

const visions = [
    { num: '001', Icon: MapOutlined,            title: 'Destination Guides',    desc: 'In-depth local knowledge to help you discover the real soul of your destination.' },
    { num: '002', Icon: ExploreOutlined,         title: 'Local Expertise',       desc: 'Guidance from people who truly know your destination, not just tourist highlights.' },
    { num: '003', Icon: CalendarMonthOutlined,   title: 'Custom Itineraries',    desc: 'Personalised travel plans built around your interests, budget, and travel style.' },
    { num: '004', Icon: VideoChatOutlined,       title: 'Video Planning',        desc: 'Connect face-to-face with your specialist to build your trip in real time.' },
    { num: '005', Icon: VerifiedOutlined,        title: 'Verified Specialists',  desc: 'Every expert is vetted for genuine local knowledge and communication skills.' },
    { num: '006', Icon: FavoriteBorderOutlined,  title: 'Hidden Gems',           desc: 'Discover the places only locals know — off the beaten path and truly unforgettable.' },
    { num: '007', Icon: LanguageOutlined,        title: 'Cultural Immersion',    desc: 'Go beyond sightseeing and truly connect with local culture, food, and traditions.' },
    { num: '008', Icon: SupportAgentOutlined,    title: 'Ongoing Support',       desc: "We're with you from the first call to the final day of your trip and beyond." },
];

const WhoWeAreVisionSection = () => (
    <section className="bg-[#f7f9fc] px-5 py-14 md:px-10 md:py-20 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="mb-12 text-center">
                <h2 className="text-[2.15rem] font-extrabold tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.75rem]">
                    Here are some key offerings
                </h2>
                <p className="mx-auto mt-3 max-w-[480px] text-[14px] leading-[1.7] text-[#5a6472]">
                    We are committed to upholding the highest standards of travel excellence while ensuring each traveller feels valued and heard.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {visions.map(({ num, Icon, title, desc }) => (
                    <div
                        key={num}
                        className="rounded-[1.5rem] border border-[#ececec] bg-white p-6 transition-all duration-300 hover:border-[#3260FE]/30 hover:shadow-md"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-[0.14em] text-[#9aa5b4]">{num}</span>
                            <Icon sx={{ fontSize: 20, color: '#3260FE', opacity: 0.7 }} />
                        </div>
                        <h3 className="mb-2 text-[14px] font-extrabold tracking-[-0.02em] text-[#1a1c1c]">{title}</h3>
                        <p className="text-[12px] leading-[1.7] text-[#5a6472]">{desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WhoWeAreVisionSection;
