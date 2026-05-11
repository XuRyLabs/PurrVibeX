<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // TODO: validate, create user, return token
    }

    public function login(Request $request)
    {
        // TODO: validate credentials, return token
    }

    public function logout(Request $request)
    {
        // TODO: revoke token
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}

