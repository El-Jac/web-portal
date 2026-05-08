import React from 'react';
import {
    CalendarMonthOutlined,
    VideoChatOutlined,
    MapOutlined,
    VerifiedOutlined,
} from '@mui/icons-material';
import SectionEyebrow from '../../../../Components/SectionEyebrow.jsx';

const defaultServices = [
    {
        icon: CalendarMonthOutlined,
        title: 'Book a Session',
        description: 'Schedule a one-on-one planning call with a specialist who knows your destination inside out.',
    },
    {
        icon: VideoChatOutlined,
        title: 'Video Planning',
        description: 'Connect face-to-face with a local expert and build your trip together in real time.',
    },
    {
        icon: MapOutlined,
        title: 'Custom Itinerary',
        description: 'Receive a fully personalised, ready-to-use travel plan crafted around your style and interests.',
    },
    {
        icon: VerifiedOutlined,
        title: 'Verified Experts',
        description: 'Every specialist is vetted for local knowledge, communication, and genuine passion for their destination.',
    },
];

const OurServicesSection = ({
    title = 'Our Services',
    description = 'From plan to discovery, we\'ve got you covered.',
    services = [],
}) => {
    const displayServices = services.length > 0 ? services : defaultServices;

    return (
        <section className="mesh-section bg-[#f9f9f9] px-5 py-20 md:px-10 md:py-28 lg:px-16">
            <div className="mx-auto max-w-[1120px]">
                {/* Header */}
                <div className="mb-14 text-center md:mb-18">
                    <SectionEyebrow variant="subtle" className="mb-4 block text-[#1a1c1c]">
                        How We Help
                    </SectionEyebrow>
                    <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                        {title}
                        <br/>
                        <span className="font-light italic text-[#3260FE]">Built Around You.</span>
                    </h2>
                    <p className="mx-auto max-w-[560px] text-[14px] leading-[1.7] text-[#3f484a] md:text-[15px]">
                        {description}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {displayServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div key={index} className="flex flex-col">
                                <div className="editorial-shadow mb-5 flex h-[92px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#ececec] bg-white">
                                    <div className="flex h-full w-full items-center justify-center bg-[#f8f8f8] transition-colors duration-500 hover:bg-[#3260FE]/5">
                                        {Icon
                                            ? <Icon sx={{ fontSize: 40, color: '#3260FE', opacity: 0.9 }}/>
                                            : <div className="h-10 w-10 rounded-full bg-[#3260FE]/10"/>
                                        }
                                    </div>
                                </div>
                                <h3 className="mb-2 text-[1.25rem] font-extrabold leading-tight tracking-[-0.03em] text-[#1a1c1c]">
                                    {service.title}
                                </h3>
                                <p className="max-w-[280px] text-[12px] leading-[1.6] text-[#3f484a]">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurServicesSection;
