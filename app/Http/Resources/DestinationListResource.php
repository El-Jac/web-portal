<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DestinationListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'overview_title' => $this->overview_title,
            'overview' => $this->overview,
            'status' => $this->status,
            'country' => $this->country?->name,
            'country_id' => $this->country_id,
            'state_province' => $this->state_province,
            'city' => $this->city,
            'full_location' => $this->full_location,
            'home_image' => $this->home_image,
            'grid_image' => $this->grid_image,
            'banner_image' => $this->banner_image,
            'specialist_ids' => $this->specialist_ids,
            'specialist_count' => $this->specialist_count,
            'featured_specialist' => $this->getFeaturedSpecialist(),
            'main_image' => $this->main_image?->url,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function getFeaturedSpecialist(): ?array
    {
        if (empty($this->specialist_ids)) {
            return null;
        }

        $specialistId = $this->specialist_ids[0] ?? null;
        if (! $specialistId) {
            return null;
        }

        $specialist = \App\Models\Specialist::find($specialistId);
        if (! $specialist) {
            return null;
        }

        return [
            'id' => $specialist->id,
            'full_name' => $specialist->full_name,
            'profile_pic' => $specialist->profile_pic,
            'bio' => $specialist->bio,
            'city' => $specialist->city,
        ];
    }
}
