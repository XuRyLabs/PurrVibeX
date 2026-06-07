<?php

use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminApiRoutesController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\HealthController;
use Illuminate\Support\Facades\Route;

$resolveMiniStats = function (): array {
    $apiRouteCount = collect(Route::getRoutes())
        ->filter(fn ($route) => str_starts_with($route->uri(), 'api/'))
        ->count();

    $manifestPath = public_path('build/manifest.json');
    $hotPath = public_path('hot');

    $buildTimestamp = null;
    $buildSource = 'unknown';

    if (file_exists($manifestPath)) {
        $buildTimestamp = filemtime($manifestPath) ?: null;
        $buildSource = 'vite-build';
    } elseif (file_exists($hotPath)) {
        $buildTimestamp = filemtime($hotPath) ?: null;
        $buildSource = 'vite-hot';
    }

    return [
        'api_routes' => $apiRouteCount,
        'environment' => app()->environment(),
        'build_time' => $buildTimestamp ? gmdate('c', $buildTimestamp) : null,
        'build_source' => $buildSource,
        'server_time' => now()->toIso8601String(),
    ];
};

// Health UI + operational probes
Route::get('/health', [HealthController::class, 'webHealth'])->name('health.ui');
Route::get('/health/liveness', [HealthController::class, 'liveness'])->name('health.liveness');
Route::get('/health/readiness', [HealthController::class, 'readiness'])->name('health.readiness');

Route::get('/stats/mini', fn () => response()->json($resolveMiniStats()))->name('stats.mini');

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::middleware('guest')->group(function (): void {
        Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');
    });

    Route::middleware(['auth', 'admin.role'])->group(function (): void {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
        Route::get('/api-routes', [AdminApiRoutesController::class, 'index'])->name('api-routes.index');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    });
});

Route::get('/', function () use ($resolveMiniStats) {
    return view('welcome', [
        'miniStats' => $resolveMiniStats(),
    ]);
});
