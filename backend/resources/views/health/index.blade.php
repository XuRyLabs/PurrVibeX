<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PurrVibeX Health</title>
    <link rel="stylesheet" href="{{ asset('css/health.css') }}">
</head>
<body>
<main class="health-shell">
    <header class="health-header">
        <div>
            <p class="health-kicker">PurrVibeX Monitoring</p>
            <h1>System Health</h1>
            <p class="health-sub">Liveness, readiness, database, cache, storage, and API probe status.</p>
        </div>
        <div class="health-overall health-{{ $health['status'] }}">
            <span class="dot"></span>
            <strong>{{ strtoupper($health['status']) }}</strong>
        </div>
    </header>

    <section class="meta-grid">
        <article>
            <h2>Environment</h2>
            <p>{{ $health['environment'] }}</p>
        </article>
        <article>
            <h2>Service</h2>
            <p>{{ $health['service'] }}</p>
        </article>
        <article>
            <h2>Timestamp (UTC)</h2>
            <p>{{ \Illuminate\Support\Carbon::parse($health['timestamp'])->utc()->format('Y-m-d H:i:s') }} UTC</p>
        </article>
    </section>

    <section class="checks-grid">
        @foreach ($health['checks'] as $name => $check)
            <article class="check-card">
                <div class="check-head">
                    <h3>{{ str_replace('_', ' ', ucfirst($name)) }}</h3>
                    <span class="pill pill-{{ $check['status'] ?? 'up' }}">{{ $check['status'] ?? 'up' }}</span>
                </div>

                @if (isset($check['message']))
                    <p class="check-msg">{{ $check['message'] }}</p>
                @endif

                @foreach ($check as $key => $value)
                    @if (!in_array($key, ['status', 'message'], true))
                        <p class="kv"><span>{{ str_replace('_', ' ', $key) }}:</span> <code>{{ is_scalar($value) ? $value : json_encode($value) }}</code></p>
                    @endif
                @endforeach
            </article>
        @endforeach
    </section>

    <section class="endpoint-card">
        <h2>Health Endpoints</h2>
        <div class="endpoint-table-wrap">
            <table class="endpoint-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Path</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Health UI</td>
                        <td><a href="{{ $health['endpoints']['ui'] }}">/health</a></td>
                    </tr>
                    <tr>
                        <td>API Health</td>
                        <td><a href="{{ $health['endpoints']['api'] }}">/api/health</a></td>
                    </tr>
                    <tr>
                        <td>Liveness</td>
                        <td><a href="{{ $health['endpoints']['liveness'] }}">/health/liveness</a></td>
                    </tr>
                    <tr>
                        <td>Readiness</td>
                        <td><a href="{{ $health['endpoints']['readiness'] }}">/health/readiness</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
     </section>
</main>
</body>
</html>
