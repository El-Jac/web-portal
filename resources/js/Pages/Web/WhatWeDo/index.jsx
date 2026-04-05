import React from 'react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import WhatWeDoHeader from './components/WhatWeDoHeader.jsx';
import OurStorySection from './components/OurStorySection.jsx';
import OurTeamHeader from './components/OurTeamHeader.jsx';
import TeamMembersSection from './components/TeamMembersSection.jsx';
import OurSpecialistsSection from './components/OurSpecialistsSection.jsx';
import OurProcessSection from './components/OurProcessSection.jsx';
import WorkForUsSection from './components/WorkForUsSection.jsx';

const Index = () => {
    const teamMembers = [
        {
            name: 'Pasindu Wewegama',
            title: 'Title',
            imageSrc: '/web/pasindu.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            name: 'Jerry Saxe',
            title: 'Title',
            imageSrc: '/web/Jerry_resized.jpeg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ];

    const specialistAvatarUrls = [
        '/web/pasindu.jpeg', '',
        '/web/Jerry_resized.jpeg', '', '', '',
        '/web/pasindu.jpeg', '', '', '',
        '/web/Jerry_resized.jpeg', '', '', '', '/web/pasindu.jpeg',
    ];

    const processSteps = [
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        },
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        },
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        },
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        },
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        },
        {
            header: 'Header',
            description: 'Quodsi haberent magnalia inter potentiam et'
        }
    ];

    return (
        <WebsiteLayout>
            <WhatWeDoHeader
                title="What We Do"
                description="We connect curious travelers with local experts who turn great trips into unforgettable ones."
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
            <OurProcessSection
                title="Our Process"
                subtitle="What makes our specialists 'special'"
                description="A transparent, personal process designed to give you clarity and confidence before you even pack your bags."
                processSteps={processSteps}
            />
            <WorkForUsSection />
        </WebsiteLayout>
    );
};

export default Index;
