<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',         // public | private | invite-only
        'owner_id',
        'background',
        'theme',
        'music_enabled',
        'game_enabled',
    ];

    public function owner() { /* TODO */ }
    public function members() { /* TODO */ }
    public function messages() { /* TODO */ }
    public function musicQueue() { /* TODO */ }
}

