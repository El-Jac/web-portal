import {LocalActivityOutlined} from '@mui/icons-material';
import FasterPlanningCalendarIcon from '@/Components/icons/FasterPlanningCalendarIcon';
import TourGuideIcon from '@/Components/icons/TourGuideIcon';
import PersonalizedItineraryListIcon from '@/Components/icons/PersonalizedItineraryListIcon';

export const navItems = [
    {label: 'Who We Are', href: '/who-we-are'},
    {label: 'What We Do', href: '/what-we-do'},
    {label: 'Destinations', href: '/destinations'},
];

export const featureHighlights = [
    {label: 'Faster Planning', icon: FasterPlanningCalendarIcon},
    {label: 'Built by\nlocals', icon: TourGuideIcon},
    {label: 'Personalized Itinerary', icon: PersonalizedItineraryListIcon},
    {label: 'Authentic Experiences', icon: LocalActivityOutlined},
];

export const destinationCards = [
    {
        city: 'Tokyo',
        country: 'Japan',
        name: 'Kenji Sato',
        title: 'City Planning Specialist • Traveler',
        description: "Kenji combines deep local knowledge with structured planning to help you navigate Tokyo's modern districts and traditional areas with clarity and confidence.",
        image: '/images/home/stitch/tokyo.jpg',
        avatar: '/images/home/stitch/kenji.jpg',
    },
    {
        city: 'London',
        country: 'UK',
        name: 'Emma Clarke',
        title: 'Local Travel Expert',
        description: 'With over 6 years of experience guiding travelers through London, Emma specializes in cultural landmarks, hidden neighborhoods, and efficient trip planning.',
        image: '/images/home/stitch/london.jpg',
        avatar: '/images/home/stitch/emma.jpg',
    },
    {
        city: 'Sydney',
        country: 'Australia',
        name: 'Daniel Wright',
        title: 'Local Travel Planning Expert',
        description: "Daniel specializes in travel planning across Sydney's coastal walks, urban districts, and cultural landmarks. He balances iconic highlights with local insight.",
        image: '/images/home/stitch/sydney.jpg',
        avatar: '/images/home/stitch/daniel.jpg',
    },
];

/** Bump when replacing files under `public/images/home/stitch/home-page/` so browsers load the new asset. */
const HOME_PAGE_STEP_IMAGE_V = '9';

export const processSteps = [
    {
        step: 'Step 01',
        title: 'Schedule Appointment',
        description: "Choose a time that works best for you and share your travel ideas, and any specific interests or experiences you'd like to include.",
        image: `/images/home/stitch/home-page/step-1.jpg?v=${HOME_PAGE_STEP_IMAGE_V}`,
    },
    {
        step: 'Step 02',
        title: 'Choose Package & Complete Payment',
        description: 'Secure your appointment with a smooth and transparent payment process.',
        image: `/images/home/stitch/home-page/step-2.jpg?v=${HOME_PAGE_STEP_IMAGE_V}`,
    },
    {
        step: 'Step 03',
        title: 'Video Planning Meeting',
        description: 'Connect one-on-one with a local expert to craft your perfect trip, tailored to your style, budget, and must-see spots.',
        image: `/images/home/stitch/home-page/step-3.jpg?v=${HOME_PAGE_STEP_IMAGE_V}`,
    },
    {
        step: 'Step 04',
        title: 'Personalized Itinerary Delivery',
        description: 'Get a personalized, ready-to-use travel plan with expert recommendations and practical guidance for a confident journey.',
        image: `/images/home/stitch/home-page/step-4.jpg?v=${HOME_PAGE_STEP_IMAGE_V}`,
    },
];

/** `target` is the numeric value; `suffix` is appended after formatting (e.g. "+") */
export const statItems = [
    {target: 100, suffix: '+', label: 'Destinations'},
    {target: 500, suffix: '+', label: 'Local Experts'},
    {target: 200, suffix: '+', label: 'Hidden Gems'},
];
