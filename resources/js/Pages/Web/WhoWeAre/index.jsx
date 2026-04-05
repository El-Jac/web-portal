import React from 'react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import WhoWeAreHeader from './components/WhoWeAreHeader.jsx';
import OurStorySection from '../WhatWeDo/components/OurStorySection.jsx';
import OurTeamHeader from '../WhatWeDo/components/OurTeamHeader.jsx';
import TeamMembersSection from '../WhatWeDo/components/TeamMembersSection.jsx';
import OurSpecialistsSection from '../WhatWeDo/components/OurSpecialistsSection.jsx';
import WorkForUsSection from '../WhatWeDo/components/WorkForUsSection.jsx';

const teamMembers = [
    {
        name: 'Pasindu Wewegama',
        title: 'Title',
        imageSrc: '/web/pasindu.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        name: 'Jerry Saxe',
        title: 'Title',
        imageSrc: '/web/Jerry_resized.jpeg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
];

const specialistAvatarUrls = [
    '/web/pasindu.jpeg', '',
    '/web/Jerry_resized.jpeg', '', '', '',
    '/web/pasindu.jpeg', '', '', '',
    '/web/Jerry_resized.jpeg', '', '', '', '/web/pasindu.jpeg',
];

const Index = () => (
    <WebsiteLayout>
        <WhoWeAreHeader
            title="Who We Are"
            description="We're a team of passionate travelers and local experts who believe the best trips start with a real conversation."
        />
        <OurStorySection
            imageSrc="/web/our-story-image.webp"
            imageAlt="Our Story"
            subtitle="Our Story"
            title="Travel Inspired by"
            titleAccent="passionate local explorers"
            description="We believe the best travel experiences come from people who truly know a place — not just its landmarks, but its hidden rhythms, best-kept secrets, and the stories that make it special."
        />
        <OurTeamHeader title="Our Team" />
        <TeamMembersSection teamMembers={teamMembers} />
        <OurSpecialistsSection
            subtitle="Our Specialists"
            title="Meet the people who know your destination best"
            description="Our specialists are passionate locals who have spent years exploring, living, and breathing their destinations. They turn your travel ideas into carefully crafted plans built around you."
            avatarUrls={specialistAvatarUrls}
            totalCircles={20}
            minSize={40}
            maxSize={120}
            spacing={2}
        />
        <WorkForUsSection />
    </WebsiteLayout>
);

export default Index;
