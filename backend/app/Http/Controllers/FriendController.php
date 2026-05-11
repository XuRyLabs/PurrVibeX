<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function index()
    {
        // TODO: return friend list for authenticated user
    }

    public function sendRequest(User $user)
    {
        // TODO: send friend request
    }

    public function acceptRequest(User $user)
    {
        // TODO: accept incoming friend request
    }

    public function decline(User $user)
    {
        // TODO: decline / cancel friend request
    }

    public function block(User $user)
    {
        // TODO: block a user
    }

    public function destroy(User $user)
    {
        // TODO: unfriend
    }
}

