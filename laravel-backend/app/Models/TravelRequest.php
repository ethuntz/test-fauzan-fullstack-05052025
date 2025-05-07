<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TravelRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'departure_date',
        'arrival_date',
        'destination',
        'purpose',
        'status'
    ];

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}