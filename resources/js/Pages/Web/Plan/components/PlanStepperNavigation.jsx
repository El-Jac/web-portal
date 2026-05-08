import React from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const PlanStepperNavigation = ({
    activeStep,
    totalSteps,
    onBack,
    onNext,
    processing,
    isNextDisabled = false,
}) => {
    return (
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <button
                disabled={activeStep === 0}
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-[#3f484a] transition-all duration-200 hover:border-slate-300 hover:text-[#1a1c1c] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <ArrowBack sx={{ fontSize: 16 }} />
                Back
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onNext();
                }}
                disabled={processing || isNextDisabled}
                className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:px-7 md:py-3.5 md:text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <span className="relative z-[1] inline-flex items-center gap-2">
                    {processing ? 'Saving…' : activeStep === totalSteps - 1 ? 'Pay & Continue' : 'Continue'}
                    {!processing && <ArrowForward sx={{ fontSize: 16 }} />}
                </span>
            </button>
        </div>
    );
};

export default PlanStepperNavigation;
