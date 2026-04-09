import React, {useState, useEffect} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward, Person} from '@mui/icons-material';

const DestinationCard = ({destination}) => {
    const images = [
        destination.home_image,
        destination.grid_image,
        destination.banner_image,
    ].filter(Boolean);

    if (images.length === 0) images.push('/images/placeholder-destination.jpg');

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const randomOffset = Math.random() * 4000;
        let timer;
        const start = setTimeout(() => {
            setActiveIndex(prev => (prev + 1) % images.length);
            timer = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % images.length);
            }, 8000);
        }, randomOffset);
        return () => { clearTimeout(start); clearInterval(timer); };
    }, [images.length]);

    return (
        <article className="group relative flex w-full shrink-0 snap-start flex-col rounded-[1.75rem] border border-[#ececec] bg-white shadow-[0_10px_30px_-20px_rgba(26,28,28,0.35)] transition-transform duration-300 ease-out hover:-translate-y-2.5 lg:w-auto">
            <div className="relative w-full">
                <div className="relative h-52 w-full overflow-hidden rounded-t-[1.75rem] sm:h-56">
                    {images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={`${destination.name} destination`}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-in-out ${
                                i === activeIndex
                                    ? 'opacity-100 blur-0 scale-100'
                                    : 'opacity-0 blur-md scale-105'
                            }`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>
                    <div className="absolute left-4 top-4 text-white">
                        <h3 className="text-[15px] font-bold">
                            {destination.city || destination.name},{' '}
                            <span className="font-normal text-white/80">{destination.country}</span>
                        </h3>
                    </div>

                    {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 rounded-full transition-all duration-300 ${
                                        i === activeIndex ? 'w-4 bg-white' : 'w-1 bg-white/50'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {destination.featured_specialist && (
                    <div className="absolute -bottom-7 left-4 z-10">
                        <div className="h-14 w-14 overflow-hidden rounded-full border-[3px] border-white bg-gray-200 shadow-lg">
                            {destination.featured_specialist.profile_pic ? (
                                <img
                                    src={destination.featured_specialist.profile_pic}
                                    alt={`${destination.featured_specialist.full_name} avatar`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#3260FE]/10">
                                    <Person sx={{fontSize: 24, color: '#3260FE'}}/>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className={`flex flex-1 flex-col px-4 pb-4 sm:px-5 ${destination.featured_specialist ? 'pt-10' : 'pt-5'}`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        {destination.featured_specialist ? (
                            <>
                                <h4 className="mb-1 text-[1.2rem] font-bold">
                                    {destination.featured_specialist.full_name}
                                </h4>
                                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3f484a]">
                                    Local Travel Expert
                                    {destination.featured_specialist.city && ` • ${destination.featured_specialist.city}`}
                                </p>
                            </>
                        ) : (
                            <>
                                <h4 className="mb-1 text-[1.2rem] font-bold">{destination.name}</h4>
                                <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#3f484a]">
                                    {destination.specialist_count || 0} Local Expert{destination.specialist_count !== 1 ? 's' : ''} Available
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <p className="description-text mb-6 min-h-[88px]">
                    {destination.description || destination.overview || `Discover the wonders of ${destination.name} with our local experts.`}
                </p>

                <div className="mt-auto flex flex-col items-start gap-3 border-t border-[#bec8ca]/30 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="font-bold text-[#1a1c1c]">
                        <span className="text-[8px] uppercase tracking-[0.15em] text-[#3f484a]">STARTING AT </span>
                        <span className="text-[15px]">$100</span>
                    </div>
                    <Link
                        href={`/destinations/${destination.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#3260FE] px-4 py-2 text-[11px] font-bold text-white shadow-lg shadow-[#3260FE]/20 transition-colors hover:bg-[#2951df]"
                    >
                        Plan {destination.city || destination.name}
                        <ArrowForward sx={{fontSize: 14}}/>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default DestinationCard;
