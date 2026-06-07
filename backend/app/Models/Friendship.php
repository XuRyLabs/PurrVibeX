<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    protected $fillable = [
        'requester_id',
        'receiver_id',
        'status', // pending | accepted | blocked
    ];

    public function requester() { /* TODO */ }
    public function receiver() { /* TODO */ }
}

