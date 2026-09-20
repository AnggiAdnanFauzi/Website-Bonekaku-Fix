<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\Komentar;

class KomentarController extends Controller {
    public function index() {
        $items = Komentar::with('artikel:id,title,slug')->latest()->get();
        return response()->json($items);
    }

    public function destroy($id) {
        $komentar = Komentar::findOrFail($id);
        $komentar->delete();
        return response()->json(['message'=>'Komentar berhasil dihapus.']);
    }
}
