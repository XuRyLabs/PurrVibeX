<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {
        // TODO: return all available shop items (avatar, theme, sticker, etc.)
    }

    public function purchase(Request $request, $itemId)
    {
        // TODO: deduct Meow Points, add item to user's inventory
    }

    public function inventory()
    {
        // TODO: return authenticated user's owned items
    }
}

