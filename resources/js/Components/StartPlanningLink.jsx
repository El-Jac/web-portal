import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowForward } from '@mui/icons-material';

const StartPlanningLink = ({
    className = '',
    label = 'Start Planning',
    iconSx,
    iconClassName,
    innerClassName,
    onClick,
}) => {
    const inner = (
        <>
            {label}
            <ArrowForward sx={iconSx ?? { ml: 1, fontSize: 18 }} className={iconClassName} />
        </>
    );

    return (
        <Link href="/plans/create" className={className} onClick={onClick}>
            {innerClassName ? <span className={innerClassName}>{inner}</span> : inner}
        </Link>
    );
};

export default StartPlanningLink;
