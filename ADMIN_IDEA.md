# PurrVibeX Admin Dashboard Plan (Laravel Blade)

> Admin dashboard runs in `backend/` with Laravel Blade.
> Existing user-facing frontend in `frontend/` stays unchanged.

## Stack
- Frontend (Admin): Laravel Blade + Tailwind CSS + Alpine.js
- Auth: Firebase Auth (Google/Email) -> Laravel Sanctum
- Data fetching: Laravel controllers + Blade view models + optional Alpine `fetch` polling
- Charts: Chart.js
- Backend: Laravel 13

---

## Auth Flow

```text
Firebase login (Google / Email)
  -> getIdToken() from Firebase SDK
  -> POST /api/admin/auth/login { idToken }
  -> Laravel verifies token via Firebase Admin SDK
  -> Maps Firebase UID -> meow_users -> role check (admin / moderator)
  -> Returns Sanctum token for admin APIs
  -> Store auth in server session (or HttpOnly cookie)
  -> Redirect to /admin/dashboard
```

### Copilot prompts (Blade)

```text
Create a Laravel middleware `EnsureFirebaseToken` that:
- Reads Authorization Bearer token from request
- Verifies it using kreait/firebase-php SDK
- Finds or creates user in `meow_users` table by firebase_uid
- Checks user role is `admin` or `moderator`
- Returns 401 if invalid, 403 if insufficient role
```

```text
Create a Laravel controller `AdminAuthController` + Blade login page that:
- Renders GET /admin/login
- Accepts Firebase ID token on POST /admin/login
- Calls /api/admin/auth/login (or internal service) to validate token
- Stores admin auth in session
- Redirects to /admin/dashboard
- Supports POST /admin/logout
```

---

## Modules

### Module 1 - Dashboard Overview
**Route:** `/admin/dashboard`

- Total users, active rooms, reports pending
- DAU chart (30 days)
- Top 5 rooms
- Recent admin activity

```text
Create Blade page `resources/views/admin/dashboard/index.blade.php` that:
- Receives data from AdminDashboardController@index
- Renders stat cards
- Renders Chart.js DAU line chart
- Renders top rooms table
- Refreshes key widgets every 60s using Alpine.js polling
```

### Module 2 - Users
**Route:** `/admin/users`

- Paginated user table, search/filter, role/status actions
- Ban/unban/change role/delete

```text
Create Laravel API resource controller `AdminUserController` with:
- GET /api/admin/users
- GET /api/admin/users/{id}
- PATCH /api/admin/users/{id}/ban
- PATCH /api/admin/users/{id}/unban
- PATCH /api/admin/users/{id}/role
```

```text
Create Blade page `resources/views/admin/users/index.blade.php` with:
- Query-string filters, paginated table
- Blade badges for role/status
- Alpine modal for ban action
- Form submits with CSRF
```

### Module 3 - Rooms
**Route:** `/admin/rooms`

- List rooms, room detail, force close, pin

```text
Create Laravel API controller `AdminRoomController` with:
- GET /api/admin/rooms
- GET /api/admin/rooms/{id}
- PATCH /api/admin/rooms/{id}/close
- PATCH /api/admin/rooms/{id}/pin
```

### Module 4 - Content Moderation
**Route:** `/admin/moderation`

- Reports queue/detail with warn/ban/dismiss/escalate

```text
Create Laravel controller `AdminModerationController` with:
- GET /api/admin/reports
- GET /api/admin/reports/{id}
- PATCH /api/admin/reports/{id}/resolve { action, note }
- Log to moderation_logs
```

### Module 5 - Analytics
**Route:** `/admin/analytics`

- DAU/MAU, growth, top rooms, retention cohort

```text
Create Laravel controller `AdminAnalyticsController` with:
- GET /api/admin/analytics/overview?from=&to=
- GET /api/admin/analytics/top-rooms?limit=10
- GET /api/admin/analytics/retention
```

### Module 6 - API Monitor
**Route:** `/admin/api`

- Request logs, error rate chart, slow queries, top endpoints

```text
Create middleware `LogApiRequest` that logs only /api/* to api_logs.
```

### Module 7 - System Monitor
**Route:** `/admin/system`

- CPU/RAM/Disk, services, processes, bandwidth

```text
Create Laravel controller `AdminSystemController` with:
- GET /api/admin/system/stats
- GET /api/admin/system/services
- GET /api/admin/system/processes
```

### Module 8 - Database Monitor
**Route:** `/admin/database`

- Table sizes, connections, slow queries, backup trigger

### Module 9 - Logs Viewer
**Route:** `/admin/logs`

- Laravel/Nginx logs, level filter, search, live tail

### Module 10 - Feature Flags
**Route:** `/admin/flags`

- Toggle flags, rollout %, target roles/user ids

---

## Routing structure (Laravel web)

```text
/admin/login
/admin/dashboard
/admin/users
/admin/users/{id}
/admin/rooms
/admin/rooms/{id}
/admin/moderation
/admin/analytics
/admin/api
/admin/system
/admin/database
/admin/logs
/admin/flags
```

## Shared Blade components first

```text
1) AdminLayout
2) StatCard
3) DataTable
4) ConfirmDialog
5) StatusBadge
6) AdminFetch helper (PHP service + optional Alpine wrapper)
```

## Architecture note
- Keep user app in `frontend/` unchanged.
- Build admin only in `backend/` (Blade + web routes).

