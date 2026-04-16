<?php

namespace App\Console\Commands;

use App\Services\SpecialistsForDestinationsImporter;
use Illuminate\Console\Command;

class ImportSpecialistsForDestinations extends Command
{
    protected $signature = 'specialists:import-for-destinations';

    protected $description = 'Create 15 sample specialists and assign each to a unique existing destination (specialist_ids)';

    public function handle(SpecialistsForDestinationsImporter $importer): int
    {
        return $importer->import($this->output);
    }
}
