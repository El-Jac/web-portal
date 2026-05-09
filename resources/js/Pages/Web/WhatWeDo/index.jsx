import React from 'react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import WhatWeDoHeader from './components/WhatWeDoHeader.jsx';
import MissionVisionSection from '../WhoWeAre/components/MissionVisionSection.jsx';
import ValuesSection from '../WhoWeAre/components/ValuesSection.jsx';
import OurServicesSection from '../WhoWeAre/components/OurServicesSection.jsx';
import OurProcessSection from './components/OurProcessSection.jsx';
import WorkForUsSection from './components/WorkForUsSection.jsx';

const processSteps = [
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
    { header: 'Header', description: 'Quodsi haberent magnalia inter potentiam et' },
];

const Index = () => (
    <WebsiteLayout>
        <WhatWeDoHeader
            title="Our Process"
            description="We connect curious travelers with local experts who turn great trips into unforgettable ones."
        />
        <MissionVisionSection
            missionTitle="Our Mission"
            missionDescription="To make travel planning personal again — connecting curious travelers with the local knowledge, genuine insight, and human warmth that no algorithm can replicate."
            visionTitle="Our Vision"
            visionDescription="A world where every traveler arrives informed, inspired, and confident — equipped with a plan built just for them by someone who truly loves where they're going."
        />
        <ValuesSection />
        <OurServicesSection
            title="Our Services"
            description="From your first question to your last day on the road, we're here to make the journey extraordinary."
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

export default Index;
