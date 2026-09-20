<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Katalog;
use Illuminate\Http\Request;

class KatalogController extends Controller {
    private function formatItem($k) {
        $k->image_url = $k->image ? url('storage/' . ltrim($k->image, '/')) : null;
        return $k;
    }

    public function index() {
        $katalogs = Katalog::latest()->get()->map(fn($k) => $this->formatItem($k));
        return response()->json($katalogs);
    }

    public function show($id) {
        $katalog = Katalog::find($id);
        if (!$katalog) return response()->json(['message' => 'Not found'], 404);
        return response()->json($this->formatItem($katalog));
    }

    public function bestseller() {
        $items = Katalog::where('is_bestseller', true)->get()->map(fn($k) => $this->formatItem($k));
        return response()->json($items);
    }

    public function newest() {
        $items = Katalog::latest()->take(8)->get()->map(fn($k) => $this->formatItem($k));
        return response()->json($items);
    }
}
