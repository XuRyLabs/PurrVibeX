<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->json([
            'message' => 'Use /firebase-login for this build.',
        ], 501);
    }

    public function login(Request $request)
    {
        return response()->json([
            'message' => 'Use /firebase-login for this build.',
        ], 501);
    }

    public function firebaseLogin(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'display_name' => ['nullable', 'string', 'max:100'],
            'avatar_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $displayName = $validated['display_name'] ?? explode('@', $validated['email'])[0] ?? 'Cat User';

        $user = User::where('email', $validated['email'])->first();

        if (!$user) {
            $baseUsername = preg_replace('/[^a-zA-Z0-9_\-]/', '', strtolower($displayName));
            $baseUsername = $baseUsername ?: 'catuser';
            $username = $this->makeUniqueUsername($baseUsername);

            $user = User::create([
                'display_name' => $displayName,
                'email' => $validated['email'],
                'username' => $username,
                'phone' => null,
                'avatar_url' => $validated['avatar_url'] ?? null,
                'profile_visibility' => 'public',
                'locale' => 'en',
                'timezone' => 'UTC',
                'email_changed' => false,
                'purr_points' => 0,
                'friend_count' => 0,
            ]);
        } else {
            $user->update([
                'display_name' => $displayName,
                'avatar_url' => $validated['avatar_url'] ?? $user->avatar_url,
                'last_seen' => now(),
            ]);
        }

        $token = $user->createToken('frontend')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'display_name' => $user->display_name,
                'username' => $user->username,
                'avatar_url' => $user->avatar_url,
                'purr_points' => $user->purr_points,
                'friend_count' => $user->friend_count,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $zodiac = $this->resolveZodiac($user?->date_of_birth?->toDateString());

        return response()->json([
            'id' => $user->id,
            'display_name' => $user->display_name,
            'username' => $user->username,
            'username_updated_at' => $user->username_updated_at,
            'email' => $user->email,
            'email_changed' => $user->email_changed,
            'phone' => $user->phone,
            'avatar_url' => $user->avatar_url,
            'bio' => $user->bio,
            'gender' => $user->gender,
            'date_of_birth' => $user->date_of_birth?->toDateString(),
            'location' => $user->location,
            'ward' => $user->ward,
            'city' => $user->city,
            'country' => $user->country,
            'website_url' => $user->website_url,
            'social_twitter' => $user->social_twitter,
            'social_instagram' => $user->social_instagram,
            'locale' => $user->locale,
            'timezone' => $user->timezone,
            'profile_visibility' => $user->profile_visibility,
            'purr_points' => (int) ($user->purr_points ?? 0),
            'friend_count' => (int) ($user->friend_count ?? 0),
            'zodiac_sign' => $zodiac['name'],
            'zodiac_icon' => $zodiac['icon'],
            'last_seen' => $user->last_seen,
        ]);
    }

    private function makeUniqueUsername(string $base): string
    {
        $candidate = substr($base, 0, 30);
        $i = 0;

        while (User::where('username', $candidate)->exists()) {
            $i++;
            $suffix = (string) $i;
            $trimLength = max(1, 30 - strlen($suffix));
            $candidate = substr($base, 0, $trimLength) . $suffix;
        }

        return $candidate;
    }

    private function resolveZodiac(?string $dob): array
    {
        if (!$dob) {
            return ['name' => 'Unknown', 'icon' => '✨'];
        }

        $date = date_create($dob);
        if (!$date) {
            return ['name' => 'Unknown', 'icon' => '✨'];
        }

        $md = (int) date_format($date, 'md');

        return match (true) {
            $md >= 321  && $md <= 419  => ['name' => 'Aries',       'icon' => '♈'],
            $md >= 420  && $md <= 520  => ['name' => 'Taurus',      'icon' => '♉'],
            $md >= 521  && $md <= 620  => ['name' => 'Gemini',      'icon' => '♊'],
            $md >= 621  && $md <= 722  => ['name' => 'Cancer',      'icon' => '♋'],
            $md >= 723  && $md <= 822  => ['name' => 'Leo',         'icon' => '♌'],
            $md >= 823  && $md <= 922  => ['name' => 'Virgo',       'icon' => '♍'],
            $md >= 923  && $md <= 1022 => ['name' => 'Libra',       'icon' => '♎'],
            $md >= 1023 && $md <= 1121 => ['name' => 'Scorpio',     'icon' => '♏'],
            $md >= 1122 && $md <= 1221 => ['name' => 'Sagittarius', 'icon' => '♐'],
            $md >= 1222 || $md <= 119  => ['name' => 'Capricorn',   'icon' => '♑'],
            $md >= 120  && $md <= 218  => ['name' => 'Aquarius',    'icon' => '♒'],
            $md >= 219  && $md <= 320  => ['name' => 'Pisces',      'icon' => '♓'],
            default => ['name' => 'Unknown', 'icon' => '✨'],
        };
    }
}
