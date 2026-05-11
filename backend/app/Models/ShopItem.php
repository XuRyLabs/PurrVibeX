<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopItem extends Model
{
    protected $fillable = [
        'name',
        'type',        // avatar | sticker | frame | theme | room_decor
        'price',       // in Meow Points
        'asset_url',
        'is_limited',  // event-exclusive item
        'event_tag',   // e.g. "halloween", "christmas"
    ];
}

