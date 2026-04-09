import React from 'react';
import {Link} from '@inertiajs/react';
import {ArrowBack, ArrowForward, ExpandMore} from '@mui/icons-material';
import DestinationCard from './DestinationCard';

const DestinationsSection = ({destinations = []}) => {
    if (!destinations || destinations.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full bg-[#f9f9f9] px-5 py-18 md:px-10 md:py-24 lg:px-16">
            <div className="mx-auto max-w-[1120px]">
                <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-[620px]">
                        <p className="ibrow">
                            Destinations
                        </p>
                        <h2 className="quotes">
                            Our <span className="font-light italic text-[#EA6D4F]">Most Popular</span> Travel
                            Destinations
                        </h2>
                        <p className="max-w-[470px] text-[14px] text-[#3f484a] md:text-[16px]">
                            Explore cities, towns, and hidden gems loved by travelers.
                        </p>
                    </div>

                </div>

                <div className="relative w-full">
                    <div
                        className="hide-scrollbar grid auto-cols-[88vw] grid-flow-col gap-4 overflow-x-auto pb-8 sm:auto-cols-[320px] lg:grid-flow-row lg:grid-cols-3 lg:auto-cols-auto lg:overflow-visible">
                        {destinations.map((destination) => (
                            <DestinationCard key={destination.id} destination={destination}/>
                        ))}
                    </div>

                    <div
                        className="pointer-events-none absolute bottom-8 right-0 top-0 hidden w-28 bg-gradient-to-l from-[#f9f9f9] to-transparent md:block lg:hidden"/>
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
};

export default DestinationsSection;
