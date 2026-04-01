<?php

namespace Database\Seeders;

use App\Models\Country;
use App\Models\Destination;
use App\Models\DestinationActivity;
use App\Models\DestinationImage;
use App\Models\DestinationItinerary;
use App\Models\DestinationSeason;
use App\Models\Specialist;
use Illuminate\Database\Seeder;

class SampleDestinationsSeeder extends Seeder
{
    private array $unsplashImages = [
        'tokyo' => 'photo-1493976040374-85c8e12f0c0e',
        'paris' => 'photo-1502602898536-47ad22581b52',
        'new_york' => 'photo-1496442226666-8d4d0e62e6e9',
        'london' => 'photo-1513635269975-59663e0ac1ad',
        'rome' => 'photo-1552832230-c0197dd311b5',
        'barcelona' => 'photo-1539037116277-4db20889f2d4',
        'sydney' => 'photo-1506973035872-a4ec16b8e8d9',
        'dubai' => 'photo-1512453979798-5ea266f8880c',
        'singapore' => 'photo-1525625293386-3f8f99389edd',
        'amsterdam' => 'photo-1534351590666-13e3e96b5017',
        'berlin' => 'photo-1587330979470-3595ac045cc0',
        'athens' => 'photo-1570077185710-c03b1b0a0a4a',
        'cape_town' => 'photo-1516026672322-bc52d61a55d5',
        'rio' => 'photo-1483729558449-99ef09a8c325',
        'mumbai' => 'photo-1567157577867-05ccb1388e66',
        'bali' => 'photo-1537996194471-e657df975ab4',
        'maldives' => 'photo-1506905925346-21bda4d32df4',
        'switzerland' => 'photo-1530122037265-a5f1f91d3b99',
        'iceland' => 'photo-1504893524553-b855bce32c67',
        'scotland' => 'photo-1506377585622-bedcbb027afc',
        'vienna' => 'photo-1516550893923-42d28e5677af',
        'prague' => 'photo-1541849546-216549ae216d',
        'lisbon' => 'photo-1555881400-74d7acaacd8b',
        'morocco' => 'photo-1489749798305-4fea3ae63d43',
        'egypt' => 'photo-1539650116574-8efeb43e2750',
        'kenya' => 'photo-1547471080-7cc2caa01a7e',
        'thailand' => 'photo-1528181304800-259b08848526',
        'vietnam' => 'photo-1557750255-c76072a7aee1',
        'mexico' => 'photo-1518105779142-d975f22f1b0a',
        'canada' => 'photo-1517935706615-2717063c2225',
        'norway' => 'photo-1531366936337-7c912a4589a7',
        'finland' => 'photo-1538029038420-e7a82ec6bf11',
        'sweden' => 'photo-1509356843151-3e7d96241e11',
        'denmark' => 'photo-1513622470522-26c3c8a854bc',
        'ireland' => 'photo-1564959130747-897a8e5b2a72',
        'portugal' => 'photo-1555881400-74d7acaacd8b',
        'croatia' => 'photo-1555990538-c12e0bc6f2e4',
        'greece_islands' => 'photo-1533105079780-92b9be482077',
        'turkey' => 'photo-1524231757912-21f4fe3a7200',
        'peru' => 'photo-1526392060635-9d6019884377',
        'argentina' => 'photo-1518639192441-8fce0a366e2e',
        'chile' => 'photo-1478827536114-da961b7f86d2',
        'costa_rica' => 'photo-1506905925346-21bda4d32df4',
        'hawaii' => 'photo-1507876466758-bc54f384809c',
        'alaska' => 'photo-1503786091754-6237d1a4a4b3',
        'caribbean' => 'photo-1544551763-46a013bb70d5',
        'cuba' => 'photo-1500759285222-a95626b934cb',
        'jamaica' => 'photo-1494548162494-384bba4ab999',
        'bahamas' => 'photo-1548574505-5e239809ee19',
        'fiji' => 'photo-1505881402582-c5bc11054f91',
    ];

