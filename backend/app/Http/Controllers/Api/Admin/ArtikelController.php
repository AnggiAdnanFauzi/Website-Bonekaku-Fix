<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\Artikel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArtikelController extends Controller {
    public function index() {
        $items = Artikel::latest()->get()->map(function($a) {
            $a->image_url = $a->image ? url('storage/'.$a->image) : $a->image;
            return $a;
        });
        return response()->json($items);
    }

    public function store(Request $request) {
        $data = $request->only(['title','content','author','published_at']);
        if (empty($data['author'])) {
            $data['author'] = 'Admin Bonekaku';
        }
        if (empty($data['published_at'])) {
            $data['published_at'] = now()->toDateString();
        }
        $data['slug'] = Str::slug($request->title).'-'.time();
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $data['image'] = $file->storeAs('artikel', $filename, 'public');
        }
        $artikel = Artikel::create($data);
        $artikel->image_url = $artikel->image ? url('storage/'.$artikel->image) : $artikel->image;
        return response()->json($artikel, 201);
    }

    public function show($id) {
        $artikel = Artikel::findOrFail($id);
        $artikel->image_url = $artikel->image ? url('storage/'.$artikel->image) : $artikel->image;
        return response()->json($artikel);
    }

    public function update(Request $request, $id) {
        $artikel = Artikel::findOrFail($id);
        $data = $request->only(['title','content','author','published_at']);
        if ($request->has('author') && empty($data['author'])) {
            $data['author'] = 'Admin Bonekaku';
        }
        if ($request->title !== $artikel->title) {
            $data['slug'] = Str::slug($request->title).'-'.time();
        }
        if (empty($data['published_at'])) {
            $data['published_at'] = now()->toDateString();
        }
        if ($request->hasFile('image')) {
            if ($artikel->image && !str_starts_with($artikel->image, 'http')) {
                Storage::disk('public')->delete($artikel->image);
            }
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $data['image'] = $file->storeAs('artikel', $filename, 'public');
        }
        $artikel->update($data);
        $artikel->image_url = $artikel->image ? url('storage/'.$artikel->image) : $artikel->image;
        return response()->json($artikel);
    }

    public function destroy($id) {
        $artikel = Artikel::findOrFail($id);
        if ($artikel->image && !str_starts_with($artikel->image, 'http')) {
            Storage::disk('public')->delete($artikel->image);
        }
        $artikel->delete();
        return response()->json(['message'=>'Artikel berhasil dihapus.']);
    }
}
