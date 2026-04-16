import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from '@inertiajs/react';
import {ArrowForward, Person} from '@mui/icons-material';

const SWIPE_THRESHOLD_PX = 45;

const DestinationCard = ({destination}) => {
    const images = [
        destination.home_image,
        destination.grid_image,
        destination.banner_image,
    ].filter(Boolean);

    if (images.length === 0) images.push('/images/placeholder-destination.jpg');

    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);
    const pointerStartRef = useRef(null);

    const clearAutoRotate = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startAutoRotate = useCallback(() => {
        if (images.length <= 1) {
            return;
        }
        clearAutoRotate();
        intervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 8000);
    }, [images.length, clearAutoRotate]);

    const resetAutoRotateAfterInteraction = useCallback(() => {
        clearAutoRotate();
        startAutoRotate();
    }, [clearAutoRotate, startAutoRotate]);

    useEffect(() => {
        if (images.length <= 1) {
            return undefined;
        }
        const randomOffset = Math.random() * 4000;
        const start = setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
            startAutoRotate();
        }, randomOffset);
        return () => {
            clearTimeout(start);
            clearAutoRotate();
        };
    }, [images.length, startAutoRotate, clearAutoRotate]);

    const goNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        resetAutoRotateAfterInteraction();
    }, [images.length, resetAutoRotateAfterInteraction]);

    const goPrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
        resetAutoRotateAfterInteraction();
    }, [images.length, resetAutoRotateAfterInteraction]);

    const goToIndex = useCallback(
        (index) => {
            setActiveIndex(index % images.length);
            resetAutoRotateAfterInteraction();
        },
        [images.length, resetAutoRotateAfterInteraction],
    );

    const onPointerDown = (e) => {
        if (images.length <= 1 || e.button !== 0) {
            return;
        }
        if (e.target.closest?.('button')) {
            return;
        }
        e.stopPropagation();
        pointerStartRef.current = {x: e.clientX, y: e.clientY};
        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const onPointerUp = (e) => {
        if (images.length <= 1 || pointerStartRef.current == null) {
            return;
        }
        e.stopPropagation();
        const start = pointerStartRef.current;
        pointerStartRef.current = null;
        try {
            e.currentTarget.releasePointerCapture?.(e.pointerId);
        } catch {
            /* ignore */
        }
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) < SWIPE_THRESHOLD_PX) {
            return;
        }
        if (Math.abs(dx) < Math.abs(dy)) {
            return;
        }
        if (dx < 0) {
            goNext();
        } else {
            goPrev();
        }
    };

    return (
        <article
            className="group relative flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_40px_-16px_rgba(15,23,42,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12),0_24px_56px_-28px_rgba(15,23,42,0.14)] lg:w-auto"
        >
            <div className="relative w-full">
                <div
                    className={`relative h-52 w-full select-none overflow-hidden rounded-t-3xl touch-pan-y sm:h-[15rem] ${
                        images.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                    }`}
                    role={images.length > 1 ? 'region' : undefined}
                    aria-roledescription={images.length > 1 ? 'Image carousel' : undefined}
                    aria-label={
                        images.length > 1
                            ? `${destination.name} photos, swipe or use dots to change image`
                            : undefined
                    }
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => {
                        pointerStartRef.current = null;
                    }}
                >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/[0.12] to-transparent"/>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10"/>
                    <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#ea6c4fbf] px-[21px] py-2 text-white shadow-lg shadow-black/15 backdrop-blur-md backdrop-saturate-150">
                        <h3 className="text-[13px] font-semibold tracking-wide antialiased">
                            {destination.city || destination.name},{' '}
                            <span className="font-normal text-white/85">{destination.country}</span>
                        </h3>
                    </div>

                    {images.length > 1 && (
                        <div
                            className="absolute bottom-4 left-1/2 z-[1] flex -translate-x-1/2 gap-2"
                            role="tablist"
                            aria-label="Photo"
                        >
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === activeIndex}
                                    aria-label={`Photo ${i + 1} of ${images.length}`}
                                    className={`block h-1 rounded-full transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                                        i === activeIndex
                                            ? 'w-5 bg-white shadow-sm'
                                            : 'w-1.5 bg-white/35 hover:bg-white/55'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToIndex(i);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {destination.featured_specialist && (
                    <div className="absolute -bottom-12 left-5 z-10">
                        <div className="h-24 w-24 overflow-hidden rounded-full border-[3px] border-white bg-slate-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.28)] ring-1 ring-slate-900/5">
                            {destination.featured_specialist.profile_pic ? (
                                <img
                                    src={destination.featured_specialist.profile_pic}
                                    alt={`${destination.featured_specialist.full_name} avatar`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#3260FE]/10">
                                    <Person sx={{fontSize: 36, color: '#3260FE'}}/>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div
                className={`flex flex-1 flex-col px-5 pb-6 sm:px-6 ${destination.featured_specialist ? 'pt-16' : 'pt-6'}`}
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        {destination.featured_specialist ? (
                            <>
                                <h4 className="mb-1 text-xl font-bold leading-tight tracking-tight text-slate-900">
                                    {destination.overview_title || destination.name}
                                </h4>
                                <p className="text-sm font-medium leading-snug text-slate-600">
                                    <span className="italic">with</span>{' '}
                                    {destination.featured_specialist.full_name}
                                </p>
                            </>
                        ) : (
                            <>
                                <h4 className="mb-1.5 text-xl font-bold tracking-tight text-slate-900">
                                    {destination.name}
                                </h4>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    {destination.specialist_count || 0} Local Expert{destination.specialist_count !== 1 ? 's' : ''} Available
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <p className="mb-6 min-h-[88px] text-[15px] leading-[1.65] text-slate-600 antialiased">
                    {destination.description || destination.overview || `Discover the wonders of ${destination.name} with our local experts.`}
                </p>

                <div className="mt-auto flex flex-col items-start gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                    <div className="tabular-nums text-slate-900">
                        <span className="mb-0.5 block text-[9px] font-medium uppercase tracking-[0.22em] text-slate-400">
                            Starting at
                        </span>
                        <span className="text-lg font-semibold tracking-tight">$100</span>
                    </div>
                    <Link
                        href={`/destinations/${destination.id}`}
                        className="hero-cta-primary inline-flex items-center rounded-xl px-5 py-2.5 text-[12px] text-white"
                    >
                        <span className="relative z-[1] inline-flex items-center gap-2 font-bold">
                            Plan {destination.city || destination.name}
                            <ArrowForward sx={{fontSize: 16}}/>
                        </span>
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default DestinationCard;
