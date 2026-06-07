<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        // TODO: return list of public rooms
    }

    public function store(Request $request)
    {
        // TODO: create a new room (public/private/invite-only)
    }

    public function show(Room $room)
    {
        // TODO: return room details, members, settings
    }

    public function update(Request $request, Room $room)
    {
        // TODO: update room background, music, theme (owner only)
    }

    public function destroy(Room $room)
    {
        // TODO: delete room
    }

    public function join(Room $room)
    {
        // TODO: add authenticated user to room
    }

    public function leave(Room $room)
    {
        // TODO: remove authenticated user from room
    }
}

