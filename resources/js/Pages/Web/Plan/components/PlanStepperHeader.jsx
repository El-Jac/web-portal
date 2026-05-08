import React from 'react';

const PlanStepperHeader = ({ activeStep, totalSteps }) => {
    const progress = ((activeStep + 1) / totalSteps) * 100;

    return (
        <div className="mb-6">
            <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-[#3260FE] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default PlanStepperHeader;
