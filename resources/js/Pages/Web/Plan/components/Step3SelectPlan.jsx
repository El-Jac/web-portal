import React, { useState } from 'react';
import { CheckCircle } from '@mui/icons-material';

const plans = [
    {
        icon: '/images/plans/explore.png',
        id: 'explore',
        name: 'Explore Chat',
        description: 'A focused session to kick-start your travel planning with expert local insight.',
        features: [
            '30-minute video chat with your local specialist',
            'AI-generated notes summarising your session',
        ],
        price: '$99',
        duration: '30 min',
    },
    {
        icon: '/images/plans/pathfinder.png',
        id: 'pathfinder',
        name: 'Pathfinder Chat',
        description: 'A deeper dive to map out the perfect itinerary with curated local recommendations.',
        features: [
            '40-minute video chat with your local specialist',
            'AI-generated notes summarising your session',
            'Curated must-do list of activities, dining & insider tips',
        ],
        price: '$149',
        duration: '40 min',
        recommended: true,
    },
    {
        id: 'premium',
        icon: '/images/plans/premium.png',
        name: 'Premium Chat',
        description: 'The full-service experience — thorough, priority-access planning for discerning travellers.',
        features: [
            '60-minute video chat with your local specialist',
            'AI-generated notes summarising your session',
            'Curated must-do list of activities, dining & insider tips',
            'Priority support and extended consultation time',
        ],
        price: '$249',
        duration: '60 min',
    },
];

const Step3SelectPlan = ({ data, setData, errors }) => {
    const [selectedPlanId, setSelectedPlanId] = useState(data.plan_type || data.selected_plan || 'pathfinder');

    const handlePlanSelect = (planId) => {
        setSelectedPlanId(planId);
        setData('plan_type', planId);
        setData('selected_plan', planId);
    };

    return (
        <div>
            <div className="mb-8 text-center">
                <h2
                    className="mb-2 text-2xl font-bold tracking-tight text-[#0f1419] md:text-3xl"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    Choose Your Plan
                </h2>
                <p className="mx-auto max-w-[420px] text-[15px] leading-relaxed text-[#3f484a]"
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                    Pick the session that fits your travel style and budget.
                </p>
                {errors.plan_type && (
                    <p className="mt-2 text-sm text-red-500">{errors.plan_type}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                {plans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                        <div
                            key={plan.id}
                            onClick={() => handlePlanSelect(plan.id)}
                            className={[
                                'relative flex cursor-pointer flex-col overflow-visible rounded-2xl border bg-white p-5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 sm:rounded-3xl sm:p-6',
                                isSelected
                                    ? 'border-[#3260FE] shadow-[0_0_0_3px_rgba(50,96,254,0.12),0_20px_44px_-22px_rgba(50,96,254,0.2)]'
                                    : 'border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_44px_-22px_rgba(15,23,42,0.08)] hover:border-slate-300/80',
                            ].join(' ')}
                        >
                            {/* Recommended badge */}
                            {plan.recommended && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-[#EA6D4F] bg-slate-900/90 px-4 py-1 text-[0.7rem] font-semibold tracking-wide text-white backdrop-blur-md sm:px-5 sm:text-[0.75rem]">
                                    Most Popular
                                </span>
                            )}

                            {/* Plan icon */}
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3260FE]/8 sm:h-14 sm:w-14">
                                <img
                                    src={plan.icon}
                                    alt={plan.name}
                                    className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>

                            {/* Duration pill */}
                            <span className="mb-3 inline-block self-start rounded-full bg-slate-100 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#3f484a]">
                                {plan.duration}
                            </span>

                            <h3
                                className="mb-2 text-[1.05rem] font-bold leading-snug text-[#0f1419] sm:text-lg"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                {plan.name}
                            </h3>
                            <p className="mb-4 text-[13px] leading-relaxed text-[#3f484a] sm:text-sm">
                                {plan.description}
                            </p>

                            <ul className="mb-6 flex flex-col gap-2">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[13px] text-[#3f484a] sm:text-sm">
                                        <CheckCircle sx={{ fontSize: 15, color: '#3260FE', mt: '2px', flexShrink: 0 }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Price */}
                            <div className="mt-auto border-t border-slate-100 pt-4">
                                <span
                                    className="text-2xl font-bold text-[#0f1419] sm:text-3xl"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                    {plan.price}
                                </span>
                            </div>

                            {/* Selected ring indicator */}
                            {isSelected && (
                                <div className="absolute right-4 top-4 h-5 w-5 rounded-full bg-[#3260FE] flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12">
                                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Step3SelectPlan;
