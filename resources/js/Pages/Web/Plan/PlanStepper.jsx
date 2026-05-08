import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Alert, Typography } from "@mui/material";
import { CheckCircle, LocationOn } from "@mui/icons-material";
import WebsiteLayout from "../../../Layouts/WebsiteLayout.jsx";
import Step1PersonalInfo from "./components/Step1PersonalInfo.jsx";
import Step2TripDetails from "./components/Step2TripDetails.jsx";
import Step3SelectPlan from "./components/Step3SelectPlan.jsx";
import Step4SelectTime from "./components/Step4SelectTime.jsx";
import Step5Payment from "./components/Step5Payment.jsx";
import PaymentSuccess from "./components/PaymentSuccess.jsx";

const steps = [
    { label: "About You",    heading: "Nice to meet you.",          subtitle: "Tell us a bit about yourself so we can personalise your experience." },
    { label: "Trip Details", heading: "Craft your perfect escape.",  subtitle: "Tell us a bit more about your ideal journey so we can curate the ultimate itinerary for you." },
    { label: "Select Plan",  heading: "Choose your experience.",     subtitle: "Pick the plan that best suits your travel style and budget." },
    { label: "Select Time",  heading: "When works for you?",         subtitle: "Select a convenient time to speak with your dedicated travel specialist." },
    { label: "Payment",      heading: "Almost there!",               subtitle: "Secure your booking and get ready for an unforgettable journey." },
];

const stepImages = [
    "/images/home/stitch/home-page/step-1.jpg",
    "/images/home/stitch/home-page/step-2.jpg",
    "/images/home/stitch/home-page/step-3.jpg",
    "/images/home/stitch/home-page/step-4.jpg",
    "/images/home/stitch/what-we-do-bg.jpg",
];

const CARD_SHADOW = "0 1px 3px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.06)";

