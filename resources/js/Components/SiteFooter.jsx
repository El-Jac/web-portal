import React, {useState} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import ContactUsDialog from './ContactUsDialog';
import {navItems} from '../Pages/Web/Home/components/homeData';

const SiteFooter = () => {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);

    return (
        <>
            <footer className="relative overflow-hidden rounded-t-[100px] bg-[#0f131a] text-white">
                <div
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                    aria-hidden
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(180deg, #121821 0%, #0d1118 100%)',
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.28]"
                        style={{
                            backgroundImage: 'url(/images/home/stitch/footer-bg.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'saturate(0.87) contrast(0.91) brightness(0.8)',
                        }}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(8,11,16,0.36) 0%, rgba(8,11,16,0.58) 55%, rgba(8,11,16,0.72) 100%), radial-gradient(ellipse 80% 55% at 50% 0%, rgba(50,96,254,0.11), transparent 58%)',
                        }}
                    />
                    <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#3260FE]/20 blur-[120px]"/>
                    <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#EA6D4F]/16 blur-[130px]"/>
                </div>

                <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-16 md:px-10 md:py-20 lg:px-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
                        <div className="md:col-span-5">
                            <Link
                                href="/"
                                className="group mb-6 inline-flex items-center gap-2 sm:gap-2.5"
                            >
                                <img
                                    src="/images/home/stitch/brand-icon.png"
                                    alt="Plan Like a Local icon"
                                    className="h-14 w-auto object-contain brightness-0 invert transition-[filter] duration-300 ease-out group-hover:filter-none sm:h-16 md:h-[4.5rem]"
                                />
                                <img
                                    src="/images/home/stitch/brand-wordmark.png"
                                    alt="Plan Like a Local"
                                    className="hidden h-9 w-auto object-contain brightness-0 invert transition-[filter] duration-300 ease-out group-hover:filter-none sm:block sm:h-10 md:h-12"
                                />
                            </Link>
                            <p className="max-w-[320px] text-[15px] leading-[1.7] text-white/62">
                                Travel planned by people who{' '}
                                <span className="font-medium text-white/[0.92]">actually live there.</span>
                            </p>
                        </div>

                        <div className="flex flex-col gap-8 md:col-span-4 md:flex-row md:gap-12">
                            <nav
                                className="flex flex-col gap-3.5 font-['Manrope',ui-sans-serif,sans-serif]"
                                aria-label="Footer"
                            >
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="w-fit text-[16px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setContactDialogOpen(true)}
                                    className="w-fit text-left text-[16px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
                                >
                                    Contact Us
                                </button>
                            </nav>
                        </div>

                        <div className="flex flex-col justify-start md:col-span-3 md:items-end md:text-right">
                            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
                                Get started
                            </p>
                            <Link
                                href="/plan"
                                className="hero-cta-primary hero-cta-primary--bright-hover group inline-flex items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
                            >
                                <span className="relative z-[1] inline-flex items-center gap-2">
                                    Start planning
                                    <ArrowForward
                                        sx={{fontSize: 18}}
                                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                                    />
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.09] pt-9 sm:flex-row sm:gap-6">
                        <p className="text-center text-[12px] leading-relaxed text-white/38 sm:text-left">
                            &copy; {new Date().getFullYear()} Plan Like a Local. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-5 font-['Manrope',ui-sans-serif,sans-serif] sm:justify-end">
                            <Link
                                href="/destinations"
                                className="text-[12px] font-medium text-white/55 transition-colors hover:text-white"
                            >
                                Destinations
                            </Link>
                            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden/>
                            <Link
                                href="/plan"
                                className="text-[12px] font-medium text-[#7ea3ff] transition-colors hover:text-[#a8c0ff]"
                            >
                                Plan a trip
                            </Link>
                        </div>
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
