import React from 'react';

const SiteStyles = () => (
    <style>{`
        .stitch-home {
            background: #f9f9f9;
            color: #1a1c1c;
            font-family: 'Inter', sans-serif;
        }
        .stitch-home h1,
        .stitch-home h2,
        .stitch-home h3,
        .stitch-home h4 {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        /* Nav: Manrope — warm, modern UI type (loaded in app.blade.php) */
        .site-nav {
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        @keyframes site-nav-fade-in-down {
            from {
                opacity: 0;
                transform: translateY(-14px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .site-nav-bar-enter {
            animation: site-nav-fade-in-down 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
            .site-nav-bar-enter {
                animation: none;
                opacity: 1;
                transform: none;
            }
        }
        .glass-nav {
            background: linear-gradient(
                125deg,
                rgba(255, 255, 255, 0.94) 0%,
                rgba(248, 250, 255, 0.88) 45%,
                rgba(255, 255, 255, 0.9) 100%
            );
            backdrop-filter: blur(28px) saturate(160%);
            -webkit-backdrop-filter: blur(28px) saturate(160%);
            box-shadow:
                0 1px 0 0 rgba(255, 255, 255, 0.95) inset,
                0 16px 44px -14px rgba(30, 58, 138, 0.1),
                0 0 0 1px rgba(50, 96, 254, 0.06);
        }
        .editorial-shadow {
            box-shadow: 0 20px 40px -10px rgba(26, 28, 28, 0.12);
        }
        .hero-overlay {
            background: linear-gradient(to right, rgba(249, 249, 249, 1) 25%, rgba(249, 249, 249, 0.6) 50%, rgba(249, 249, 249, 0) 80%);
        }
        .mesh-section {
            background-image:
                radial-gradient(at 100% 0%, rgba(50, 96, 254, 0.05) 0px, transparent 50%),
                radial-gradient(at 0% 100%, rgba(50, 96, 254, 0.05) 0px, transparent 50%);
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .nav-link {
            display: inline-flex;
            align-items: center;
            font-family: inherit;
            font-size: 0.9375rem;
            font-weight: 500;
            letter-spacing: 0.01em;
            color: #5a6572;
            padding: 0.55rem 1rem;
            border-radius: 9999px;
            transition: background-color 0.2s ease, color 0.2s ease;
        }
        .nav-link:hover {
            background-color: rgba(50, 96, 254, 0.09);
            color: #3260FE;
        }
        .nav-link:focus-visible {
            outline: 2px solid rgba(50, 96, 254, 0.45);
            outline-offset: 2px;
        }
        .site-nav-mobile-link {
            display: block;
            font-family: inherit;
            font-size: 0.9375rem;
            font-weight: 500;
            letter-spacing: 0.01em;
            color: #5a6572;
            padding: 0.75rem 0.875rem;
            margin: 0 -0.25rem;
            border-radius: 0.75rem;
            transition: background-color 0.18s ease, color 0.18s ease;
        }
        .site-nav-mobile-link:hover {
            background-color: rgba(50, 96, 254, 0.06);
            color: #3260FE;
        }
        /* Fill sweep (pseudo-elements) — adapted from classic ::before width animation */
        .nav-cta-start-planning {
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: #fff;
            background: transparent;
            border-radius: 12px;
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 600;
            letter-spacing: 0.04em;
            transition: box-shadow 0.3s ease;
        }
        .nav-cta-start-planning::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #3260FE;
            border-radius: 12px;
            z-index: -2;
        }
        .nav-cta-start-planning::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: #0f2f8c;
            transition: width 0.3s ease;
            border-radius: 12px;
            z-index: -1;
        }
        .nav-cta-start-planning:hover {
            color: #fff;
            box-shadow: 0 12px 28px -8px rgba(15, 47, 140, 0.55);
        }
        .nav-cta-start-planning:hover::before {
            width: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
            .nav-cta-start-planning::before {
                transition: none;
            }
        }
        .quotes {
            font-size: 3.5rem;
            font-weight: 800;
            line-height: 1.1;
            letter-spacing: -0.05em;
            color: #1a1c1c;
            max-width: 760px;
            margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
            .quotes { margin-bottom: 2.5rem; }
        }
        .ibrow {
            font-size: 0.9rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #3f484a;
        }
        .text-background-on-any-surface {
            background: #00000040;
            padding: 5px 10px;
            border-radius: 100px;
        }
        @media (max-width: 1024px) {
            .hero-overlay {
                background: linear-gradient(to top, rgba(249, 249, 249, 1) 30%, rgba(249, 249, 249, 0.4) 100%);
            }
        }
        @media (max-width: 767px) {
            .hero-overlay {
                background: linear-gradient(to top, rgba(249, 249, 249, 1) 18%, rgba(249, 249, 249, 0.9) 42%, rgba(249, 249, 249, 0.15) 100%);
            }
        }
    `}</style>
);

export default SiteStyles;
