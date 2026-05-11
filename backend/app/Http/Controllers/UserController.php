<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(User $user)
    {
        // TODO: return user profile with avatar, mood, points, badges
    }

    public function update(Request $request)
    {
        // TODO: update profile info, mood, bio
    }

    public function updateMood(Request $request)
    {
        // TODO: update cat mood status
    }
}

