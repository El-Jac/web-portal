<?php

/**
 * Standalone entry (same as: php artisan specialists:import-for-destinations).
 * Usage: php scripts/import-specialists-for-destinations.php
 */

declare(strict_types=1);

use App\Services\SpecialistsForDestinationsImporter;
use Illuminate\Contracts\Console\Kernel;
use Symfony\Component\Console\Output\ConsoleOutput;

require __DIR__.'/../vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

$exitCode = $app->make(SpecialistsForDestinationsImporter::class)->import(new ConsoleOutput());

exit($exitCode);
