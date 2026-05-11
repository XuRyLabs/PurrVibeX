<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatPhoto extends Model
{
    protected $fillable = [
        'user_id',
        'url',
        'caption',
        'breed_tag',   // British, Maine Coon, Munchkin, etc.
        'likes_count',
    ];

    public function user() { /* TODO */ }
    public function likes() { /* TODO */ }
    public function comments() { /* TODO */ }
}

