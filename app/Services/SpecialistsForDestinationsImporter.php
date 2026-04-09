<?php

namespace App\Services;

use App\Actions\Auth\CreateUserAccountAction;
use App\Support\SpecialistPortraitImageUrls;
use App\Models\Country;
use App\Models\Destination;
use App\Models\Specialist;
use App\Models\WorkingHour;
use Symfony\Component\Console\Output\OutputInterface;

class SpecialistsForDestinationsImporter
{
    private const COUNT = 15;

    /** @var list<array{0: string, 1: string}> */
    private array $namePool = [
        ['Alex', 'Morgan'],
        ['Jordan', 'Lee'],
        ['Casey', 'Nguyen'],
        ['Riley', 'Patel'],
        ['Taylor', 'Brooks'],
        ['Morgan', 'Reyes'],
        ['Quinn', 'Foster'],
        ['Avery', 'Hayes'],
        ['Jamie', 'Cole'],
        ['Drew', 'Singh'],
        ['Blake', 'Murphy'],
        ['Cameron', 'Okonkwo'],
        ['Skyler', 'Vega'],
        ['Reese', 'Kim'],
        ['Parker', 'Dalton'],
    ];

    public function import(OutputInterface $output): int
    {
        $destinations = Destination::query()
            ->with('country')
            ->whereNotNull('country_id')
            ->orderBy('id')
            ->limit(self::COUNT)
            ->get();

        if ($destinations->count() < self::COUNT) {
            $output->writeln(
                '<error>Need at least ' . self::COUNT . ' destinations with country_id. Found: ' . $destinations->count() . '.</error>'
            );

            return 1;
        }

        $output->writeln('<info>Creating ' . self::COUNT . ' specialists and linking each to a unique destination...</info>');

        $created = 0;
        $linked = 0;

        foreach ($destinations->values() as $index => $destination) {
            $email = $this->emailForDestination($destination->id);
            [$first, $last] = $this->namePool[$index];

            $specialist = Specialist::where('email', $email)->first();

            if (!$specialist) {
                $country = $destination->country ?? Country::find($destination->country_id);
                if (!$country) {
                    $output->writeln("<comment>Skipping destination {$destination->id}: missing country.</comment>");
                    continue;
                }

                $specialist = Specialist::create([
                    'first_name' => $first,
                    'last_name' => $last,
                    'email' => $email,
                    'bio' => "Local travel specialist for {$destination->name}. Personalized itineraries, trusted recommendations, and on-the-ground support in {$destination->city}.",
                    'contact_no' => $this->fakePhone($index),
                    'country_id' => $destination->country_id,
                    'state_province' => $destination->state_province ?? '',
                    'city' => $destination->city ?? '',
                    'address' => 'Sample address — update in admin',
                    'postal_code' => '00000',
                    'timezone' => $this->timezoneForCountryCode($country->code ?? ''),
                    'status' => 'active',
                    'no_of_trips' => random_int(5, 40),
                    'profile_pic' => SpecialistPortraitImageUrls::forLoopIndex($index),
                ]);

                if ($specialist->workingHours()->count() === 0) {
                    WorkingHour::create([
                        'specialist_id' => $specialist->id,
                        'start_time' => '09:00',
                        'end_time' => '17:00',
                    ]);
                }

                try {
                    $createUser = new CreateUserAccountAction();
                    $createUser->execute([
                        'name' => "{$first} {$last}",
                        'email' => $email,
                        'role' => 'specialist',
                        'password' => 'password123',
                    ], false);
                } catch (\Throwable $e) {
                    \Log::warning('SpecialistsForDestinationsImporter: user not created for ' . $email . ' — ' . $e->getMessage());
                }

                $created++;
            }

            $ids = $destination->specialist_ids ?? [];
            if (!in_array($specialist->id, $ids, true)) {
                $ids[] = $specialist->id;
                $destination->update(['specialist_ids' => array_values($ids)]);
                $linked++;
                $output->writeln("Assigned specialist #{$specialist->id} ({$specialist->email}) → destination #{$destination->id} ({$destination->name})");
            } else {
                $output->writeln("Unchanged: specialist #{$specialist->id} already on destination #{$destination->id} ({$destination->name})");
            }
        }

        $output->writeln("<info>Done. New specialists created: {$created}. Destinations updated: {$linked}.</info>");

        return 0;
    }

    private function emailForDestination(int $destinationId): string
    {
        return "specialist.dst.{$destinationId}@import.example.com";
    }

    private function fakePhone(int $index): string
    {
        return '+1-555-' . str_pad((string) (1000 + $index), 4, '0', STR_PAD_LEFT);
    }

    private function timezoneForCountryCode(string $code): string
    {
        return match (strtoupper($code)) {
            'US' => 'America/New_York',
            'GB' => 'Europe/London',
            'JP' => 'Asia/Tokyo',
            'FR' => 'Europe/Paris',
            'DE' => 'Europe/Berlin',
            'IT' => 'Europe/Rome',
            'ES' => 'Europe/Madrid',
            'AU' => 'Australia/Sydney',
            'NZ' => 'Pacific/Auckland',
            'AE' => 'Asia/Dubai',
            'IN' => 'Asia/Kolkata',
            'BR' => 'America/Sao_Paulo',
            'MX' => 'America/Mexico_City',
            'CH' => 'Europe/Zurich',
            'ZA' => 'Africa/Johannesburg',
            'GR' => 'Europe/Athens',
            'TR' => 'Europe/Istanbul',
            'MV' => 'Indian/Maldives',
            'LK' => 'Asia/Colombo',
            default => 'UTC',
        };
    }
}
