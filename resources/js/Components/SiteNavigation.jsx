import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward, Close, Menu } from '@mui/icons-material';
import { navItems } from '../Pages/Web/Home/components/homeData';

const SiteNavigation = ({ mobileMenuOpen, setMobileMenuOpen, onContactClick }) => (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between rounded-full px-3 py-2 md:px-8 md:py-2.5 glass-nav">
            <Link href="/" className="flex items-center gap-2">
                <img src="/images/home/stitch/brand-icon.png" alt="Plan Like a Local icon"
                     className="h-7 w-auto object-contain md:h-9"/>
                <img src="/images/home/stitch/brand-wordmark.png" alt="Plan Like a Local"
                     className="hidden h-8 w-auto object-contain sm:block md:h-9"/>
            </Link>

            <div className="hidden items-center gap-9 md:flex">
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
                    <button
                        type="button"
                        onClick={onContactClick}
                        className="nav-link"
                    >
                        Contact Us
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/plan"
                    className="hidden items-center rounded-lg bg-[#3260FE] px-5 py-2 text-[13px] font-semibold text-white shadow-lg shadow-[#3260FE]/20 transition-transform hover:scale-[1.02] md:inline-flex md:text-sm"
                >
                    Start Planning
                    <ArrowForward className="ml-1 text-[0.85rem] md:text-sm"/>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((open) => !open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white/80 text-[#1a1c1c] md:hidden"
                    aria-label="Toggle navigation"
                >
                    {mobileMenuOpen ? <Close/> : <Menu/>}
                </button>
            </div>
        </div>

        {mobileMenuOpen && (
            <div className="mx-auto mt-3 max-w-7xl rounded-[1.75rem] bg-white/95 p-5 shadow-2xl backdrop-blur md:hidden">
                <div className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-semibold uppercase tracking-[0.14em] text-[#3f484a]"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {onContactClick && (
                        <button
                            type="button"
                            onClick={() => { setMobileMenuOpen(false); onContactClick(); }}
                            className="text-left text-sm font-semibold uppercase tracking-[0.14em] text-[#3f484a]"
                        >
                            Contact Us
                        </button>
                    )}
                    <Link
                        href="/plan"
                        className="inline-flex items-center justify-center rounded-xl bg-[#3260FE] px-5 py-3 text-sm font-semibold text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Start Planning
                        <ArrowForward className="ml-1 text-base"/>
                    </Link>
                </div>
            </div>
        )}
    </nav>
);

export default SiteNavigation;
