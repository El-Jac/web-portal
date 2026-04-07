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
        .glass-nav {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px -10px rgba(26, 28, 28, 0.12);
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
            font-size: 0.8rem;
            font-weight: 500;
            letter-spacing: 1.5px;
            color: #3f484a;
            transition: color 0.15s ease;
        }
        .nav-link:hover {
            color: #3260FE;
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
