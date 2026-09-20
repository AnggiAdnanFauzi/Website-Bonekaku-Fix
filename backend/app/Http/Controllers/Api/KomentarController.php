<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Artikel;
use App\Models\Komentar;
use Illuminate\Http\Request;

class KomentarController extends Controller {
    public function store(Request $request, $id) {
        $request->validate([
            'name'=>'required|max:255',
            'email'=>'required|email|max:255',
            'website'=>'nullable|url|max:255',
            'content'=>'required|max:2000',
        ]);
        $badWords = ["anjing","babi","bangsat","bodoh","tolol","goblok","judi","slot"];
        $filtered = str_ireplace($badWords, "***", $request->content);
        $komentar = Komentar::create([
            'artikel_id'=>$id,
            'name'=>$request->name,
            'email'=>$request->email,
            'website'=>$request->website,
            'content'=>$filtered,
        ]);
        return response()->json($komentar, 201);
    }
}
