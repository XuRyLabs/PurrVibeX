<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'meow_users';

    // The meow_users table does not have created_at / updated_at columns.
    public $timestamps = false;

    protected $fillable = [
        'display_name', 'email', 'email_changed',
        'username', 'username_updated_at',
        'phone',
        'email_verified_at', 'avatar_url', 'bio',
        'date_of_birth', 'gender',
        'location', 'ward', 'city', 'country',
        'website_url', 'social_twitter', 'social_instagram',
        'locale', 'timezone', 'role', 'last_seen',
        'profile_visibility', 'purr_points', 'friend_count',
    ];

    protected $hidden = ['remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at'   => 'datetime',
            'date_of_birth'       => 'date',
            'last_seen'           => 'datetime',
            'username_updated_at' => 'datetime',
            'email_changed'       => 'boolean',
            'purr_points'         => 'integer',
            'friend_count'        => 'integer',
        ];
    }
}
