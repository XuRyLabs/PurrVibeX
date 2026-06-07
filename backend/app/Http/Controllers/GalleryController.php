<?php

namespace App\Http\Controllers;

use App\Models\CatPhoto;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        // TODO: return paginated cat photo feed
    }

    public function store(Request $request)
    {
        // TODO: upload photo to Cloudflare R2 / Supabase Storage
    }

    public function like(CatPhoto $photo)
    {
        // TODO: toggle like on a photo
    }

    public function destroy(CatPhoto $photo)
    {
        // TODO: delete photo (owner only)
    }
}

