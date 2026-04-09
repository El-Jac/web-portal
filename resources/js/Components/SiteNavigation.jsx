import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward, Close, Menu } from '@mui/icons-material';
import { navItems } from '../Pages/Web/Home/components/homeData';

const SiteNavigation = ({ mobileMenuOpen, setMobileMenuOpen, onContactClick }) => (
    <nav className="site-nav fixed inset-x-0 top-0 z-50 px-4 py-3 sm:py-4 md:px-10 lg:px-16">
        <div className="site-nav-bar-enter mx-auto flex max-w-[1120px] items-center justify-between rounded-full px-2 py-1.5 sm:px-4 sm:py-2 md:gap-2 md:px-6 md:py-2.5 glass-nav">
            <Link href="/" className="flex items-center gap-2">
                <img src="/images/home/stitch/brand-icon.png" alt="Plan Like a Local icon"
                     className="h-7 w-auto object-contain md:h-9"/>
                <img src="/images/home/stitch/brand-wordmark.png" alt="Plan Like a Local"
                     className="hidden h-8 w-auto object-contain sm:block md:h-9"/>
            </Link>

            <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="nav-link"
                    >
                        {item.label}
                    </Link>
                ))}
                {onContactClick && (
                    <a
                        href="#"
                        className="nav-link"
                        aria-haspopup="dialog"
                        onClick={(e) => {
                            e.preventDefault();
                            onContactClick();
                        }}
                    >
                        Contact Us
                    </a>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/plan"
                    className="nav-cta-start-planning hidden items-center rounded-[12px] px-4 py-2 text-[12px] font-semibold text-white shadow-md shadow-[#3260FE]/25 md:inline-flex md:text-[13px]"
                >
                    <span className="relative z-[1] inline-flex items-center gap-1.5 pl-1">
                        Start Planning
                        <ArrowForward className="text-[0.55rem] md:text-[0.6rem]"/>
                    </span>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-800 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <Close/> : <Menu/>}
                </button>
            </div>
        </div>

        {mobileMenuOpen && (
            <div className="mx-auto mt-2 max-w-[1120px] rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl md:hidden">
                <div className="flex flex-col gap-0.5 py-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="site-nav-mobile-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {onContactClick && (
                        <a
                            href="#"
                            className="site-nav-mobile-link w-full text-left"
                            aria-haspopup="dialog"
                            onClick={(e) => {
                                e.preventDefault();
                                setMobileMenuOpen(false);
                                onContactClick();
                            }}
                        >
                            Contact Us
                        </a>
                    )}
                    <div className="my-2 border-t border-slate-200/90"/>
                    <Link
                        href="/plan"
                        className="nav-cta-start-planning inline-flex items-center justify-center rounded-[12px] px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-[#3260FE]/20"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="relative z-[1] inline-flex items-center gap-1.5 pl-1">
                            Start Planning
                            <ArrowForward className="text-[0.65rem]"/>
                        </span>
                    </Link>
                </div>
            </div>
        )}
    </nav>
);

export default SiteNavigation;
