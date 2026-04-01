import React, {useState} from 'react';
import {usePage} from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import HomeMeta from './components/HomeMeta.jsx';
import HomeStyles from './components/HomeStyles.jsx';
import HomeNavigation from './components/HomeNavigation.jsx';
import HomePageHeading from './components/HomePageHeading.jsx';
import WhatIsPlanLikeALocal from './components/WhatIsPlanLikeALocal.jsx';
import DestinationsSection from './components/DestinationsSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';

const Index = () => {
    const {destinations} = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <WebsiteLayout minimalChrome>
            <HomeMeta/>
            <HomeStyles/>

            <div className="stitch-home overflow-x-hidden">
                <HomeNavigation
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <HomePageHeading/>
                <WhatIsPlanLikeALocal/>
                <DestinationsSection destinations={destinations}/>
                <HowItWorks/>
            </div>
        </WebsiteLayout>
    );
};

export default Index;
