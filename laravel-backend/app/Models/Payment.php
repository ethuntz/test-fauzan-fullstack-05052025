<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'travel_request_id',
        'amount',
        'status',
        'external_reference'
    ];

    public function travelRequest(): BelongsTo
    {
        return $this->belongsTo(TravelRequest::class);
    }
}