@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('header', 'Dashboard')

@section('content')
    <section class="admin-grid-3">
        <article class="admin-card">
            <p class="admin-card-label">Total users</p>
            <p class="admin-card-value">{{ $totalUsers }}</p>
        </article>
        <article class="admin-card">
            <p class="admin-card-label">Public endpoints</p>
            <p class="admin-card-value success">{{ $publicApiRoutes }}</p>
        </article>
        <article class="admin-card">
            <p class="admin-card-label">Protected endpoints</p>
            <p class="admin-card-value warning">{{ $protectedApiRoutes }}</p>
        </article>
    </section>

    <section class="admin-section">
        <div class="admin-section-header admin-section-header-row">
            <h2 class="admin-section-title">Users</h2>
            <a href="{{ route('admin.users.index') }}" class="admin-link-button">Open user list</a>
        </div>
        <div class="admin-section-body-note">
            Manage users, filter accounts, and edit profile/role from the dedicated users screen.
        </div>
    </section>

    <section class="admin-section">
        <div class="admin-section-header admin-section-header-row">
            <h2 class="admin-section-title">Backend API routes ({{ $totalApiRoutes }})</h2>
            <a href="{{ route('admin.api-routes.index') }}" class="admin-link-button">View all routes</a>
        </div>
        <div class="admin-section-body-note">
            Browse the full inventory of API endpoints, middleware groups, and controller actions.
        </div>
    </section>
@endsection
