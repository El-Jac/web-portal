import {
    AccountBalanceWalletOutlined,
    CalendarMonthOutlined,
    EventAvailableOutlined,
    FavoriteBorder,
    LocalActivityOutlined,
    MapOutlined,
    SupportAgent,
    VerifiedOutlined,
    VideoChatOutlined,
} from '@mui/icons-material';

export const navItems = [
    {label: 'Who We Are', href: '/who-we-are'},
    {label: 'What We Do', href: '/what-we-do'},
    {label: 'Destinations', href: '/destinations'},
    {label: 'Contact Us', href: '/contact'},
];

export const featureHighlights = [
    {label: 'Faster Planning', icon: EventAvailableOutlined},
    {label: 'Expert Guidance', icon: VerifiedOutlined},
    {label: 'Personalized Support', icon: FavoriteBorder},
    {label: '24/7 Support', icon: SupportAgent},
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

export const processSteps = [
    {
        step: 'Step 01',
        title: 'Schedule Appointment.',
        description: "Choose a time that works best for you and share your travel ideas, and any specific interests or experiences you'd like to include.",
        icon: CalendarMonthOutlined,
    },
    {
        step: 'Step 02',
        title: 'Complete Payment.',
        description: 'Secure your appointment with a smooth and transparent payment process.',
        icon: AccountBalanceWalletOutlined,
    },
    {
        step: 'Step 03',
        title: 'Video Meeting (Planning).',
        description: 'Connect one-on-one with a local expert to craft your perfect trip, tailored to your style, budget, and must-see spots.',
        icon: VideoChatOutlined,
    },
    {
        step: 'Step 04',
        title: 'Personalized Itinerary Delivery.',
        description: 'Get a personalized, ready-to-use travel plan with expert recommendations and practical guidance for a confident journey.',
        icon: MapOutlined,
    },
];

export const statItems = [
    ['100+', 'Destinations'],
    ['500+', 'Local Experts'],
    ['10,000+', 'Happy Travelers'],
    ['200+', 'Hidden Gems'],
];
