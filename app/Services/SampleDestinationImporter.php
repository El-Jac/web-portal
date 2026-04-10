<?php

namespace App\Services;

use App\Models\Country;
use App\Models\Destination;
use App\Models\DestinationActivity;
use App\Models\DestinationImage;
use App\Models\DestinationItinerary;
use App\Models\DestinationSeason;
use App\Models\Specialist;
use Symfony\Component\Console\Output\OutputInterface;

class SampleDestinationImporter
{
    /**
     * Paths under public/ (root-relative URLs). Reused across destinations.
     */
    private array $publicImages = [
        '/images/home/stitch/tokyo.jpg',
        '/images/home/stitch/london.jpg',
        '/images/home/stitch/sydney.jpg',
        '/images/home/stitch/hero.jpg',
        '/images/home/stitch/hero.png',
        '/images/home/stitch/hero.webp',
        '/images/home/stitch/what-is-plan-bg.webp',
        '/web/our-story-image.webp',
        '/web/Jerry_resized.jpeg',
        '/web/pasindu.jpeg',
        '/images/home/stitch/kenji.jpg',
        '/images/home/stitch/emma.jpg',
        '/images/home/stitch/daniel.jpg',
    ];

    private array $destinationData = [
        ['name' => 'Tokyo Metropolis', 'city' => 'Tokyo', 'state' => 'Tokyo', 'country' => 'JP', 'popular' => true],
        ['name' => 'Kyoto Ancient Temples', 'city' => 'Kyoto', 'state' => 'Kyoto', 'country' => 'JP', 'popular' => true],
        ['name' => 'Osaka Food Paradise', 'city' => 'Osaka', 'state' => 'Osaka', 'country' => 'JP', 'popular' => false],
        ['name' => 'Hiroshima Peace Memorial', 'city' => 'Hiroshima', 'state' => 'Hiroshima', 'country' => 'JP', 'popular' => false],
        ['name' => 'Nara Deer Park', 'city' => 'Nara', 'state' => 'Nara', 'country' => 'JP', 'popular' => false],
        ['name' => 'Paris City of Lights', 'city' => 'Paris', 'state' => 'Île-de-France', 'country' => 'FR', 'popular' => true],
        ['name' => 'Nice French Riviera', 'city' => 'Nice', 'state' => 'Provence-Alpes-Côte d\'Azur', 'country' => 'FR', 'popular' => false],
        ['name' => 'Lyon Gastronomic Capital', 'city' => 'Lyon', 'state' => 'Auvergne-Rhône-Alpes', 'country' => 'FR', 'popular' => false],
        ['name' => 'Bordeaux Wine Country', 'city' => 'Bordeaux', 'state' => 'Nouvelle-Aquitaine', 'country' => 'FR', 'popular' => false],
        ['name' => 'Marseille Mediterranean Port', 'city' => 'Marseille', 'state' => 'Provence-Alpes-Côte d\'Azur', 'country' => 'FR', 'popular' => false],
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
        ['name' => 'London Royal Heritage', 'city' => 'London', 'state' => 'England', 'country' => 'GB', 'popular' => true],
        ['name' => 'Edinburgh Scottish Capital', 'city' => 'Edinburgh', 'state' => 'Scotland', 'country' => 'GB', 'popular' => false],
        ['name' => 'Manchester Industrial Heart', 'city' => 'Manchester', 'state' => 'England', 'country' => 'GB', 'popular' => false],
        ['name' => 'Liverpool Beatles Legacy', 'city' => 'Liverpool', 'state' => 'England', 'country' => 'GB', 'popular' => false],
        ['name' => 'Oxford Academic Excellence', 'city' => 'Oxford', 'state' => 'England', 'country' => 'GB', 'popular' => false],
        ['name' => 'Rome Eternal City', 'city' => 'Rome', 'state' => 'Lazio', 'country' => 'IT', 'popular' => true],
        ['name' => 'Venice Floating City', 'city' => 'Venice', 'state' => 'Veneto', 'country' => 'IT', 'popular' => true],
        ['name' => 'Florence Renaissance Art', 'city' => 'Florence', 'state' => 'Tuscany', 'country' => 'IT', 'popular' => false],
        ['name' => 'Milan Fashion Capital', 'city' => 'Milan', 'state' => 'Lombardy', 'country' => 'IT', 'popular' => false],
        ['name' => 'Naples Pizza Origins', 'city' => 'Naples', 'state' => 'Campania', 'country' => 'IT', 'popular' => false],
        ['name' => 'Amalfi Coast Drive', 'city' => 'Amalfi', 'state' => 'Campania', 'country' => 'IT', 'popular' => false],
        ['name' => 'Barcelona Gaudi Masterpieces', 'city' => 'Barcelona', 'state' => 'Catalonia', 'country' => 'ES', 'popular' => true],
        ['name' => 'Madrid Spanish Capital', 'city' => 'Madrid', 'state' => 'Community of Madrid', 'country' => 'ES', 'popular' => false],
        ['name' => 'Seville Flamenco Spirit', 'city' => 'Seville', 'state' => 'Andalusia', 'country' => 'ES', 'popular' => false],
        ['name' => 'Valencia City of Arts', 'city' => 'Valencia', 'state' => 'Valencia', 'country' => 'ES', 'popular' => false],
        ['name' => 'Ibiza Party Island', 'city' => 'Ibiza', 'state' => 'Balearic Islands', 'country' => 'ES', 'popular' => false],
        ['name' => 'Berlin Cultural Capital', 'city' => 'Berlin', 'state' => 'Berlin', 'country' => 'DE', 'popular' => false],
        ['name' => 'Munich Bavarian Heritage', 'city' => 'Munich', 'state' => 'Bavaria', 'country' => 'DE', 'popular' => false],
        ['name' => 'Frankfurt Financial Hub', 'city' => 'Frankfurt', 'state' => 'Hesse', 'country' => 'DE', 'popular' => false],
        ['name' => 'Hamburg Port City', 'city' => 'Hamburg', 'state' => 'Hamburg', 'country' => 'DE', 'popular' => false],
        ['name' => 'Cologne Cathedral City', 'city' => 'Cologne', 'state' => 'North Rhine-Westphalia', 'country' => 'DE', 'popular' => false],
        ['name' => 'Sydney Harbour Exploration', 'city' => 'Sydney', 'state' => 'New South Wales', 'country' => 'AU', 'popular' => true],
        ['name' => 'Melbourne Coffee Culture', 'city' => 'Melbourne', 'state' => 'Victoria', 'country' => 'AU', 'popular' => false],
        ['name' => 'Great Barrier Reef', 'city' => 'Cairns', 'state' => 'Queensland', 'country' => 'AU', 'popular' => false],
        ['name' => 'Perth Western Paradise', 'city' => 'Perth', 'state' => 'Western Australia', 'country' => 'AU', 'popular' => false],
        ['name' => 'Gold Coast Surf Haven', 'city' => 'Gold Coast', 'state' => 'Queensland', 'country' => 'AU', 'popular' => false],
        ['name' => 'Auckland City of Sails', 'city' => 'Auckland', 'state' => 'Auckland', 'country' => 'NZ', 'popular' => false],
        ['name' => 'Queenstown Adventure Capital', 'city' => 'Queenstown', 'state' => 'Otago', 'country' => 'NZ', 'popular' => true],
        ['name' => 'Wellington Creative Capital', 'city' => 'Wellington', 'state' => 'Wellington', 'country' => 'NZ', 'popular' => false],
        ['name' => 'Rotorua Geothermal Wonders', 'city' => 'Rotorua', 'state' => 'Bay of Plenty', 'country' => 'NZ', 'popular' => false],
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

    public function import(OutputInterface $output): int
    {
        $destinationCount = count($this->destinationData);
        $output->writeln("<info>Importing up to {$destinationCount} sample destinations with related data...</info>");

        $countries = Country::all()->keyBy('code');

        if ($countries->isEmpty()) {
            $output->writeln('<error>No countries found. Run CountrySeeder or ensure countries exist.</error>');

            return 1;
        }

        $specialists = Specialist::where('status', 'active')->get();

        $createdCount = 0;
        $imagePaths = $this->publicImages;
        $numImages = count($imagePaths);

        foreach ($this->destinationData as $index => $data) {
            $country = $countries->get($data['country']);

            if (!$country) {
                $output->writeln("<comment>Country {$data['country']} not found, skipping {$data['name']}</comment>");
                continue;
            }

            $existingDestination = Destination::where('name', $data['name'])
                ->where('country_id', $country->id)
                ->first();

            if ($existingDestination) {
                $output->writeln("Destination '{$data['name']}' already exists, skipping...");
                continue;
            }

            $primaryImage = $imagePaths[$index % $numImages];

            $countrySpecialists = $specialists->where('country_id', $country->id)->pluck('id')->toArray();

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
                'home_image' => $primaryImage,
                'grid_image' => $primaryImage,
                'banner_image' => $primaryImage,
                'specialist_ids' => !empty($countrySpecialists) ? array_slice($countrySpecialists, 0, rand(1, min(3, count($countrySpecialists)))) : null,
            ]);

            $this->createImages($destination, $primaryImage);
            $this->createSeasons($destination);
            $this->createActivities($destination);
            $this->createItineraries($destination);

            $createdCount++;
            $output->writeln("Created: {$data['name']} ({$data['city']}, {$country->name})");
        }