    private array $destinationData = [
        // Japan destinations
        ['name' => 'Tokyo Metropolis', 'city' => 'Tokyo', 'state' => 'Tokyo', 'country' => 'JP', 'popular' => true],
        ['name' => 'Kyoto Ancient Temples', 'city' => 'Kyoto', 'state' => 'Kyoto', 'country' => 'JP', 'popular' => true],
        ['name' => 'Osaka Food Paradise', 'city' => 'Osaka', 'state' => 'Osaka', 'country' => 'JP', 'popular' => false],
        ['name' => 'Hiroshima Peace Memorial', 'city' => 'Hiroshima', 'state' => 'Hiroshima', 'country' => 'JP', 'popular' => false],
        ['name' => 'Nara Deer Park', 'city' => 'Nara', 'state' => 'Nara', 'country' => 'JP', 'popular' => false],

        // France destinations
        ['name' => 'Paris City of Lights', 'city' => 'Paris', 'state' => 'Île-de-France', 'country' => 'FR', 'popular' => true],
        ['name' => 'Nice French Riviera', 'city' => 'Nice', 'state' => 'Provence-Alpes-Côte d\'Azur', 'country' => 'FR', 'popular' => false],
        ['name' => 'Lyon Gastronomic Capital', 'city' => 'Lyon', 'state' => 'Auvergne-Rhône-Alpes', 'country' => 'FR', 'popular' => false],
        ['name' => 'Bordeaux Wine Country', 'city' => 'Bordeaux', 'state' => 'Nouvelle-Aquitaine', 'country' => 'FR', 'popular' => false],
        ['name' => 'Marseille Mediterranean Port', 'city' => 'Marseille', 'state' => 'Provence-Alpes-Côte d\'Azur', 'country' => 'FR', 'popular' => false],

        // USA destinations
        ['name' => 'New York City Adventure', 'city' => 'New York', 'state' => 'New York', 'country' => 'US', 'popular' => true],
        ['name' => 'Los Angeles Hollywood Dreams', 'city' => 'Los Angeles', 'state' => 'California', 'country' => 'US', 'popular' => true],
        ['name' => 'San Francisco Golden Gate', 'city' => 'San Francisco', 'state' => 'California', 'country' => 'US', 'popular' => false],
        ['name' => 'Miami Beach Paradise', 'city' => 'Miami', 'state' => 'Florida', 'country' => 'US', 'popular' => false],
        ['name' => 'Las Vegas Entertainment Capital', 'city' => 'Las Vegas', 'state' => 'Nevada', 'country' => 'US', 'popular' => false],
        ['name' => 'Chicago Windy City', 'city' => 'Chicago', 'state' => 'Illinois', 'country' => 'US', 'popular' => false],
        ['name' => 'Seattle Pacific Northwest', 'city' => 'Seattle', 'state' => 'Washington', 'country' => 'US', 'popular' => false],
        ['name' => 'Boston Historical Heritage', 'city' => 'Boston', 'state' => 'Massachusetts', 'country' => 'US', 'popular' => false],
        ['name' => 'New Orleans Jazz Culture', 'city' => 'New Orleans', 'state' => 'Louisiana', 'country' => 'US', 'popular' => false],
        ['name' => 'Hawaii Tropical Paradise', 'city' => 'Honolulu', 'state' => 'Hawaii', 'country' => 'US', 'popular' => true],

        // UK destinations
        ['name' => 'London Royal Heritage', 'city' => 'London', 'state' => 'England', 'country' => 'GB', 'popular' => true],
        ['name' => 'Edinburgh Scottish Capital', 'city' => 'Edinburgh', 'state' => 'Scotland', 'country' => 'GB', 'popular' => false],
        ['name' => 'Manchester Industrial Heart', 'city' => 'Manchester', 'state' => 'England', 'country' => 'GB', 'popular' => false],
        ['name' => 'Liverpool Beatles Legacy', 'city' => 'Liverpool', 'state' => 'England', 'country' => 'GB', 'popular' => false],
        ['name' => 'Oxford Academic Excellence', 'city' => 'Oxford', 'state' => 'England', 'country' => 'GB', 'popular' => false],

        // Italy destinations
        ['name' => 'Rome Eternal City', 'city' => 'Rome', 'state' => 'Lazio', 'country' => 'IT', 'popular' => true],
        ['name' => 'Venice Floating City', 'city' => 'Venice', 'state' => 'Veneto', 'country' => 'IT', 'popular' => true],
        ['name' => 'Florence Renaissance Art', 'city' => 'Florence', 'state' => 'Tuscany', 'country' => 'IT', 'popular' => false],
        ['name' => 'Milan Fashion Capital', 'city' => 'Milan', 'state' => 'Lombardy', 'country' => 'IT', 'popular' => false],
        ['name' => 'Naples Pizza Origins', 'city' => 'Naples', 'state' => 'Campania', 'country' => 'IT', 'popular' => false],
        ['name' => 'Amalfi Coast Drive', 'city' => 'Amalfi', 'state' => 'Campania', 'country' => 'IT', 'popular' => false],

        // Spain destinations
        ['name' => 'Barcelona Gaudi Masterpieces', 'city' => 'Barcelona', 'state' => 'Catalonia', 'country' => 'ES', 'popular' => true],
        ['name' => 'Madrid Spanish Capital', 'city' => 'Madrid', 'state' => 'Community of Madrid', 'country' => 'ES', 'popular' => false],
        ['name' => 'Seville Flamenco Spirit', 'city' => 'Seville', 'state' => 'Andalusia', 'country' => 'ES', 'popular' => false],
        ['name' => 'Valencia City of Arts', 'city' => 'Valencia', 'state' => 'Valencia', 'country' => 'ES', 'popular' => false],
        ['name' => 'Ibiza Party Island', 'city' => 'Ibiza', 'state' => 'Balearic Islands', 'country' => 'ES', 'popular' => false],

        // Germany destinations
        ['name' => 'Berlin Cultural Capital', 'city' => 'Berlin', 'state' => 'Berlin', 'country' => 'DE', 'popular' => false],
        ['name' => 'Munich Bavarian Heritage', 'city' => 'Munich', 'state' => 'Bavaria', 'country' => 'DE', 'popular' => false],
        ['name' => 'Frankfurt Financial Hub', 'city' => 'Frankfurt', 'state' => 'Hesse', 'country' => 'DE', 'popular' => false],
        ['name' => 'Hamburg Port City', 'city' => 'Hamburg', 'state' => 'Hamburg', 'country' => 'DE', 'popular' => false],
        ['name' => 'Cologne Cathedral City', 'city' => 'Cologne', 'state' => 'North Rhine-Westphalia', 'country' => 'DE', 'popular' => false],

        // Australia destinations
        ['name' => 'Sydney Harbour Exploration', 'city' => 'Sydney', 'state' => 'New South Wales', 'country' => 'AU', 'popular' => true],
        ['name' => 'Melbourne Coffee Culture', 'city' => 'Melbourne', 'state' => 'Victoria', 'country' => 'AU', 'popular' => false],
        ['name' => 'Great Barrier Reef', 'city' => 'Cairns', 'state' => 'Queensland', 'country' => 'AU', 'popular' => false],
        ['name' => 'Perth Western Paradise', 'city' => 'Perth', 'state' => 'Western Australia', 'country' => 'AU', 'popular' => false],
        ['name' => 'Gold Coast Surf Haven', 'city' => 'Gold Coast', 'state' => 'Queensland', 'country' => 'AU', 'popular' => false],

        // New Zealand destinations
        ['name' => 'Auckland City of Sails', 'city' => 'Auckland', 'state' => 'Auckland', 'country' => 'NZ', 'popular' => false],
        ['name' => 'Queenstown Adventure Capital', 'city' => 'Queenstown', 'state' => 'Otago', 'country' => 'NZ', 'popular' => true],
        ['name' => 'Wellington Creative Capital', 'city' => 'Wellington', 'state' => 'Wellington', 'country' => 'NZ', 'popular' => false],
        ['name' => 'Rotorua Geothermal Wonders', 'city' => 'Rotorua', 'state' => 'Bay of Plenty', 'country' => 'NZ', 'popular' => false],
        ['name' => 'Milford Sound Fiordland', 'city' => 'Te Anau', 'state' => 'Southland', 'country' => 'NZ', 'popular' => false],

        // South Africa destinations
        ['name' => 'Cape Town Table Mountain', 'city' => 'Cape Town', 'state' => 'Western Cape', 'country' => 'ZA', 'popular' => true],
        ['name' => 'Johannesburg City of Gold', 'city' => 'Johannesburg', 'state' => 'Gauteng', 'country' => 'ZA', 'popular' => false],
        ['name' => 'Kruger Safari Experience', 'city' => 'Kruger', 'state' => 'Mpumalanga', 'country' => 'ZA', 'popular' => false],
        ['name' => 'Durban Beach Gateway', 'city' => 'Durban', 'state' => 'KwaZulu-Natal', 'country' => 'ZA', 'popular' => false],
        ['name' => 'Garden Route Scenic Drive', 'city' => 'Knysna', 'state' => 'Western Cape', 'country' => 'ZA', 'popular' => false],

        // India destinations
        ['name' => 'Delhi Imperial Capital', 'city' => 'New Delhi', 'state' => 'Delhi', 'country' => 'IN', 'popular' => false],
        ['name' => 'Mumbai Bollywood Dreams', 'city' => 'Mumbai', 'state' => 'Maharashtra', 'country' => 'IN', 'popular' => false],
        ['name' => 'Jaipur Pink City', 'city' => 'Jaipur', 'state' => 'Rajasthan', 'country' => 'IN', 'popular' => false],
        ['name' => 'Agra Taj Mahal', 'city' => 'Agra', 'state' => 'Uttar Pradesh', 'country' => 'IN', 'popular' => false],
        ['name' => 'Goa Beach Paradise', 'city' => 'Panaji', 'state' => 'Goa', 'country' => 'IN', 'popular' => false],

        // Greece destinations
        ['name' => 'Athens Ancient Wonders', 'city' => 'Athens', 'state' => 'Attica', 'country' => 'GR', 'popular' => false],
        ['name' => 'Santorini Sunset Views', 'city' => 'Santorini', 'state' => 'Cyclades', 'country' => 'GR', 'popular' => true],
        ['name' => 'Mykonos Party Island', 'city' => 'Mykonos', 'state' => 'Cyclades', 'country' => 'GR', 'popular' => false],
        ['name' => 'Crete Historical Island', 'city' => 'Heraklion', 'state' => 'Crete', 'country' => 'GR', 'popular' => false],
        ['name' => 'Rhodes Medieval Town', 'city' => 'Rhodes', 'state' => 'Dodecanese', 'country' => 'GR', 'popular' => false],

        // UAE destinations
        ['name' => 'Dubai Modern Marvel', 'city' => 'Dubai', 'state' => 'Dubai', 'country' => 'AE', 'popular' => true],
        ['name' => 'Abu Dhabi Cultural Capital', 'city' => 'Abu Dhabi', 'state' => 'Abu Dhabi', 'country' => 'AE', 'popular' => false],

        // Turkey destinations
        ['name' => 'Istanbul East Meets West', 'city' => 'Istanbul', 'state' => 'Istanbul', 'country' => 'TR', 'popular' => false],
        ['name' => 'Cappadocia Balloon Rides', 'city' => 'Göreme', 'state' => 'Nevşehir', 'country' => 'TR', 'popular' => false],
        ['name' => 'Antalya Turkish Riviera', 'city' => 'Antalya', 'state' => 'Antalya', 'country' => 'TR', 'popular' => false],

        // Mexico destinations
        ['name' => 'Cancun Beach Resort', 'city' => 'Cancun', 'state' => 'Quintana Roo', 'country' => 'MX', 'popular' => false],
        ['name' => 'Mexico City Cultural Hub', 'city' => 'Mexico City', 'state' => 'CDMX', 'country' => 'MX', 'popular' => false],
        ['name' => 'Tulum Ancient Ruins', 'city' => 'Tulum', 'state' => 'Quintana Roo', 'country' => 'MX', 'popular' => false],
        ['name' => 'Playa del Carmen Paradise', 'city' => 'Playa del Carmen', 'state' => 'Quintana Roo', 'country' => 'MX', 'popular' => false],

        // Brazil destinations
        ['name' => 'Rio de Janeiro Carnival', 'city' => 'Rio de Janeiro', 'state' => 'Rio de Janeiro', 'country' => 'BR', 'popular' => false],
        ['name' => 'São Paulo Megacity', 'city' => 'São Paulo', 'state' => 'São Paulo', 'country' => 'BR', 'popular' => false],
        ['name' => 'Amazon Rainforest', 'city' => 'Manaus', 'state' => 'Amazonas', 'country' => 'BR', 'popular' => false],
        ['name' => 'Salvador Afro-Brazilian Culture', 'city' => 'Salvador', 'state' => 'Bahia', 'country' => 'BR', 'popular' => false],

        // Switzerland destinations
        ['name' => 'Zurich Financial Center', 'city' => 'Zurich', 'state' => 'Zurich', 'country' => 'CH', 'popular' => false],
        ['name' => 'Lucerne Lake Views', 'city' => 'Lucerne', 'state' => 'Lucerne', 'country' => 'CH', 'popular' => false],
        ['name' => 'Interlaken Adventure Sports', 'city' => 'Interlaken', 'state' => 'Bern', 'country' => 'CH', 'popular' => false],
        ['name' => 'Geneva International City', 'city' => 'Geneva', 'state' => 'Geneva', 'country' => 'CH', 'popular' => false],
        ['name' => 'Zermatt Matterhorn Views', 'city' => 'Zermatt', 'state' => 'Valais', 'country' => 'CH', 'popular' => false],

        // Maldives destinations
        ['name' => 'Malé Island Paradise', 'city' => 'Malé', 'state' => 'Malé', 'country' => 'MV', 'popular' => true],
        ['name' => 'Maldives Overwater Villas', 'city' => 'Ari Atoll', 'state' => 'Ari Atoll', 'country' => 'MV', 'popular' => false],

        // Sri Lanka destinations
        ['name' => 'Colombo Capital Discovery', 'city' => 'Colombo', 'state' => 'Western Province', 'country' => 'LK', 'popular' => false],
        ['name' => 'Sigiriya Ancient Fortress', 'city' => 'Sigiriya', 'state' => 'Central Province', 'country' => 'LK', 'popular' => false],
        ['name' => 'Kandy Sacred City', 'city' => 'Kandy', 'state' => 'Central Province', 'country' => 'LK', 'popular' => false],
        ['name' => 'Galle Colonial Heritage', 'city' => 'Galle', 'state' => 'Southern Province', 'country' => 'LK', 'popular' => false],
        ['name' => 'Ella Hill Country', 'city' => 'Ella', 'state' => 'Uva Province', 'country' => 'LK', 'popular' => false],
    ];

