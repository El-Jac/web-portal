<?php

namespace Database\Seeders;

use App\Services\SampleDestinationImporter;
use Illuminate\Database\Seeder;
use Symfony\Component\Console\Output\ConsoleOutput;

class SampleDestinationsSeeder extends Seeder
{
    public function run(): void
    {
        $output = $this->command?->getOutput() ?? new ConsoleOutput();

        app(SampleDestinationImporter::class)->import($output);
    }
}
