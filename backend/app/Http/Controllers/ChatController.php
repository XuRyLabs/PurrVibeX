<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(Room $room)
    {
        // TODO: return paginated messages for a room
    }

    public function store(Request $request, Room $room)
    {
        // TODO: send a message, broadcast MessageSent event
    }

    public function destroy(Message $message)
    {
        // TODO: delete message (owner or admin only)
    }
}