    private array $activities = [
        'Cultural Tour', 'Food Tasting', 'Historical Walk', 'Photography Tour',
        'Adventure Sports', 'Beach Activities', 'Mountain Hiking', 'Wine Tasting',
        'Art Gallery Visit', 'Local Market Tour', 'Cooking Class', 'Sunset Cruise',
        'Temple Visit', 'Museum Tour', 'Nightlife Experience', 'Shopping Tour',
        'Wildlife Safari', 'Snorkeling', 'Scuba Diving', 'Surfing',
        'Cycling Tour', 'Hot Air Balloon', 'Spa & Wellness', 'Yoga Retreat',
    ];

    private array $seasons = [
        ['name' => 'Spring', 'months' => 'March - May'],
        ['name' => 'Summer', 'months' => 'June - August'],
        ['name' => 'Autumn', 'months' => 'September - November'],
        ['name' => 'Winter', 'months' => 'December - February'],
        ['name' => 'Dry Season', 'months' => 'November - April'],
        ['name' => 'Wet Season', 'months' => 'May - October'],
        ['name' => 'Peak Season', 'months' => 'December - March'],
        ['name' => 'Off Season', 'months' => 'April - September'],
    ];

    public function run(): void
    {
        $this->command->info('Creating 100 sample destinations with related data...');

        // Get all countries
        $countries = Country::all()->keyBy('code');

        if ($countries->isEmpty()) {
            $this->command->error('No countries found. Please run CountrySeeder first.');
            return;
        }

        // Get all specialists
        $specialists = Specialist::where('status', 'active')->get();

        $createdCount = 0;
        $imageKeys = array_keys($this->unsplashImages);

        foreach ($this->destinationData as $index => $data) {
            $country = $countries->get($data['country']);

            if (!$country) {
                $this->command->warn("Country {$data['country']} not found, skipping {$data['name']}");
                continue;
            }

            // Check if destination already exists
            $existingDestination = Destination::where('name', $data['name'])
                ->where('country_id', $country->id)
                ->first();

            if ($existingDestination) {
                $this->command->line("Destination '{$data['name']}' already exists, skipping...");
                continue;
            }

            // Get random image for this destination
            $imageKey = $imageKeys[$index % count($imageKeys)];
            $imageId = $this->unsplashImages[$imageKey];

            // Find specialists for this country
            $countrySpecialists = $specialists->where('country_id', $country->id)->pluck('id')->toArray();

            // Create destination
            $destination = Destination::create([
                'name' => $data['name'],
                'description' => $this->generateDescription($data['name'], $data['city'], $country->name),
                'overview_title' => "Discover {$data['city']}",
                'overview' => $this->generateOverview($data['name'], $data['city'], $country->name),
                'status' => 'active',
                'home_page' => $data['popular'],
                'country_id' => $country->id,
                'state_province' => $data['state'],
                'city' => $data['city'],
                'home_image' => "https://images.unsplash.com/{$imageId}?w=800&h=600&fit=crop",
                'grid_image' => "https://images.unsplash.com/{$imageId}?w=400&h=300&fit=crop",
                'banner_image' => "https://images.unsplash.com/{$imageId}?w=1200&h=400&fit=crop",
                'specialist_ids' => !empty($countrySpecialists) ? array_slice($countrySpecialists, 0, rand(1, min(3, count($countrySpecialists)))) : null,
            ]);

            // Create images (3-5 per destination)
            $this->createImages($destination, $imageId);

            // Create seasons (2-4 per destination)
            $this->createSeasons($destination);

            // Create activities (3-6 per destination)
            $this->createActivities($destination);

            // Create itineraries (2-4 per destination)
            $this->createItineraries($destination);

            $createdCount++;
            $this->command->line("Created: {$data['name']} ({$data['city']}, {$country->name})");
        }

        $this->command->info("Successfully created {$createdCount} destinations with related data.");
        $popularCount = Destination::where('home_page', true)->count();
        $this->command->info("Popular destinations (home_page=true): {$popularCount}");
    }

