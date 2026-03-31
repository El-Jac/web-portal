import React, {useState} from 'react';
import {Head, Link} from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';
import {
    AccountBalanceWalletOutlined,
    ArrowBack,
    ArrowForward,
    CalendarMonthOutlined,
    Close,
    EventAvailableOutlined,
    ExpandMore,
    FavoriteBorder,
    LocalActivityOutlined,
    MapOutlined,
    Menu,
    PhotoLibraryOutlined,
    Star,
    SupportAgent,
    VerifiedOutlined,
    VideoChatOutlined,
} from '@mui/icons-material';

const navItems = [
    {label: 'Who We Are', href: '/who-we-are'},
    {label: 'Destinations', href: '/destinations'},
    {label: 'What We Do', href: '/what-we-do'},
    {label: 'Contact Us', href: '/contact'},
];

const featureHighlights = [
    {label: 'Faster Planning', icon: EventAvailableOutlined},
    {label: 'Expert Guidance', icon: VerifiedOutlined},
    {label: 'Personalized Support', icon: FavoriteBorder},
    {label: '24/7 Support', icon: SupportAgent},
    {label: 'Authentic Experiences', icon: LocalActivityOutlined},
];

const destinationCards = [
    {
        city: 'Tokyo',
        country: 'Japan',
        name: 'Kenji Sato',
        title: 'City Planning Specialist • Traveler',
        description: "Kenji combines deep local knowledge with structured planning to help you navigate Tokyo's modern districts and traditional areas with clarity and confidence.",
        image: '/images/home/stitch/tokyo.jpg',
        avatar: '/images/home/stitch/kenji.jpg',
    },
    {
        city: 'London',
        country: 'UK',
        name: 'Emma Clarke',
        title: 'Local Travel Expert',
        description: 'With over 6 years of experience guiding travelers through London, Emma specializes in cultural landmarks, hidden neighborhoods, and efficient trip planning.',
        image: '/images/home/stitch/london.jpg',
        avatar: '/images/home/stitch/emma.jpg',
    },
    {
        city: 'Sydney',
        country: 'Australia',
        name: 'Daniel Wright',
        title: 'Local Travel Planning Expert',
        description: "Daniel specializes in travel planning across Sydney's coastal walks, urban districts, and cultural landmarks. He balances iconic highlights with local insight.",
        image: '/images/home/stitch/sydney.jpg',
        avatar: '/images/home/stitch/daniel.jpg',
    },
];

const processSteps = [
    {
        step: 'Step 01',
        title: 'Schedule Appointment.',
        description: "Choose a time that works best for you and share your travel ideas, and any specific interests or experiences you'd like to include.",
        icon: CalendarMonthOutlined,
    },
    {
        step: 'Step 02',
        title: 'Complete Payment.',
        description: 'Secure your appointment with a smooth and transparent payment process.',
        icon: AccountBalanceWalletOutlined,
    },
    {
        step: 'Step 03',
        title: 'Video Meeting (Planning).',
        description: 'Connect one-on-one with a local expert to craft your perfect trip, tailored to your style, budget, and must-see spots.',
        icon: VideoChatOutlined,
    },
    {
        step: 'Step 04',
        title: 'Personalized Itinerary Delivery.',
        description: 'Get a personalized, ready-to-use travel plan with expert recommendations and practical guidance for a confident journey.',
        icon: MapOutlined,
    },
];

