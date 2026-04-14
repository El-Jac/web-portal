import React from 'react';
import {usePage} from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import HomeMeta from './components/HomeMeta.jsx';
import HomePageHeading from './components/HomePageHeading.jsx';
import WhatIsPlanLikeALocal from './components/WhatIsPlanLikeALocal.jsx';
import DestinationsSection from './components/DestinationsSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import HomeSectionDivider from './components/HomeSectionDivider.jsx';
import ReadyToPlanSection from './components/ReadyToPlanSection.jsx';

const Index = () => {
    const {destinations, pagination} = usePage().props;

    return (
        <WebsiteLayout skipTopSpacer>
            <HomeMeta/>

            <div className="stitch-home overflow-x-hidden">
                <HomePageHeading/>
                <WhatIsPlanLikeALocal/>
                <HomeSectionDivider/>
                <DestinationsSection destinations={destinations} pagination={pagination}/>
                <HomeSectionDivider/>
                <HowItWorks/>
            </div>
            <HomeSectionDivider/>
            <ReadyToPlanSection/>
        </WebsiteLayout>
    );
};

export default Index;
