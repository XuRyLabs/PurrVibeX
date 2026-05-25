<?php

namespace App\Http\Controllers;

use App\Models\CatPhoto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class UserController extends Controller
{
    public function showByUsername(string $username): \Illuminate\Http\JsonResponse
    {
        $user = User::whereRaw('LOWER(username) = ?', [mb_strtolower($username)])->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (($user->profile_visibility ?? 'public') === 'private') {
            return response()->json(['message' => 'This profile is private'], 403);
        }

        return $this->show($user);
    }

    public function show(User $user): \Illuminate\Http\JsonResponse
    {
        $zodiac = $this->resolveZodiac($user->date_of_birth?->toDateString());
        $postCount = $this->resolvePostCount($user);

        return response()->json([
            'id'                  => $user->id,
            'display_name'        => $user->display_name,
            'username'            => $user->username,
            'username_updated_at' => $user->username_updated_at,
            'email'               => $user->email,
            'email_changed'       => $user->email_changed,
            'phone'               => $user->phone,
            'avatar_url'          => $user->avatar_url,
            'bio'                 => $user->bio,
            'gender'              => $user->gender,
            'date_of_birth'       => $user->date_of_birth?->toDateString(),
            'role'                => $user->role,
            'location'            => $user->location,
            'ward'                => $user->ward,
            'city'                => $user->city,
            'country'             => $user->country,
            'website_url'         => $user->website_url,
            'social_twitter'      => $user->social_twitter,
            'social_instagram'    => $user->social_instagram,
            'locale'              => $user->locale,
            'timezone'            => $user->timezone,
            'profile_visibility'  => $user->profile_visibility,
            'purr_points'         => (int) ($user->purr_points ?? 0),
            'friend_count'        => (int) ($user->friend_count ?? 0),
            'post_count'          => (int) $postCount,
            'zodiac_sign'         => $zodiac['name'],
            'zodiac_icon'         => $zodiac['icon'],
            'last_seen'           => $user->last_seen,
        ]);
    }

    public function updateProfile(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();

        // Normalize country input to ISO-2 alias code (e.g. VN, US).
        if ($request->has('country')) {
            $request->merge([
                'country' => $this->normalizeCountryCode($request->input('country')),
            ]);
        }

        // ── Base validation rules ────────────────────────────────────────────
        $rules = [
            'display_name'       => 'nullable|string|max:100',
            'avatar_url'         => [
                'nullable',
                'string',
                'max:2048',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if ($value === null || $value === '') {
                        return;
                    }

                    $isHttpUrl = str_starts_with($value, 'http://') || str_starts_with($value, 'https://');
                    if ($isHttpUrl) {
                        if (!filter_var($value, FILTER_VALIDATE_URL)) {
                            $fail('The avatar url field must be a valid URL.');
                        }
                        return;
                    }

                    // Allow non-URL avatar tokens (emoji/icon) up to 32 chars.
                    if (mb_strlen((string) $value) > 32) {
                        $fail('The avatar url field must be a valid URL or a short icon.');
                    }
                },
            ],
            'bio'                => 'nullable|string|max:200',
            'gender'             => 'nullable|in:male,female,non_binary,other,prefer_not_to_say',
            'date_of_birth'      => 'nullable|date|before:today',
            'ward'               => 'nullable|string|max:100',
            'city'               => 'nullable|string|max:100',
            'country'            => ['nullable', 'regex:/^[A-Z]{2}$/'],
            'website_url'        => 'nullable|url|max:255',
            'social_twitter'     => 'nullable|string|max:50',
            'social_instagram'   => 'nullable|string|max:50',
            'timezone'           => 'nullable|string|max:60',
            'locale'             => 'nullable|string|max:10',
            'profile_visibility' => 'nullable|in:public,private,friends',
        ];

        // ── Username: changeable once per 30 days ────────────────────────────
        $changingUsername = $request->has('username') && $request->username !== $user->username;
        if ($changingUsername) {
            $rules['username'] = [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[A-Za-z0-9_-]+$/',
                'unique:meow_users,username,' . $user->id,
            ];

            if ($user->username_updated_at && now()->diffInDays($user->username_updated_at) < 30) {
                $daysLeft = 30 - (int) now()->diffInDays($user->username_updated_at);
                return response()->json([
                    'message' => 'Username can only be changed once every 30 days.',
                    'errors'  => [
                        'username' => ["You can change your username again in {$daysLeft} day(s)."],
                    ],
                ], 422);
            }
        }

        // ── Email: changeable only once ──────────────────────────────────────
        $changingEmail = $request->has('email') && $request->email !== $user->email;
        if ($changingEmail) {
            if ($user->email_changed) {
                return response()->json([
                    'message' => 'Email can only be changed once.',
                    'errors'  => ['email' => ['Your email address can only be changed once and is now locked.']],
                ], 422);
            }
            $rules['email'] = ['required', 'email', 'max:255', 'unique:meow_users,email,' . $user->id];
        }

        // ── Phone: international / Vietnamese format ─────────────────────────
        if ($request->has('phone') && $request->phone) {
            $rules['phone'] = ['nullable', 'regex:/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/'];
        }

        $messages = [
            'username.regex' => 'The username field must only contain letters, numbers, dashes, and underscores.',
            'country.regex'  => 'The country field must be a valid ISO-2 code.',
        ];

        $validated = $request->validate($rules, $messages);

        // ── Track username cooldown ──────────────────────────────────────────
        if ($changingUsername && isset($validated['username'])) {
            $validated['username_updated_at'] = now();
        }

        // ── Mark email as changed (locked) ──────────────────────────────────
        if ($changingEmail && isset($validated['email'])) {
            $validated['email_changed'] = true;
        }

        // ── Denormalize location string for backward compatibility ───────────
        $city    = $validated['city']    ?? $user->city    ?? null;
        $country = $validated['country'] ?? $user->country ?? null;
        $ward    = $validated['ward']    ?? $user->ward    ?? null;
        $parts   = array_filter([$ward, $city, $country]);
        if (!empty($parts)) {
            $validated['location'] = implode(', ', $parts);
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Profile updated! 🐾',
            'user'    => $this->show($user)->getData(),
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
            'mood'    => $request->user()->mood,
        ]);
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

    private function resolvePostCount(?User $user): int
    {
        if (!$user) {
            return 0;
        }

        $table = (new CatPhoto())->getTable();

        // Keep profile endpoints working even before photo table migrations are applied.
        if (!Schema::hasTable($table)) {
            return 0;
        }

        try {
            return (int) CatPhoto::query()->where('user_id', $user->id)->count();
        } catch (\Throwable) {
            return 0;
        }
    }

    private function normalizeCountryCode(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $raw = strtoupper(trim((string) $value));
        if ($raw === '') {
            return null;
        }

        $aliasMap = [
            'VIETNAM' => 'VN',
            'VIET NAM' => 'VN',
            'USA' => 'US',
            'UNITED STATES' => 'US',
            'UNITED STATES OF AMERICA' => 'US',
            'UK' => 'GB',
            'UNITED KINGDOM' => 'GB',
            'KOREA' => 'KR',
            'SOUTH KOREA' => 'KR',
        ];

        if (isset($aliasMap[$raw])) {
            return $aliasMap[$raw];
        }

        return $raw;
    }
}
