@extends('admin.layouts.app')

@section('title', 'Edit User')
@section('header', 'Edit User')

@section('content')
    <section class="admin-section">
        <div class="admin-section-header admin-section-header-row">
            <h2 class="admin-section-title">Editing #{{ $user->id }} - {{ $user->display_name ?: $user->email }}</h2>
            <a href="{{ route('admin.users.index') }}" class="admin-link-button">Back to users</a>
        </div>

        @if ($errors->any())
            <div class="admin-error admin-error-block">
                {{ $errors->first() }}
            </div>
        @endif

        <form method="POST" action="{{ route('admin.users.update', $user) }}" class="admin-edit-form">
            @csrf
            @method('PUT')

            <div>
                <label class="admin-label" for="display_name">Display name</label>
                <input id="display_name" name="display_name" class="admin-input" value="{{ old('display_name', $user->display_name) }}" required>
            </div>

            <div>
                <label class="admin-label" for="username">Username</label>
                <input id="username" name="username" class="admin-input" value="{{ old('username', $user->username) }}" required>
            </div>

            <div>
                <label class="admin-label" for="email">Email</label>
                <input id="email" name="email" type="email" class="admin-input" value="{{ old('email', $user->email) }}" required>
            </div>

            <div>
                <label class="admin-label" for="phone">Phone</label>
                <input id="phone" name="phone" class="admin-input" value="{{ old('phone', $user->phone) }}">
            </div>

            <div>
                <label class="admin-label" for="role">Role</label>
                <select id="role" name="role" class="admin-input" required>
                    @foreach ($roleOptions as $option)
                        <option value="{{ $option }}" @selected(old('role', $user->role) === $option)>{{ ucfirst($option) }}</option>
                    @endforeach
                </select>
            </div>

            <div>
                <label class="admin-label" for="profile_visibility">Profile visibility</label>
                <select id="profile_visibility" name="profile_visibility" class="admin-input" required>
                    @foreach ($visibilityOptions as $option)
                        <option value="{{ $option }}" @selected(old('profile_visibility', $user->profile_visibility) === $option)>{{ ucfirst($option) }}</option>
                    @endforeach
                </select>
            </div>

            <div class="admin-edit-actions">
                <button type="submit" class="admin-button">Save changes</button>
                <a href="{{ route('admin.users.index') }}" class="admin-link-button">Cancel</a>
            </div>
        </form>
    </section>
@endsection

