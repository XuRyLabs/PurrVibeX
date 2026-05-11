<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'room_id',
        'user_id',
        'content',
        'type',     // text | sticker | emoji
    ];

    public function user() { /* TODO */ }
    public function room() { /* TODO */ }
    public function reactions() { /* TODO */ }
}

