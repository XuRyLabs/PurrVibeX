<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MusicController extends Controller
{
    public function queue(Request $request, $roomId)
    {
        // TODO: return current music queue for the room
    }

    public function addSong(Request $request, $roomId)
    {
        // TODO: accept YouTube URL, extract with yt-dlp, add to queue
    }

    public function skip($roomId)
    {
        // TODO: vote to skip current song, auto-skip if majority votes
    }

    public function sync($roomId)
    {
        // TODO: return current playback position + timestamp for client sync
    }
}

