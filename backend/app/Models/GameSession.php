<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    protected $fillable = [
        'room_id',
        'game_type',   // catch_the_mouse | fish_collector | cat_tower | meow_cards | laser_chase
        'status',      // waiting | in_progress | finished
        'state',       // JSON: game-specific state
        'winner_id',
    ];

    protected $casts = [
        'state' => 'array',
    ];

    public function room() { /* TODO */ }
    public function players() { /* TODO */ }
    public function winner() { /* TODO */ }
}

