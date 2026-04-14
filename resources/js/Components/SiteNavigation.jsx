import React, {useEffect} from 'react';
import {Link, usePage} from '@inertiajs/react';
import {
    ArrowForward,
    Close,
    GroupsOutlined,
    HomeOutlined,
    MailOutline,
    MapOutlined,
    Menu,
    WorkOutline,
} from '@mui/icons-material';
import {navItems} from '../Pages/Web/Home/components/homeData';

const MOBILE_NAV_ICONS = [HomeOutlined, GroupsOutlined, WorkOutline, MapOutlined];

function normalizePath(path) {
    if (!path) return '/';
    const clean = path.split('?')[0];
    if (clean === '/') return '/';
    return clean.replace(/\/$/, '') || '/';
}

const SiteNavigation = ({mobileMenuOpen, setMobileMenuOpen, onContactClick}) => {
    const {url} = usePage();
    const currentPath = normalizePath(url);

    useEffect(() => {
        if (!mobileMenuOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [mobileMenuOpen, setMobileMenuOpen]);

    const desktopLinkClass = (href) =>
        ['nav-link', normalizePath(href) === currentPath ? 'nav-link-active' : null].filter(Boolean).join(' ');

    const drawerLinkClass = (href) => {
        const active = normalizePath(href) === currentPath;
        return [
            'group site-nav-mobile-drawer-link flex items-center gap-4 rounded-2xl px-2 py-5 text-left text-[15px] font-medium leading-snug transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.99]',
            active
                ? 'site-nav-mobile-drawer-link--active'
                : 'text-[#4b5563] hover:bg-[rgba(50,96,254,0.1)] hover:text-[#3260FE] active:bg-[rgba(50,96,254,0.16)] active:text-[#1d4ed8]',
        ]
            .filter(Boolean)
            .join(' ');
    };

    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <nav className="site-nav fixed inset-x-0 top-0 z-50 px-4 py-4 sm:py-5 md:px-6 lg:px-10 xl:px-16">
                <div className="site-nav-bar-enter mx-auto flex min-w-0 max-w-[1120px] items-center justify-between gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:gap-2 md:px-4 md:py-2.5 lg:gap-2.5 lg:px-6 lg:py-3 xl:px-7 glass-nav">
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-1.5 transition-opacity duration-300 hover:opacity-[0.92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3260FE]/40 sm:gap-2 sm:pr-2"
                    >
                        <img
                            src="/images/home/stitch/brand-icon.png"
                            alt="Plan Like a Local icon"
                            className="h-9 w-auto shrink-0 object-contain md:h-10 xl:h-11"
                        />
                        <img
                            src="/images/home/stitch/brand-wordmark.png"
                            alt="Plan Like a Local"
                            className="block h-11 w-auto shrink-0 object-contain md:h-12"
                        />
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
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <Close/> : <Menu/>}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile: backdrop + left drawer */}
            <div
                className={`fixed inset-0 z-[100] bg-slate-950/55 backdrop-blur-[2px] transition-opacity duration-300 ease-out md:hidden ${
                    mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
                onClick={closeMenu}
                onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
                role="presentation"
                aria-hidden={!mobileMenuOpen}
            />
            <aside
                className={`site-nav site-nav-mobile-drawer fixed left-0 top-0 z-[110] flex h-dvh w-[min(90vw,21rem)] max-w-[340px] flex-col border-r border-slate-200/90 bg-white transition-transform duration-300 ease-out md:hidden ${
                    mobileMenuOpen
                        ? 'translate-x-0 shadow-[8px_0_40px_-12px_rgba(15,23,42,0.12)]'
                        : '-translate-x-full shadow-none pointer-events-none'
                }`}
                aria-hidden={!mobileMenuOpen}
                aria-modal={mobileMenuOpen}
                role="dialog"
                aria-label="Main menu"
            >
                <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-6 pb-8 pt-7">
                    <Link
                        href="/"
                        className="flex min-w-0 flex-1 items-center gap-2 py-0.5 sm:gap-2.5"
                        onClick={closeMenu}
                    >
                        <img
                            src="/images/home/stitch/brand-icon.png"
                            alt="Plan Like a Local icon"
                            className="h-11 w-auto shrink-0 object-contain sm:h-12"
                        />
                        <img
                            src="/images/home/stitch/brand-wordmark.png"
                            alt="Plan Like a Local"
                            className="block h-12 w-auto min-w-0 max-w-full shrink object-contain sm:h-[3.25rem]"
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={closeMenu}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#3260FE] transition-colors hover:bg-slate-100"
                        aria-label="Close menu"
                    >
                        <Close sx={{fontSize: 24}}/>
                    </button>
                </div>

                <nav
                    className="flex flex-1 flex-col gap-0 overflow-y-auto overscroll-contain px-6 pb-6 pt-8"
                    aria-label="Mobile"
                >
                    {navItems.map((item, i) => {
                        const Icon = MOBILE_NAV_ICONS[i];
                        const isActive = normalizePath(item.href) === currentPath;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={drawerLinkClass(item.href)}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={closeMenu}
                            >
                                {Icon && (
                                    <Icon
                                        className={`shrink-0 transition-colors duration-150 ${
                                            isActive
                                                ? 'text-[#1d4ed8] group-hover:text-[#1e40af] group-active:text-[#1e40af]'
                                                : 'text-[#4b5563] group-hover:text-[#3260FE] group-active:text-[#1d4ed8]'
                                        }`}
                                        sx={{fontSize: 24}}
                                    />
                                )}
                                <span className="min-w-0 flex-1">{item.label}</span>
                            </Link>
                        );
                    })}
                    {onContactClick && (
                        <a
                            href="#"
                            className="site-nav-mobile-drawer-link group flex items-center gap-4 rounded-2xl px-2 py-5 text-left text-[15px] font-medium leading-snug text-[#4b5563] transition-[color,background-color,transform] duration-150 ease-out hover:bg-[rgba(50,96,254,0.1)] hover:text-[#3260FE] active:scale-[0.99] active:bg-[rgba(50,96,254,0.16)] active:text-[#1d4ed8]"
                            aria-haspopup="dialog"
                            onClick={(e) => {
                                e.preventDefault();
                                closeMenu();
                                onContactClick();
                            }}
                        >
                            <MailOutline
                                className="shrink-0 text-[#4b5563] transition-colors duration-150 group-hover:text-[#3260FE] group-active:text-[#1d4ed8]"
                                sx={{fontSize: 24}}
                            />
                            <span>Contact Us</span>
                        </a>
                    )}
                </nav>

                <div className="mt-auto shrink-0 border-t border-slate-200 px-6 pb-10 pt-10">
                    <div className="relative overflow-hidden rounded-[1.35rem] bg-[#3260FE] px-6 py-7 shadow-lg shadow-[#3260FE]/30">
                        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl"/>
                        <p className="relative text-center font-['Manrope',ui-sans-serif,sans-serif] text-[17px] font-semibold leading-tight text-white">
                            Start planning
                        </p>
                        <p className="relative mx-auto mt-4 max-w-[17rem] text-center text-[15px] leading-relaxed text-white/90 sm:text-[16px]">
                            Connect with a local expert and build your trip with confidence.
                        </p>
                        <Link
                            href="/plan"
                            className="relative mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 px-5 py-3.5 text-[14px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/25"
                            onClick={closeMenu}
                        >
                            Get started
                            <ArrowForward sx={{fontSize: 18}}/>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SiteNavigation;
