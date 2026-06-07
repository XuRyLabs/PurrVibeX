<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin Dashboard') - {{ config('app.name', 'PurrVibeX') }}</title>
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>
<body class="admin-body">
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <a href="{{ route('admin.dashboard') }}" class="admin-brand">PurrVibeX Admin</a>
            <nav class="admin-nav">
                <a href="{{ route('admin.dashboard') }}" class="admin-nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    Dashboard
                </a>
                <a href="{{ route('admin.users.index') }}" class="admin-nav-link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}">
                    Users
                </a>
                <a href="{{ route('admin.api-routes.index') }}" class="admin-nav-link {{ request()->routeIs('admin.api-routes.*') ? 'active' : '' }}">
                    API Routes
                </a>
            </nav>
        </aside>

        <div class="admin-main">
            <header class="admin-topbar">
                <div>
                    <h1 class="admin-title">@yield('header', 'Admin')</h1>
                    <p class="admin-subtitle">Laravel Blade admin area</p>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="admin-button">
                        Logout
                    </button>
                </form>
            </header>

            <main class="admin-content">
                @if (session('status'))
                    <div class="admin-alert">
                        {{ session('status') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>
</body>
</html>