        $output->writeln("<info>Successfully created {$createdCount} destinations with related data.</info>");
        $popularCount = Destination::where('home_page', true)->count();
        $output->writeln("<info>Popular destinations (home_page=true): {$popularCount}</info>");

        return 0;
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

    private function createImages(Destination $destination, string $basePath): void
    {
        $imageTypes = ['banner', 'grid', 'gallery', 'gallery', 'gallery'];
        $numImages = rand(3, 5);

        $paths = $this->publicImages;
        shuffle($paths);

        for ($i = 0; $i < $numImages; $i++) {
            $path = $i === 0 ? $basePath : $paths[$i % count($paths)];

            DestinationImage::create([
                'destination_id' => $destination->id,
                'name' => "{$destination->name} - " . ucfirst($imageTypes[$i] ?? 'gallery') . ' Image',
                'description' => "Beautiful view of {$destination->city}",
                'image_type' => $imageTypes[$i] ?? 'gallery',
                'url' => $path,
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

        $paths = $this->publicImages;

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
                'image_url' => $paths[array_rand($paths)],
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

        $paths = $this->publicImages;

        foreach ($selectedItineraries as $itineraryIndex) {
            $template = $itineraryTemplates[$itineraryIndex];

            $description = "Explore the best of {$destination->city} in {$template['days']} days. " .
                'This carefully crafted itinerary includes must-see attractions, hidden gems, ' .
                'local dining experiences, and authentic cultural encounters. Perfect for travelers ' .
                "who want to make the most of their time in {$destination->city}.";

            DestinationItinerary::create([
                'destination_id' => $destination->id,
                'title' => "{$destination->city} {$template['title']}",
                'description' => $description,
                'image_url' => $paths[array_rand($paths)],
                'status' => 'active',
            ]);
        }
    }
}
