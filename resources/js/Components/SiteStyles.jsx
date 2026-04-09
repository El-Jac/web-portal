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
            background:
                radial-gradient(130% 90% at 50% -35%, rgba(255, 255, 255, 0.85) 0%, transparent 52%),
                linear-gradient(
                    128deg,
                    rgba(255, 255, 255, 0.96) 0%,
                    rgba(248, 251, 255, 0.9) 42%,
                    rgba(255, 255, 255, 0.93) 100%
                );
            backdrop-filter: blur(32px) saturate(175%);
            -webkit-backdrop-filter: blur(32px) saturate(175%);
            box-shadow:
                0 1px 0 0 rgba(255, 255, 255, 1) inset,
                0 0 0 1px rgba(255, 255, 255, 0.65) inset,
                0 20px 48px -18px rgba(30, 58, 138, 0.14),
                0 0 0 1px rgba(50, 96, 254, 0.07);
        }
        .site-nav-mobile-sheet {
            background:
                radial-gradient(120% 80% at 50% -30%, rgba(255, 255, 255, 0.9) 0%, transparent 50%),
                linear-gradient(165deg, rgba(255, 255, 255, 0.97) 0%, rgba(247, 250, 255, 0.94) 100%);
            border: 1px solid rgba(255, 255, 255, 0.75);
            box-shadow:
                0 1px 0 0 rgba(255, 255, 255, 0.9) inset,
                0 22px 48px -20px rgba(30, 58, 138, 0.16),
                0 0 0 1px rgba(50, 96, 254, 0.06);
            backdrop-filter: blur(28px) saturate(160%);
            -webkit-backdrop-filter: blur(28px) saturate(160%);
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
            letter-spacing: 0.02em;
            color: #4b5563;
            padding: 0.55rem 1rem;
            border-radius: 9999px;
            transition:
                background-color 0.22s ease,
                color 0.22s ease,
                box-shadow 0.22s ease,
                transform 0.22s ease;
        }
        .nav-link:hover {
            background-color: rgba(50, 96, 254, 0.1);
            color: #3260FE;
            transform: translateY(-1px);
            box-shadow: 0 4px 14px -6px rgba(50, 96, 254, 0.22);
        }
        .nav-link.nav-link-active {
            color: #1d4ed8;
            font-weight: 600;
            background-color: rgba(50, 96, 254, 0.11);
            box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.55) inset;
        }
        .nav-link.nav-link-active:hover {
            background-color: rgba(50, 96, 254, 0.14);
            color: #1e40af;
            transform: translateY(-1px);
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
            letter-spacing: 0.02em;
            color: #4b5563;
            padding: 0.75rem 0.875rem;
            margin: 0 -0.25rem;
            border-radius: 0.75rem;
            transition: background-color 0.2s ease, color 0.2s ease;
        }
        .site-nav-mobile-link:hover {
            background-color: rgba(50, 96, 254, 0.08);
            color: #3260FE;
        }
        .site-nav-mobile-link.nav-link-active {
            color: #1d4ed8;
            font-weight: 600;
            background-color: rgba(50, 96, 254, 0.1);
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
            letter-spacing: 0.045em;
            transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .nav-cta-start-planning::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(165deg, #4f74ff 0%, #3260FE 42%, #2654e8 100%);
            border-radius: 12px;
            box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.22) inset;
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
            box-shadow: 0 14px 32px -10px rgba(15, 47, 140, 0.55);
            transform: translateY(-1px);
        }
        .nav-cta-start-planning:hover::before {
            width: 100%;
        }
        .nav-cta-start-planning:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.95);
            outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
            .nav-cta-start-planning::before {
                transition: none;
            }
            .nav-link:hover,
            .nav-link.nav-link-active:hover {
                transform: none;
            }
            .nav-cta-start-planning:hover {
                transform: none;
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
