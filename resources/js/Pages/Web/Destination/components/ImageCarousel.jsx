import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
    const safeImages = useMemo(() => (images || []).filter((img) => !!img?.url), [images]);
    const [index, setIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const dragRef = useRef({ dragging: false, startX: 0, startY: 0, lastX: 0, lastY: 0 });

    // Close lightbox on Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setLightboxOpen(false); };
        if (lightboxOpen) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [lightboxOpen]);

    if (!safeImages.length) {
        return (
            <div className="text-center py-16 border-2 border-dashed border-slate-200 flex items-center justify-center min-h-[260px]">
                <p className="text-slate-400" style={{ fontSize: '15px' }}>No images available</p>
            </div>
        );
    }

    const goPrev = () => setIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
    const goNext = () => setIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
    const current = safeImages[index];

    const openLightbox = () => {
        setLightboxOpen(true);
        setZoom(1);
        setOffset({ x: 0, y: 0 });
    };

    return (
        <>
            {/* Main carousel */}
            <div className="relative w-full overflow-hidden">
                <img
                    src={current.url}
                    alt={current.name || `Image ${index + 1}`}
                    onClick={openLightbox}
                    className="w-full object-cover"
                    style={{ height: 'clamp(260px, 35vw, 420px)', cursor: 'zoom-in' }}
                />

                {/* Prev button */}
                <button
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
                >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Next button */}
                <button
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
                >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Caption */}
                {(current.name || current.image_type) && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
                        {current.name && (
                            <span
                                className="text-white text-[12px] font-medium px-2.5 py-1 rounded-lg"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                            >
                                {current.name}
                            </span>
                        )}
                        {current.image_type && (
                            <span className="bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                {current.image_type}
                            </span>
                        )}
                    </div>
                )}

                {/* Dot indicators */}
                {safeImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 flex gap-1.5">
                        {safeImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Go to image ${i + 1}`}
                                className="w-2 h-2 rounded-full transition-all"
                                style={{ backgroundColor: i === index ? '#3260FE' : 'rgba(255,255,255,0.7)' }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox overlay */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
                    onClick={() => setLightboxOpen(false)}
                >
                    {/* Controls */}
                    <div
                        className="absolute top-4 right-4 z-10 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))}
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Zoom out"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setZoom((z) => Math.min(5, Number((z + 0.2).toFixed(2))))}
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Zoom in"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Reset zoom"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                            aria-label="Close lightbox"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Pan/zoom image */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <PanZoomImage
                            src={current.url}
                            alt={current.name || 'Image'}
                            zoom={zoom}
                            setZoom={setZoom}
                            offset={offset}
                            setOffset={setOffset}
                            dragRef={dragRef}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

const PanZoomImage = ({ src, alt, zoom, setZoom, offset, setOffset, dragRef }) => {
    const containerRef = useRef(null);

    const onWheel = useCallback((e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.2 : -0.2;
        setZoom((prev) => {
            const newZoom = Math.min(5, Math.max(1, Number((prev + delta).toFixed(2))));
            if (!containerRef.current) return newZoom;
            try {
                const rect = containerRef.current.getBoundingClientRect();
                const cx = e.clientX - rect.left - rect.width / 2;
                const cy = e.clientY - rect.top - rect.height / 2;
                const scaleChange = newZoom / prev;
                setOffset((o) => ({ x: o.x - cx * (scaleChange - 1), y: o.y - cy * (scaleChange - 1) }));
            } catch (_) {}
            return newZoom;
        });
    }, [setZoom, setOffset]);

    const onMouseDown = (e) => {
        e.preventDefault();
        dragRef.current.dragging = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.lastX = offset.x;
        dragRef.current.lastY = offset.y;
    };
    const onMouseMove = (e) => {
        if (!dragRef.current.dragging) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setOffset({ x: dragRef.current.lastX + dx, y: dragRef.current.lastY + dy });
    };
    const endDrag = () => { dragRef.current.dragging = false; };

    const onTouchStart = (e) => {
        if (e.touches.length === 1) {
            const t = e.touches[0];
            dragRef.current.dragging = true;
            dragRef.current.startX = t.clientX;
            dragRef.current.startY = t.clientY;
            dragRef.current.lastX = offset.x;
            dragRef.current.lastY = offset.y;
        }
    };
    const onTouchMove = (e) => {
        if (!dragRef.current.dragging || e.touches.length !== 1) return;
        const t = e.touches[0];
        const dx = t.clientX - dragRef.current.startX;
        const dy = t.clientY - dragRef.current.startY;
        setOffset({ x: dragRef.current.lastX + dx, y: dragRef.current.lastY + dy });
    };
    const onTouchEnd = () => { dragRef.current.dragging = false; };

    return (
        <div
            ref={containerRef}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                width: '90vw',
                height: '80vh',
                cursor: zoom > 1 ? 'grab' : 'zoom-in',
                backgroundColor: 'black',
            }}
        >
            <img
                src={src}
                alt={alt}
                draggable={false}
                style={{
                    userSelect: 'none',
                    pointerEvents: 'none',
                    maxWidth: 'none',
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                }}
            />
        </div>
    );
};

export default ImageCarousel;
