<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Artikel;
use Illuminate\Http\Request;

class ArtikelController extends Controller {
    public function index() {
        $artikels = Artikel::latest()->get()->map(function($a) {
            $a->image_url = $a->image ? url('storage/'.$a->image) : $a->image;
            return $a;
        });
        return response()->json($artikels);
    }

    public function show($slug) {
        $artikel = Artikel::with('komentars')->where('slug', $slug)->firstOrFail();
        $artikel->image_url = $artikel->image ? url('storage/'.$artikel->image) : $artikel->image;
        return response()->json($artikel);
    }
}
