import React from 'react';
import { TrendingUpOutlined, LanguageOutlined, StarOutlined } from '@mui/icons-material';

const stats = [
    { value: '500+', label: 'Trips Planned', Icon: TrendingUpOutlined },
    { value: '50+', label: 'Destinations Covered', Icon: LanguageOutlined },
    { value: '98%', label: 'Client Satisfaction', Icon: StarOutlined },
];

const WhoWeAreStatsSection = () => (
    <section className="bg-white px-5 pb-10 md:px-10 md:pb-14 lg:px-16">
        <div className="mx-auto max-w-[1120px]">
            <div className="grid grid-cols-1 gap-6 border-t border-[#ececec] pt-10 sm:grid-cols-3">
                {stats.map(({ value, label, Icon }) => (
                    <div key={label} className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-[2.75rem] font-extrabold leading-none tracking-[-0.05em] text-[#1a1c1c]">
                                {value}
                            </p>
                            <p className="mt-1.5 text-[12px] font-medium text-[#5a6472]">
                                + {label}
                            </p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3260FE]/8">
                            <Icon sx={{ fontSize: 20, color: '#3260FE', opacity: 0.8 }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WhoWeAreStatsSection;
