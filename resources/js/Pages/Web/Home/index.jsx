import React, {useState} from 'react';
import {usePage} from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import HomeMeta from './components/HomeMeta.jsx';
import SiteStyles from '../../../Components/SiteStyles.jsx';
import SiteNavigation from '../../../Components/SiteNavigation.jsx';
import ContactUsDialog from '../../../Components/ContactUsDialog.jsx';
import HomePageHeading from './components/HomePageHeading.jsx';
import WhatIsPlanLikeALocal from './components/WhatIsPlanLikeALocal.jsx';
import DestinationsSection from './components/DestinationsSection.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import SiteFooter from '../../../Components/SiteFooter.jsx';

const Index = () => {
    const {destinations, pagination} = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <WebsiteLayout minimalChrome>
            <HomeMeta/>
            <SiteStyles/>

            <div className="stitch-home overflow-x-hidden">
                <SiteNavigation
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                    onContactClick={() => setContactDialogOpen(true)}
                />
                <HomePageHeading/>
                <WhatIsPlanLikeALocal/>
                <DestinationsSection destinations={destinations} pagination={pagination}/>
                <HowItWorks/>
                <SiteFooter/>
            </div>

            <ContactUsDialog
                open={contactDialogOpen}
                onClose={() => setContactDialogOpen(false)}
            />
        </WebsiteLayout>
    );
};

export default Index;
