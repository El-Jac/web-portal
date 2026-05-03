import React from 'react';
import { Head } from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import WhoWeAreHeader from './components/WhoWeAreHeader.jsx';
import WhoWeAreFeaturesSection from './components/WhoWeAreFeaturesSection.jsx';
import WhoWeAreStatsSection from './components/WhoWeAreStatsSection.jsx';
import WhoWeAreMissionSection from './components/WhoWeAreMissionSection.jsx';
import WhoWeAreTeamSection from './components/WhoWeAreTeamSection.jsx';
import WhoWeAreVisionSection from './components/WhoWeAreVisionSection.jsx';
import WhoWeAreCTASection from './components/WhoWeAreCTASection.jsx';
import WorkForUsSection from '../WhatWeDo/components/WorkForUsSection.jsx';

const teamMembers = [
    {
        name: 'Pasindu Wewegama',
        title: 'Co-Founder & Specialist',
        imageSrc: '/web/pasindu.jpeg',
    },
    {
        name: 'Jerry Saxe',
        title: 'Co-Founder & Specialist',
        imageSrc: '/web/Jerry_resized.jpeg',
    },
];

const Index = () => (
    <WebsiteLayout>
        <Head>
            <title>Who We Are — Plan Like a Local</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@9..144,600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
        </Head>
        <WhoWeAreHeader />
        <WhoWeAreFeaturesSection />
        <WhoWeAreStatsSection />
        <WhoWeAreMissionSection />
        <WhoWeAreTeamSection teamMembers={teamMembers} />
        <WhoWeAreVisionSection />
        <WhoWeAreCTASection />
        <WorkForUsSection />
    </WebsiteLayout>
);

export default Index;
