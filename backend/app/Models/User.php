<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'meow_users';

    protected $fillable = ['display_name', 'email', 'username', 'phone', 'email_verified_at', 'avatar_url', 'bio', 'date_of_birth', 'gender', 'location', 'locale', 'timezone', 'role', 'last_seen', 'profile_visibility'];

    protected $hidden = ['remember_token',];

    protected function casts(): array
    {
        return ['email_verified_at' => 'datetime', 'date_of_birth' => 'date', 'last_seen' => 'datetime',];
    }
}
