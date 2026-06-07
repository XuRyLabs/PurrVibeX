@extends('admin.layouts.app')

@section('title', 'Users')
@section('header', 'Users')

@section('content')
    <section class="admin-section">
        <div class="admin-section-header">
            <h2 class="admin-section-title">Filter users</h2>
        </div>

        <form method="GET" action="{{ route('admin.users.index') }}" class="admin-filter-form">
            <div>
                <label for="search" class="admin-label">Search</label>
                <input
                    id="search"
                    name="search"
                    value="{{ $search }}"
                    type="text"
                    class="admin-input"
                    placeholder="name, username, or email"
                >
            </div>

            <div>
                <label for="role" class="admin-label">Role</label>
                <select id="role" name="role" class="admin-input">
                    <option value="">All roles</option>
                    @foreach ($roleOptions as $option)
                        <option value="{{ $option }}" @selected($role === $option)>{{ ucfirst($option) }}</option>
                    @endforeach
                </select>
            </div>

            <div class="admin-filter-actions">
                <button type="submit" class="admin-button">Apply</button>
                <a href="{{ route('admin.users.index') }}" class="admin-link-button">Reset</a>
            </div>
        </form>
    </section>

    <section class="admin-section">
        <div class="admin-section-header">
            <h2 class="admin-section-title">User list ({{ $users->total() }})</h2>
        </div>

        <div class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Last seen</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($users as $user)
                        <tr>
                            <td>#{{ $user->id }}</td>
                            <td>{{ $user->display_name ?: '-' }}</td>
                            <td class="admin-mono">{{ $user->username ?: '-' }}</td>
                            <td>{{ $user->email }}</td>
                            <td><span class="admin-pill">{{ $user->role ?: 'user' }}</span></td>
                            <td class="admin-mono">{{ $user->last_seen ? $user->last_seen->utc()->format('Y-m-d H:i:s') . ' UTC' : '-' }}</td>
                            <td><a href="{{ route('admin.users.edit', $user) }}" class="admin-link-button">Edit</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="admin-empty">No users found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="admin-pagination">
            {{ $users->links() }}
        </div>
    </section>
@endsection

