import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import websiteTheme from '../themes/websiteTheme';
import Notification from '../Components/Notification';
import SiteNavigation from '../Components/SiteNavigation';
import SiteStyles from '../Components/SiteStyles';
import SiteFooter from '../Components/SiteFooter';
import ContactUsDialog from '../Components/ContactUsDialog';

/**
 * Shared marketing layout: one nav + footer + contact dialog on all public website pages.
 * @param {boolean} [skipTopSpacer=false] - Set true on home so the hero can sit full-bleed under the fixed nav (no h-20 offset).
 */
const WebsiteLayout = ({ children, skipTopSpacer = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [contactDialogOpen, setContactDialogOpen] = React.useState(false);

    return (
        <ThemeProvider theme={websiteTheme}>
            <CssBaseline/>
            <SiteStyles/>
            <div className="stitch-home min-h-screen flex flex-col">
                <SiteNavigation
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                    onContactClick={() => setContactDialogOpen(true)}
                />

                <main className="flex-grow">
                    {!skipTopSpacer && <div className="h-20"/>}
                    <Notification/>
                    {children}
                </main>

                <SiteFooter/>

                <ContactUsDialog
                    open={contactDialogOpen}
                    onClose={() => setContactDialogOpen(false)}
                />
            </div>
        </ThemeProvider>
    );
};

export default WebsiteLayout;