    private function generateDescription(string $name, string $city, string $country): string
    {
        $templates = [
            "Discover the wonders of {$city} in {$country}. Experience local culture, amazing cuisine, and unforgettable adventures.",
            "Explore {$city}'s hidden gems and popular attractions. Let our local experts guide you through authentic experiences.",
            "{$city} offers a perfect blend of tradition and modernity. Immerse yourself in the local lifestyle and create lasting memories.",
            "From stunning landscapes to vibrant city life, {$city} has something for every traveler. Plan your perfect trip today.",
            "Experience the magic of {$city}. Our local specialists will help you discover the best this destination has to offer.",
        ];

        return $templates[array_rand($templates)];
    }

    private function generateOverview(string $name, string $city, string $country): string
    {
        return "{$city} is one of {$country}'s most captivating destinations. Whether you're seeking adventure, " .
            "relaxation, cultural immersion, or culinary delights, this destination delivers unforgettable experiences. " .
            "Our local travel experts have deep knowledge of the area and will craft a personalized itinerary " .
            "that matches your interests and travel style. From iconic landmarks to hidden local favorites, " .
            "discover {$city} like a true local.";
    }

    private function createImages(Destination $destination, string $baseImageId): void
    {
        // Valid image_type enum values: banner, grid, gallery
        $imageTypes = ['banner', 'grid', 'gallery', 'gallery', 'gallery'];
        $numImages = rand(3, 5);

        // Get alternative image IDs for variety
        $imageIds = array_values($this->unsplashImages);
        shuffle($imageIds);

        for ($i = 0; $i < $numImages; $i++) {
            $imageId = $i === 0 ? $baseImageId : $imageIds[$i % count($imageIds)];

            DestinationImage::create([
                'destination_id' => $destination->id,
                'name' => "{$destination->name} - " . ucfirst($imageTypes[$i] ?? 'gallery') . " Image",
                'description' => "Beautiful view of {$destination->city}",
                'image_type' => $imageTypes[$i] ?? 'gallery',
                'url' => "https://images.unsplash.com/{$imageId}?w=1200&h=800&fit=crop",
            ]);
        }
    }

