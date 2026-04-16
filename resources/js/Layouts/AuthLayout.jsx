import React from 'react';
import { Link } from '@inertiajs/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import websiteTheme from '../themes/websiteTheme';
import SiteStyles from '../Components/SiteStyles';

/**
 * Shared layout for all auth screens (admin login, specialist login,
 * forgot password, reset password).  Renders a centred card on a soft
 * off-white background that matches the rest of the public site.
 *
 * Props:
 *  - title      : heading shown above the card (string)
 *  - subtitle   : smaller text below the heading (string)
 *  - children   : the form content
 *  - backHref   : optional "← Back" link href
 *  - backLabel  : label for the back link (defaults to "Back")
 */
const AuthLayout = ({ title, subtitle, children, backHref, backLabel = 'Back' }) => (
    <ThemeProvider theme={websiteTheme}>
        <CssBaseline/>
        <SiteStyles/>
        <div className="stitch-home min-h-screen flex flex-col">
            {/* Top bar */}
            <header className="w-full px-6 py-5">
                <div className="max-w-[1120px] mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <img src="/images/home/stitch/brand-icon.png?v=3"
                             alt="Plan Like a Local icon"
                             className="h-7 w-auto object-contain"/>
                        <img src="/images/home/stitch/brand-wordmark.png"
                             alt="Plan Like a Local"
                             className="hidden h-5 w-auto object-contain sm:block"/>
                    </Link>
                </div>
            </header>

            {/* Card area */}
            <main className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(43,43,81,0.08)] px-8 py-10 sm:px-10">
                        {/* Brand accent line */}
                        <div className="w-10 h-1 rounded-full bg-[#3260FE] mb-6"/>

                        <h1 className="text-2xl font-extrabold text-slate-800 mb-1">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-sm text-slate-500 mb-7 leading-relaxed">
                                {subtitle}
                            </p>
                        )}

                        {children}
                    </div>

                    {backHref && (
                        <div className="mt-6 text-center">
                            <Link
                                href={backHref}
                                className="text-sm text-slate-500 hover:text-[#3260FE] transition-colors"
                            >
                                &larr; {backLabel}
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            {/* Minimal footer */}
            <footer className="py-6 text-center">
                <p className="text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} Plan Like a Local
                </p>
            </footer>
        </div>
    </ThemeProvider>
);

export default AuthLayout;
