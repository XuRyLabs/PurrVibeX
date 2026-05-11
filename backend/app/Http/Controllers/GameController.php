<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function start(Request $request, $gameType)
    {
        // TODO: create a new game session, return session ID
    }

    public function state($sessionId)
    {
        // TODO: return current game state
    }

    public function action(Request $request, $sessionId)
    {
        // TODO: process player action, broadcast update to room
    }

    public function end($sessionId)
    {
        // TODO: finalize game, award Meow Points to winners
    }

    public function leaderboard()
    {
        // TODO: return weekly/monthly leaderboard
    }
}

