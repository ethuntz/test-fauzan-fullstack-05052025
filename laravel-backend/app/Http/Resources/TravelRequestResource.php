<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TravelRequestResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'departure_date' => $this->departure_date,
            'arrival_date' => $this->arrival_date,
            'destination' => $this->destination,
            'purpose' => $this->purpose,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'payments' => PaymentResource::collection($this->whenLoaded('payments')),
        ];
    }
}