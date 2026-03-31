import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowBack, ArrowForward, ExpandMore, PhotoLibraryOutlined, Star} from '@mui/icons-material';
import {destinationCards} from './homeData';

const DestinationsSection = () => (
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
);

export default DestinationsSection;
