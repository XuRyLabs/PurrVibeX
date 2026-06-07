<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;

class MusicSync implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public int $roomId,
        public string $youtubeUrl,
        public string $title,
        public float $currentTime,   // seconds elapsed
        public int $serverTimestamp  // Unix timestamp for client drift correction
    ) {}

    public function broadcastOn(): Channel
    {
        return new Channel('room.' . $this->roomId . '.music');
    }
}

