<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(User $user): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'id' => $user->id,
            'display_name' => $user->display_name,
            'username' => $user->username,
            'email' => $user->email,
            'avatar_url' => $user->avatar_url,
            'bio' => $user->bio,
            'role' => $user->role,
            'location' => $user->location,
            'locale' => $user->locale,
            'timezone' => $user->timezone,
            'profile_visibility' => $user->profile_visibility,
            'date_of_birth' => $user->date_of_birth,
            'last_seen' => $user->last_seen,
        ]);
    }

    public function updateProfile(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'display_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
            'avatar_url' => 'nullable|url',
            'location' => 'nullable|string|max:255',
            'timezone' => 'nullable|string',
            'locale' => 'nullable|string|size:5',
            'profile_visibility' => 'nullable|in:public,private,friends',
        ]);

        $request->user()->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $request->user(),
        ]);
    }

    public function updateMood(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'mood' => 'required|string|max:50',
        ]);

        $request->user()->update(['mood' => $validated['mood']]);

        return response()->json([
            'message' => 'Mood updated successfully',
            'mood' => $request->user()->mood,
        ]);
    }
}

