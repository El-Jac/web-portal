import React from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useForm } from '@inertiajs/react';
import WebsiteLayout from '../../../Layouts/WebsiteLayout.jsx';

const Index = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <WebsiteLayout>
            {/* Hero */}
            <section
                className="relative overflow-hidden px-8 pt-16 pb-24 text-center"
                style={{ backgroundColor: '#eef0ff', borderRadius: '0 0 80px 80px' }}
            >
                <div className="max-w-2xl mx-auto relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
                        Get In Touch
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 mb-6 leading-[1.1]">
                        Contact Us
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        Have a question or ready to start planning? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Contact info */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Contact Information</h2>
                        <div className="flex flex-col gap-4 text-slate-500 text-sm leading-relaxed">
                            <div>
                                <p className="font-semibold text-slate-700 mb-0.5">Email</p>
                                <p>info@planlikealocal.com</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700 mb-0.5">Phone</p>
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700 mb-0.5">Address</p>
                                <p>123 Business Street<br/>Suite 100<br/>City, State 12345</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Send a Message</h2>

                        {errors.message && (
                            <Alert severity="error" sx={{ mb: 2 }}>{errors.message}</Alert>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Your Name"
                                name="name"
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="message"
                                label="Message"
                                name="message"
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                error={!!errors.message}
                                helperText={errors.message}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={processing}
                                sx={{ py: 1.5, borderRadius: '10px', fontWeight: 600 }}
                            >
                                {processing ? 'Sending…' : 'Send Message'}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
};

export default Index;
