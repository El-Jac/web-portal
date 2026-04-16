<?php

namespace App\Console\Commands;

use App\Models\Specialist;
use App\Support\SpecialistPortraitImageUrls;
use Illuminate\Console\Command;

class AssignSpecialistPortraitUrls extends Command
{
    protected $signature = 'specialists:assign-portrait-urls
                            {--all : Overwrite every specialist, including those that already have a remote URL}';

    protected $description = 'Set specialist profile_pic to curated Unsplash portrait URLs (public photos online)';

    public function handle(): int
    {
        $all = (bool) $this->option('all');

        $updated = 0;
        $skipped = 0;

        foreach (Specialist::query()->orderBy('id')->cursor() as $specialist) {
            if (!$all && $specialist->profile_pic && filter_var($specialist->profile_pic, FILTER_VALIDATE_URL)) {
                $this->line("Skipping #{$specialist->id} (remote URL already set). Use --all to replace.");
                $skipped++;
                continue;
            }

            $url = SpecialistPortraitImageUrls::forSpecialistId($specialist->id);
            $specialist->update(['profile_pic' => $url]);
            $updated++;
            $this->line("Updated specialist #{$specialist->id} ({$specialist->email})");
        }

        $this->info("Done. Updated: {$updated}. Skipped (remote URL): {$skipped}.");

        return 0;
    }
}
