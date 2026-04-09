import React, {useState} from 'react';
import {Link} from '@inertiajs/react';
import ContactUsDialog from './ContactUsDialog';
import {navItems} from '../Pages/Web/Home/components/homeData';

const SiteFooter = () => {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <>
            <footer className="bg-[#1a1c1c] text-white">
                <div className="mx-auto max-w-[1120px] px-6 py-12">
                    <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
                        <div className="flex max-w-[260px] flex-col gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <img src="/images/home/stitch/brand-icon.png"
                                     alt="Plan Like a Local icon"
                                     className="h-7 w-auto object-contain brightness-0 invert"/>
                                <img src="/images/home/stitch/brand-wordmark.png"
                                     alt="Plan Like a Local"
                                     className="hidden h-5 w-auto object-contain brightness-0 invert sm:block"/>
                            </Link>
                            <p className="text-[13px] leading-[1.6] text-white/50">
                                Travel planned by people who{' '}
                                <span className="font-medium text-white/80">actually live there.</span>
                            </p>
                        </div>

                        <nav className="flex flex-wrap gap-x-8 gap-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                type="button"
                                onClick={() => setContactDialogOpen(true)}
                                className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
                            >
                                Contact Us
                            </button>
                        </nav>
                    </div>

                    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                        <p className="text-xs text-white/40">
                            &copy; {new Date().getFullYear()} Plan Like a Local. All rights reserved.
                        </p>
                        <Link href="/plan" className="text-xs font-semibold text-[#3260FE] hover:underline">
                            Start Planning &rarr;
                        </Link>
                    </div>
                </div>
            </footer>

            <ContactUsDialog
                open={contactDialogOpen}
                onClose={() => setContactDialogOpen(false)}
            />
        </>
    );
};

export default SiteFooter;
