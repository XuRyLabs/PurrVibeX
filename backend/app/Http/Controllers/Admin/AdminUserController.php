<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\View\View;

class AdminUserController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('search', ''));
        $role = trim((string) $request->query('role', ''));

        $users = User::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($inner) use ($search) {
                    $inner->where('display_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%");
                });
            })
            ->when($role !== '', fn ($query) => $query->where('role', $role))
            ->orderByDesc('id')
            ->paginate(20)
            ->withQueryString();

        return view('admin.users.index', [
            'users' => $users,
            'search' => $search,
            'role' => $role,
            'roleOptions' => ['admin', 'moderator', 'user'],
        ]);
    }

    public function edit(User $user): View
    {
        return view('admin.users.edit', [
            'user' => $user,
            'roleOptions' => ['admin', 'moderator', 'user'],
            'visibilityOptions' => ['public', 'private'],
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'display_name' => ['required', 'string', 'max:100'],
            'username' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[A-Za-z0-9_-]+$/',
                Rule::unique('meow_users', 'username')->ignore($user->id),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('meow_users', 'email')->ignore($user->id),
            ],
            'phone' => ['nullable', 'string', 'max:30'],
            'role' => ['required', Rule::in(['admin', 'moderator', 'user'])],
            'profile_visibility' => ['required', Rule::in(['public', 'private'])],
        ]);

        $user->update($validated);

        return redirect()
            ->route('admin.users.index')
            ->with('status', 'User updated successfully.');
    }
}