const PlanStepper = ({ plan, destinations = [], showSuccessPage = false, initialStep = null }) => {
    const { flash } = usePage().props;

    if (showSuccessPage && plan.payment_status === 'paid') {
        return <PaymentSuccess plan={plan} />;
    }

    const computedInitialStep = initialStep !== null && initialStep !== undefined
        ? initialStep
        : plan.status === 'completed' ? 4 : 0;
    const [activeStep, setActiveStep] = useState(computedInitialStep);

    const isAppointmentCompleted = plan.status === 'completed';
    const activities = plan.activities ||
                      plan.destination_data?.activities ||
                      plan.destination?.activities ||
                      [];

    const { data, setData, post, put, processing, errors } = useForm({
        first_name: plan.first_name || "",
        last_name: plan.last_name || "",
        email: plan.email || "",
        phone: plan.phone || "",
        destination: plan.destination || "",
        destination_id: plan.destination_id || null,
        specialist_id: plan.specialist_id || null,
        travel_dates: plan.travel_dates || "",
        travelers: plan.travelers || "",
        interests: plan.interests || [],
        other_interests: plan.other_interests || "",
        plan_type: plan.plan_type || plan.selected_plan || "",
        selected_plan: plan.selected_plan || plan.plan_type || "",
        status: plan.status || "",
        appointment_start: plan.appointment_start || "",
        appointment_end: plan.appointment_end || "",
        selected_time_slot: plan.selected_time_slot || null,
    });

    const handleNext = () => {
        if (activeStep === 3) return;
        const nextStep = Math.min(activeStep + 1, steps.length - 1);
        if (!plan.id) {
            post(`/plans?step=${nextStep}`, {
                preserveScroll: true,
            });
            return;
        }
        put(`/plans/${plan.id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setActiveStep(nextStep),
        });
    };

    const handleBack = () => setActiveStep(activeStep - 1);

    const handleInterestChange = (interest) => {
        const newInterests = data.interests.includes(interest)
            ? data.interests.filter((i) => i !== interest)
            : [...data.interests, interest];
        setData("interests", newInterests);
    };

    const isStep1Valid = () => data.first_name?.trim() && data.last_name?.trim() && data.email?.trim() && data.phone?.trim();
    const isStep2Valid = () => data.destination_id && data.destination_id !== null && data.destination_id !== '';
    const isStep3Valid = () => data.selected_plan || data.plan_type;

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <Step1PersonalInfo data={data} setData={setData} errors={errors} />;
            case 1:
                return (
                    <Step2TripDetails
                        data={data}
                        setData={setData}
                        errors={errors}
                        onInterestChange={handleInterestChange}
                        activities={activities}
                        destinations={destinations || []}
                        destinationData={plan.destination_data}
                        planId={plan.id}
                    />
                );
            case 2:
                return <Step3SelectPlan data={data} setData={setData} errors={errors} />;
            case 3:
                return (
                    <Step4SelectTime
                        data={data}
                        setData={setData}
                        errors={errors}
                        planId={plan.id}
                        specialist={plan.specialist}
                        disabled={isAppointmentCompleted}
                        plan={plan}
                        onConfirm={async () => {
                            const hasAppointmentData = data.selected_time_slot ||
                                                       (data.appointment_start && data.appointment_end);
                            if (!hasAppointmentData) {
                                throw new Error('Please select a time slot before confirming the appointment.');
                            }
                            if (data.selected_time_slot && typeof data.selected_time_slot === 'object') {
                                if (!data.appointment_start) setData('appointment_start', data.selected_time_slot.start);
                                if (!data.appointment_end) setData('appointment_end', data.selected_time_slot.end);
                            }
                            setData("status", "completed");
                            return new Promise((resolve, reject) => {
                                router.put(`/plans/${plan.id}`, { ...data, status: 'completed' }, {
                                    preserveScroll: true,
                                    preserveState: true,
                                    onSuccess: () => { setActiveStep(4); resolve(); },
                                    onError: (errs) => reject(new Error(errs.error || 'Failed to complete appointment. Please try again.')),
                                });
                            });
                        }}
                    />
                );
            case 4:
                return <Step5Payment plan={plan} onPaymentSuccess={() => {}} />;
            default:
                return null;
        }
    };

    const currentStep = steps[activeStep];
    const nextStep = steps[activeStep + 1];
    const destinationName = data.destination || plan.destination_data?.name || '';
    const rawLocation = plan.destination_data?.location || plan.destination_data?.country || '';
    const destinationLocation = typeof rawLocation === 'object' ? rawLocation?.name || '' : rawLocation;

    const isNextDisabled =
        isAppointmentCompleted ||
        (activeStep === 0 && !isStep1Valid()) ||
        (activeStep === 1 && !isStep2Valid()) ||
        (activeStep === 2 && !isStep3Valid());

    return (
        <WebsiteLayout>
            <div className="mesh-section py-10 md:py-14">
                <div
                    className="mx-auto w-[90%]"
                    style={{ boxShadow: CARD_SHADOW, borderRadius: '1rem' }}
                >
                    {/* ── Step indicator ── */}
                    <div className="sticky top-20 z-10 rounded-t-2xl bg-white px-8 py-5">
                        <div className="flex items-start">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;
                                const isCompleted = index < activeStep;
                                return (
                                    <React.Fragment key={step.label}>
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={[
                                                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300',
                                                    isActive
                                                        ? 'bg-[#3260FE] text-white shadow-[0_2px_10px_rgba(50,96,254,0.4)]'
                                                        : isCompleted
                                                        ? 'bg-[#3260FE] text-white'
                                                        : 'border-2 border-slate-200 text-slate-400 bg-white',
                                                ].join(' ')}
                                            >
                                                {isCompleted
                                                    ? <CheckCircle sx={{ fontSize: 16 }} />
                                                    : <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13 }}>{index + 1}</span>
                                                }
                                            </div>
                                            <span
                                                className={[
                                                    'mt-2 hidden text-[11px] font-semibold sm:block whitespace-nowrap',
                                                    isActive ? 'text-[#3260FE]' : isCompleted ? 'text-[#3260FE]/70' : 'text-slate-400',
                                                ].join(' ')}
                                                style={{ fontFamily: 'Manrope, sans-serif' }}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div
                                                className={[
                                                    'mx-2 mt-4 h-[2px] flex-1 rounded-full transition-all duration-500',
                                                    isCompleted ? 'bg-[#3260FE]' : 'bg-slate-200',
                                                ].join(' ')}
                                            />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── 50/50 content ── */}
                    <div className="flex min-h-[580px] flex-col overflow-hidden rounded-b-2xl lg:flex-row">

                        {/* Left: image + destination card */}
                        <div className="relative hidden lg:block lg:w-[42%]">
                            <img
                                key={activeStep}
                                src={stepImages[activeStep]}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                            {destinationName ? (
                                <div className="absolute bottom-8 left-6 right-6 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm">
                                    <p
                                        className="text-[15px] font-bold text-[#0f1419]"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {destinationName}
                                    </p>
                                    {destinationLocation && (
                                        <p
                                            className="mt-1 flex items-center gap-1 text-[13px] text-slate-500"
                                            style={{ fontFamily: 'Manrope, sans-serif' }}
                                        >
                                            <LocationOn sx={{ fontSize: 14, color: '#94a3b8' }} />
                                            {destinationLocation}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="absolute bottom-10 left-8 right-8">
                                    <p
                                        className="text-2xl font-bold leading-snug text-white md:text-3xl"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {currentStep.label}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Right: form */}
                        <div className="w-full bg-white px-6 py-8 lg:w-[58%] md:px-10 md:py-10 xl:px-12">

                            {/* Per-step heading */}
                            <div className="mb-6">
                                <h2
                                    className="text-2xl font-bold leading-tight tracking-tight text-[#0f1419] md:text-[1.75rem]"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                    {currentStep.heading}
                                </h2>
                                <p
                                    className="mt-2 text-[13px] leading-relaxed text-slate-500"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                    {currentStep.subtitle}
                                </p>
                            </div>

                            {flash?.payment_success && (
                                <Alert severity="success" sx={{ mb: 3 }}>{flash.payment_success}</Alert>
                            )}
                            {flash?.payment_cancelled && (
                                <Alert severity="warning" sx={{ mb: 3 }}>{flash.payment_cancelled}</Alert>
                            )}
                            {Object.keys(errors).length > 0 && (
                                <Alert severity="error" sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Please fix the following errors:
                                    </Typography>
                                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        {Object.entries(errors).map(([key, value]) => (
                                            <li key={key}>
                                                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                                            </li>
                                        ))}
                                    </ul>
                                </Alert>
                            )}

                            <div className="mb-4">
                                {renderStepContent(activeStep)}
                            </div>

                            {activeStep < steps.length - 1 && activeStep !== 3 && (
                                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                                    <button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[#0f1419] disabled:cursor-not-allowed disabled:opacity-30"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); handleNext(); }}
                                        disabled={processing || isNextDisabled}
                                        className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:px-7 md:py-3.5 md:text-[14px]"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        <span className="relative z-[1]">
                                            {processing
                                                ? 'Saving…'
                                                : nextStep
                                                ? `Continue to ${nextStep.label} →`
                                                : 'Continue →'}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default PlanStepper;
