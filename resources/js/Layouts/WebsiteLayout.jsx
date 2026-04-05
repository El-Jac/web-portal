import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import websiteTheme from '../themes/websiteTheme';
import Notification from '../Components/Notification';
import ContactUsDialog from '../Components/ContactUsDialog';
import SiteNavigation from '../Components/SiteNavigation';
import SiteStyles from '../Components/SiteStyles';
import { navItems } from '../Pages/Web/Home/components/homeData';

const WebsiteLayout = ({ children, minimalChrome = false }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <ThemeProvider theme={websiteTheme}>
            <CssBaseline/>
            <SiteStyles/>
            <div className="stitch-home min-h-screen flex flex-col">
                {!minimalChrome && (
                    <SiteNavigation
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}
                        onContactClick={() => setContactDialogOpen(true)}
                    />
                )}

                <main className="flex-grow">
                    {!minimalChrome && <div className="h-20"/>}
                    <Notification/>
                    {children}
                </main>

                {!minimalChrome && (
                    <footer className="bg-[#1a1c1c] text-white">
                        <div className="max-w-[1120px] mx-auto px-6 py-12">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                                <div className="flex flex-col gap-4 max-w-[260px]">
                                    <Link href="/" className="flex items-center gap-2">
                                        <img src="/images/home/stitch/brand-icon.png"
                                             alt="Plan Like a Local icon"
                                             className="h-7 w-auto object-contain brightness-0 invert"/>
                                        <img src="/images/home/stitch/brand-wordmark.png"
                                             alt="Plan Like a Local"
                                             className="h-5 w-auto object-contain brightness-0 invert hidden sm:block"/>
                                    </Link>
                                    <p className="text-[13px] leading-[1.6] text-white/50">
                                        Travel planned by people who{' '}
                                        <span className="text-white/80 font-medium">actually live there.</span>
                                    </p>
                                </div>

                                <nav className="flex flex-wrap gap-x-8 gap-y-3">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 transition-colors hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setContactDialogOpen(true)}
                                        className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 transition-colors hover:text-white"
                                    >
                                        Contact Us
                                    </button>
                                </nav>
                            </div>

                            <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs text-white/40">
                                    &copy; {new Date().getFullYear()} Plan Like a Local. All rights reserved.
                                </p>
                                <Link
                                    href="/plan"
                                    className="text-xs font-semibold text-[#3260FE] hover:underline"
                                >
                                    Start Planning &rarr;
                                </Link>
                            </div>
                        </div>
                    </footer>
                )}

                <ContactUsDialog
                    open={contactDialogOpen}
                    onClose={() => setContactDialogOpen(false)}
                />
            </div>
        </ThemeProvider>
    );
};

export default WebsiteLayout;
