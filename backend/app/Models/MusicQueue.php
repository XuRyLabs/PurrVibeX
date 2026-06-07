<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MusicQueue extends Model
{
    protected $fillable = [
        'room_id',
        'requested_by',
        'youtube_url',
        'title',
        'duration',      // seconds
        'status',        // pending | playing | done | skipped
        'started_at',    // timestamp when song started playing (for sync)
        'skip_votes',
    ];

    public function room() { /* TODO */ }
    public function requester() { /* TODO */ }
}

