@extends('admin.layouts.app')

@section('title', 'API Routes')
@section('header', 'API Routes')

@section('content')
    <section class="admin-grid-3">
        <article class="admin-card">
            <p class="admin-card-label">Total routes</p>
            <p class="admin-card-value">{{ $allRoutes->count() }}</p>
        </article>
        <article class="admin-card">
            <p class="admin-card-label">Public</p>
            <p class="admin-card-value success">{{ $publicRoutes->count() }}</p>
        </article>
        <article class="admin-card">
            <p class="admin-card-label">Protected (auth:sanctum)</p>
            <p class="admin-card-value warning">{{ $protectedRoutes->count() }}</p>
        </article>
    </section>

    <section class="admin-section">
        <div class="admin-section-header">
            <h2 class="admin-section-title">Public endpoints ({{ $publicRoutes->count() }})</h2>
        </div>
        <div class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>URI</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($publicRoutes as $route)
                        <tr>
                            <td>@foreach($route['methods'] as $m)<span class="admin-pill admin-pill-method">{{ $m }}</span> @endforeach</td>
                            <td class="admin-mono">/{{ $route['uri'] }}</td>
                            <td class="admin-mono">{{ $route['name'] ?? '-' }}</td>
                            <td class="admin-mono">{{ $route['action'] }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="admin-empty">No public routes.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </section>

    <section class="admin-section">
        <div class="admin-section-header">
            <h2 class="admin-section-title">Protected endpoints ({{ $protectedRoutes->count() }})</h2>
        </div>
        <div class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>URI</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($protectedRoutes as $route)
                        <tr>
                            <td>@foreach($route['methods'] as $m)<span class="admin-pill admin-pill-method">{{ $m }}</span> @endforeach</td>
                            <td class="admin-mono">/{{ $route['uri'] }}</td>
                            <td class="admin-mono">{{ $route['name'] ?? '-' }}</td>
                            <td class="admin-mono">{{ $route['action'] }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="admin-empty">No protected routes.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </section>
@endsection

