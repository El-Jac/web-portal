<?php

namespace App\Console\Commands;

use App\Services\SampleDestinationImporter;
use Illuminate\Console\Command;

class ImportSampleDestinations extends Command
{
    protected $signature = 'destinations:import-sample';

    protected $description = 'Insert sample destinations (public image paths), seasons, activities, and itineraries';

    public function handle(SampleDestinationImporter $importer): int
    {
        return $importer->import($this->output);
    }
}
