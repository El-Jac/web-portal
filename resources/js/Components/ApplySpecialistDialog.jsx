import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    TextField,
    IconButton,
    CircularProgress,
    Slide,
} from '@mui/material';
import { Close as CloseIcon, ArrowForward } from '@mui/icons-material';
import { router, usePage } from '@inertiajs/react';
import ReCAPTCHA from 'react-google-recaptcha';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ApplySpecialistDialog = ({ open, onClose }) => {
    const { recaptchaSiteKey } = usePage().props;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        city_state: '',
        phone: '',
        destination_known_for: '',
        qualified_expert: '',
        best_way_to_contact: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        if (open) {
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                city_state: '',
                phone: '',
                destination_known_for: '',
                qualified_expert: '',
                best_way_to_contact: '',
            });
            setErrors({});
            setRecaptchaValue(null);
            setTimeout(() => {
                if (recaptchaRef.current) recaptchaRef.current.reset();
            }, 100);
        }
    }, [open]);

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
        if (errors.recaptcha) setErrors(prev => ({ ...prev, recaptcha: null }));
    };

    const validateForm = () => {
        const e = {};
        if (!formData.first_name.trim())            e.first_name = 'Required';
        if (!formData.last_name.trim())             e.last_name = 'Required';
        if (!formData.email.trim())                 e.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                                    e.email = 'Enter a valid email';
        if (!formData.city_state.trim())            e.city_state = 'Required';
        if (!formData.phone.trim())                 e.phone = 'Required';
        if (!formData.destination_known_for.trim()) e.destination_known_for = 'Required';
        if (!formData.qualified_expert.trim())      e.qualified_expert = 'Required';
        if (!formData.best_way_to_contact.trim())   e.best_way_to_contact = 'Required';
        if (!recaptchaValue)                        e.recaptcha = 'Please complete the reCAPTCHA';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev) => {
        if (ev) ev.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        setErrors({});
        router.post('/specialist-applications', {
            ...formData,
            recaptcha_token: recaptchaValue,
        }, {
            onSuccess: () => { setSubmitting(false); onClose(); },
            onError: (errs) => {
                setSubmitting(false);
                setErrors(errs);
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                    setRecaptchaValue(null);
                }
            },
        });
    };

    const handleClose = () => { if (!submitting) onClose(); };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '1.75rem',
                    overflow: 'hidden',
                    boxShadow: '0 32px 80px -12px rgba(26,28,28,0.22)',
                },
            }}
        >
            {/* ── Header ── */}
            <div className="relative bg-[#eef0ff] px-8 pt-8 pb-7">
                <div className="w-10 h-1 rounded-full bg-[#3260FE] mb-5" />
                <div className="pr-10">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-[0.3em] text-[#3260FE]">
                        Join the Team
                    </p>
                    <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#1a1c1c] md:text-3xl">
                        Apply to be a Specialist
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#3f484a]">
                        Tell us about yourself and the destination you know best.
                    </p>
                </div>
                <IconButton
                    onClick={handleClose}
                    disabled={submitting}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        color: '#3f484a',
                        bgcolor: 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(8px)',
                        '&:hover': { bgcolor: 'white' },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>

            {/* ── Form body ── */}
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div className="bg-white px-8 py-7 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                    {/* Row 1 — Name */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                        <TextField
                            fullWidth label="First Name" required
                            value={formData.first_name} onChange={handleChange('first_name')}
                            error={!!errors.first_name} helperText={errors.first_name}
                            disabled={submitting}
                        />
                        <TextField
                            fullWidth label="Last Name" required
                            value={formData.last_name} onChange={handleChange('last_name')}
                            error={!!errors.last_name} helperText={errors.last_name}
                            disabled={submitting}
                        />
                    </div>

                    {/* Row 2 — Contact */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                        <TextField
                            fullWidth label="Email" type="email" required
                            value={formData.email} onChange={handleChange('email')}
                            error={!!errors.email} helperText={errors.email}
                            disabled={submitting}
                        />
                        <TextField
                            fullWidth label="Phone" required
                            value={formData.phone} onChange={handleChange('phone')}
                            error={!!errors.phone} helperText={errors.phone}
                            disabled={submitting}
                        />
                    </div>

                    {/* Row 3 — Location */}
                    <div className="mb-4">
                        <TextField
                            fullWidth label="City & State / Region" required
                            value={formData.city_state} onChange={handleChange('city_state')}
                            error={!!errors.city_state} helperText={errors.city_state}
                            disabled={submitting}
                        />
                    </div>

                    {/* Row 4–6 — Long-form questions */}
                    <div className="mb-4">
                        <TextField
                            fullWidth multiline rows={3} required
                            label="What is your destination known for?"
                            value={formData.destination_known_for}
                            onChange={handleChange('destination_known_for')}
                            error={!!errors.destination_known_for}
                            helperText={errors.destination_known_for}
                            disabled={submitting}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            fullWidth multiline rows={3} required
                            label="What makes you a qualified expert?"
                            value={formData.qualified_expert}
                            onChange={handleChange('qualified_expert')}
                            error={!!errors.qualified_expert}
                            helperText={errors.qualified_expert}
                            disabled={submitting}
                        />
                    </div>
                    <div className="mb-6">
                        <TextField
                            fullWidth multiline rows={2} required
                            label="Best way to contact you"
                            value={formData.best_way_to_contact}
                            onChange={handleChange('best_way_to_contact')}
                            error={!!errors.best_way_to_contact}
                            helperText={errors.best_way_to_contact}
                            disabled={submitting}
                        />
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex flex-col items-center gap-2 mb-6">
                        {open && (
                            <ReCAPTCHA
                                key={open ? 'open' : 'closed'}
                                ref={recaptchaRef}
                                sitekey={recaptchaSiteKey || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                                onChange={handleRecaptchaChange}
                            />
                        )}
                        {errors.recaptcha && (
                            <p className="text-xs text-red-500 text-center">{errors.recaptcha}</p>
                        )}
                        {!recaptchaSiteKey && import.meta.env.DEV && (
                            <p className="text-[11px] text-amber-600 text-center">
                                Dev mode — using test reCAPTCHA key
                            </p>
                        )}
                    </div>

                </div>

                {/* ── Sticky footer with actions ── */}
                <div className="flex items-center justify-end gap-4 border-t border-slate-100 bg-white px-8 py-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={submitting}
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3f484a] transition-colors hover:text-[#1a1c1c] disabled:opacity-40"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#3260FE] px-7 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#3260FE]/25 transition-all hover:scale-[1.02] disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <CircularProgress size={14} sx={{ color: 'white' }} />
                                Submitting…
                            </>
                        ) : (
                            <>
                                Apply Now
                                <ArrowForward sx={{ fontSize: 15 }} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Dialog>
    );
};

export default ApplySpecialistDialog;
