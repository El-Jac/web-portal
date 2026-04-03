import React, { useState, useEffect, useRef } from 'react';
import { router, Link } from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';

const BADGES = ['Insider Pick', 'Hidden Gem', 'Trending', 'Remote Discovery', 'Local Favourite'];

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const MapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
  </svg>
);

const HikingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
  </svg>
);

const ArrowRightIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
  </svg>
);

const PinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
  </svg>
);

const Destinations = ({
  destinations: initialDestinations,
  pagination: initialPagination,
  filters: initialFilters = {},
  countries: initialCountries = [],
  regions: initialRegions = [],
  activities: initialActivities = []
}) => {
  const [destinations, setDestinations] = useState(initialDestinations || []);
  const [pagination, setPagination] = useState(initialPagination || {});
  const [countries] = useState(initialCountries);
  const [regions, setRegions] = useState(initialRegions);
  const [activities, setActivities] = useState(initialActivities);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isAppendingRef = useRef(false);
  const [filters, setFilters] = useState({
    country_id: initialFilters.country_id || '',
    region: '',
    activity: ''
  });

  const countriesWithAll = [{ id: 'all', name: 'All Countries' }, ...countries];
  const regionsWithAll = [{ id: 'all', name: 'All Regions' }, ...regions];
  const activitiesWithAll = [{ id: 'all', name: 'All Activities' }, ...activities];

  useEffect(() => {
    if (filters.country_id && filters.country_id !== 'all') {
      setFilters(prev => ({ ...prev, region: '', activity: '' }));
      setRegions([]);
      setActivities([]);
    } else {
      setRegions([]);
      setActivities([]);
      setFilters(prev => ({ ...prev, region: '', activity: '' }));
    }
  }, [filters.country_id]);

  useEffect(() => { setRegions(initialRegions); }, [initialRegions]);
  useEffect(() => { setActivities(initialActivities); }, [initialActivities]);

  useEffect(() => {
    if (destinations.length === 0 && initialDestinations && initialDestinations.length > 0) {
      setDestinations(initialDestinations);
      setPagination(initialPagination || {});
    }
  }, []);

  useEffect(() => {
    if (!isAppendingRef.current) {
      const currentCountryId = filters.country_id || '';
      const newCountryId = initialFilters.country_id || '';
      const currentRegion = filters.region || '';
      const newRegion = initialFilters.region || '';
      const currentActivity = filters.activity || '';
      const newActivity = initialFilters.activity || '';

      let newRegionId = '';
      if (newRegion) {
        const regionObj = regions.find(r => r.name === newRegion);
        newRegionId = regionObj ? regionObj.id : '';
      }

      let newActivityId = '';
      if (newActivity) {
        const activityObj = activities.find(a => a.name === newActivity);
        newActivityId = activityObj ? activityObj.id : '';
      }

      if (currentCountryId !== newCountryId ||
          currentRegion !== newRegionId ||
          currentActivity !== newActivityId) {
        setDestinations(initialDestinations || []);
        setPagination(initialPagination || {});
        setFilters({
          country_id: newCountryId,
          region: newRegionId,
          activity: newActivityId
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFilters.country_id, initialFilters.region, initialFilters.activity, regions, activities]);

  const handleFilterChange = (filterType, value) => {
    const filterValue = value === 'all' ? '' : (value || '');

    setFilters(prev => ({ ...prev, [filterType]: filterValue }));

    const filterParams = {};
    filterParams.country_id = filterType === 'country_id' ? filterValue : (filters.country_id || undefined);

    if (filterType === 'region') {
      const selectedRegion = regions.find(r => r.id === filterValue);
      filterParams.region = selectedRegion ? selectedRegion.name : filterValue;
    } else if (filters.region) {
      const currentRegion = regions.find(r => r.id === filters.region);
      filterParams.region = currentRegion ? currentRegion.name : filters.region;
    }

    if (filterType === 'activity') {
      const selectedActivity = activities.find(a => a.id === filterValue);
      filterParams.activity = selectedActivity ? selectedActivity.name : filterValue;
    } else if (filters.activity) {
      const currentActivity = activities.find(a => a.id === filters.activity);
      filterParams.activity = currentActivity ? currentActivity.name : filters.activity;
    }

    router.get('/destinations', filterParams, {
      preserveScroll: true,
      replace: true,
      onSuccess: () => {
        if (filterType === 'country_id') {
          setFilters(prev => ({ ...prev, region: '', activity: '' }));
        }
      }
    });
  };

  const handleSearch = () => {
    const filterParams = {};
    if (filters.country_id && filters.country_id !== 'all') filterParams.country_id = filters.country_id;
    if (filters.region && filters.region !== 'all') {
      const r = regions.find(r => r.id === filters.region);
      if (r) filterParams.region = r.name;
    }
    if (filters.activity && filters.activity !== 'all') {
      const a = activities.find(a => a.id === filters.activity);
      if (a) filterParams.activity = a.name;
    }
    router.get('/destinations', filterParams, { preserveScroll: true, replace: true });
  };

  const loadMoreDestinations = () => {
    if (!pagination.has_more_pages || isLoadingMore) return;

    setIsLoadingMore(true);
    isAppendingRef.current = true;

    const params = { page: pagination.current_page + 1 };
    if (filters.country_id && filters.country_id !== 'all') params.country_id = filters.country_id;
    if (filters.region && filters.region !== 'all') {
      const r = regions.find(r => r.id === filters.region);
      if (r) params.region = r.name;
    }
    if (filters.activity && filters.activity !== 'all') {
      const a = activities.find(a => a.id === filters.activity);
      if (a) params.activity = a.name;
    }

    router.get('/destinations', params, {
      preserveState: true,
      preserveScroll: true,
      only: ['destinations', 'pagination'],
      onSuccess: (page) => {
        setDestinations(prev => [...prev, ...(page.props.destinations || [])]);
        setPagination(page.props.pagination);
        setIsLoadingMore(false);
        isAppendingRef.current = false;
      },
      onError: () => {
        setIsLoadingMore(false);
        isAppendingRef.current = false;
      }
    });
  };

  const getImage = (destination) => destination.grid_image || destination.main_image;

  /* Render a standard card (col-span-1) */
  const renderStandardCard = (destination, index) => {
    const badge = BADGES[index % BADGES.length];
    const image = getImage(destination);

    return (
      <Link
        key={destination.id}
        href={`/destinations/${destination.id}`}
        className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)] transition-transform hover:-translate-y-2 duration-300 block"
      >
        <div className="relative h-72 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={destination.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <PinIcon />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              {badge}
            </span>
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-2xl font-bold text-slate-800">{destination.name}</h3>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <PinIcon />
            <span>{destination.country || destination.full_location}</span>
          </div>
          <p className="text-slate-500 mb-6 leading-relaxed line-clamp-2">{destination.description}</p>
          <div className="flex items-center justify-end">
            <span className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </Link>
    );
  };

  /* Render a wide featured card (col-span-2) */
  const renderFeaturedCard = (destination, index) => {
    const image = getImage(destination);

    return (
      <Link
        key={destination.id}
        href={`/destinations/${destination.id}`}
        className="group bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(43,43,81,0.06)] transition-transform hover:-translate-y-2 duration-300 lg:col-span-2 block"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 h-72 md:h-full overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <PinIcon />
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              {BADGES[(index + 3) % BADGES.length]}
            </span>
            <h3 className="text-3xl font-extrabold text-slate-800 mb-4">{destination.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <PinIcon />
              <span>{destination.country || destination.full_location}</span>
            </div>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed line-clamp-3">{destination.description}</p>
            <div className="flex items-center justify-end">
              <span className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 group-hover:bg-blue-700 transition-colors">
                Explore
                <ArrowRightIcon />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  /* Build grid rows: pattern is [card, card, card], [wide, card], repeat */
  const renderGrid = () => {
    const rows = [];
    let i = 0;

    while (i < destinations.length) {
      // Row of 3 standard cards
      const rowCards = destinations.slice(i, i + 3);
      rows.push(
        <React.Fragment key={`row-${i}`}>
          {rowCards.map((dest, idx) => renderStandardCard(dest, i + idx))}
        </React.Fragment>
      );
      i += 3;

      // If there are more, add a featured + 1 standard row
      if (i < destinations.length) {
        const featuredDest = destinations[i];
        const nextDest = destinations[i + 1];
        rows.push(
          <React.Fragment key={`featured-${i}`}>
            {renderFeaturedCard(featuredDest, i)}
            {nextDest && renderStandardCard(nextDest, i + 1)}
          </React.Fragment>
        );
        i += 2;
      }
    }

    return rows;
  };

  return (
    <WebsiteLayout>
      <div className="bg-white">

        {/* Hero Section */}
        <section className="relative overflow-hidden px-8 pt-16 pb-32" style={{backgroundColor: '#eef0ff', borderRadius: '0 0 80px 80px'}}>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-widest uppercase mb-6">
              Expertly Curated
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-800 mb-8 leading-[1.1]">
              Hidden Gems <br/>
              <span className="text-blue-600 italic">Only Locals</span> Know
            </h1>
            <div className="w-full max-w-[42rem] mx-auto mb-12">
              <p className="text-slate-500 text-[18px] leading-[1.75]">
                Skip the tourist traps. Discover authentic destinations through hand-picked local experiences from around the world.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-3xl shadow-[0_20px_40px_rgba(43,43,81,0.06)] flex flex-col md:flex-row gap-4 items-center">
              {/* Country */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl">
                <GlobeIcon />
                <select
                  className="bg-transparent border-none focus:ring-0 w-full text-slate-700 font-medium text-sm"
                  value={filters.country_id || 'all'}
                  disabled={isLoadingMore}
                  onChange={e => handleFilterChange('country_id', e.target.value)}
                >
                  {countriesWithAll.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl">
                <MapIcon />
                <select
                  className="bg-transparent border-none focus:ring-0 w-full text-slate-700 font-medium text-sm disabled:opacity-50"
                  value={filters.region || 'all'}
                  disabled={!filters.country_id || filters.country_id === 'all' || isLoadingMore}
                  onChange={e => handleFilterChange('region', e.target.value)}
                >
                  {regionsWithAll.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Activity */}
              <div className="flex-1 w-full flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl">
                <HikingIcon />
                <select
                  className="bg-transparent border-none focus:ring-0 w-full text-slate-700 font-medium text-sm disabled:opacity-50"
                  value={filters.activity || 'all'}
                  disabled={!filters.country_id || filters.country_id === 'all' || isLoadingMore}
                  onChange={e => handleFilterChange('activity', e.target.value)}
                >
                  {activitiesWithAll.map(a => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Search
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-8 right-8 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Destination Grid */}
        <section className="max-w-7xl mx-auto px-8 -mt-16 pb-24 relative z-20">
          {destinations.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-[18px] font-medium">No destinations found for the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {renderGrid()}
            </div>
          )}

          {/* Load More */}
          {pagination.has_more_pages && (
            <div className="text-center mt-16">
              <button
                onClick={loadMoreDestinations}
                disabled={isLoadingMore}
                className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isLoadingMore ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>Load More Destinations <ArrowRightIcon /></>
                )}
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-8 pb-32">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Plan Like a Local?
              </h2>
              <div className="w-full max-w-[42rem] mx-auto mb-10">
                <p className="text-blue-200 text-[18px] leading-[1.75]">
                  Tell us where you want to go, and we'll connect you with a local expert who will craft your perfect journey.
                </p>
              </div>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-2xl font-extrabold hover:bg-slate-50 transition-colors"
              >
                Get Started
                <ArrowRightIcon />
              </Link>
            </div>
            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />
          </div>
        </section>

      </div>
    </WebsiteLayout>
  );
};

export default Destinations;
