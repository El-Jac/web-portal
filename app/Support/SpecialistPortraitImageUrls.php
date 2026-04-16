<?php

namespace App\Support;

/**
 * Curated portrait URLs from Unsplash (real photography, publicly hosted).
 * Used for sample data and backfilling specialist profile_pic fields.
 */
final class SpecialistPortraitImageUrls
{
    /**
     * @return list<string>
     */
    public static function urls(): array
    {
        $q = 'w=400&h=400&fit=crop&auto=format&q=80';

        return [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?{$q}",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?{$q}",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?{$q}",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?{$q}",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?{$q}",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?{$q}",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?{$q}",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?{$q}",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?{$q}",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?{$q}",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?{$q}",
            "https://images.unsplash.com/photo-1599566150163-43194c0e0d0c?{$q}",
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?{$q}",
            "https://images.unsplash.com/photo-1554151228-14d9def656e4?{$q}",
            "https://images.unsplash.com/photo-1508214751196-bcfd4f60c2c8?{$q}",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?{$q}",
            "https://images.unsplash.com/photo-1522075469751-450a4594f0de?{$q}",
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?{$q}",
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?{$q}",
            "https://images.unsplash.com/photo-1619895862022-09118ba0f616?{$q}",
            "https://images.unsplash.com/photo-1633332755192-1a050afd8491?{$q}",
            "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?{$q}",
            "https://images.unsplash.com/photo-1552058544-f2b08422138a?{$q}",
            "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?{$q}",
        ];
    }

    public static function forSpecialistId(int $id): string
    {
        $urls = self::urls();

        return $urls[($id - 1) % count($urls)];
    }

    public static function forLoopIndex(int $index): string
    {
        $urls = self::urls();

        return $urls[$index % count($urls)];
    }
}
