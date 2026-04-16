<?php

/**
 * Same as: php artisan specialists:assign-portrait-urls [--all]
 * Usage: php scripts/assign-specialist-portrait-urls.php [--all]
 */

declare(strict_types=1);

use Illuminate\Contracts\Console\Kernel;
use Symfony\Component\Console\Input\ArgvInput;
use Symfony\Component\Console\Output\ConsoleOutput;

require __DIR__.'/../vendor/autoload.php';

/** @var \Illuminate\Foundation\Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

$argv = new ArgvInput;
$output = new ConsoleOutput;

$all = $argv->hasParameterOption('--all');

$updated = 0;
$skipped = 0;

foreach (\App\Models\Specialist::query()->orderBy('id')->cursor() as $specialist) {
    if (!$all && $specialist->profile_pic && filter_var($specialist->profile_pic, FILTER_VALIDATE_URL)) {
        $skipped++;
        continue;
    }

    $specialist->update([
        'profile_pic' => \App\Support\SpecialistPortraitImageUrls::forSpecialistId($specialist->id),
    ]);
    $updated++;
}

$output->writeln("<info>Done. Updated: {$updated}. Skipped (remote URL): {$skipped}.</info>");

exit(0);
