<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Login - {{ config('app.name', 'PurrVibeX') }}</title>
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>
<body class="admin-body">
    <div class="admin-auth-shell">
        <div class="admin-auth-card">
            <h1 class="admin-auth-title">Admin Login</h1>
            <p class="admin-auth-sub">Unless your email has admin role.</p>

            @if (session('error'))
                <div class="admin-error">
                    {{ session('error') }}
                </div>
            @endif

            @if ($errors->any())
                <div class="admin-error">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('admin.login.submit') }}" class="admin-form">
                @csrf
                <div>
                    <label for="email" class="admin-label">Admin email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value="{{ old('email', $prefillEmail ?? '') }}"
                        class="admin-input"
                        placeholder="Enter your admin email"
                    >
                </div>

                <button type="submit" class="admin-button full">
                    Sign in
                </button>
            </form>
        </div>
    </div>
</body>
</html>
