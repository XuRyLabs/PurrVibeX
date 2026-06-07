<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\View\View;

class AdminApiRoutesController extends Controller
{
    public function index(): View
    {
        $allRoutes = collect(Route::getRoutes())
            ->map(function ($route) {
                return [
                    'methods'    => array_values(array_diff($route->methods(), ['HEAD'])),
                    'uri'        => $route->uri(),
                    'name'       => $route->getName(),
                    'middleware' => $route->gatherMiddleware(),
                    'action'     => $route->getActionName(),
                ];
            })
            ->filter(fn (array $route) => str_starts_with($route['uri'], 'api/'))
            ->sortBy('uri')
            ->values();

        $publicRoutes    = $allRoutes->filter(fn ($r) => !in_array('auth:sanctum', $r['middleware'], true))->values();
        $protectedRoutes = $allRoutes->filter(fn ($r) =>  in_array('auth:sanctum', $r['middleware'], true))->values();

        return view('admin.api-routes.index', [
            'allRoutes'        => $allRoutes,
            'publicRoutes'     => $publicRoutes,
            'protectedRoutes'  => $protectedRoutes,
        ]);
    }
}

