<?php

use Illuminate\Support\Facades\Route;

// Health check (Railway / uptime monitoring) - no API prefix, fast response
Route::get('/health', fn() => response()->json(['status' => 'ok', 'app' => config('app.name')]));

Route::get('/', function () {
    return view('welcome');
});
