import React from 'react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import WhoWeAreHeader from './components/WhoWeAreHeader.jsx';
import MissionVisionSection from './components/MissionVisionSection.jsx';
import ValuesSection from './components/ValuesSection.jsx';
import OurServicesSection from './components/OurServicesSection.jsx';

const Index = () => (
    <WebsiteLayout>
        <WhoWeAreHeader
            title="Who We Are"
            description="We're a team of passionate travelers and local experts who believe the best trips start with a real conversation."
        />
        <MissionVisionSection
            missionTitle="Our Mission"
            missionDescription="To make travel planning personal again — connecting curious travelers with the local knowledge, genuine insight, and human warmth that no algorithm can replicate."
            visionTitle="Our Vision"
            visionDescription="A world where every traveler arrives informed, inspired, and confident — equipped with a plan built just for them by someone who truly loves where they're going."
        />
        <ValuesSection/>
        <OurServicesSection
            title="Our Services"
            description="From your first question to your last day on the road, we're here to make the journey extraordinary."
        />
    </WebsiteLayout>
);

export default Index;
