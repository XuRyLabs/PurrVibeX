<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class HealthController extends Controller
{
    public function webHealth(Request $request): View|JsonResponse
    {
        $payload = $this->buildPayload();

        if ($request->wantsJson() || $request->query('format') === 'json') {
            return response()->json($payload, $payload['status'] === 'up' ? 200 : 503);
        }

        return view('health.index', [
            'health' => $payload,
        ]);
    }

    public function apiHealth(): JsonResponse
    {
        $payload = $this->buildPayload();

        return response()->json($payload, $payload['status'] === 'up' ? 200 : 503);
    }

    public function liveness(): JsonResponse
    {
        return response()->json([
            'status' => 'up',
            'type' => 'liveness',
            'service' => config('app.name', 'purrvibex-backend'),
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    public function readiness(): JsonResponse
    {
        $checks = $this->runChecks();
        $criticalChecks = $this->criticalCheckNames();
        $isReady = collect($criticalChecks)->every(fn (string $name) => ($checks[$name]['status'] ?? 'down') === 'up');

        return response()->json([
            'status' => $isReady ? 'up' : 'down',
            'type' => 'readiness',
            'timestamp' => now()->toIso8601String(),
            'checks' => collect($checks)->only($criticalChecks)->all(),
        ], $isReady ? 200 : 503);
    }

    private function buildPayload(): array
    {
        $checks = $this->runChecks();
        $criticalChecks = $this->criticalCheckNames();
        $isHealthy = collect($criticalChecks)->every(fn (string $name) => ($checks[$name]['status'] ?? 'down') === 'up');

        return [
            'status' => $isHealthy ? 'up' : 'down',
            'service' => config('app.name', 'purrvibex-backend'),
            'environment' => app()->environment(),
            'timestamp' => now()->toIso8601String(),
            'checks' => $checks,
            'critical_checks' => $criticalChecks,
            'endpoints' => [
                'ui' => url('/health'),
                'api' => url('/api/health'),
                'liveness' => url('/health/liveness'),
                'readiness' => url('/health/readiness'),
                'framework_probe' => url('/up'),
            ],
        ];
    }

    private function runChecks(): array
    {
        $checks = [];

        $checks['app'] = [
            'status' => 'up',
            'message' => 'Application booted successfully.',
        ];

        $checks['db'] = $this->checkDatabase();
        $checks['cache'] = $this->checkCache();
        $checks['storage'] = $this->checkStorage();
        $checks['frontend_webservice'] = $this->checkFrontendWebservice();

        $apiRouteCount = collect(Route::getRoutes())
            ->filter(fn ($route) => str_starts_with($route->uri(), 'api/'))
            ->count();

        $checks['api_routes'] = [
            'status' => 'up',
            'count' => $apiRouteCount,
            'message' => 'API route inventory loaded.',
        ];

        $checks['framework_probe'] = [
            'status' => 'up',
            'message' => 'Framework probe exposed at /up.',
        ];

        return $checks;
    }

    private function checkDatabase(): array
    {
        try {
            $start = microtime(true);
            DB::select('select 1 as ok');
            $latencyMs = (int) round((microtime(true) - $start) * 1000);

            return [
                'status' => 'up',
                'latency_ms' => $latencyMs,
                'connection' => config('database.default'),
                'message' => 'Database query succeeded.',
            ];
        } catch (\Throwable $e) {
            return [
                'status' => 'down',
                'connection' => config('database.default'),
                'message' => $e->getMessage(),
            ];
        }
    }

    private function checkCache(): array
    {
        $key = 'health:probe:' . now()->timestamp;

        try {
            Cache::put($key, 'ok', 10);
            $value = Cache::get($key);
            Cache::forget($key);

            if ($value !== 'ok') {
                return [
                    'status' => 'down',
                    'store' => config('cache.default'),
                    'message' => 'Cache write/read mismatch.',
                ];
            }

            return [
                'status' => 'up',
                'store' => config('cache.default'),
                'message' => 'Cache store operational.',
            ];
        } catch (\Throwable $e) {
            return [
                'status' => 'down',
                'store' => config('cache.default'),
                'message' => $e->getMessage(),
            ];
        }
    }

    private function checkStorage(): array
    {
        $path = storage_path();

        return [
            'status' => is_writable($path) ? 'up' : 'down',
            'path' => $path,
            'message' => is_writable($path)
                ? 'Storage path is writable.'
                : 'Storage path is not writable.',
        ];
    }

    private function checkFrontendWebservice(): array
    {
        $url = (string) config('services.frontend.health_url', '');
        if ($url === '') {
            return [
                'status' => 'skipped',
                'message' => 'FRONTEND_HEALTH_URL is not configured.',
            ];
        }

        $timeout = max(1, (int) config('services.frontend.timeout_seconds', 3));

        try {
            $start = microtime(true);
            $response = Http::timeout($timeout)
                ->connectTimeout($timeout)
                ->acceptJson()
                ->get($url);
            $latencyMs = (int) round((microtime(true) - $start) * 1000);

            $isUp = $response->successful() || $response->redirect();

            return [
                'status' => $isUp ? 'up' : 'down',
                'url' => $url,
                'status_code' => $response->status(),
                'latency_ms' => $latencyMs,
                'message' => $isUp
                    ? 'Frontend webservice responded.'
                    : 'Frontend webservice returned an unhealthy status code.',
            ];
        } catch (\Throwable $e) {
            return [
                'status' => 'down',
                'url' => $url,
                'message' => $e->getMessage(),
            ];
        }
    }

    private function criticalCheckNames(): array
    {
        $critical = ['app', 'db', 'cache', 'storage'];

        $frontendUrl = (string) config('services.frontend.health_url', '');
        if ($frontendUrl !== '') {
            $critical[] = 'frontend_webservice';
        }

        return $critical;
    }
}
