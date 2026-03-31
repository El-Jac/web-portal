import React, {useState} from 'react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import HomeMeta from './components/HomeMeta.jsx';
import HomeStyles from './components/HomeStyles.jsx';
import HomeNavigation from './components/HomeNavigation.jsx';
import HomePageHeading from './components/HomePageHeading.jsx';
import WhatIsPlanLikeALocal from './components/WhatIsPlanLikeALocal.jsx';
import DestinationsSection from './components/DestinationsSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';

const Index = () => {
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
                <DestinationsSection/>
                <HowItWorks/>
            </div>
        </WebsiteLayout>
    );
};

export default Index;
