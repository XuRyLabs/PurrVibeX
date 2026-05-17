<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\GameController;


// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Users / Profile
    Route::get('/users/{user}',       [UserController::class, 'show']);
    Route::put('/users/me',           [UserController::class, 'updateProfile']);
    Route::patch('/users/me/mood',    [UserController::class, 'updateMood']);

    // Friends
    Route::get('/friends',                        [FriendController::class, 'index']);
    Route::post('/friends/{user}/request',        [FriendController::class, 'sendRequest']);
    Route::post('/friends/{user}/accept',         [FriendController::class, 'acceptRequest']);
    Route::post('/friends/{user}/decline',        [FriendController::class, 'decline']);
    Route::post('/friends/{user}/block',          [FriendController::class, 'block']);
    Route::delete('/friends/{user}',              [FriendController::class, 'destroy']);

    // Rooms
    Route::apiResource('rooms', RoomController::class);
    Route::post('/rooms/{room}/join',  [RoomController::class, 'join']);
    Route::post('/rooms/{room}/leave', [RoomController::class, 'leave']);

    // Chat
    Route::get('/rooms/{room}/messages',  [ChatController::class, 'index']);
    Route::post('/rooms/{room}/messages', [ChatController::class, 'store']);
    Route::delete('/messages/{message}',  [ChatController::class, 'destroy']);

    // Music
    Route::get('/rooms/{room}/music/queue',  [MusicController::class, 'queue']);
    Route::post('/rooms/{room}/music/add',   [MusicController::class, 'addSong']);
    Route::post('/rooms/{room}/music/skip',  [MusicController::class, 'skip']);
    Route::get('/rooms/{room}/music/sync',   [MusicController::class, 'sync']);

    // Games
    Route::post('/games/{gameType}/start',        [GameController::class, 'start']);
    Route::get('/games/sessions/{sessionId}',     [GameController::class, 'state']);
    Route::post('/games/sessions/{sessionId}',    [GameController::class, 'action']);
    Route::post('/games/sessions/{sessionId}/end',[GameController::class, 'end']);
    Route::get('/leaderboard',                    [GameController::class, 'leaderboard']);

    // Shop
    Route::get('/shop',                      [ShopController::class, 'index']);
    Route::post('/shop/{itemId}/purchase',   [ShopController::class, 'purchase']);
    Route::get('/shop/inventory',            [ShopController::class, 'inventory']);

    // Gallery
    Route::get('/gallery',               [GalleryController::class, 'index']);
    Route::post('/gallery',              [GalleryController::class, 'store']);
    Route::post('/gallery/{photo}/like', [GalleryController::class, 'like']);
    Route::delete('/gallery/{photo}',    [GalleryController::class, 'destroy']);
});

