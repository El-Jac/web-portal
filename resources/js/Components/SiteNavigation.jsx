import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowForward, Close, Menu } from '@mui/icons-material';
import { navItems } from '../Pages/Web/Home/components/homeData';

function normalizePath(path) {
    if (!path) return '/';
    const clean = path.split('?')[0];
    if (clean === '/') return '/';
    return clean.replace(/\/$/, '') || '/';
}

const SiteNavigation = ({ mobileMenuOpen, setMobileMenuOpen, onContactClick }) => {
    const { url } = usePage();
    const currentPath = normalizePath(url);

    const desktopLinkClass = (href) =>
        ['nav-link', normalizePath(href) === currentPath ? 'nav-link-active' : null].filter(Boolean).join(' ');

    const mobileLinkClass = (href) =>
        ['site-nav-mobile-link', normalizePath(href) === currentPath ? 'nav-link-active' : null]
            .filter(Boolean)
            .join(' ');

    return (
        <nav className="site-nav fixed inset-x-0 top-0 z-50 px-4 py-4 sm:py-5 md:px-6 lg:px-10 xl:px-16">
            <div className="site-nav-bar-enter mx-auto flex min-w-0 max-w-[1120px] items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:gap-2 md:px-4 md:py-2.5 lg:gap-2.5 lg:px-6 lg:py-3 xl:px-7 glass-nav">
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-1.5 transition-opacity duration-300 hover:opacity-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3260FE]/40 sm:gap-2 sm:pr-2"
                >
                    <img src="/images/home/stitch/brand-icon.png" alt="Plan Like a Local icon"
                         className="h-8 w-auto shrink-0 object-contain md:h-9 xl:h-10"/>
                    <img src="/images/home/stitch/brand-wordmark.png" alt="Plan Like a Local"
                         className="block h-10 w-auto shrink-0 object-contain"/>
                </Link>

                <div className="hidden min-w-0 items-center gap-1 md:flex md:gap-1.5 lg:gap-2 xl:gap-2.5">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={desktopLinkClass(item.href)}
                            aria-current={normalizePath(item.href) === currentPath ? 'page' : undefined}
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

                <div className="flex shrink-0 items-center gap-2 md:gap-3">
                    <Link
                        href="/plan"
                        className="nav-cta-start-planning hidden items-center font-semibold text-white md:inline-flex"
                    >
                        <span className="relative z-[1] inline-flex items-center gap-1.5 pl-1">
                            Start Planning
                            <ArrowForward className="text-[0.6rem] md:text-[0.65rem]"/>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((open) => !open)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-800 shadow-sm transition-colors hover:bg-slate-50 md:hidden"
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? <Close/> : <Menu/>}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="site-nav-mobile-sheet mx-auto mt-2 max-w-[1120px] md:hidden">
                    <div className="site-nav-mobile-sheet-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={mobileLinkClass(item.href)}
                                aria-current={normalizePath(item.href) === currentPath ? 'page' : undefined}
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
                        <div className="site-nav-mobile-sheet-cta-wrap">
                            <Link
                                href="/plan"
                                className="nav-cta-start-planning site-nav-mobile-cta inline-flex w-full items-center justify-center rounded-[14px] px-5 py-3.5 text-[15px] font-semibold text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="relative z-[1] inline-flex items-center gap-2 pl-0.5">
                                    Start Planning
                                    <ArrowForward className="text-[0.7rem]"/>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default SiteNavigation;
