<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AdminAuthController extends Controller
{
    public function showLoginForm(Request $request): View|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }

        return view('admin.auth.login', [
            'prefillEmail' => (string) $request->query('email', ''),
        ]);
    }

    public function login(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Skeleton login: admin identity is resolved by existing email + role.
        $user = User::query()->where('email', $validated['email'])->first();

        if (!$user) {
            return back()
                ->withInput()
                ->withErrors(['email' => 'Account not found.']);
        }

        if (!in_array((string) $user->role, ['admin', 'moderator'], true)) {
            return back()
                ->withInput()
                ->withErrors(['email' => 'This account has no admin access.']);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->intended(route('admin.dashboard'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('status', 'Logged out successfully.');
    }
}