    private function createSeasons(Destination $destination): void
    {
        $numSeasons = rand(2, 4);
        $selectedSeasons = array_rand($this->seasons, $numSeasons);

        if (!is_array($selectedSeasons)) {
            $selectedSeasons = [$selectedSeasons];
        }

        foreach ($selectedSeasons as $seasonIndex) {
            $season = $this->seasons[$seasonIndex];

            $descriptions = [
                "Perfect time to visit {$destination->city} with pleasant weather and fewer crowds.",
                "Experience {$destination->city} at its best during this season with ideal conditions for outdoor activities.",
                "A great season to explore {$destination->city}'s attractions and enjoy local festivals.",
                "Enjoy comfortable temperatures and beautiful scenery in {$destination->city} during this period.",
            ];

            DestinationSeason::create([
                'destination_id' => $destination->id,
                'name' => $season['name'],
                'duration' => $season['months'],
                'description' => $descriptions[array_rand($descriptions)],
                'status' => true,
            ]);
        }
    }

    private function createActivities(Destination $destination): void
    {
        $numActivities = rand(3, 6);
        $selectedActivities = array_rand(array_flip($this->activities), $numActivities);

        if (!is_array($selectedActivities)) {
            $selectedActivities = [$selectedActivities];
        }

        $imageIds = array_values($this->unsplashImages);

        foreach ($selectedActivities as $activity) {
            $descriptions = [
                "Experience {$activity} in {$destination->city} with expert local guides.",
                "Discover the best {$activity} spots that only locals know about.",
                "Join our popular {$activity} experience and create unforgettable memories.",
                "Our {$activity} tours are designed for all skill levels and interests.",
            ];

            DestinationActivity::create([
                'destination_id' => $destination->id,
                'name' => $activity,
                'description' => $descriptions[array_rand($descriptions)],
                'image_url' => "https://images.unsplash.com/{$imageIds[array_rand($imageIds)]}?w=600&h=400&fit=crop",
                'status' => true,
            ]);
        }
    }

