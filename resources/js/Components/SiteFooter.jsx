import React, {useState} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import ContactUsDialog from './ContactUsDialog';
import {navItems} from '../Pages/Web/Home/components/homeData';

const SiteFooter = () => {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <>
            <footer className="relative overflow-hidden bg-[#12151a] text-white">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3260FE]/35 to-transparent"
                    aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(50,96,254,0.12),transparent)]" aria-hidden/>

                <div className="relative mx-auto max-w-[1120px] px-6 py-14 md:px-8 md:py-16 lg:px-10">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
                        <div className="md:col-span-5">
                            <Link href="/" className="mb-6 inline-flex items-center gap-2.5">
                                <img
                                    src="/images/home/stitch/brand-icon.png"
                                    alt="Plan Like a Local icon"
                                    className="h-8 w-auto object-contain brightness-0 invert"
                                />
                                <img
                                    src="/images/home/stitch/brand-wordmark.png"
                                    alt="Plan Like a Local"
                                    className="hidden h-5 w-auto object-contain brightness-0 invert sm:block"
                                />
                            </Link>
                            <p className="max-w-[300px] text-[14px] leading-[1.65] text-white/55">
                                Travel planned by people who{' '}
                                <span className="font-medium text-white/[0.82]">actually live there.</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 md:col-span-4 md:flex-row md:gap-12">
                            <nav className="flex flex-col gap-3.5" aria-label="Footer">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="w-fit text-[12px] font-medium uppercase tracking-[0.2em] text-white/45 transition-colors duration-200 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setContactDialogOpen(true)}
                                    className="w-fit text-left text-[12px] font-medium uppercase tracking-[0.2em] text-white/45 transition-colors duration-200 hover:text-white"
                                >
                                    Contact Us
                                </button>
                            </nav>
                        </div>

                        <div className="flex flex-col justify-start md:col-span-3 md:items-end md:text-right">
                            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                                Get started
                            </p>
                            <Link
                                href="/plan"
                                className="group inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-5 py-3 text-[12px] font-semibold text-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] backdrop-blur-sm transition-all duration-300 hover:border-[#3260FE]/40 hover:bg-[#3260FE]/15"
                            >
                                Start planning
                                <ArrowForward
                                    sx={{fontSize: 16}}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 sm:flex-row">
                        <p className="text-center text-[12px] text-white/35 sm:text-left">
                            &copy; {new Date().getFullYear()} Plan Like a Local. All rights reserved.
                        </p>
                        <Link
                            href="/destinations"
                            className="text-[12px] font-medium text-white/50 transition-colors hover:text-white"
                        >
                            Explore destinations
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
