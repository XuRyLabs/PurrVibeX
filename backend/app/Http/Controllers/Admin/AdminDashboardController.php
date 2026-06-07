<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class AdminDashboardController extends Controller
{
    public function index(): View
    {
        $apiRouteCount = collect(Route::getRoutes())
            ->filter(fn ($route) => str_starts_with($route->uri(), 'api/'))
            ->count();

        $publicCount = collect(Route::getRoutes())
            ->filter(fn ($route) => str_starts_with($route->uri(), 'api/'))
            ->filter(fn ($route) => !in_array('auth:sanctum', $route->gatherMiddleware(), true))
            ->count();

        return view('admin.dashboard.index', [
            'totalUsers'         => User::query()->count(),
            'totalApiRoutes'     => $apiRouteCount,
            'publicApiRoutes'    => $publicCount,
            'protectedApiRoutes' => $apiRouteCount - $publicCount,
        ]);
    }
}
