<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminRole
{
    /**
     * Allow only admin/moderator accounts into admin pages.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('admin.login')->with('error', 'Please sign in first.');
        }

        if (!in_array((string) $user->role, ['admin', 'moderator'], true)) {
            abort(403, 'You do not have admin access.');
        }

        return $next($request);
    }
}

