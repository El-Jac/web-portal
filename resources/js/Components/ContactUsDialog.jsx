import React, { useState, useEffect, useRef } from 'react';
import {
    Drawer,
    TextField,
    IconButton,
    CircularProgress,
    Alert,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material';
import { Close as CloseIcon, ArrowForward } from '@mui/icons-material';
import { router, usePage } from '@inertiajs/react';
import ReCAPTCHA from 'react-google-recaptcha';

const TOPICS = ['Scheduling', 'Specialist Service', 'Billing', 'Other'];

const ContactUsDialog = ({ open, onClose }) => {
    const { recaptchaSiteKey } = usePage().props;
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        topic: 'Scheduling',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const recaptchaRef = useRef(null);

    useEffect(() => {
        if (open) {
            setFormData({ first_name: '', last_name: '', email: '', topic: 'Scheduling', message: '' });
            setErrors({});
            setRecaptchaValue(null);
            setTimeout(() => { if (recaptchaRef.current) recaptchaRef.current.reset(); }, 100);
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
        if (!formData.first_name.trim()) e.first_name = 'Required';
        if (!formData.last_name.trim())  e.last_name  = 'Required';
        if (!formData.email.trim())      e.email      = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                         e.email      = 'Enter a valid email';
        if (!formData.message.trim())    e.message    = 'Required';
        if (!recaptchaValue)             e.recaptcha  = 'Please complete the reCAPTCHA';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev) => {
        if (ev) ev.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        setErrors({});
        router.post('/contact', {
            ...formData,
            recaptcha_token: recaptchaValue,
        }, {
            onSuccess: () => { setSubmitting(false); onClose(); },
            onError: (errs) => {
                setSubmitting(false);
                setErrors(errs);
                if (recaptchaRef.current) { recaptchaRef.current.reset(); setRecaptchaValue(null); }
            },
        });
    };

    const handleClose = () => { if (!submitting) onClose(); };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', sm: 480 },
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                },
            }}
        >
            {/* ── Header ── */}
            <div className="relative shrink-0 bg-[#eef0ff] px-8 pt-8 pb-7">
                <div className="w-10 h-1 rounded-full bg-[#3260FE] mb-5" />
                <div className="pr-10">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-[0.3em] text-[#3260FE]">
                        Get In Touch
                    </p>
                    <h2 className="become-planner-gradient text-2xl font-extrabold tracking-[-0.04em]">
                        Become a Specialist
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#3f484a]">
                        We'd love to hear from you. Send us a message and we'll get back to you soon.
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

            {/* ── Scrollable form ── */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col flex-1 min-h-0"
            >
                <div className="flex-1 overflow-y-auto bg-white px-8 py-7">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
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

                    {/* Email */}
                    <div className="mb-4">
                        <TextField
                            fullWidth label="Email" type="email" required
                            value={formData.email} onChange={handleChange('email')}
                            error={!!errors.email} helperText={errors.email}
                            disabled={submitting}
                        />
                    </div>

                    {/* Topic */}
                    <FormControl component="fieldset" className="mb-4 w-full" sx={{ mb: 2 }}>
                        <FormLabel
                            component="legend"
                            sx={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3f484a', mb: 1 }}
                        >
                            Topic
                        </FormLabel>
                        <RadioGroup row value={formData.topic} onChange={handleChange('topic')}>
                            {TOPICS.map(t => (
                                <FormControlLabel
                                    key={t} value={t} label={t}
                                    disabled={submitting}
                                    control={<Radio size="small" sx={{ color: '#3260FE', '&.Mui-checked': { color: '#3260FE' } }} />}
                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    {/* Message */}
                    <div className="mb-4">
                        <TextField
                            fullWidth multiline rows={4} required
                            label="How can we help?"
                            value={formData.message} onChange={handleChange('message')}
                            error={!!errors.message} helperText={errors.message}
                            disabled={submitting}
                        />
                    </div>

                    {/* reCAPTCHA */}
                    <div className="flex flex-col items-start gap-2 mb-4">
                        {open && (
                            <ReCAPTCHA
                                key={open ? 'open' : 'closed'}
                                ref={recaptchaRef}
                                sitekey={recaptchaSiteKey || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                                onChange={handleRecaptchaChange}
                            />
                        )}
                        {errors.recaptcha && (
                            <p className="text-xs text-red-500">{errors.recaptcha}</p>
                        )}
                        {!recaptchaSiteKey && import.meta.env.DEV && (
                            <p className="text-[11px] text-amber-600">Dev mode — using test reCAPTCHA key</p>
                        )}
                    </div>

                    {errors.general && (
                        <Alert severity="error" sx={{ mb: 2 }}>{errors.general}</Alert>
                    )}
                </div>

                {/* ── Sticky footer ── */}
                <div className="shrink-0 flex items-center justify-end gap-4 border-t border-slate-100 bg-white px-8 py-4">
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
                                Sending…
                            </>
                        ) : (
                            <>
                                Send Message
                                <ArrowForward sx={{ fontSize: 15 }} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </Drawer>
    );
};

export default ContactUsDialog;
