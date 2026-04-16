<?php

/**
 * Standalone entry point (same logic as: php artisan destinations:import-sample).
 * Usage: php scripts/import-sample-destinations.php
 */

declare(strict_types=1);

use App\Services\SampleDestinationImporter;
use Illuminate\Contracts\Console\Kernel;
use Symfony\Component\Console\Output\ConsoleOutput;

require __DIR__.'/../vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

$exitCode = $app->make(SampleDestinationImporter::class)->import(new ConsoleOutput());

exit($exitCode);
