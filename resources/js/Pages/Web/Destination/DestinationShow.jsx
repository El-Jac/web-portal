import React, { useState, useEffect, useRef } from "react";
import HeaderSection from "./components/HeaderSection.jsx";
import OverviewTab from "./components/OverviewTab.jsx";
import SeasonsTab from "./components/SeasonsTab.jsx";
import ActivitiesTab from "./components/ActivitiesTab.jsx";
import ItinerariesTab from "./components/ItinerariesTab.jsx";
import PlanTripTab from "./components/PlanTripTab.jsx";
import WebsiteLayout from "../../../Layouts/WebsiteLayout.jsx";

const tabs = [
    { id: 'overview-tab', label: 'Overview' },
    { id: 'seasons-tab', label: 'Best Time to Go' },
    { id: 'itineraries-tab', label: 'Itineraries' },
    { id: 'activities-tab', label: 'Activities' },
    { id: 'plan-trip-tab', label: 'Plan Your Trip' },
];

const DestinationShow = ({ destination }) => {
    const [activeTab, setActiveTab] = useState('overview-tab');
    const observerRef = useRef(null);

    useEffect(() => {
        const tabIds = tabs.map(tab => tab.id);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                let mostVisible = null;
                let maxRatio = 0;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisible = entry.target.id;
                    }
                });

                if (mostVisible) {
                    setActiveTab(mostVisible);
                } else {
                    const visibleEntries = entries.filter(e => e.isIntersecting);
                    if (visibleEntries.length > 0) {
                        visibleEntries.sort((a, b) => {
                            const aTop = a.boundingClientRect.top;
                            const bTop = b.boundingClientRect.top;
                            return Math.abs(aTop - 100) - Math.abs(bTop - 100);
                        });
                        setActiveTab(visibleEntries[0].target.id);
                    }
                }
            },
            {
                root: null,
                rootMargin: '-100px 0px -60% 0px',
                threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0],
            }
        );

        const timeoutId = setTimeout(() => {
            tabIds.forEach((tabId) => {
                const element = document.getElementById(tabId);
                if (element && observerRef.current) {
                    observerRef.current.observe(element);
                }
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    const handleTabClick = (tabId) => {
        const element = document.getElementById(tabId);
        if (element) {
            setActiveTab(tabId);
            const offset = 130;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <WebsiteLayout>
            <div className="min-h-screen bg-white">
                {/* Cinematic hero banner */}
                <HeaderSection destination={destination} />

                {/* Sticky tab navigation */}
                <div
                    className="sticky z-30 bg-white/90 border-b border-slate-100"
                    style={{ top: '64px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                >
                    <div className="max-w-7xl mx-auto px-8 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`px-5 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-200
                                    ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                                    }`}
                                style={activeTab === tab.id ? { boxShadow: '0 8px 24px rgba(50,96,254,0.3)' } : {}}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab content */}
                <div className="max-w-7xl mx-auto px-8 py-12 space-y-24">
                    <OverviewTab destination={destination} id="overview-tab" />
                    <SeasonsTab seasons={destination.seasons} id="seasons-tab" />
                    <ItinerariesTab itineraries={destination.itineraries} id="itineraries-tab" />
                    <ActivitiesTab activities={destination.activities} id="activities-tab" />
                    <PlanTripTab destination={destination} id="plan-trip-tab" />
                </div>

                <div className="pb-20" />
            </div>
        </WebsiteLayout>
    );
};

export default DestinationShow;
