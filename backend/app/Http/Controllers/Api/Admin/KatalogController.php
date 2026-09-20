<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\Katalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KatalogController extends Controller {
    public function index() {
        $items = Katalog::latest()->get()->map(function($k) {
            $k->image_url = $k->image ? url('storage/'.$k->image) : null;
            return $k;
        });
        return response()->json($items);
    }

    public function store(Request $request) {
        $request->validate(['name'=>'required|max:255']);
        $data = $request->only(['name','category','price','description','is_bestseller']);
        $data['is_bestseller'] = $request->boolean('is_bestseller');
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $data['image'] = $file->storeAs('katalog', $filename, 'public');
        }
        $katalog = Katalog::create($data);
        $katalog->image_url = $katalog->image ? url('storage/'.$katalog->image) : null;
        return response()->json($katalog, 201);
    }

    public function show($id) {
        $katalog = Katalog::findOrFail($id);
        $katalog->image_url = $katalog->image ? url('storage/'.$katalog->image) : null;
        return response()->json($katalog);
    }

    public function update(Request $request, $id) {
        $katalog = Katalog::findOrFail($id);
        $request->validate(['name'=>'required|max:255']);
        $data = $request->only(['name','category','price','description','is_bestseller']);
        $data['is_bestseller'] = $request->boolean('is_bestseller');
        if ($request->hasFile('image')) {
            if ($katalog->image) Storage::disk('public')->delete($katalog->image);
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $data['image'] = $file->storeAs('katalog', $filename, 'public');
        }
        $katalog->update($data);
        $katalog->image_url = $katalog->image ? url('storage/'.$katalog->image) : null;
        return response()->json($katalog);
    }

    public function destroy($id) {
        $katalog = Katalog::findOrFail($id);
        if ($katalog->image) Storage::disk('public')->delete($katalog->image);
        $katalog->delete();
        return response()->json(['message'=>'Produk berhasil dihapus.']);
    }
}
