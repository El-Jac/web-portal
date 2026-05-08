import React from 'react';
import { Grid, TextField } from '@mui/material';

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3260FE' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#3260FE' },
};

const Step1PersonalInfo = ({ data, setData, errors }) => {
    return (
        <div>
            <div className="mb-6">
                <h2
                    className="mb-1 text-xl font-bold text-[#0f1419] sm:text-2xl"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    A little about you
                </h2>
                <p className="text-[14px] text-[#3f484a]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    We'll use these details to match you with the right local specialist.
                </p>
            </div>

            <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        error={!!errors.first_name}
                        helperText={errors.first_name}
                        sx={inputSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        error={!!errors.last_name}
                        helperText={errors.last_name}
                        sx={inputSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={inputSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        required
                        label="Phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputProps={{ startAdornment: <span style={{ marginRight: 8, color: '#94a3b8' }}>+1 :</span> }}
                        sx={inputSx}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Step1PersonalInfo;
