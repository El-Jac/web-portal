import React, {useState} from 'react';
import {Link, usePage} from '@inertiajs/react';
import {ArrowForward} from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContactUsDialog from './ContactUsDialog';
import {navItems} from '../Pages/Web/Home/components/homeData';

function normalizePath(path) {
    if (!path) return '/';
    const clean = path.split('?')[0];
    if (clean === '/') return '/';
    return clean.replace(/\/$/, '') || '/';
}

/** Replace `#` with real profile URLs when available. */
const FOOTER_SOCIAL = [
    {label: 'Facebook', href: '#', Icon: FacebookIcon},
    {label: 'Instagram', href: '#', Icon: InstagramIcon},
];

const FOOTER_LEGAL = [
    {label: 'Privacy Policy', href: '#'},
    {label: 'Terms of Service', href: '#'},
    {label: 'Cookie Policy', href: '#'},
];

const SiteFooter = () => {
    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const {url} = usePage();
    const currentPath = normalizePath(url);

    const linkBase =
        "font-['Manrope',ui-sans-serif,sans-serif] text-[16px] font-medium text-white/55 transition-colors duration-200 hover:text-white";

    const siteMapLinkClass = (href) => {
        const active = normalizePath(href) === currentPath;
        return [
            'w-fit border-b border-transparent pb-0.5 text-left transition-colors duration-200',
            linkBase,
            active ? 'border-white/50 text-white' : '',
        ]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <>
            <footer
                className="relative overflow-x-hidden rounded-t-[100px] bg-[#0f131a] text-white"
                style={{
                    /* Rounded top without `overflow:hidden`, so `background-attachment: fixed` works */
                    clipPath: 'inset(0 round 100px 100px 0 0)',
                }}
            >
                <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
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
                            backgroundAttachment: 'fixed',
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
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 lg:gap-y-14">
                        {/* Brand + tagline + social + Start planning */}
                        <div className="flex flex-col items-center text-center lg:col-span-5 lg:items-start lg:text-left">
                            <Link
                                href="/"
                                className="group mb-6 inline-flex items-center gap-2 sm:gap-2.5"
                            >
                                <img
                                    src="/images/home/stitch/brand-icon.png?v=3"
                                    alt="Plan Like a Local icon"
                                    className="h-14 w-auto object-contain brightness-0 invert transition-[filter] duration-300 ease-out group-hover:filter-none sm:h-16 md:h-[4.5rem]"
                                />
                                <img
                                    src="/images/home/stitch/brand-wordmark.png"
                                    alt="Plan Like a Local"
                                    className="h-10 w-auto object-contain brightness-0 invert transition-[filter] duration-300 ease-out group-hover:filter-none md:h-12"
                                />
                            </Link>
                            <p className="mb-8 max-w-[320px] text-[15px] leading-[1.7] text-white/62">
                                Travel planned by people who{' '}
                                <span className="font-medium text-white/[0.92]">actually live there.</span>
                            </p>
                            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                                {FOOTER_SOCIAL.map(({label, href, Icon}) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        onClick={
                                            href === '#'
                                                ? (e) => e.preventDefault()
                                                : undefined
                                        }
                                        className="text-white/55 transition-colors duration-200 hover:text-white"
                                    >
                                        <Icon sx={{fontSize: 28}}/>
                                    </a>
                                ))}
                            </div>
                            <Link
                                href="/plan"
                                className="hero-cta-primary hero-cta-primary--bright-hover group inline-flex w-fit items-center rounded-xl px-6 py-3.5 text-[13px] text-white md:px-7 md:py-4 md:text-[14px]"
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

                        {/* Site map */}
                        <div className="lg:col-span-4">
                            <h2 className="mb-5 font-['Manrope',ui-sans-serif,sans-serif] text-[12px] font-bold uppercase tracking-[0.14em] text-white/75">
                                Site Map
                            </h2>
                            <nav
                                className="flex flex-col gap-3.5"
                                aria-label="Site map"
                            >
                                <Link href="/" className={siteMapLinkClass('/')}>
                                    Homepage
                                </Link>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={siteMapLinkClass(item.href)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setContactDialogOpen(true)}
                                    className="group w-fit border-b border-transparent pb-0.5 text-left font-['Manrope',ui-sans-serif,sans-serif] text-[16px] text-white/55 transition-[opacity,filter] duration-200 hover:text-white"
                                >
                                    <span className="become-planner-gradient font-bold transition-[filter] duration-200 group-hover:brightness-110">
                                        Become a Planner
                                    </span>
                                </button>
                            </nav>
                        </div>

                        {/* Legal */}
                        <div className="lg:col-span-3">
                            <h2 className="mb-5 font-['Manrope',ui-sans-serif,sans-serif] text-[12px] font-bold uppercase tracking-[0.14em] text-white/75">
                                Legal
                            </h2>
                            <ul className="flex flex-col gap-3.5">
                                {FOOTER_LEGAL.map(({label, href}) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            onClick={
                                                href === '#'
                                                    ? (e) => e.preventDefault()
                                                    : undefined
                                            }
                                            className={`${linkBase} inline-block`}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-14 border-t border-white/[0.09] pt-9">
                        <p className="text-center font-['Manrope',ui-sans-serif,sans-serif] text-[12px] leading-relaxed text-white/38">
                            &copy; {new Date().getFullYear()} Plan Like a Local. All rights reserved.
                        </p>
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
