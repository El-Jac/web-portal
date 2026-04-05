import React from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useForm, usePage } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout.jsx';

const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const { flash } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/specialist/forgot-password');
    };

    return (
        <AuthLayout
            title="Reset Password"
            subtitle="Enter your email and we'll send you a link to reset your password."
            backHref="/specialist/login"
            backLabel="Back to Login"
        >
            {errors.message && (
                <Alert severity="error" sx={{ mb: 2 }}>{errors.message}</Alert>
            )}
            {flash?.success && (
                <Alert severity="success" sx={{ mb: 2 }}>{flash.success}</Alert>
            )}
            {errors.email && (
                <Alert severity="error" sx={{ mb: 2 }}>{errors.email}</Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={!!errors.email}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={processing}
                    sx={{ mt: 1, py: 1.5, borderRadius: '10px', fontWeight: 600 }}
                >
                    {processing ? 'Sending…' : 'Send Reset Link'}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default ForgotPassword;
