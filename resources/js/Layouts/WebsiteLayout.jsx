import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import websiteTheme from '../themes/websiteTheme';
import Notification from '../Components/Notification';
import SiteNavigation from '../Components/SiteNavigation';
import SiteStyles from '../Components/SiteStyles';
import SiteFooter from '../Components/SiteFooter';

const WebsiteLayout = ({ children, minimalChrome = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
        <ThemeProvider theme={websiteTheme}>
            <CssBaseline/>
            <SiteStyles/>
            <div className="stitch-home min-h-screen flex flex-col">
                {!minimalChrome && (
                    <SiteNavigation
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                    />
                )}

                <main className="flex-grow">
                    {!minimalChrome && <div className="h-20"/>}
                    <Notification/>
                    {children}
                </main>

                {!minimalChrome && <SiteFooter/>}
            </div>
        </ThemeProvider>
    );
};

export default WebsiteLayout;
