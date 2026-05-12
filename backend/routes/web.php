<?php

use Illuminate\Support\Facades\Route;

// Health check (Railway / uptime monitoring) - no API prefix, fast response
Route::get('/health', fn() => response()->json(['status' => 'ok']));

Route::get('/', function () {
    return view('welcome');
});