const Index = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <WebsiteLayout minimalChrome>
            <Head title="Plan Like a Local | Personalized Travel Itineraries">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <style>{`
                .stitch-home {
                    background: #f9f9f9;
                    color: #1a1c1c;
                    font-family: 'Inter', sans-serif;
                }
                .stitch-home h1,
                .stitch-home h2,
                .stitch-home h3,
                .stitch-home h4 {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .glass-nav {
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 20px 40px -10px rgba(26, 28, 28, 0.12);
                }
                .editorial-shadow {
                    box-shadow: 0 20px 40px -10px rgba(26, 28, 28, 0.12);
                }
                .hero-overlay {
                    background: linear-gradient(to right, rgba(249, 249, 249, 1) 25%, rgba(249, 249, 249, 0.6) 50%, rgba(249, 249, 249, 0) 80%);
                }
                .mesh-section {
                    background-image:
                        radial-gradient(at 100% 0%, rgba(50, 96, 254, 0.05) 0px, transparent 50%),
                        radial-gradient(at 0% 100%, rgba(50, 96, 254, 0.05) 0px, transparent 50%);
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 1024px) {
                    .hero-overlay {
                        background: linear-gradient(to top, rgba(249, 249, 249, 1) 30%, rgba(249, 249, 249, 0.4) 100%);
                    }
                }
                @media (max-width: 767px) {
                    .hero-overlay {
                        background: linear-gradient(to top, rgba(249, 249, 249, 1) 18%, rgba(249, 249, 249, 0.9) 42%, rgba(249, 249, 249, 0.15) 100%);
                    }
                }
            `}</style>

            <div className="stitch-home overflow-x-hidden">
                <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-10 lg:px-16">
                    <div className="mx-auto flex max-w-[1120px] items-center justify-between rounded-full px-3 py-2 md:px-8 md:py-2.5 glass-nav">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/images/home/stitch/brand-icon.png" alt="Plan Like a Local icon"
                                 className="h-7 w-auto object-contain md:h-9"/>
                            <img src="/images/home/stitch/brand-wordmark.png" alt="Plan Like a Local"
                                 className="hidden h-6 w-auto object-contain sm:block"/>
                        </Link>

                        <div className="hidden items-center gap-9 md:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-[10px] font-medium tracking-[0.22em] text-[#3f484a] transition-colors hover:text-[#3260FE]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/plan"
                                className="hidden items-center rounded-lg bg-[#3260FE] px-5 py-2 text-[11px] font-semibold text-white shadow-lg shadow-[#3260FE]/20 transition-transform hover:scale-[1.02] md:inline-flex"
                            >
                                Start Planning
                                <ArrowForward sx={{fontSize: 18, ml: 1}}/>
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
                                <Link
                                    href="/plan"
                                    className="inline-flex items-center justify-center rounded-xl bg-[#3260FE] px-5 py-3 text-sm font-semibold text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Start Planning
                                    <ArrowForward sx={{fontSize: 18, ml: 1}}/>
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>

                <header className="relative flex min-h-screen items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/home/stitch/hero.jpg"
                            alt="Woman with a straw hat and backpack walking on a coastal path with yellow flowers"
                            className="h-full w-full object-cover object-[74%_center] md:object-[72%_center]"
                        />
                        <div className="hero-overlay absolute inset-0"/>
                    </div>

                    <div className="relative z-10 mx-auto flex w-full max-w-[1120px] px-5 py-24 md:px-10 lg:px-0 lg:py-0">
                        <div className="max-w-[520px] pt-16 sm:pt-20 md:pt-0">
                            <div className="mb-6 inline-block rounded-full bg-[#3260FE]/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#3260FE] backdrop-blur-sm md:mb-7 md:px-4 md:text-[9px] md:tracking-[0.22em]">
                                #1 Planning Hub for your Trips
                            </div>

                            <h1 className="mb-6 text-[2.75rem] font-extrabold leading-[0.92] tracking-[-0.06em] text-[#1a1c1c] sm:text-[3.2rem] md:mb-7 md:text-[5.2rem]">
                                Your personal
                                <br/>
                                itinerary,
                                <br/>
                                <span className="text-[1.95rem] font-light italic leading-[0.96] text-[#3260FE] sm:text-[2.4rem] md:text-[4.25rem]">
                                    planned by real
                                </span>
                                <br/>
                                <span className="text-[1.95rem] font-light italic leading-[0.96] text-[#3260FE] sm:text-[2.4rem] md:text-[4.25rem]">
                                    people who live there.
                                </span>
                            </h1>

                            <p className="mb-8 max-w-[310px] text-[15px] leading-[1.65] text-[#3f484a] sm:max-w-[360px] sm:text-[17px] md:mb-10 md:text-[20px] md:leading-[1.75]">
                                Connect with local experts to plan your perfect trip. Your priorities, your pace, your local guide.
                            </p>

                            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 md:gap-7">
                                <Link
                                    href="/plan"
                                    className="inline-flex items-center rounded-xl bg-[#3260FE] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(50,96,254,0.8)] transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-10px_rgba(50,96,254,0.35)] md:px-7 md:py-4 md:text-[14px]"
                                >
                                    Start Planning
                                    <ArrowForward sx={{ml: 1, fontSize: 18}}/>
                                </Link>
                                <Link
                                    href="/destinations"
                                    className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#3260FE] sm:text-[10px] sm:tracking-[0.2em]"
                                >
                                    <span className="h-px w-12 bg-[#3260FE]/30 transition-all group-hover:w-16"/>
                                    View Destinations
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-none">
                        <svg className="relative block h-[60px] w-full md:h-[120px]" preserveAspectRatio="none"
                             viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z" fill="#f9f9f9"/>
                        </svg>
                    </div>
                </header>

                <section className="relative z-30 overflow-hidden bg-[#f9f9f9] px-5 py-14 md:px-10 md:py-16 lg:px-16">
                    <div className="mx-auto max-w-[1120px]">
                        <div className="mb-18 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mb-24 md:grid-cols-5 md:gap-4">
                            {featureHighlights.map(({label, icon: Icon}) => (
                                <div key={label} className="group flex items-center gap-2.5 rounded-2xl bg-white/40 px-3 py-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eeeeee] text-[#3f484a] transition-colors group-hover:bg-[#3260FE]/10 group-hover:text-[#3260FE]">
                                        <Icon sx={{fontSize: 18}}/>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#3f484a] md:text-[10px]">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mb-16 grid grid-cols-1 gap-6 md:mb-24 lg:grid-cols-12 lg:items-start">
                            <div className="pt-1 md:pt-4 lg:col-span-3">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3f484a]">
                                    Who We Are
                                </span>
                            </div>
                            <div className="lg:col-span-8 lg:col-start-4">
                                <h2 className="mb-8 max-w-[760px] text-[2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.35rem] md:mb-10 md:text-[4.1rem]">
                                    This isn&apos;t a travel guide.
                                    <br/>
                                    <span className="font-light italic text-[#EA6D4F]">It&apos;s a one-on-one planning</span>
                                    <br/>
                                    experience designed to help
                                    <br/>
                                    you explore with <span className="font-light italic text-[#EA6D4F]">clarity,</span>
                                    <br/>
                                    <span className="font-light italic text-[#EA6D4F]">confidence, and local</span>
                                    <br/>
                                    <span className="font-light italic text-[#EA6D4F]">knowledge.</span>
                                </h2>
                                <Link
                                    href="/who-we-are"
                                    className="inline-flex items-center rounded-lg bg-[#1a1c1c] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#f9f9f9] shadow-xl transition-all hover:scale-[1.02] md:px-6 md:text-[10px]"
                                >
                                    Meet Founders
                                    <ArrowForward sx={{ml: 1, fontSize: 16}}/>
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-[#f3f3f3] px-5 py-7 md:px-8 md:py-10">
                            <div className="grid grid-cols-2 gap-y-6 sm:gap-6 lg:grid-cols-4 lg:gap-0">
                                {[
                                    ['100+', 'Destinations'],
                                    ['500+', 'Local Experts'],
                                    ['10,000+', 'Happy Travelers'],
                                    ['200+', 'Hidden Gems'],
                                ].map(([value, label]) => (
                                    <div key={label} className="text-center lg:border-r lg:border-[#bec8ca]/30 lg:px-6 lg:text-left last:border-r-0">
                                        <div className="mb-1 text-[2.1rem] font-extrabold tracking-[-0.04em] text-[#1a1c1c] sm:text-[2.4rem] md:text-[3.2rem]">{value}</div>
                                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3f484a]">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative w-full bg-[#f9f9f9] px-5 py-18 md:px-10 md:py-24 lg:px-16">
                    <div className="mx-auto max-w-[1120px]">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="max-w-[620px]">
                                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3f484a]">
                                    Destinations
                                </p>
                                <h2 className="mb-4 text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                                    Our <span className="font-light italic text-[#EA6D4F]">Most Popular</span> Travel Destinations
                                </h2>
                                <p className="max-w-[470px] text-[14px] text-[#3f484a] md:text-[16px]">
                                    Explore cities, towns, and hidden gems loved by travelers.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-[#bec8ca] bg-white px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1a1c1c]"
                            >
                                Featured
                                <ExpandMore sx={{fontSize: 16}}/>
                            </button>
                        </div>

                        <div className="relative w-full">
                            <div className="hide-scrollbar grid auto-cols-[88vw] grid-flow-col gap-4 overflow-x-auto pb-8 sm:auto-cols-[320px] lg:grid-flow-row lg:grid-cols-3 lg:auto-cols-auto lg:overflow-visible">
                                {destinationCards.map((card) => (
                                    <article
                                        key={card.city}
                                        className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border border-[#ececec] bg-white shadow-[0_10px_30px_-20px_rgba(26,28,28,0.35)] lg:w-auto"
                                    >
                                        <div className="relative h-52 w-full overflow-hidden sm:h-56">
                                            <img src={card.image} alt={`${card.city} destination`}
                                                 className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                                            <div className="absolute left-4 top-4 text-white">
                                                <h3 className="text-[15px] font-bold">
                                                    {card.city}, <span className="font-normal text-white/80">{card.country}</span>
                                                </h3>
                                            </div>
                                            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-md">
                                                <Star sx={{fontSize: 14, color: '#facc15'}}/>
                                                <span className="text-[11px] font-medium text-white">4.8</span>
                                            </div>
                                            <div className="absolute -bottom-7 left-4">
                                                <div className="h-14 w-14 overflow-hidden rounded-2xl border-[3px] border-white bg-gray-200 shadow-lg">
                                                    <img src={card.avatar} alt={`${card.name} avatar`} className="h-full w-full object-cover"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col px-4 pb-4 pt-10 sm:px-5">
                                            <div className="mb-4 flex items-start justify-between gap-4">
                                                <div>
                                                    <h4 className="mb-1 text-[17px] font-bold">{card.name}</h4>
                                                    <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3f484a]">
                                                        {card.title}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeeeee] text-[#3f484a] transition-colors hover:bg-[#3260FE]/10 hover:text-[#3260FE]"
                                                    aria-label={`View ${card.city} gallery`}
                                                >
                                                    <PhotoLibraryOutlined sx={{fontSize: 16}}/>
                                                </button>
                                            </div>

                                            <p className="mb-6 min-h-[88px] text-[12px] leading-[1.55] text-[#3f484a]">
                                                {card.description}
                                            </p>

                                            <div className="mt-auto flex flex-col items-start gap-3 border-t border-[#bec8ca]/30 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                                                <div className="font-bold text-[#1a1c1c]">
                                                    <span className="text-[15px]">$100</span>
                                                    <span className="text-[8px] uppercase tracking-[0.15em] text-[#3f484a]"> / session</span>
                                                </div>
                                                <Link
                                                    href="/plan"
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#3260FE] px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-[#3260FE]/20 transition-colors hover:bg-[#2951df]"
                                                >
                                                    Plan {card.city}
                                                    <ArrowForward sx={{fontSize: 14}}/>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            <div className="pointer-events-none absolute bottom-8 right-0 top-0 hidden w-28 bg-gradient-to-l from-[#f9f9f9] to-transparent md:block lg:hidden"/>
                        </div>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                                href="/destinations"
                                className="inline-flex items-center gap-3 rounded-full border border-[#bec8ca] bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1c1c] shadow-sm transition-colors hover:bg-[#f3f3f3]"
                            >
                                Explore All Destinations
                                <ArrowForward sx={{fontSize: 16}}/>
                            </Link>
                            <div className="hidden gap-4 sm:flex">
                                <button type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bec8ca] text-[#1a1c1c] transition-colors hover:bg-white">
                                    <ArrowBack sx={{fontSize: 18}}/>
                                </button>
                                <button type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bec8ca] text-[#1a1c1c] transition-colors hover:bg-white">
                                    <ArrowForward sx={{fontSize: 18}}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mesh-section overflow-hidden bg-[#f9f9f9] px-5 py-18 md:px-10 md:py-24 lg:px-16">
                    <div className="mx-auto max-w-[1120px]">
                        <div className="mb-14 text-center md:mb-18">
                            <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1a1c1c]">
                                What We Do
                            </span>
                            <h2 className="mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#1a1c1c] sm:text-[2.5rem] md:text-[3.8rem]">
                                We Make Travel Planning
                                <br/>
                                <span className="font-light italic text-[#3260FE]">Personalized.</span>
                            </h2>
                            <p className="mx-auto max-w-[560px] text-[14px] leading-[1.7] text-[#3f484a] md:text-[15px]">
                                We bridge the gap between travelers and locals, turning ideas into thoughtfully planned journeys tailored to you.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {processSteps.map(({step, title, description, icon: Icon}) => (
                                <div key={step} className="flex flex-col">
                                    <div className="editorial-shadow mb-5 flex h-[92px] items-center justify-center overflow-hidden rounded-[2rem] border border-[#ececec] bg-white">
                                        <div className="flex h-full w-full items-center justify-center bg-[#f8f8f8] transition-colors duration-500 hover:bg-[#3260FE]/5">
                                            <Icon sx={{fontSize: 40, color: '#3260FE', opacity: 0.9}}/>
                                        </div>
                                    </div>
                                    <div className="mb-3 inline-flex w-fit items-center rounded-full border border-[#EA6D4F]/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#EA6D4F]">
                                        {step}
                                    </div>
                                    <h3 className="mb-2 text-[1.45rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#1a1c1c] sm:text-[1.6rem] md:text-[1.8rem]">{title}</h3>
                                    <p className="max-w-[280px] text-[12px] leading-[1.6] text-[#3f484a]">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </WebsiteLayout>
    );
};

export default Index;
