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
        /* Home hero — soft horizontal wash: ~30% solid, fade ~30–62%, photo clear by mid-right */
        .hero-overlay {
            background:
                radial-gradient(ellipse 90% 75% at 82% 38%, rgba(50, 96, 254, 0.07) 0%, transparent 58%),
                radial-gradient(ellipse 58% 42% at 58% 24%, rgba(255, 255, 255, 0.14) 0%, transparent 52%),
                radial-gradient(ellipse 52% 38% at 0% 100%, rgba(249, 249, 249, 0.2) 0%, transparent 48%),
                linear-gradient(
                    to right,
                    rgba(249, 249, 249, 1) 0%,
                    rgba(249, 249, 249, 1) 28%,
                    rgba(249, 249, 249, 0.94) 34%,
                    rgba(249, 249, 249, 0.72) 42%,
                    rgba(249, 249, 249, 0.38) 50%,
                    rgba(249, 249, 249, 0.1) 56%,
                    rgba(249, 249, 249, 0) 62%,
                    rgba(249, 249, 249, 0) 100%
                );
        }
        /* R→L reveal with feather: --hero-reveal-x = left edge of full-opacity (moves 100% → 0%) */
        @property --hero-reveal-x {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 100%;
        }
        @keyframes hero-home-media-reveal-rl {
            from {
                --hero-reveal-x: 100%;
                opacity: 0.92;
            }
            to {
                --hero-reveal-x: 0%;
                opacity: 1;
            }
        }
        .hero-home-media {
            transform: scale(1.07);
            transform-origin: center center;
            --hero-reveal-x: 100%;
            -webkit-mask-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0) max(0%, calc(var(--hero-reveal-x) - 18%)),
                rgba(255, 255, 255, 0.35) max(0%, calc(var(--hero-reveal-x) - 11%)),
                rgba(255, 255, 255, 0.78) max(0%, calc(var(--hero-reveal-x) - 4%)),
                #fff var(--hero-reveal-x),
                #fff 100%
            );
            mask-image: linear-gradient(
                to right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0) max(0%, calc(var(--hero-reveal-x) - 18%)),
                rgba(255, 255, 255, 0.35) max(0%, calc(var(--hero-reveal-x) - 11%)),
                rgba(255, 255, 255, 0.78) max(0%, calc(var(--hero-reveal-x) - 4%)),
                #fff var(--hero-reveal-x),
                #fff 100%
            );
            animation: hero-home-media-reveal-rl 1.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes hero-home-enter {
            from {
                opacity: 0;
                transform: translateY(22px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .hero-home-inner {
            /* Quick stagger after hero image starts revealing */
            animation: hero-home-enter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .hero-home-badge {
            background-color: #3260fe1a;
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 600;
            font-size: 0.875rem;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #3260FE;
        }
        /* Manrope + tight tracking: editorial, modern (overrides .stitch-home h1) */
        .stitch-home .hero-home-heading {
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 800;
            letter-spacing: -0.052em;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.88);
            margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
            .stitch-home .hero-home-heading {
                letter-spacing: -0.048em;
                margin-bottom: 2.75rem;
            }
        }
        .stitch-home .hero-home-heading-primary {
            margin-bottom: clamp(0.65rem, 2vw, 1.1rem);
        }
        .stitch-home .hero-home-heading-accent-wrap {
            margin-top: 0;
            padding-left: clamp(0.85rem, 2.4vw, 1.35rem);
            border-left: 3px solid rgba(50, 96, 254, 0.38);
        }
        @media (min-width: 768px) {
            .stitch-home .hero-home-heading-accent-wrap {
                padding-left: 1.5rem;
                border-left-width: 4px;
            }
        }
        .stitch-home .hero-home-heading .hero-home-accent {
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 600;
            font-style: italic;
            letter-spacing: -0.034em;
            color: #3260FE;
            font-size: clamp(1.85rem, 1.35rem + 2.1vw, 4.35rem);
            line-height: 1.12;
            text-shadow:
                0 1px 0 rgba(255, 255, 255, 0.45),
                0 0 40px rgba(255, 255, 255, 0.35);
        }
        @media (min-width: 768px) {
            .stitch-home .hero-home-heading .hero-home-accent {
                line-height: 1.08;
                letter-spacing: -0.03em;
            }
        }
        .stitch-home .hero-home-heading .hero-home-accent + .hero-home-accent {
            margin-top: 0.06em;
        }
        @keyframes hero-bubble-float {
            0%, 100% {
                transform: translate3d(0, 0, 0);
            }
            50% {
                transform: translate3d(0, -8px, 0);
            }
        }
        .hero-home-bubble {
            max-width: min(100%, 28rem);
            margin-left: 50px;
            padding-bottom: 0.75rem;
            animation: hero-bubble-float 3.5s ease-in-out infinite;
        }
        .hero-home-bubble-inner {
            position: relative;
            display: block;
        }
        .hero-home-lede {
            margin: 0;
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 500;
            font-size: clamp(1rem, 0.95rem + 0.22vw, 1.125rem);
            line-height: 1.65;
            letter-spacing: 0.012em;
            color: #1e293b;
            padding: 1.125rem 1.35rem;
            border-radius: 1.35rem;
            background: linear-gradient(
                155deg,
                rgba(255, 255, 255, 0.86) 0%,
                rgba(248, 250, 252, 0.8) 45%,
                rgba(241, 245, 249, 0.76) 100%
            );
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(226, 232, 240, 0.85);
            box-shadow:
                0 1px 0 0 rgba(255, 255, 255, 0.65) inset,
                0 10px 36px -14px rgba(15, 23, 42, 0.1);
        }
        /* Speech tail: same fill as bubble */
        .hero-home-bubble-tail {
            position: absolute;
            left: 1.5rem;
            top: 100%;
            margin-top: -1px;
            width: 3.25rem;
            height: 1.5rem;
            background: linear-gradient(
                155deg,
                rgba(255, 255, 255, 0.86) 0%,
                rgba(248, 250, 252, 0.8) 45%,
                rgba(241, 245, 249, 0.76) 100%
            );
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(226, 232, 240, 0.85);
            border-top: none;
            border-radius: 0 0 0.65rem 0.65rem;
            clip-path: polygon(4% 0, 96% 0, 50% 100%);
            box-shadow: 0 1px 0 0 #ffffff inset;
        }
        .hero-home-cta-secondary {
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 700;
            font-size: 0.8125rem;
            letter-spacing: 0.11em;
            text-transform: uppercase;
        }
        @media (min-width: 768px) {
            .hero-home-cta-secondary {
                font-size: 0.875rem;
                letter-spacing: 0.1em;
            }
        }
        /* Solid fill + hover sweep — matches .nav-cta-start-planning */
        .hero-cta-primary {
            position: relative;
            overflow: hidden;
            z-index: 1;
            color: #fff;
            background: transparent;
            border-radius: 0.75rem;
            font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif;
            font-weight: 600;
            letter-spacing: 0.03em;
            box-shadow:
                0 14px 40px -6px rgba(18, 42, 105, 0.42),
                0 6px 18px -4px rgba(50, 96, 254, 0.22);
            transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .hero-cta-primary::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #3260FE;
            border-radius: 0.75rem;
            box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.22) inset;
            z-index: -2;
        }
        .hero-cta-primary::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 100%;
            background-color: #0f2f8c;
            transition: width 0.3s ease;
            border-radius: 0.75rem;
            z-index: -1;
        }
        .hero-cta-primary:hover {
            color: #fff;
            box-shadow:
                0 20px 52px -4px rgba(15, 36, 92, 0.48),
                0 8px 24px -4px rgba(50, 96, 254, 0.28);
            transform: translateY(-1px);
        }
        .hero-cta-primary:hover::before {
            width: 100%;
        }
        .hero-cta-primary:focus-visible {
            outline: 2px solid rgba(255, 255, 255, 0.95);
            outline-offset: 3px;
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
        /* Solid fill + hover sweep (pseudo-elements) */
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
            box-shadow:
                0 14px 40px -6px rgba(18, 42, 105, 0.42),
                0 6px 18px -4px rgba(50, 96, 254, 0.22);
            transition: box-shadow 0.3s ease, transform 0.25s ease;
        }
        .nav-cta-start-planning::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #3260FE;
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
            box-shadow:
                0 20px 52px -4px rgba(15, 36, 92, 0.48),
                0 8px 24px -4px rgba(50, 96, 254, 0.28);
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
            .hero-cta-primary::before {
                transition: none;
            }
            .nav-link:hover,
            .nav-link.nav-link-active:hover {
                transform: none;
            }
            .nav-cta-start-planning:hover {
                transform: none;
            }
            .hero-home-media {
                transform: none;
                animation: none;
                opacity: 1;
                --hero-reveal-x: 0%;
                -webkit-mask-image: none;
                mask-image: none;
            }
            .hero-home-inner {
                animation: none;
            }
            .hero-cta-primary:hover {
                transform: none;
            }
            .hero-home-bubble {
                animation: none;
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
                background:
                    radial-gradient(ellipse 95% 60% at 50% 8%, rgba(50, 96, 254, 0.06) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 45% at 50% 28%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                    linear-gradient(
                        to top,
                        rgba(249, 249, 249, 1) 0%,
                        rgba(249, 249, 249, 1) 22%,
                        rgba(249, 249, 249, 0.9) 36%,
                        rgba(249, 249, 249, 0.55) 52%,
                        rgba(249, 249, 249, 0.12) 64%,
                        rgba(249, 249, 249, 0) 72%,
                        rgba(249, 249, 249, 0) 100%
                    );
            }
        }
        @media (max-width: 767px) {
            .hero-overlay {
                background:
                    radial-gradient(ellipse 85% 50% at 50% 22%, rgba(255, 255, 255, 0.12) 0%, transparent 48%),
                    linear-gradient(
                        to top,
                        rgba(249, 249, 249, 1) 0%,
                        rgba(249, 249, 249, 1) 20%,
                        rgba(249, 249, 249, 0.92) 32%,
                        rgba(249, 249, 249, 0.55) 48%,
                        rgba(249, 249, 249, 0.12) 58%,
                        rgba(249, 249, 249, 0) 66%,
                        rgba(249, 249, 249, 0) 100%
                    );
            }
        }
    `}</style>
);

export default SiteStyles;
