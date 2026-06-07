<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PurrVibeX Dashboard</title>

    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>
<body class="pvx-body">
    <main class="pvx-shell">
        <section class="pvx-panel pvx-hero">
            <div class="pvx-row pvx-row-between pvx-wrap pvx-gap-sm">
                <div>
                    <p class="pvx-kicker">PurrVibeX Platform</p>
                    <h1 class="pvx-title">PurrVibeX Dashboard</h1>
                    <p class="pvx-subtitle">
                        This page gives quick operational visibility and links to admin tools.
                    </p>
                </div>
                <div class="pvx-version-box">
                    <p class="pvx-muted">Laravel Version</p>
                    <p class="pvx-version">v{{ app()->version() }}</p>
                </div>
            </div>
        </section>

        <section class="pvx-grid pvx-grid-main">
            <article class="pvx-panel pvx-section">
                <div class="pvx-row pvx-row-between pvx-gap-sm">
                    <h2 class="pvx-heading">Mini Stats</h2>
                    <span class="pvx-chip">
                        <span class="pvx-chip-dot" aria-hidden="true"></span>
                        <span id="pvx-stats-status">live</span>
                    </span>
                </div>
                <p id="pvx-sync-age" class="pvx-sync-age">synced just now</p>

                <div class="pvx-grid pvx-grid-triple pvx-gap-tight pvx-mt-sm">
                    <div class="pvx-stat-card">
                        <p class="pvx-stat-label">API Routes</p>
                        <p id="pvx-stat-api-routes" class="pvx-stat-value pvx-stat-large">{{ $miniStats['api_routes'] ?? 0 }}</p>
                    </div>

                    <div class="pvx-stat-card">
                        <p class="pvx-stat-label">Environment</p>
                        <div class="pvx-mt-xs">
                            <span id="pvx-stat-env" class="pvx-env-badge">{{ $miniStats['environment'] ?? 'unknown' }}</span>
                        </div>
                    </div>

                    <div class="pvx-stat-card">
                        <p class="pvx-stat-label">Build Source</p>
                        <p id="pvx-stat-build-source" class="pvx-stat-value pvx-mono">{{ $miniStats['build_source'] ?? 'unknown' }}</p>
                    </div>
                </div>

                <div class="pvx-grid pvx-grid-triple pvx-gap-tight">
                    <div class="pvx-stat-card pvx-span-2">
                        <p class="pvx-stat-label">Build Time (UTC)</p>
                        <p id="pvx-stat-build-time" class="pvx-stat-value pvx-mono">
                            {{ isset($miniStats['build_time']) ? \Illuminate\Support\Carbon::parse($miniStats['build_time'])->utc()->format('Y-m-d H:i:s') . ' UTC' : 'not available' }}
                        </p>
                    </div>
                    <div class="pvx-stat-card">
                        <p class="pvx-stat-label">Server Time</p>
                        <p id="pvx-stat-server-time" class="pvx-stat-value pvx-mono">
                            {{ isset($miniStats['server_time']) ? \Illuminate\Support\Carbon::parse($miniStats['server_time'])->utc()->format('Y-m-d H:i:s') . ' UTC' : now()->utc()->format('Y-m-d H:i:s') . ' UTC' }}
                        </p>
                    </div>
                </div>
            </article>

            <article class="pvx-panel pvx-section">
                <h2 class="pvx-heading">Quick Actions</h2>
                <div class="pvx-links">
                    <a href="{{ url('/health') }}" class="pvx-link-card">
                        <div class="pvx-link-title pvx-link-title-row">
                            <span>Health Check</span>
                            <span id="pvx-health-badge" class="pvx-health-badge is-checking">CHECKING</span>
                        </div>
                        <div class="pvx-link-desc">Basic uptime endpoint for monitors and probes.</div>
                    </a>

                    <a href="{{ url('/up') }}" class="pvx-link-card">
                        <div class="pvx-link-title">Runtime Probe (/up)</div>
                        <div class="pvx-link-desc">Framework-level readiness endpoint configured in bootstrap.</div>
                    </a>

                    <a href="{{ route('admin.login') }}" class="pvx-link-card">
                        <div class="pvx-link-title">Admin Dashboard Login</div>
                        <div class="pvx-link-desc">Access role-protected Blade operations dashboard.</div>
                    </a>
                </div>
            </article>
        </section>

        <section class="pvx-panel pvx-section pvx-mt-md">
            <div class="pvx-row pvx-row-between pvx-wrap pvx-gap-sm">
                <div>
                    <h2 class="pvx-heading">API Entry Points</h2>
                    <p class="pvx-note">
                        Public and authenticated APIs are available under
                        <code class="pvx-code">/api/*</code>
                    </p>
                </div>
                <span class="pvx-pill">Monitoring Overview</span>
            </div>

            <div class="pvx-table">
                <table>
                    <thead>
                        <tr>
                            <th>Domain</th>
                            <th>Endpoint 1</th>
                            <th>Endpoint 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Auth</td>
                            <td class="pvx-mono">POST /api/firebase-login</td>
                            <td class="pvx-mono">GET /api/me</td>
                        </tr>
                        <tr>
                            <td>Rooms</td>
                            <td class="pvx-mono">GET /api/rooms</td>
                            <td class="pvx-mono">POST /api/rooms/{room}/join</td>
                        </tr>
                        <tr>
                            <td>Gallery</td>
                            <td class="pvx-mono">GET /api/gallery</td>
                            <td class="pvx-mono">POST /api/gallery</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p class="pvx-footnote">Tip: open `/admin/dashboard` for complete API route inventory and middleware visibility.</p>
        </section>
    </main>

    <script>
        const miniStatsUrl = @json(route('stats.mini'));
        const readinessUrl = @json(route('health.readiness'));
        let serverClock = @json($miniStats['server_time'] ?? now()->toIso8601String());
        let lastSyncedAt = Date.now();

        function applyEnvironmentStyle(value) {
            const element = document.getElementById('pvx-stat-env');
            if (!element) {
                return;
            }

            const env = String(value || 'unknown').toLowerCase();
            element.textContent = env;
            element.className = 'pvx-env-badge';

            if (env === 'production') {
                element.classList.add('pvx-env-production');
                return;
            }

            if (env === 'staging') {
                element.classList.add('pvx-env-staging');
                return;
            }

            if (env === 'local' || env === 'development') {
                element.classList.add('pvx-env-local');
            }
        }

        function formatIsoToUtc(value) {
            if (!value) {
                return 'not available';
            }

            const date = new Date(value);
            if (Number.isNaN(date.getTime())) {
                return 'not available';
            }

            const pad = (num) => String(num).padStart(2, '0');

            return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`;
        }

        function tickServerClock() {
            const date = new Date(serverClock);
            if (Number.isNaN(date.getTime())) {
                return;
            }

            date.setSeconds(date.getSeconds() + 1);
            serverClock = date.toISOString();

            const target = document.getElementById('pvx-stat-server-time');
            if (target) {
                target.textContent = formatIsoToUtc(serverClock);
            }
        }

        function updateSyncAgeLabel() {
            const el = document.getElementById('pvx-sync-age');
            if (!el) {
                return;
            }

            const seconds = Math.max(0, Math.floor((Date.now() - lastSyncedAt) / 1000));
            if (seconds < 2) {
                el.textContent = 'synced just now';
                return;
            }

            el.textContent = `synced ${seconds} seconds ago`;
        }

        async function refreshMiniStats() {
            try {
                const response = await fetch(miniStatsUrl, {
                    headers: { 'Accept': 'application/json' },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to load mini stats');
                }

                const data = await response.json();

                document.getElementById('pvx-stat-api-routes').textContent = String(data.api_routes ?? 0);
                document.getElementById('pvx-stat-build-source').textContent = String(data.build_source ?? 'unknown');
                document.getElementById('pvx-stat-build-time').textContent = formatIsoToUtc(data.build_time);

                serverClock = data.server_time ?? serverClock;
                document.getElementById('pvx-stat-server-time').textContent = formatIsoToUtc(serverClock);

                document.getElementById('pvx-stats-status').textContent = 'live';
                lastSyncedAt = Date.now();
                updateSyncAgeLabel();
                applyEnvironmentStyle(data.environment ?? 'unknown');
            } catch (error) {
                document.getElementById('pvx-stats-status').textContent = 'stale';
            }
        }

        function setHealthBadge(status, message = '') {
            const badge = document.getElementById('pvx-health-badge');
            if (!badge) {
                return;
            }

            const normalized = String(status || 'unknown').toLowerCase();
            badge.className = 'pvx-health-badge';

            if (normalized === 'up') {
                badge.classList.add('is-up');
                badge.textContent = 'UP';
                return;
            }

            if (normalized === 'down') {
                badge.classList.add('is-down');
                badge.textContent = 'DOWN';
                return;
            }

            badge.classList.add('is-checking');
            badge.textContent = message || 'CHECKING';
        }

        async function refreshHealthBadge() {
            try {
                setHealthBadge('checking');

                const response = await fetch(readinessUrl, {
                    headers: { 'Accept': 'application/json' },
                    cache: 'no-store',
                });

                if (!response.ok && response.status !== 503) {
                    throw new Error('Health endpoint unavailable');
                }

                const data = await response.json();
                setHealthBadge(data.status ?? 'down');
            } catch (error) {
                setHealthBadge('down');
            }
        }

        applyEnvironmentStyle(@json($miniStats['environment'] ?? 'unknown'));
        document.getElementById('pvx-stat-server-time').textContent = formatIsoToUtc(serverClock);
        updateSyncAgeLabel();
        setHealthBadge('checking');

        setInterval(tickServerClock, 1000);
        setInterval(updateSyncAgeLabel, 1000);
        setInterval(refreshMiniStats, 15000);
        setInterval(refreshHealthBadge, 15000);
        refreshMiniStats();
        refreshHealthBadge();
    </script>
</body>
</html>
