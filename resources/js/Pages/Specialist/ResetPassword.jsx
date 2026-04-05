import React from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout.jsx';

const ResetPassword = ({ token }) => {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/specialist/reset-password');
    };

    return (
        <AuthLayout
            title="Set New Password"
            subtitle="Enter your new password below."
            backHref="/specialist/login"
            backLabel="Back to Login"
        >
            {errors.message && (
                <Alert severity="error" sx={{ mb: 2 }}>{errors.message}</Alert>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Confirm New Password"
                    type="password"
                    id="password_confirmation"
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={processing}
                    sx={{ mt: 1, py: 1.5, borderRadius: '10px', fontWeight: 600 }}
                >
                    {processing ? 'Resetting…' : 'Reset Password'}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default ResetPassword;