    private function createItineraries(Destination $destination): void
    {
        $itineraryTemplates = [
            ['title' => '3-Day Quick Escape', 'days' => 3],
            ['title' => '5-Day Explorer Tour', 'days' => 5],
            ['title' => '7-Day Complete Experience', 'days' => 7],
            ['title' => '10-Day Ultimate Adventure', 'days' => 10],
            ['title' => 'Weekend Getaway', 'days' => 2],
            ['title' => 'Family Fun Week', 'days' => 7],
            ['title' => 'Romantic Retreat', 'days' => 4],
            ['title' => 'Cultural Immersion', 'days' => 6],
        ];

        $numItineraries = rand(2, 4);
        $selectedItineraries = array_rand($itineraryTemplates, $numItineraries);

        if (!is_array($selectedItineraries)) {
            $selectedItineraries = [$selectedItineraries];
        }

        $imageIds = array_values($this->unsplashImages);

        foreach ($selectedItineraries as $itineraryIndex) {
            $template = $itineraryTemplates[$itineraryIndex];

            $description = "Explore the best of {$destination->city} in {$template['days']} days. " .
                "This carefully crafted itinerary includes must-see attractions, hidden gems, " .
                "local dining experiences, and authentic cultural encounters. Perfect for travelers " .
                "who want to make the most of their time in {$destination->city}.";

            DestinationItinerary::create([
                'destination_id' => $destination->id,
                'title' => "{$destination->city} {$template['title']}",
                'description' => $description,
                'image_url' => "https://images.unsplash.com/{$imageIds[array_rand($imageIds)]}?w=800&h=600&fit=crop",
                'status' => 'active',
            ]);
        }
    }
}
