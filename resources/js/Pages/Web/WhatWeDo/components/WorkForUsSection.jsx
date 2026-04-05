import React, { useState } from 'react';
import { ArrowForward } from '@mui/icons-material';
import ApplySpecialistDialog from '../../../../Components/ApplySpecialistDialog.jsx';

const WorkForUsSection = ({
    title = 'Work For Us',
    description = 'Help travelers see your home through your eyes.',
    buttonText = 'Apply to be a Specialist',
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <section className="px-5 py-20 md:px-10 md:py-28 lg:px-16">
                <div className="mx-auto max-w-[1120px]">
                    <div
                        className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-20"
                        style={{ backgroundColor: '#1a1c1c' }}
                    >
                        {/* Decorative blob */}
                        <div
                            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20"
                            style={{ background: 'radial-gradient(circle, #3260FE 0%, transparent 70%)' }}
                        />
                        <div
                            className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-10"
                            style={{ background: 'radial-gradient(circle, #EA6D4F 0%, transparent 70%)' }}
                        />

                        <span className="relative mb-5 inline-block text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
                            Join the Team
                        </span>
                        <h2 className="relative mb-6 text-[2.15rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.5rem] md:text-[3.5rem]">
                            {title}
                            <br/>
                            <span className="font-light italic text-[#3260FE]">Share your world.</span>
                        </h2>
                        <p className="relative mx-auto mb-10 max-w-[480px] text-[14px] leading-[1.7] text-white/60 md:text-[15px]">
                            {description}
                        </p>
                        <button
                            type="button"
                            onClick={() => setDialogOpen(true)}
                            className="relative inline-flex items-center rounded-xl bg-[#3260FE] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#3260FE]/30 transition-all hover:scale-[1.02]"
                        >
                            {buttonText}
                            <ArrowForward sx={{ ml: 1, fontSize: 16 }}/>
                        </button>
                    </div>
                </div>
            </section>

            <ApplySpecialistDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
};

export default WorkForUsSection;
